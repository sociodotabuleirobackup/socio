
import React from "react"
import { Link } from "react-router-dom"
import { Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-[#82358C]">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-[#82358C]">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#82358C]">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-[#82358C]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-[#82358C]">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/5519995409950"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#82358C]"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-[#82358C]">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-[#82358C]">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/sociodotabuleirooficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#82358C]"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>© {new Date().getFullYear()} Sócio do Tabuleiro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
