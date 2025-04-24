
import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function WalletCard({ balance, onAddFunds, onWithdraw }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sua Carteira</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          R$ {balance.toFixed(2)}
        </div>
        <div className="mt-4 space-x-2">
          <Button
            size="sm"
            onClick={onAddFunds}
            className="bg-[#82358C] hover:bg-[#6a2b73]"
          >
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onWithdraw}
            className="border-[#82358C] text-[#82358C] hover:bg-[#82358C] hover:text-white"
          >
            <ArrowDownRight className="mr-2 h-4 w-4" />
            Sacar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
