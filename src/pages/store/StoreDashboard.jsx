
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import {
  Calendar,
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react"

export default function StoreDashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("week")
  const [metrics, setMetrics] = useState({
    totalEarnings: 0,
    platformFee: 0,
    rentals: {
      total: 0,
      active: 0
    },
    sales: {
      total: 0,
      thisMonth: 0
    }
  })
  const [salesData, setSalesData] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [timeRange])

  const loadDashboardData = async () => {
    try {
      // Aqui você fará as chamadas para sua API
      // Por enquanto, vamos usar dados mockados
      setMetrics({
        totalEarnings: 15000.00,
        platformFee: 1500.00,
        rentals: {
          total: 45,
          active: 12
        },
        sales: {
          total: 78,
          thisMonth: 23
        }
      })

      setSalesData([
        { date: '2025-03-25', sales: 1200, rentals: 450 },
        { date: '2025-03-26', sales: 1500, rentals: 600 },
        { date: '2025-03-27', sales: 1800, rentals: 750 },
        { date: '2025-03-28', sales: 1600, rentals: 500 },
        { date: '2025-03-29', sales: 2100, rentals: 800 },
        { date: '2025-03-30', sales: 1900, rentals: 700 },
        { date: '2025-03-31', sales: 2300, rentals: 900 }
      ])

      setProducts([
        {
          id: 1,
          name: "Catan",
          type: "both",
          salePrice: 289.90,
          rentalPrice: 45.00,
          stock: 5,
          rentedCount: 12,
          soldCount: 8
        },
        {
          id: 2,
          name: "Pandemic",
          type: "rental",
          rentalPrice: 35.00,
          stock: 3,
          rentedCount: 15,
          soldCount: 0
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard da Loja</h1>
            <p className="text-gray-600">Gerencie seus produtos e acompanhe suas vendas</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última Semana</SelectItem>
              <SelectItem value="month">Último Mês</SelectItem>
              <SelectItem value="year">Último Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {metrics.totalEarnings.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Taxa da plataforma: R$ {metrics.platformFee.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.sales.thisMonth}</div>
              <p className="text-xs text-muted-foreground">
                Total: {metrics.sales.total} vendas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aluguéis Ativos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.rentals.active}</div>
              <p className="text-xs text-muted-foreground">
                Total: {metrics.rentals.total} aluguéis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Vendas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Desempenho de Vendas e Aluguéis</CardTitle>
            <CardDescription>
              Acompanhe a evolução das suas vendas e aluguéis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#82358C" 
                    strokeWidth={2}
                    name="Vendas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rentals" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Aluguéis"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Produtos */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>
              Gerencie seu inventário de jogos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map(product => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="text-sm text-gray-500">
                      {product.type === "both" ? "Venda e Aluguel" : "Apenas Aluguel"}
                    </div>
                    <div className="text-sm text-gray-500">
                      Estoque: {product.stock} unidades
                    </div>
                  </div>
                  <div className="text-right">
                    {product.type === "both" && (
                      <div className="font-medium">
                        Venda: R$ {product.salePrice.toFixed(2)}
                      </div>
                    )}
                    <div className="font-medium">
                      Aluguel: R$ {product.rentalPrice.toFixed(2)}/dia
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.rentedCount} aluguéis • {product.soldCount} vendas
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
