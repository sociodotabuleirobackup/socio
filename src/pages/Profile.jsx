
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { auth, storage } from "@/lib/firebase"
import { updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Camera, Loader2 } from "lucide-react"
import InputMask from "react-input-mask"

export default function Profile() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profileImageUrl, setProfileImageUrl] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    rg: "",
    phone: "",
    address: "",
    complement: "",
  })

  useEffect(() => {
    const user = auth.currentUser
    if (!user) {
      navigate("/login")
      return
    }

    // Carregar dados do usuário
    setFormData(prev => ({
      ...prev,
      fullName: user.displayName || "",
    }))
    setProfileImageUrl(user.photoURL || "")

    // Aqui você deve carregar os dados adicionais do seu backend
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImageUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const user = auth.currentUser
      if (!user) throw new Error("Usuário não autenticado")

      // Upload da nova foto de perfil
      let photoURL = user.photoURL
      if (profileImage) {
        const imageRef = ref(storage, `profile/${user.uid}`)
        await uploadBytes(imageRef, profileImage)
        photoURL = await getDownloadURL(imageRef)
      }

      // Atualizar perfil no Firebase
      await updateProfile(user, {
        displayName: formData.fullName,
        photoURL
      })

      // Aqui você deve atualizar os dados adicionais no seu backend

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Seu Perfil</h2>
          <p className="mt-2 text-gray-600">
            Mantenha seus dados sempre atualizados
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Foto de Perfil */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-[#82358C] rounded-full p-2 cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* Dados Pessoais */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <InputMask
                    mask="999.999.999-99"
                    value={formData.cpf}
                    onChange={handleInputChange}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        id="cpf"
                        name="cpf"
                        required
                      />
                    )}
                  </InputMask>
                </div>

                <div>
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    name="rg"
                    value={formData.rg}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Celular</Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={formData.phone}
                  onChange={handleInputChange}
                >
                  {(inputProps) => (
                    <Input
                      {...inputProps}
                      id="phone"
                      name="phone"
                      required
                    />
                  )}
                </InputMask>
              </div>

              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  name="complement"
                  value={formData.complement}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-[#82358C] hover:bg-[#6a2b73]"
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Salvar Alterações
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/dashboard")}
              >
                Voltar
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
