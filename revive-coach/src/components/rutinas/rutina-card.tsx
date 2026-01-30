'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Calendar, Layers, ChevronRight } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassBadge } from '@/components/glass/glass-badge'
import { cn } from '@/lib/utils'
import type { RutinaEntrenamiento } from '@/types'

interface RutinaCardProps {
  rutina: RutinaEntrenamiento
  onClick?: () => void
  index?: number
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function RutinaCard({ rutina, onClick, index = 0 }: RutinaCardProps) {
  const totalEjercicios = rutina.dias.reduce(
    (sum, dia) => sum + dia.ejercicios.length, 0
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlassCard
        className={cn(
          'transition-all',
          onClick && 'cursor-pointer hover:ring-2 hover:ring-primary/20'
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{rutina.nombre}</h3>
              <GlassBadge
                variant={rutina.activa ? 'success' : 'default'}
                size="sm"
              >
                {rutina.activa ? 'Activa' : 'Inactiva'}
              </GlassBadge>
            </div>
            {rutina.descripcion && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {rutina.descripcion}
              </p>
            )}
          </div>
          {onClick && (
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            {rutina.dias.length} {rutina.dias.length === 1 ? 'dia' : 'dias'}
          </span>
          <span className="flex items-center gap-1.5">
            <Dumbbell className="w-4 h-4" />
            {totalEjercicios} {totalEjercicios === 1 ? 'ejercicio' : 'ejercicios'}
          </span>
          <span className="flex items-center gap-1.5 ml-auto">
            <Calendar className="w-4 h-4" />
            {formatDate(rutina.fecha_inicio)}
            {rutina.fecha_fin && ` - ${formatDate(rutina.fecha_fin)}`}
          </span>
        </div>
      </GlassCard>
    </motion.div>
  )
}
