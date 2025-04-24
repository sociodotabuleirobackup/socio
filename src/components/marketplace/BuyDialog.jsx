
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, DollarSign } from "lucide-react"
import { createTransaction } from "@/lib/firebase-schema"
import { createPayment } from "@/lib/asaas"
import { useAuth } from "@/contexts/AuthContext"

export default function BuyDialog({ open, onOpenChange, product }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!user) throw new Error("Você precisa estar logado")

      // Criar transação no Firebase
      const transaction = await createTransaction({
        type: "sale",
        userId: user.uid,
        storeId: product.storeId,
        productId: product.id,
        amount: product.pricing.sale,
        payment: {
          method: "asaas",
          status: "pending"
        },
        delivery: {
          address: user.address
        }
      })

      // Criar pagamento no Asaas
      const payment = await createPayment({
        customer: user.uid,
        amount: product.pricing.sale,
        description: `Compra de ${product.name}`,
        split: {
          walletId: product.storeId,
          fixedValue: product.pricing.sale * 0.85 // 85% para o vendedor
        }
      })

      toast({
        title: "Compra realizada!",
        description: "Você receberá as instruções de pagamento por e-mail.",
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro ao realizar compra",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comprar {product.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-500">Valor Total</p>
              <p className="text-3xl font-bold text-[#82358C]">
                R$ {product.pricing.sale.toFixed(2)}
              </p>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#82358C] hover:bg-[#6a2b73]"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <DollarSign className="w-4 h-4 mr-2" />
            Confirmar Compra
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
