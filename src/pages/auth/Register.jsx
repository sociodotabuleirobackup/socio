
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api"
import { auth, googleProvider, storage } from "@/lib/firebase"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { GOOGLE_MAPS_API_KEY } from "@/lib/constants"
import InputMask from "react-input-mask"
import { Camera, Loader2 } from "lucide-react"

export default function Register() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState({ renter: false, owner: false })
  const [profileImage, setProfileImage] = useState(null)
  const [profileImageUrl, setProfileImageUrl] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    rg: "",
    email: "",
    phone: "",
    address: "",
    complement: "",
    password: "",
    confirmPassword: "",
  })
  const [location, setLocation] = useState({
    lat: -23.5505,
    lng: -46.6333
  })

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }, [])

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

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, googleProvider)
      // Aqui você pode pegar os dados básicos do usuário do Google
      const { displayName, email, photoURL } = result.user
      setFormData(prev => ({
        ...prev,
        fullName: displayName || prev.fullName,
        email: email || prev.email
      }))
      if (photoURL) {
        setProfileImageUrl(photoURL)
      }
      toast({
        title: "Login com Google realizado!",
        description: "Por favor, complete os dados adicionais do cadastro.",
      })
    } catch (error) {
      toast({
        title: "Erro no login com Google",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validações
      if (formData.password !== formData.confirmPassword) {
        throw new Error("As senhas não coincidem")
      }

      if (!userType.renter && !userType.owner) {
        throw new Error("Selecione pelo menos um tipo de usuário")
      }

      // Criar usuário no Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      // Upload da foto de perfil
      let photoURL = ""
      if (profileImage) {
        const imageRef = ref(storage, `profile/${userCredential.user.uid}`)
        await uploadBytes(imageRef, profileImage)
        photoURL = await getDownloadURL(imageRef)
      }

      // Aqui você deve salvar os dados adicionais no seu backend
      // incluindo o photoURL e os tipos de usuário selecionados

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo ao nosso serviço.",
      })

      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return <div>Carregando mapa...</div>
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
          <h2 className="text-3xl font-bold text-gray-900">Criar Conta</h2>
          <p className="mt-2 text-gray-600">
            Junte-se à nossa comunidade de jogos de tabuleiro
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full mb-6"
            variant="outline"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                alt="Google"
                className="w-6 h-6 mr-2"
              />
            )}
            Continuar com Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                ou cadastre-se com e-mail
              </span>
            </div>
          </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
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
              </div>

              {/* Mapa e Endereço */}
              <div className="space-y-4">
                <Label>Localização</Label>
                <div className="h-[200px] rounded-xl overflow-hidden">
                  <GoogleMap
                    zoom={15}
                    center={location}
                    mapContainerClassName="w-full h-full"
                  >
                    <Marker position={location} />
                  </GoogleMap>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Endereço"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    placeholder="Complemento"
                    name="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Tipo de Usuário */}
              <div className="space-y-4">
                <Label>Tipo de Usuário</Label>
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="renter"
                      checked={userType.renter}
                      onCheckedChange={(checked) =>
                        setUserType(prev => ({ ...prev, renter: checked }))
                      }
                    />
                    <label
                      htmlFor="renter"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Quero Alugar Jogos
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="owner"
                      checked={userType.owner}
                      onCheckedChange={(checked) =>
                        setUserType(prev => ({ ...prev, owner: checked }))
                      }
                    />
                    <label
                      htmlFor="owner"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Quero Disponibilizar Jogos
                    </label>
                  </div>
                </div>
              </div>

              {/* Senha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#82358C] hover:bg-[#6a2b73]"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Criar Conta
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
