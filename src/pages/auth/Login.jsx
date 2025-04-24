
import React, { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithPopup(auth, googleProvider)
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
      })
      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Erro no login",
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
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
      })
      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Erro no login",
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
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Entrar</h2>
          <p className="mt-2 text-gray-600">
            Bem-vindo de volta!
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
                ou entre com e-mail
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  to="/reset-password"
                  className="text-sm text-[#82358C] hover:text-[#6a2b73]"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#82358C] hover:bg-[#6a2b73]"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="font-medium text-[#82358C] hover:text-[#6a2b73]"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
