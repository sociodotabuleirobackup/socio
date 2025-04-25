import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Star, MapPin, Calendar, Users, Clock, DollarSign } from "lucide-react";
import { getProductDetails } from "@/lib/firebase-schema";
const defaultProduct = {
  id: "default-product",
  name: "Produto de Exemplo",
  imageUrl: "https://images.unsplash.com/photo-1613175949857-a1b8d59cae7d", // Substitua pela URL da imagem padrão
  rating: 4.5,
  ratingCount: 100,
  distance: 2.5,
  type: "rental",
  pricing: {
    rental: {
      daily: 10.0,
      weekly: 50.0,
      monthly: 150.0,
    },
  },
  players: { min: 2, max: 4 },
  duration: 30,
};
export default function ProductDetailPage() {
    const { productId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProductDetails();
  }, [productId]);

  const loadProductDetails = async () => {
    try {
      setLoading(true);
        const details = await getProductDetails(productId);
      setProduct(details);
    } catch (error) {
      toast({
        title: "Erro ao carregar detalhes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
    }

  if (!product) {
        setProduct(defaultProduct)
    }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">{product.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagem do Produto */}
          <div className="rounded-2xl overflow-hidden">
            <img
              className="w-full aspect-square object-cover"
              alt={product.name}
              src="https://images.unsplash.com/photo-1613175949857-a1b8d59cae7d"
            />
          </div>

          {/* Detalhes do Produto */}
          <div className="space-y-6">
            <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};