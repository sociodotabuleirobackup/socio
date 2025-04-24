
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { auth } from "@/lib/firebase"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  DollarSign,
  Heart,
  MapPin,
  Package,
  Users,
  Shield,
} from "lucide-react"
import { multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator } from "firebase/auth"

export default function Dashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalDistance: 0,
    gamesRented: 0,
    activeRentals: 0
  })
  const [rentedGames, setRentedGames] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [friends, setFriends] = useState([])
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)

  useEffect(() => {
    loadDashboardData()
    check2FAStatus()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Aqui você fará as chamadas para sua API para carregar os dados
      // Por enquanto, vamos usar dados mockados
      setStats({
        totalSpent: 250.00,
        totalDistance: 45.5,
        gamesRented: 8,
        activeRentals: 2
      })

      setRentedGames([
        {
          id: 1,
          name: "Catan",
          rentDate: "2025-03-25",
          returnDate: "2025-03-28",
          status: "active",
          price: 45.00
        },
        {
          id: 2,
          name: "Ticket to Ride",
          rentDate: "2025-03-20",
          returnDate: "2025-03-23",
          status: "completed",
          price: 35.00
        }
      ])

      setWishlist([
        {
          id: 1,
          name: "Pandemic",
          price: 40.00,
          availability: "disponível"
        },
        {
          id: 2,
          name: "7 Wonders",
          price: 50.00,
          availability: "em breve"
        }
      ])

      setFriends([
        {
          id: 1,
          name: "João Silva",
          gamesShared: 3,
          avatar: null
        },
        {
          id: 2,
          name: "Maria Santos",
          gamesShared: 5,
          avatar: null
        }
      ])

      setLoading(false)
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const check2FAStatus = async () => {
    try {
      const user = auth.currentUser
      if (user) {
        const enrolledFactors = multiFactor(user).enrolledFactors
        setIs2FAEnabled(enrolledFactors.length > 0)
      }
    } catch (error) {
      console.error("Erro ao verificar status 2FA:", error)
    }
  }

  const enable2FA = async () => {
    try {
      const user = auth.currentUser
      if (!user) throw new Error("Usuário não autenticado")

      // Iniciar processo de inscrição 2FA
      const multiFactorSession = await multiFactor(user).getSession()
      
      // Solicitar número de telefone do usuário (você pode criar um modal para isso)
      const phoneNumber = "+5519995409950" // Exemplo - deve vir de um input do usuário

      // Gerar verificação
      const phoneAuthProvider = new PhoneAuthProvider(auth)
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        phoneNumber,
        multiFactorSession
      )

      // Aqui você deve criar um modal/form para o usuário inserir o código
      // Por enquanto, vamos apenas mostrar um toast
      toast({
        title: "2FA Iniciado",
        description: "Por favor, complete a verificação no seu telefone.",
      })

      // O código completo incluiria:
      // 1. Modal para inserir o código de verificação
      // 2. Finalizar a inscrição com PhoneAuthCredential
      // 3. Atualizar o status

    } catch (error) {
      toast({
        title: "Erro ao configurar 2FA",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Button
            onClick={enable2FA}
            disabled={is2FAEnabled}
            className="bg-[#82358C] hover:bg-[#6a2b73]"
          >
            <Shield className="w-4 h-4 mr-2" />
            {is2FAEnabled ? "2FA Ativado" : "Ativar 2FA"}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Em todos os aluguéis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Distância Total</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDistance} km</div>
              <p className="text-xs text-muted-foreground">
                Percorridos em entregas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jogos Alugados</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.gamesRented}</div>
              <p className="text-xs text-muted-foreground">
                Total de aluguéis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aluguéis Ativos</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeRentals}</div>
              <p className="text-xs text-muted-foreground">
                Em andamento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="rentals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="rentals">Aluguéis</TabsTrigger>
            <TabsTrigger value="wishlist">Lista de Desejos</TabsTrigger>
            <TabsTrigger value="friends">Amigos</TabsTrigger>
          </TabsList>

          <TabsContent value="rentals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Aluguéis</CardTitle>
                <CardDescription>
                  Seus jogos alugados e datas de devolução
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rentedGames.map(game => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{game.name}</h3>
                        <div className="text-sm text-gray-500">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {game.rentDate} até {game.returnDate}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">R$ {game.price.toFixed(2)}</div>
                        <span className={`text-sm ${
                          game.status === 'active' ? 'text-green-500' : 'text-gray-500'
                        }`}>
                          {game.status === 'active' ? 'Ativo' : 'Concluído'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Desejos</CardTitle>
                <CardDescription>
                  Jogos que você deseja alugar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wishlist.map(game => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{game.name}</h3>
                        <div className="text-sm text-gray-500">
                          {game.availability}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">R$ {game.price.toFixed(2)}</div>
                        <Heart className="w-4 h-4 text-red-500 inline" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="friends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Amigos</CardTitle>
                <CardDescription>
                  Pessoas com quem você compartilha jogos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {friends.map(friend => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                          {friend.avatar ? (
                            <img
                              src={friend.avatar}
                              alt={friend.name}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <Users className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{friend.name}</h3>
                          <div className="text-sm text-gray-500">
                            {friend.gamesShared} jogos compartilhados
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Perfil
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
