
import React, { createContext, useContext, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getProductsByLocation, createTransaction } from "@/lib/firebase-schema"
import { createPayment } from "@/lib/asaas"
import { useToast } from "@/components/ui/use-toast"

const MarketplaceContext = createContext({})

export function MarketplaceProvider({ children }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const loadProducts = async (latitude, longitude, radius, filters) => {
    try {
      setLoading(true)
      const products = await getProductsByLocation(latitude, longitude, radius, filters)
      setProducts(products)
      return products
    } catch (error) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive"
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const rentProduct = async (productId, rentData) => {
    try {
      if (!user) throw new Error("Você precisa estar logado")

      // Create transaction in Firebase
      const transaction = await createTransaction({
        type: "rental",
        userId: user.uid,
        productId,
        ...rentData
      })

      // Create payment in Asaas
      const payment = await createPayment({
        customer: user.uid,
        amount: rentData.amount,
        description: rentData.description,
        split: rentData.split
      })

      return { transaction, payment }
    } catch (error) {
      toast({
        title: "Erro ao alugar produto",
        description: error.message,
        variant: "destructive"
      })
      throw error
    }
  }

  const buyProduct = async (productId, buyData) => {
    try {
      if (!user) throw new Error("Você precisa estar logado")

      // Create transaction in Firebase
      const transaction = await createTransaction({
        type: "sale",
        userId: user.uid,
        productId,
        ...buyData
      })

      // Create payment in Asaas
      const payment = await createPayment({
        customer: user.uid,
        amount: buyData.amount,
        description: buyData.description,
        split: buyData.split
      })

      return { transaction, payment }
    } catch (error) {
      toast({
        title: "Erro ao comprar produto",
        description: error.message,
        variant: "destructive"
      })
      throw error
    }
  }

  const value = {
    products,
    loading,
    loadProducts,
    rentProduct,
    buyProduct
  }

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  )
}

export function useMarketplace() {
  return useContext(MarketplaceContext)
}
