import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"

export default function ProductCard({ product, onBuy }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            className="w-full h-full object-cover"
            alt={product.name}
            src="https://images.unsplash.com/photo-1606733847546-db8546099013"
          />
          {product.type === "rental" && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
              Aluguel
            </div>
          )}
          {product.type === "sale" && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
              Venda
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-gray-500">
              ({product.ratingCount} avaliações)
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {product.distance}km de distância
          </div>
          {product.type !== "rental" && (
            <div className="text-[#82358C] font-semibold">
              R$ {product.pricing.sale}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          {product.type !== "rental" && (
            <Button
              className="flex-1 bg-[#82358C] hover:bg-[#6a2b73]"
              onClick={onBuy}
            >
              Comprar
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
