
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Send } from "lucide-react"

export default function SupportDialog({ open, onOpenChange }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const whatsappNumber = "5519995409950"
    const whatsappMessage = `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    
    window.open(whatsappUrl, "_blank")
    
    toast({
      title: "Mensagem enviada!",
      description: "Em breve entraremos em contato.",
    })
    
    onOpenChange(false)
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Como podemos ajudar?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Como podemos ajudar?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#82358C] hover:bg-[#6a2b73] rounded-xl"
          >
            Enviar Mensagem
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
