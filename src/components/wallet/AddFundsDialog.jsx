
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { addWalletTransaction } from "@/lib/wallet"
import { createPayment } from "@/lib/asaas"

export default function AddFundsDialog({ open, onOpenChange, userId, onSuccess }) {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const numAmount = parseFloat(amount)
      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error("Valor inválido")
      }

      // Criar pagamento no Asaas
      const payment = await createPayment({
        customer: userId,
        amount: numAmount,
        description: "Adição de fundos na carteira",
      })

      // Adicionar transação na carteira
      await addWalletTransaction(userId, {
        type: "credit",
        amount: numAmount,
        description: "Depósito via PIX",
        reference: payment.id
      })

      toast({
        title: "Depósito realizado!",
        description: "Os fundos serão adicionados após a confirmação do pagamento.",
      })

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro ao adicionar fundos",
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
          <DialogTitle>Adicionar Fundos</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#82358C] hover:bg-[#6a2b73]"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Depositar via PIX
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
