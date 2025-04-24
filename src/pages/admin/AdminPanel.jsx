
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UsersManagement from "@/components/admin/UsersManagement"
import StoresManagement from "@/components/admin/StoresManagement"
import TransactionsMonitoring from "@/components/admin/TransactionsMonitoring"
import Analytics from "@/components/admin/Analytics"
import SystemSettings from "@/components/admin/SystemSettings"

export default function AdminPanel() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="stores">Lojas</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>

          <TabsContent value="stores">
            <StoresManagement />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionsMonitoring />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
