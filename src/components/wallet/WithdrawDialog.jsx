
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { addWalletTransaction } from "@/lib/wallet"

export default function WithdrawDialog({ open, onOpenChange, userId, balance, onSuccess }) {
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

      if (numAmount > balance) {
        throw new Error("Saldo insuficiente")
      }

      // Processar saque
      await addWalletTransaction(userId, {
        type: "debit",
        amount: numAmount,
        description: "Saque para conta bancária",
      })

      toast({
        title: "Saque solicitado!",
        description: "O valor será transferido em até 1 dia útil.",
      })

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erro ao realizar saque",
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
          <DialogTitle>Realizar Saque</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              max={balance}
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Saldo disponível: R$ {balance.toFixed(2)}
            </p>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#82358C] hover:bg-[#6a2b73]"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Solicitar Saque
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
