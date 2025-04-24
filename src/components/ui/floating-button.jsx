
import React from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingButton({ onClick }) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={onClick}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    </motion.div>
  )
}
