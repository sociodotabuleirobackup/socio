
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Star, MapPin, Calendar, Users, Clock, DollarSign } from "lucide-react"
import { getProductDetails } from "@/lib/firebase-schema"
import { createPayment } from "@/lib/asaas"
import RentDialog from "@/components/marketplace/RentDialog"
import BuyDialog from "@/components/marketplace/BuyDialog"

export default function ProductDetails() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [rentDialogOpen, setRentDialogOpen] = useState(false)
  const [buyDialogOpen, setBuyDialogOpen] = useState(false)

  useEffect(() => {
    loadProductDetails()
  }, [productId])

  const loadProductDetails = async () => {
    try {
      setLoading(true)
      const details = await getProductDetails(productId)
      setProduct(details)
    } catch (error) {
      toast({
        title: "Erro ao carregar detalhes",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!product) {
    return <div>Produto não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Imagem do Produto */}
          <div className="rounded-2xl overflow-hidden">
            <img 
              className="w-full aspect-square object-cover"
              alt={product.name}
             src="https://images.unsplash.com/photo-1613175949857-a1b8d59cae7d" />
          </div>

          {/* Detalhes do Produto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500">
                  ({product.ratingCount} avaliações)
                </span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{product.distance}km de distância</span>
              </div>
            </div>

            {/* Preços */}
            <Card>
              <CardHeader>
                <CardTitle>Preços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.type !== "sale" && (
                  <div>
                    <h3 className="font-semibold mb-2">Aluguel</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-sm text-gray-500">Diária</p>
                        <p className="text-lg font-bold text-[#82358C]">
                          R$ {product.pricing.rental.daily}
                        </p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-sm text-gray-500">Semanal</p>
                        <p className="text-lg font-bold text-[#82358C]">
                          R$ {product.pricing.rental.weekly}
                        </p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-sm text-gray-500">Mensal</p>
                        <p className="text-lg font-bold text-[#82358C]">
                          R$ {product.pricing.rental.monthly}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {product.type !== "rental" && (
                  <div>
                    <h3 className="font-semibold mb-2">Venda</h3>
                    <div className="p-3 border rounded-lg">
                      <p className="text-center">
                        <span className="text-sm text-gray-500">Valor</span>
                        <span className="block text-lg font-bold text-[#82358C]">
                          R$ {product.pricing.sale}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informações do Jogo */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Jogadores</p>
                    <p className="font-medium">
                      {product.players.min}-{product.players.max}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Duração</p>
                    <p className="font-medium">{product.duration} min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex gap-4">
              {product.type !== "sale" && (
                <Button
                  className="flex-1 bg-[#82358C] hover:bg-[#6a2b73]"
                  onClick={() => setRentDialogOpen(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Alugar
                </Button>
              )}
              {product.type !== "rental" && (
                <Button
                  className="flex-1 bg-[#82358C] hover:bg-[#6a2b73]"
                  onClick={() => setBuyDialogOpen(true)}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Comprar
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Diálogos */}
      <RentDialog
        open={rentDialogOpen}
        onOpenChange={setRentDialogOpen}
        product={product}
      />
      <BuyDialog
        open={buyDialogOpen}
        onOpenChange={setBuyDialogOpen}
        product={product}
      />
    </div>
  )
}
