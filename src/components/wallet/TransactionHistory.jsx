
import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function TransactionHistory({ transactions }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Transações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center">
                {transaction.type === "credit" ? (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(transaction.date), "dd 'de' MMMM 'às' HH:mm", {
                      locale: ptBR
                    })}
                  </p>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === "credit" 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {transaction.type === "credit" ? "+" : "-"}
                R$ {transaction.amount.toFixed(2)}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
