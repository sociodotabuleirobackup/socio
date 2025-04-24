
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Search, DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function TransactionsMonitoring() {
  const { toast } = useToast()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      const transactionsRef = collection(db, "transactions")
      const q = query(transactionsRef, orderBy("createdAt", "desc"))
      const snapshot = await getDocs(q)
      
      const transactionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setTransactions(transactionsData)
    } catch (error) {
      toast({
        title: "Erro ao carregar transações",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500'
      case 'pending':
        return 'text-yellow-500'
      case 'failed':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'failed':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const filteredTransactions = transactions.filter(transaction => 
    transaction.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.userId?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Monitoramento de Transações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div>Carregando...</div>
          ) : (
            filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">#{transaction.id}</h3>
                    <span className={`flex items-center gap-1 ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {format(new Date(transaction.createdAt), "dd 'de' MMMM 'às' HH:mm", {
                      locale: ptBR
                    })}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">
                      Usuário: {transaction.userId}
                    </span>
                    {transaction.type === 'rental' && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Aluguel
                      </span>
                    )}
                    {transaction.type === 'sale' && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Venda
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    R$ {transaction.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Taxa: R$ {(transaction.amount * 0.15).toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
