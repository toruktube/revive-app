'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Clock, BarChart2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/glass'
import type { RutinaEntrenamiento, NivelRutina } from '@/types'

interface RutinaCardProps {
  rutina: RutinaEntrenamiento
  onClick?: () => void
  index?: number
}

const nivelColors: Record<NivelRutina, string> = {
  principiante: 'emerald',
  intermedio: 'blue',
  avanzado: 'violet',
}

export function RutinaCard({ rutina, onClick, index = 0 }: RutinaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={cn(
        'group relative w-full glass-card rounded-2xl p-4',
        'hover:bg-white/5 transition-all duration-300',
        'border border-white/10',
        'cursor-pointer'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          <Dumbbell className="w-6 h-6 text-foreground" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-foreground mb-1 truncate">
            {rutina.nombre}
          </h4>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {rutina.descripcion}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {rutina.duracion}
            </span>
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3 h-3" />
              {rutina.dias.length} días
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
        <GlassBadge variant={nivelColors[rutina.nivel] as 'emerald' | 'blue' | 'violet'} size="sm">
          {rutina.nivel}
        </GlassBadge>
        <GlassBadge variant="default" size="sm">
          {rutina.categoria}
        </GlassBadge>
      </div>
    </motion.div>
  )
}
