'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Send,
  FileText,
  Phone,
  MessageSquareText,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/glass/glass-button'
import { Input } from '@/components/ui/input'
import { MensajeBurbuja } from './mensaje-burbuja'
import { PlantillaSelector } from './plantilla-selector'
import type { ConversacionWhatsApp, PlantillaMensaje } from '@/types'

interface ConversacionChatProps {
  conversacion: ConversacionWhatsApp | null
  onSendMessage: (conversacionId: string, contenido: string) => void
  onBack: () => void
  plantillas: PlantillaMensaje[]
  onSelectPlantilla: (contenido: string) => void
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center p-8"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <MessageSquareText className="w-10 h-10 text-primary/60" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Selecciona una conversacion
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Elige una conversacion de la lista para ver los mensajes y responder a tus clientes
      </p>
    </motion.div>
  )
}

export function ConversacionChat({
  conversacion,
  onSendMessage,
  onBack,
  plantillas,
  onSelectPlantilla,
}: ConversacionChatProps) {
  const [inputValue, setInputValue] = useState('')
  const [plantillaOpen, setPlantillaOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [conversacion?.mensajes])

  // Focus input when conversation changes
  useEffect(() => {
    if (conversacion && inputRef.current) {
      inputRef.current.focus()
    }
  }, [conversacion?.id])

  const handleSend = () => {
    if (!inputValue.trim() || !conversacion) return
    onSendMessage(conversacion.id, inputValue.trim())
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handlePlantillaSelect = (contenido: string) => {
    onSelectPlantilla(contenido)
    setInputValue(contenido)
    setPlantillaOpen(false)
    inputRef.current?.focus()
  }

  if (!conversacion) {
    return <EmptyState />
  }

  const displayName = conversacion.cliente_apellidos
    ? `${conversacion.cliente_nombre} ${conversacion.cliente_apellidos}`
    : conversacion.cliente_nombre

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'flex items-center gap-3 px-4 py-3',
          'border-b border-border/50',
          'bg-[var(--glass-bg)]/50 backdrop-blur-sm'
        )}
      >
        {/* Back button (mobile) */}
        <GlassButton
          variant="subtle"
          size="sm"
          onClick={onBack}
          className="lg:hidden"
        >
          <ArrowLeft className="w-4 h-4" />
        </GlassButton>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/15 text-primary font-semibold text-sm flex items-center justify-center flex-shrink-0">
          {conversacion.cliente_nombre.charAt(0).toUpperCase()}
          {conversacion.cliente_apellidos?.charAt(0).toUpperCase() || ''}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {displayName}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Phone className="w-3 h-3" />
            <span>{conversacion.cliente_telefono}</span>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div
        className={cn(
          'flex-1 overflow-y-auto p-4 space-y-3',
          'bg-muted/20'
        )}
        style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, hsl(var(--muted)/0.15) 2px, transparent 0)',
          backgroundSize: '50px 50px',
        }}
      >
        <AnimatePresence mode="popLayout">
          {conversacion.mensajes.map((mensaje) => (
            <MensajeBurbuja key={mensaje.id} mensaje={mensaje} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'flex items-center gap-2 p-3',
          'border-t border-border/50',
          'bg-[var(--glass-bg)]/50 backdrop-blur-sm'
        )}
      >
        {/* Template Button */}
        <GlassButton
          variant="subtle"
          size="sm"
          onClick={() => setPlantillaOpen(true)}
          className="flex-shrink-0"
        >
          <FileText className="w-4 h-4" />
        </GlassButton>

        {/* Text Input */}
        <Input
          ref={inputRef}
          type="text"
          placeholder="Escribe un mensaje..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-muted/50 border-transparent focus:border-primary h-9 text-sm"
        />

        {/* Send Button */}
        <GlassButton
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className="flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </GlassButton>
      </motion.div>

      {/* Plantilla Selector Modal */}
      <PlantillaSelector
        open={plantillaOpen}
        onClose={() => setPlantillaOpen(false)}
        plantillas={plantillas}
        onSelect={handlePlantillaSelect}
      />
    </div>
  )
}
