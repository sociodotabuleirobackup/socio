
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Search, Store, Edit, Trash2, DollarSign } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"

export default function StoresManagement() {
  const { toast } = useToast()
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadStores()
  }, [])

  const loadStores = async () => {
    try {
      setLoading(true)
      const storesRef = collection(db, "stores")
      const q = query(storesRef, orderBy("createdAt", "desc"))
      const snapshot = await getDocs(q)
      
      const storesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setStores(storesData)
    } catch (error) {
      toast({
        title: "Erro ao carregar lojas",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredStores = stores.filter(store => 
    store.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gerenciar Lojas</CardTitle>
        <Button className="bg-[#82358C] hover:bg-[#6a2b73]">
          <Store className="w-4 h-4 mr-2" />
          Nova Loja
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar lojas..."
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
            filteredStores.map((store) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{store.name}</h3>
                  <p className="text-sm text-gray-500">{store.address.city}, {store.address.state}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>
                      Faturamento: R$ {store.metrics?.totalEarnings?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
