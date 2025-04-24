
import React, { createContext, useContext, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { createCrowdfunding } from "@/lib/firebase-schema"
import { useToast } from "@/components/ui/use-toast"

const CrowdfundingContext = createContext({})

export function CrowdfundingProvider({ children }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(false)

  const createCampaign = async (campaignData) => {
    try {
      if (!user) throw new Error("Você precisa estar logado")

      const campaign = await createCrowdfunding({
        ...campaignData,
        creatorId: user.uid,
        status: 'active'
      })

      toast({
        title: "Campanha criada!",
        description: "Sua campanha de financiamento foi iniciada.",
      })

      return campaign
    } catch (error) {
      toast({
        title: "Erro ao criar campanha",
        description: error.message,
        variant: "destructive"
      })
      throw error
    }
  }

  const value = {
    campaigns,
    loading,
    createCampaign
  }

  return (
    <CrowdfundingContext.Provider value={value}>
      {children}
    </CrowdfundingContext.Provider>
  )
}

export function useCrowdfunding() {
  return useContext(CrowdfundingContext)
}
