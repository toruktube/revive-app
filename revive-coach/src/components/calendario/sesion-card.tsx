'use client'

import { motion } from 'framer-motion'
import { Check, X, Video, MapPin, ClipboardCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/glass'
import type { SesionCalendario, TipoSesion, EstadoSesion } from '@/types'

interface SesionCardProps {
  sesion: SesionCalendario
  onClick?: (sesion: SesionCalendario) => void
}

const coloresTipo: Record<TipoSesion, { bg: string; text: string; border: string }> = {
  presencial: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
  },
  online: {
    bg: 'bg-blue-500/15',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30',
  },
  evaluacion: {
    bg: 'bg-purple-500/15',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/30',
  },
}

const iconosTipo: Record<TipoSesion, React.ReactNode> = {
  presencial: <MapPin className="size-3" />,
  online: <Video className="size-3" />,
  evaluacion: <ClipboardCheck className="size-3" />,
}

const etiquetasTipo: Record<TipoSesion, string> = {
  presencial: 'Presencial',
  online: 'Online',
  evaluacion: 'Evaluacion',
}

function IconoEstado({ estado }: { estado: EstadoSesion }) {
  if (estado === 'completada') {
    return (
      <span className="flex items-center justify-center size-4 rounded-full bg-emerald-500/20">
        <Check className="size-2.5 text-emerald-600 dark:text-emerald-400" />
      </span>
    )
  }
  if (estado === 'cancelada' || estado === 'no_asistio') {
    return (
      <span className="flex items-center justify-center size-4 rounded-full bg-red-500/20">
        <X className="size-2.5 text-red-600 dark:text-red-400" />
      </span>
    )
  }
  return null
}

export function SesionCard({ sesion, onClick }: SesionCardProps) {
  const colores = coloresTipo[sesion.tipo]
  const esCancelada = sesion.estado === 'cancelada' || sesion.estado === 'no_asistio'

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(sesion)}
      className={cn(
        'w-full text-left rounded-xl p-2.5 border transition-colors duration-200',
        'backdrop-blur-sm cursor-pointer',
        colores.bg,
        colores.border,
        esCancelada && 'opacity-60'
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          {/* Hora */}
          <p className={cn(
            'text-xs font-medium',
            colores.text,
            esCancelada && 'line-through'
          )}>
            {sesion.hora_inicio}
          </p>

          {/* Nombre del cliente */}
          <p className={cn(
            'text-sm font-semibold text-foreground truncate mt-0.5',
            esCancelada && 'line-through text-muted-foreground'
          )}>
            {sesion.cliente_nombre}
          </p>
        </div>

        <IconoEstado estado={sesion.estado} />
      </div>

      {/* Badge de tipo */}
      <div className="mt-1.5">
        {esCancelada ? (
          <GlassBadge variant="danger" size="sm">
            {sesion.estado === 'cancelada' ? 'Cancelada' : 'No asistio'}
          </GlassBadge>
        ) : (
          <span className={cn(
            'inline-flex items-center gap-1 text-xs font-medium',
            colores.text
          )}>
            {iconosTipo[sesion.tipo]}
            {etiquetasTipo[sesion.tipo]}
          </span>
        )}
      </div>
    </motion.button>
  )
}
