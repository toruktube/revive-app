'use client'

import { motion } from 'framer-motion'
import { BookTemplate, Dumbbell, Layers, ArrowRight } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassBadge } from '@/components/glass/glass-badge'
import { GlassButton } from '@/components/glass/glass-button'
import type { RutinaEntrenamiento } from '@/types'

interface PlantillaRutinaListProps {
  plantillas: RutinaEntrenamiento[]
  onSelect: (plantilla: RutinaEntrenamiento) => void
}

export function PlantillaRutinaList({ plantillas, onSelect }: PlantillaRutinaListProps) {
  if (plantillas.length === 0) {
    return (
      <GlassCard>
        <div className="text-center py-8">
          <BookTemplate className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No hay plantillas disponibles</p>
        </div>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-3">
      {plantillas.map((plantilla, index) => {
        const totalEjercicios = plantilla.dias.reduce(
          (sum, dia) => sum + dia.ejercicios.length, 0
        )

        return (
          <motion.div
            key={plantilla.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="hover:ring-1 hover:ring-primary/10 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">
                      {plantilla.nombre}
                    </h4>
                    <GlassBadge variant="default" size="sm">Plantilla</GlassBadge>
                  </div>
                  {plantilla.descripcion && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {plantilla.descripcion}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {plantilla.dias.length} {plantilla.dias.length === 1 ? 'dia' : 'dias'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-3.5 h-3.5" />
                      {totalEjercicios} {totalEjercicios === 1 ? 'ejercicio' : 'ejercicios'}
                    </span>
                  </div>
                </div>
                <GlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => onSelect(plantilla)}
                  className="flex-shrink-0"
                >
                  <span className="hidden sm:inline">Usar plantilla</span>
                  <ArrowRight className="w-4 h-4 sm:ml-1" />
                </GlassButton>
              </div>
            </GlassCard>
          </motion.div>
        )
      })}
    </div>
  )
}
