
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, MapPin } from "lucide-react"
import ProductCard from "@/components/marketplace/ProductCard"
import FilterSidebar from "@/components/marketplace/FilterSidebar"
import { getProductsByLocation } from "@/lib/firebase-schema"
import {ProductDetails} from "@/components/marketplace/ProductCard"


export default function Marketplace() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: [0, 1000],
    category: "all",
    availability: "all"
  })
  const [location, setLocation] = useState({
    lat: -23.5505,
    lng: -46.6333
  })

  useEffect(() => {
    loadProducts()
    getUserLocation()
  }, [filters])

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      const radius = 50 // 50km radius
      const products = await getProductsByLocation(
        location.lat,
        location.lng,
        radius,
        filters
      )
      setProducts(products)
    } catch (error) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Encontre Jogos de Tabuleiro
            </motion.h1>
            <motion.p
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Alugue ou compre jogos próximos a você
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Sua localização"
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => {}}
                className="bg-[#82358C] hover:bg-[#6a2b73]"
              >
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
              <Button
                variant="outline"
                onClick={() => {}}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
          />

          {/* Products */}
          <div className="flex-1">
            {loading ? (
              <div>Carregando...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onRent={() => navigate(`/product/${product.id}/rent`)}
                    onBuy={() => navigate(`/product/${product.id}/buy`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
