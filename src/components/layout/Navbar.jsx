
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useToast } from "@/components/ui/use-toast"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings } from "lucide-react"

export default function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      })
      navigate("/")
    } catch (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b bg-white"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[#82358C]">
            Sócio do Tabuleiro
          </span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Jogos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        to="/games"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Explorar Jogos
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Descubra jogos disponíveis para alugar na sua região
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/how-it-works">
                <Button variant="ghost">Como Funciona</Button>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/contact">
                <Button variant="ghost">Contato</Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.photoURL} />
                  <AvatarFallback>
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#82358C] hover:bg-[#6a2b73]">
                  Cadastrar
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}
