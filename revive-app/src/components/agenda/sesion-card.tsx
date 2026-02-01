'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal, Video } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/glass'
import type { SesionCalendario } from '@/types'

interface SesionCardProps {
  sesion: SesionCalendario
  onClick?: () => void
  index?: number
}

export function SesionCard({ sesion, onClick, index = 0 }: SesionCardProps) {
  const getTipoBadge = () => {
    switch (sesion.tipo) {
      case 'evaluacion':
        return <GlassBadge variant="violet">Evaluación</GlassBadge>
      case 'presencial':
        return <GlassBadge variant="emerald">Presencial</GlassBadge>
      case 'online':
        return <GlassBadge variant="blue">Online</GlassBadge>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={cn(
        'group relative w-full glass-card rounded-2xl p-5',
        'hover:bg-white/5 transition-all duration-300',
        'border border-white/10 dark:border-white/10',
        'cursor-pointer'
      )}
    >
      <div className="flex justify-between items-start relative z-10 mb-5">
        <div className="flex gap-4 items-center">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="size-14 rounded-full border-2 border-white/20 bg-cover bg-center"
              style={{ backgroundImage: `url('${sesion.cliente_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}')` }}
            />
            {sesion.tipo === 'online' && (
              <div className="absolute bottom-0 right-0 bg-background size-4 rounded-full flex items-center justify-center ring-2 ring-background">
                <div className="bg-white size-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              </div>
            )}
          </div>

          {/* Time and Name */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-foreground font-bold text-xl tracking-tight">
                {sesion.hora_inicio} - {sesion.hora_fin}
              </span>
            </div>
            <h4 className={cn(
              'font-medium text-sm tracking-wide',
              sesion.estado === 'cancelada' ? 'text-muted-foreground line-through' : 'text-foreground'
            )}>
              {sesion.cliente_nombre} {sesion.cliente_apellidos}
            </h4>
          </div>
        </div>

        {/* More button */}
        <button
          onClick={(e) => { e.stopPropagation() }}
          className="size-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 relative z-10 pt-4 border-t border-white/10">
        {getTipoBadge()}
        {sesion.ubicacion && (
          <GlassBadge variant="default">{sesion.ubicacion}</GlassBadge>
        )}
        {sesion.tipo === 'online' && (
          <GlassBadge variant="default" className="flex items-center gap-1">
            <Video className="w-3 h-3" /> Zoom
          </GlassBadge>
        )}
        {sesion.estado === 'cancelada' && (
          <GlassBadge variant="danger">Cancelada</GlassBadge>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  )
}
