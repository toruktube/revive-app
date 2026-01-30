'use client'

import { motion } from 'framer-motion'
import { Check, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MensajeWhatsApp } from '@/types'

interface MensajeBurbujaProps {
  mensaje: MensajeWhatsApp
}

function formatHora(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function EstadoIndicador({ estado }: { estado: MensajeWhatsApp['estado'] }) {
  if (estado === 'enviado') {
    return <Check className="w-3.5 h-3.5 text-muted-foreground/70" />
  }
  if (estado === 'entregado') {
    return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground/70" />
  }
  // leido
  return <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
}

export function MensajeBurbuja({ mensaje }: MensajeBurbujaProps) {
  const esEnviado = mensaje.direccion === 'enviado'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'flex w-full',
        esEnviado ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[75%] px-3 py-2 rounded-2xl shadow-sm',
          esEnviado
            ? 'bg-emerald-100 dark:bg-emerald-900/30 rounded-br-sm'
            : 'bg-white dark:bg-muted/60 rounded-bl-sm',
          esEnviado
            ? 'border border-emerald-200/50 dark:border-emerald-800/30'
            : 'border border-border/50'
        )}
      >
        <p className={cn(
          'text-sm leading-relaxed break-words',
          esEnviado
            ? 'text-emerald-950 dark:text-emerald-50'
            : 'text-foreground'
        )}>
          {mensaje.contenido}
        </p>

        <div className={cn(
          'flex items-center gap-1 mt-1',
          esEnviado ? 'justify-end' : 'justify-start'
        )}>
          <span className="text-[10px] text-muted-foreground/70">
            {formatHora(mensaje.hora)}
          </span>
          {esEnviado && <EstadoIndicador estado={mensaje.estado} />}
        </div>
      </div>
    </motion.div>
  )
}
