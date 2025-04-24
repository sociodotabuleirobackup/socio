
import { db } from '@/lib/firebase'
import { doc, updateDoc, getDoc, collection, addDoc } from 'firebase/firestore'

export async function getWalletBalance(userId) {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      throw new Error('Usuário não encontrado')
    }

    return userDoc.data().wallet?.balance || 0
  } catch (error) {
    console.error('Erro ao buscar saldo:', error)
    throw error
  }
}

export async function addWalletTransaction(userId, {
  type,
  amount,
  description,
  reference
}) {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      throw new Error('Usuário não encontrado')
    }

    const currentBalance = userDoc.data().wallet?.balance || 0
    const newBalance = type === 'credit' 
      ? currentBalance + amount 
      : currentBalance - amount

    // Adicionar transação ao histórico
    const transactionRef = collection(db, 'users', userId, 'transactions')
    await addDoc(transactionRef, {
      type,
      amount,
      description,
      reference,
      date: new Date(),
      previousBalance: currentBalance,
      newBalance
    })

    // Atualizar saldo
    await updateDoc(userRef, {
      'wallet.balance': newBalance,
      'wallet.lastUpdate': new Date()
    })

    return {
      success: true,
      newBalance
    }
  } catch (error) {
    console.error('Erro na transação:', error)
    throw error
  }
}
