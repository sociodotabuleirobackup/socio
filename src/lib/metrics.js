
import { db } from '@/lib/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

export function subscribeToMetrics(userId, callback) {
  // Subscribe to user metrics
  const userMetricsRef = collection(db, `users/${userId}/metrics`)
  const unsubscribeUser = onSnapshot(userMetricsRef, (snapshot) => {
    const metrics = {}
    snapshot.forEach((doc) => {
      metrics[doc.id] = doc.data()
    })
    callback('user', metrics)
  })

  // Subscribe to store metrics if user is a store owner
  const storesRef = collection(db, 'stores')
  const storeQuery = query(storesRef, where('ownerId', '==', userId))
  const unsubscribeStore = onSnapshot(storeQuery, (snapshot) => {
    snapshot.forEach((doc) => {
      const storeMetrics = doc.data().metrics
      callback('store', { storeId: doc.id, ...storeMetrics })
    })
  })

  // Return unsubscribe function
  return () => {
    unsubscribeUser()
    unsubscribeStore()
  }
}

export function subscribeToTransactions(userId, callback) {
  const transactionsRef = collection(db, `users/${userId}/transactions`)
  return onSnapshot(transactionsRef, (snapshot) => {
    const transactions = []
    snapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() })
    })
    callback(transactions)
  })
}
