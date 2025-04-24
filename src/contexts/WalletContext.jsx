
import React, { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getWalletBalance, addWalletTransaction } from "@/lib/wallet"
import { useToast } from "@/components/ui/use-toast"

const WalletContext = createContext({})

export function WalletProvider({ children }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadWalletData()
    }
  }, [user])

  const loadWalletData = async () => {
    try {
      setLoading(true)
      const balance = await getWalletBalance(user.uid)
      setBalance(balance)
      // Load transactions here
    } catch (error) {
      toast({
        title: "Erro ao carregar carteira",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const addTransaction = async (transactionData) => {
    try {
      const result = await addWalletTransaction(user.uid, transactionData)
      setBalance(result.newBalance)
      loadWalletData() // Reload to get updated transactions
      return result
    } catch (error) {
      toast({
        title: "Erro na transação",
        description: error.message,
        variant: "destructive"
      })
      throw error
    }
  }

  const value = {
    balance,
    transactions,
    loading,
    addTransaction,
    refreshWallet: loadWalletData
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  return useContext(WalletContext)
}
