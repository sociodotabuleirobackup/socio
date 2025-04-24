
import { db } from '@/lib/firebase'
import { collection, doc, setDoc, addDoc, getDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore'

// Product Functions
export const getProductDetails = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId)
    const productDoc = await getDoc(productRef)
    
    if (!productDoc.exists()) {
      throw new Error('Produto não encontrado')
    }

    return {
      id: productDoc.id,
      ...productDoc.data()
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do produto:', error)
    throw error
  }
}

export const getProductsByLocation = async (latitude, longitude, radius, filters = {}) => {
  try {
    const productsRef = collection(db, 'products')
    let baseQuery = query(productsRef,
      where('location.latitude', '>=', latitude - radius),
      where('location.latitude', '<=', latitude + radius)
    )

    if (filters.type) {
      baseQuery = query(baseQuery, where('type', '==', filters.type))
    }

    if (filters.maxPrice) {
      baseQuery = query(baseQuery, where('pricing.rental.daily', '<=', filters.maxPrice))
    }

    const snapshot = await getDocs(baseQuery)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    throw error
  }
}

// User Functions
export const createUser = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      wallet: {
        balance: 0,
        asaasId: null,
        status: 'pending',
        createdAt: new Date(),
        lastUpdate: new Date()
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw error
  }
}

// Transaction Functions
export const createTransaction = async (transactionData) => {
  try {
    const transactionRef = collection(db, 'transactions')
    const newTransaction = await addDoc(transactionRef, {
      ...transactionData,
      createdAt: new Date(),
      status: 'pending',
      payment: {
        method: transactionData.payment.method,
        status: 'pending',
        asaasId: null
      }
    })

    return { success: true, transactionId: newTransaction.id }
  } catch (error) {
    console.error('Erro ao criar transação:', error)
    throw error
  }
}

// Store Functions
export const createStore = async (storeData) => {
  try {
    const storeRef = collection(db, 'stores')
    const newStore = await addDoc(storeRef, {
      ...storeData,
      createdAt: new Date(),
      updatedAt: new Date(),
      wallet: {
        asaasId: null,
        status: 'pending',
        balance: 0,
        lastUpdate: new Date()
      }
    })

    return { success: true, storeId: newStore.id }
  } catch (error) {
    console.error('Erro ao criar loja:', error)
    throw error
  }
}

// Crowdfunding Functions
export const createCrowdfunding = async (crowdfundingData) => {
  try {
    const crowdfundingRef = collection(db, 'crowdfunding')
    const newCrowdfunding = await addDoc(crowdfundingRef, {
      ...crowdfundingData,
      createdAt: new Date(),
      status: 'active',
      currentAmount: 0,
      backers: []
    })

    return { success: true, crowdfundingId: newCrowdfunding.id }
  } catch (error) {
    console.error('Erro ao criar campanha:', error)
    throw error
  }
}

export default {
  getProductDetails,
  getProductsByLocation,
  createUser,
  createTransaction,
  createStore,
  createCrowdfunding
}
