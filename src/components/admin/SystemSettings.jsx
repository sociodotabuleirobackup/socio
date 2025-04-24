
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save, Upload, Trash2 } from "lucide-react"
import { db } from "@/lib/firebase"
import { uploadFile, deleteFile, listFiles } from "@/lib/storage"
import { doc, updateDoc, getDoc } from "firebase/firestore"

export default function SystemSettings() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [settings, setSettings] = useState({
    maintenance: false,
    registrationEnabled: true,
    maxFileSize: 5,
    defaultCommission: 15,
    emailNotifications: true,
    pushNotifications: true,
    autoApproveStores: false,
    requirePhoneVerification: true,
    logoUrl: "",
    supportEmail: "suporte@sociodotabuleiro.app.br",
    supportPhone: "(19) 99540-9950",
    // New settings
    allowGuestCheckout: false,
    enableCrowdfunding: true,
    minimumRentalDays: 1,
    maximumRentalDays: 30,
    defaultRentalDeposit: 100,
    enableInstantBooking: true,
    requireIdVerification: true,
    enableReviews: true,
    moderateReviews: true,
    maxImagesPerProduct: 10,
    maxVideosPerProduct: 2,
    enableChat: true,
    chatRetentionDays: 30,
    enableDisputes: true,
    disputeResolutionDays: 7,
    paymentMethods: {
      pix: true,
      creditCard: true,
      bankTransfer: false
    },
    deliveryOptions: {
      pickup: true,
      delivery: true,
      shipping: false
    },
    seoSettings: {
      defaultTitle: "Sócio do Tabuleiro - Aluguel de Jogos",
      defaultDescription: "Alugue jogos de tabuleiro perto de você",
      defaultKeywords: "jogos, tabuleiro, aluguel, board games"
    }
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const settingsRef = doc(db, "system", "settings")
      const settingsDoc = await getDoc(settingsRef)
      
      if (settingsDoc.exists()) {
        setSettings(prev => ({
          ...prev,
          ...settingsDoc.data()
        }))
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar configurações",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setSaving(true)
      const result = await uploadFile(
        file,
        'system/logo',
        (progress) => setUploadProgress(progress)
      )
      
      setSettings(prev => ({ ...prev, logoUrl: result.url }))
      
      toast({
        title: "Logo atualizada",
        description: "A nova logo foi salva com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao fazer upload",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setSaving(false)
      setUploadProgress(0)
    }
  }

  const handleLogoDelete = async () => {
    if (!settings.logoUrl) return

    try {
      setSaving(true)
      await deleteFile('system/logo')
      
      setSettings(prev => ({ ...prev, logoUrl: "" }))
      
      toast({
        title: "Logo removida",
        description: "A logo foi removida com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao remover logo",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const settingsRef = doc(db, "system", "settings")
      await updateDoc(settingsRef, settings)
      
      toast({
        title: "Configurações salvas",
        description: "As alterações foram aplicadas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Logo do Sistema</Label>
            <div className="flex items-center gap-4">
              {settings.logoUrl && (
                <div className="relative">
                  <img 
                    src={settings.logoUrl} 
                    alt="Logo" 
                    className="w-12 h-12 object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={handleLogoDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Button variant="outline" className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleLogoUpload}
                />
                <Upload className="w-4 h-4 mr-2" />
                Alterar Logo
              </Button>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="text-sm text-gray-500">
                  Upload: {uploadProgress.toFixed(0)}%
                </div>
              )}
            </div>
          </div>

          {/* Previous settings remain the same */}
          {/* ... */}

          {/* New Settings Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configurações de Aluguel</h3>
            
            <div>
              <Label>Mínimo de Dias para Aluguel</Label>
              <Input
                type="number"
                min="1"
                value={settings.minimumRentalDays}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    minimumRentalDays: parseInt(e.target.value)
                  }))
                }
              />
            </div>

            <div>
              <Label>Máximo de Dias para Aluguel</Label>
              <Input
                type="number"
                min="1"
                value={settings.maximumRentalDays}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    maximumRentalDays: parseInt(e.target.value)
                  }))
                }
              />
            </div>

            <div>
              <Label>Caução Padrão (R$)</Label>
              <Input
                type="number"
                min="0"
                value={settings.defaultRentalDeposit}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    defaultRentalDeposit: parseInt(e.target.value)
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Reserva Instantânea</Label>
                <p className="text-sm text-gray-500">
                  Permitir reservas sem aprovação do locador
                </p>
              </div>
              <Switch
                checked={settings.enableInstantBooking}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, enableInstantBooking: checked }))
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configurações de Verificação</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Verificação de Identidade</Label>
                <p className="text-sm text-gray-500">
                  Exigir documento de identidade
                </p>
              </div>
              <Switch
                checked={settings.requireIdVerification}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, requireIdVerification: checked }))
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configurações de Mídia</h3>
            
            <div>
              <Label>Máximo de Imagens por Produto</Label>
              <Input
                type="number"
                min="1"
                value={settings.maxImagesPerProduct}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    maxImagesPerProduct: parseInt(e.target.value)
                  }))
                }
              />
            </div>

            <div>
              <Label>Máximo de Vídeos por Produto</Label>
              <Input
                type="number"
                min="0"
                value={settings.maxVideosPerProduct}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    maxVideosPerProduct: parseInt(e.target.value)
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configurações de Pagamento</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>PIX</Label>
                <p className="text-sm text-gray-500">
                  Aceitar pagamentos via PIX
                </p>
              </div>
              <Switch
                checked={settings.paymentMethods.pix}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({
                    ...prev,
                    paymentMethods: {
                      ...prev.paymentMethods,
                      pix: checked
                    }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Cartão de Crédito</Label>
                <p className="text-sm text-gray-500">
                  Aceitar pagamentos com cartão
                </p>
              </div>
              <Switch
                checked={settings.paymentMethods.creditCard}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({
                    ...prev,
                    paymentMethods: {
                      ...prev.paymentMethods,
                      creditCard: checked
                    }
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configurações SEO</h3>
            
            <div>
              <Label>Título Padrão</Label>
              <Input
                value={settings.seoSettings.defaultTitle}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    seoSettings: {
                      ...prev.seoSettings,
                      defaultTitle: e.target.value
                    }
                  }))
                }
              />
            </div>

            <div>
              <Label>Descrição Padrão</Label>
              <Input
                value={settings.seoSettings.defaultDescription}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    seoSettings: {
                      ...prev.seoSettings,
                      defaultDescription: e.target.value
                    }
                  }))
                }
              />
            </div>

            <div>
              <Label>Palavras-chave</Label>
              <Input
                value={settings.seoSettings.defaultKeywords}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    seoSettings: {
                      ...prev.seoSettings,
                      defaultKeywords: e.target.value
                    }
                  }))
                }
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-[#82358C] hover:bg-[#6a2b73]"
            disabled={saving}
          >
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
