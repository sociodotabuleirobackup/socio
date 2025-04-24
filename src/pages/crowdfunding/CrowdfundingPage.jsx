import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useCrowdfunding } from "@/contexts/CrowdfundingContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Target, Users, Clock } from "lucide-react"
import CreateCampaignDialog from "./CreateCampaignDialog"  // Corrigido para o caminho relativo correto

export default function CrowdfundingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { campaigns, loading } = useCrowdfunding()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Crowdfunding</h1>
            <p className="text-gray-600">
              Apoie projetos de jogos de tabuleiro
            </p>
          </div>
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="bg-[#82358C] hover:bg-[#6a2b73]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Campanha
          </Button>
        </div>

        {/* Campanhas Ativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover"
                    alt={campaign.title}
                   src="https://images.unsplash.com/photo-1521051426148-4946df2795d4" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#82358C] h-2 rounded-full"
                        style={{
                          width: `${(campaign.currentAmount / campaign.targetAmount) * 100}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        R$ {campaign.currentAmount.toFixed(2)}
                      </span>
                      <span className="font-medium">
                        {((campaign.currentAmount / campaign.targetAmount) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {campaign.backers} apoiadores
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {campaign.daysLeft} dias restantes
                      </div>
                    </div>
                    <Button
                      className="w-full bg-[#82358C] hover:bg-[#6a2b73]"
                      onClick={() => navigate(`/crowdfunding/${campaign.id}`)}
                    >
                      Apoiar Projeto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <CreateCampaignDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
      </div>
    </div>
  )
}
