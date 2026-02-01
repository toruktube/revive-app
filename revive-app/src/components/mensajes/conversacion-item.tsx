'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Conversacion } from '@/types'

interface ConversacionItemProps {
  conversacion: Conversacion
  onClick?: () => void
  index?: number
}

function formatTime(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  if (diffHours < 1) {
    const mins = Math.floor(diffMs / (1000 * 60))
    return `hace ${mins}min`
  } else if (diffHours < 24) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays < 7) {
    return date.toLocaleDateString('es-ES', { weekday: 'short' })
  } else {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }
}

export function ConversacionItem({ conversacion, onClick, index = 0 }: ConversacionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        'group relative w-full glass-card rounded-2xl p-4',
        'hover:bg-white/5 transition-all duration-300',
        'border border-white/10',
        'cursor-pointer'
      )}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="size-12 rounded-full border-2 border-white/20 bg-cover bg-center"
            style={{ backgroundImage: `url('${conversacion.cliente_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}')` }}
          />
          {conversacion.no_leidos > 0 && (
            <div className="absolute -top-1 -right-1 size-5 rounded-full bg-[var(--accent-blue)] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{conversacion.no_leidos}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={cn(
              'text-sm truncate',
              conversacion.no_leidos > 0 ? 'font-bold text-foreground' : 'font-medium text-foreground'
            )}>
              {conversacion.cliente_nombre} {conversacion.cliente_apellidos}
            </h4>
            <span className="text-xs text-muted-foreground shrink-0 ml-2">
              {formatTime(conversacion.ultimo_mensaje_hora)}
            </span>
          </div>
          <p className={cn(
            'text-sm truncate',
            conversacion.no_leidos > 0 ? 'text-foreground' : 'text-muted-foreground'
          )}>
            {conversacion.ultimo_mensaje}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
