
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Search, UserPlus, Edit, Trash2 } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"

export default function UsersManagement() {
  const { toast } = useToast()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const usersRef = collection(db, "users")
      const q = query(usersRef, orderBy("createdAt", "desc"))
      const snapshot = await getDocs(q)
      
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setUsers(usersData)
    } catch (error) {
      toast({
        title: "Erro ao carregar usuários",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gerenciar Usuários</CardTitle>
        <Button className="bg-[#82358C] hover:bg-[#6a2b73]">
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar usuários..."
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
            filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{user.fullName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <div className="flex gap-2 mt-1">
                    {user.userType?.renter && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Locatário
                      </span>
                    )}
                    {user.userType?.owner && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Locador
                      </span>
                    )}
                    {user.userType?.store && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        Loja
                      </span>
                    )}
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
