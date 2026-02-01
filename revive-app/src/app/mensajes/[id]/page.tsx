'use client'

import { use, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, FileText, Check, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/glass'
import { mockConversaciones, mockPlantillas } from '@/lib/mock-data'

interface ChatPageProps {
  params: Promise<{ id: string }>
}

function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const conversacion = mockConversaciones.find(c => c.id === id)
  const [message, setMessage] = useState('')
  const [showPlantillas, setShowPlantillas] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversacion?.mensajes])

  if (!conversacion) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4">
        <p className="text-muted-foreground">Conversación no encontrada</p>
        <GlassButton onClick={() => router.back()} className="mt-4">
          Volver
        </GlassButton>
      </div>
    )
  }

  const handleSend = () => {
    if (!message.trim()) return
    console.log('Send message:', message)
    setMessage('')
  }

  const handleSelectPlantilla = (contenido: string) => {
    const filledMessage = contenido.replace('{nombre}', conversacion.cliente_nombre)
    setMessage(filledMessage)
    setShowPlantillas(false)
  }

  const getMessageStatus = (estado: string) => {
    switch (estado) {
      case 'enviado':
        return <Check className="w-3 h-3 text-muted-foreground" />
      case 'entregado':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />
      case 'leido':
        return <CheckCheck className="w-3 h-3 text-[var(--accent-blue)]" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pb-4 border-b border-white/10">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div
          className="size-10 rounded-full border-2 border-white/20 bg-cover bg-center"
          style={{ backgroundImage: `url('${conversacion.cliente_avatar}')` }}
        />

        <div className="flex-1">
          <h2 className="text-base font-semibold text-foreground">
            {conversacion.cliente_nombre} {conversacion.cliente_apellidos}
          </h2>
          <p className="text-xs text-muted-foreground">En línea</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar">
        {conversacion.mensajes.map((mensaje, index) => (
          <motion.div
            key={mensaje.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className={cn(
              'flex',
              mensaje.direccion === 'enviado' ? 'justify-end' : 'justify-start'
            )}
          >
            <div className={cn(
              'max-w-[80%] rounded-2xl px-4 py-2.5',
              mensaje.direccion === 'enviado'
                ? 'bg-white text-black rounded-br-md'
                : 'bg-white/10 text-foreground rounded-bl-md'
            )}>
              <p className="text-sm">{mensaje.contenido}</p>
              <div className={cn(
                'flex items-center justify-end gap-1 mt-1',
                mensaje.direccion === 'enviado' ? 'text-black/50' : 'text-muted-foreground'
              )}>
                <span className="text-[10px]">{formatTime(mensaje.hora)}</span>
                {mensaje.direccion === 'enviado' && getMessageStatus(mensaje.estado)}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Plantillas */}
      {showPlantillas && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 border-t border-white/10 max-h-48 overflow-y-auto no-scrollbar"
        >
          <p className="text-xs font-semibold text-muted-foreground mb-2">Plantillas</p>
          <div className="space-y-2">
            {mockPlantillas.map((plantilla) => (
              <button
                key={plantilla.id}
                onClick={() => handleSelectPlantilla(plantilla.contenido)}
                className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{plantilla.nombre}</p>
                <p className="text-xs text-muted-foreground truncate">{plantilla.contenido}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/10 pb-28">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPlantillas(!showPlantillas)}
            className={cn(
              'size-10 rounded-full flex items-center justify-center transition-colors',
              showPlantillas
                ? 'bg-white text-black'
                : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
            )}
          >
            <FileText className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className={cn(
              'flex-1 px-4 py-2.5 rounded-full',
              'bg-white/5 border border-white/10',
              'text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:border-white/30',
              'transition-colors'
            )}
          />

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={cn(
              'size-10 rounded-full flex items-center justify-center transition-all',
              message.trim()
                ? 'bg-white text-black'
                : 'bg-white/5 text-muted-foreground'
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
