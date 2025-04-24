import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import InstagramFeed from "@/components/social/instagram-feed";
import { Search } from "lucide-react";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Encontre jogos de tabuleiro perto de você
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Alugue jogos incríveis e receba em casa. Diversão garantida para toda família.
            </p>

            {/* Search Bar */}
            <div className="search-bar p-2 sm:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <MapPin className="text-[#82358C] w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Onde você está?"
                    className="w-full border-0 focus:ring-0 text-lg"
                  />
                </div>
                <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                <div className="flex items-center gap-2 flex-1">
                  <Calendar className="text-[#82358C] w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Quando?"
                    className="w-full border-0 focus:ring-0 text-lg"
                  />
                </div>
                {/* Substituindo CustomButton por um botão padrão */}
                <button 
                  type="button" 
                  className="bg-[#82358C] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#9c4d91]"
                >
                  <Search className="w-5 h-5" />
                  Buscar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Jogos em Destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                className="game-card bg-white rounded shadow hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <img  
                  alt={`Jogo de tabuleiro ${i}`} 
                  className="w-full h-48 object-cover rounded-t" 
                  src="https://images.unsplash.com/photo-1611891487122-207579d67d98" 
                />
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                  <h3 className="font-semibold mb-1">Nome do Jogo</h3>
                  <p className="text-gray-600 text-sm mb-2">2-4 jogadores • 60 min</p>
                  <p className="text-[#82358C] font-semibold">R$ 25/dia</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              title: "Encontre o Jogo",
              description: "Busque por jogos disponíveis na sua região"
            }, {
              title: "Reserve Online",
              description: "Escolha as datas e faça sua reserva com segurança"
            }, {
              title: "Receba em Casa",
              description: "Entregamos e buscamos o jogo no endereço escolhido"
            }].map((step, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="w-16 h-16 bg-[#82358C] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Button */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Link to="/marketplace">
            <button className="bg-[#82358C] text-white px-6 py-3 rounded-full hover:bg-[#9c4d91]">
              Explore o Marketplace
            </button>
          </Link>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* CTA Section */}
      <section className="py-16 bg-[#82358C]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center text-white max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Tem jogos para alugar?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Cadastre seus jogos e comece a ganhar dinheiro com eles
            </p>
            <Link to="/register?type=owner">
              <button className="bg-white text-[#82358C] hover:bg-gray-100 px-6 py-3 rounded-full">
                Começar a Alugar
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
