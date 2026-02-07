'use client'

import { motion } from 'framer-motion'
import { Dumbbell, Clock, BarChart2, ChevronRight, Users, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/glass'
import type { RutinaEntrenamiento, NivelRutina } from '@/types'

interface RutinaCardProps {
  rutina: RutinaEntrenamiento
  onClick?: () => void
  onAssignClients?: () => void
  index?: number
}

const nivelColors: Record<NivelRutina, string> = {
  principiante: 'emerald',
  intermedio: 'blue',
  avanzado: 'violet',
}

export function RutinaCard({ rutina, onClick, onAssignClients, index = 0 }: RutinaCardProps) {
  const clientesAsignados = rutina.clientes_asignados || []
  const maxVisibleAvatars = 3
  const extraCount = clientesAsignados.length - maxVisibleAvatars

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

      {/* Badges + Clients */}
      <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <GlassBadge variant={nivelColors[rutina.nivel] as 'emerald' | 'blue' | 'violet'} size="sm">
            {rutina.nivel}
          </GlassBadge>
          <GlassBadge variant="default" size="sm">
            {rutina.categoria}
          </GlassBadge>
        </div>

        {/* Assigned Clients */}
        <div className="flex items-center gap-1">
          {clientesAsignados.length > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAssignClients?.()
              }}
              className="flex items-center -space-x-2 hover:opacity-80 transition-opacity"
            >
              {clientesAsignados.slice(0, maxVisibleAvatars).map((cliente) => (
                <div
                  key={cliente.id}
                  className="size-7 rounded-full border-2 border-background bg-cover bg-center"
                  style={{ backgroundImage: `url('${cliente.avatar_url}')` }}
                  title={`${cliente.nombre} ${cliente.apellidos || ''}`}
                />
              ))}
              {extraCount > 0 && (
                <div className="size-7 rounded-full border-2 border-background bg-white/10 flex items-center justify-center text-xs font-medium text-foreground">
                  +{extraCount}
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAssignClients?.()
              }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs text-muted-foreground"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Asignar</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
