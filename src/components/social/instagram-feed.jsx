
import React from "react"
import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Siga-nos no Instagram</h2>
            <p className="text-gray-600 mb-6">
              Fique por dentro das novidades e dicas de jogos
            </p>
            <a 
              href="https://instagram.com/sociodotabuleirooficial" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                className="gap-2 text-[#82358C] border-[#82358C] hover:bg-[#82358C] hover:text-white"
              >
                <Instagram className="w-5 h-5" />
                @sociodotabuleirooficial
              </Button>
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            className="aspect-square rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <img  alt="Post do Instagram mostrando pessoas jogando" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1506700034758-7b59fb23a880" />
          </motion.div>

          <motion.div
            className="aspect-square rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img  alt="Post do Instagram mostrando um jogo novo" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1611891487122-207579d67d98" />
          </motion.div>

          <motion.div
            className="aspect-square rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <img  alt="Post do Instagram mostrando uma partida" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1585084293063-45ae031e7df4" />
          </motion.div>

          <motion.div
            className="aspect-square rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <img  alt="Post do Instagram mostrando dicas de jogos" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1549500379-1938ee1fc6a8" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
