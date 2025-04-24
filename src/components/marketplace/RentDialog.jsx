
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Loader2 } from "lucide-react"
import { addDays, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { createTransaction } from "@/lib/firebase-schema"
import { createPayment } from "@/lib/asaas"
import { useAuth } from "@/contexts/AuthContext"

export default function RentDialog({ open, onOpenChange, product }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [days, setDays] = useState(1)

  const calculateTotal = () => {
    return days * product.pricing.rental.daily
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!user) throw new Error("Você precisa estar logado")

      // Criar transação no Firebase
      const transaction = await createTransaction({
        type: "rental",
        userId: user.uid,
        storeId: product.storeId,
        productId: product.id,
        amount: calculateTotal(),
        startDate: new Date(startDate),
        endDate: addDays(new Date(startDate), days),
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
        amount: calculateTotal(),
        description: `Aluguel de ${product.name} por ${days} dias`,
        split: {
          walletId: product.storeId,
          fixedValue: calculateTotal() * 0.85 // 85% para o locador
        }
      })

      toast({
        title: "Aluguel realizado!",
        description: "Você receberá as instruções de pagamento por e-mail.",
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro ao realizar aluguel",
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
          <DialogTitle>Alugar {product.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Data de Início</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={format(new Date(), "yyyy-MM-dd")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="days">Quantidade de Dias</Label>
            <Input
              id="days"
              type="number"
              min="1"
              max="30"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Valor diário:</span>
              <span>R$ {product.pricing.rental.daily.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Dias:</span>
              <span>{days}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>R$ {calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#82358C] hover:bg-[#6a2b73]"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Confirmar Aluguel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
