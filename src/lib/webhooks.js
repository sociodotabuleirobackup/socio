
import { db } from '@/lib/firebase'
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore'

export async function handleAsaasWebhook(event) {
  const { payment, event: eventType } = event

  try {
    // Update transaction status
    const transactionRef = doc(db, 'transactions', payment.reference)
    await updateDoc(transactionRef, {
      'payment.status': payment.status,
      'payment.paidAt': payment.paidAt,
      updatedAt: new Date()
    })

    // Process split payments
    if (payment.status === 'CONFIRMED' || payment.status === 'RECEIVED') {
      const { split } = payment
      if (split) {
        // Update store wallet
        const storeRef = doc(db, 'stores', split.walletId)
        await updateDoc(storeRef, {
          'wallet.balance': increment(split.fixedValue),
          'wallet.lastUpdate': new Date()
        })

        // Add transaction to store history
        const storeTransactionsRef = collection(db, `stores/${split.walletId}/transactions`)
        await addDoc(storeTransactionsRef, {
          type: 'credit',
          amount: split.fixedValue,
          reference: payment.id,
          description: `Split payment from transaction ${payment.reference}`,
          createdAt: new Date()
        })
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error processing Asaas webhook:', error)
    throw error
  }
}
