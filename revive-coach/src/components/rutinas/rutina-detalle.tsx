'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Dumbbell, Timer, Weight, StickyNote } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassBadge } from '@/components/glass/glass-badge'
import { cn } from '@/lib/utils'
import type { RutinaEntrenamiento, DiaRutina, EjercicioRutina } from '@/types'

interface RutinaDetalleProps {
  rutina: RutinaEntrenamiento
}

function EjercicioRow({ ejercicio }: { ejercicio: EjercicioRutina }) {
  return (
    <>
      {/* Desktop table row */}
      <tr className="hidden lg:table-row border-b border-border/50 last:border-0">
        <td className="py-3 pr-4">
          <span className="font-medium text-foreground">{ejercicio.nombre}</span>
        </td>
        <td className="py-3 pr-4 text-center text-sm text-muted-foreground">
          {ejercicio.series}
        </td>
        <td className="py-3 pr-4 text-center text-sm text-muted-foreground">
          {ejercicio.repeticiones}
        </td>
        <td className="py-3 pr-4 text-center text-sm text-muted-foreground">
          {ejercicio.peso || '-'}
        </td>
        <td className="py-3 pr-4 text-center text-sm text-muted-foreground">
          {ejercicio.descanso || '-'}
        </td>
        <td className="py-3 text-sm text-muted-foreground">
          {ejercicio.notas || '-'}
        </td>
      </tr>

      {/* Mobile card */}
      <div className="lg:hidden p-3 rounded-xl bg-muted/30 space-y-2">
        <p className="font-medium text-foreground">{ejercicio.nombre}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>{ejercicio.series} x {ejercicio.repeticiones}</span>
          </div>
          {ejercicio.peso && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Weight className="w-3.5 h-3.5" />
              <span>{ejercicio.peso}</span>
            </div>
          )}
          {ejercicio.descanso && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Timer className="w-3.5 h-3.5" />
              <span>{ejercicio.descanso}</span>
            </div>
          )}
          {ejercicio.notas && (
            <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
              <StickyNote className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{ejercicio.notas}</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function DiaSection({ dia, defaultOpen = false }: { dia: DiaRutina; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
          'hover:bg-muted/30',
          isOpen && 'bg-muted/20'
        )}
      >
        <div className="flex items-center gap-2">
          <Dumbbell className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">{dia.nombre}</span>
          <GlassBadge variant="default" size="sm">
            {dia.ejercicios.length} {dia.ejercicios.length === 1 ? 'ejercicio' : 'ejercicios'}
          </GlassBadge>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {/* Desktop table */}
              <table className="hidden lg:table w-full">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="py-2 pr-4 text-left font-medium">Ejercicio</th>
                    <th className="py-2 pr-4 text-center font-medium">Series</th>
                    <th className="py-2 pr-4 text-center font-medium">Reps</th>
                    <th className="py-2 pr-4 text-center font-medium">Peso</th>
                    <th className="py-2 pr-4 text-center font-medium">Descanso</th>
                    <th className="py-2 text-left font-medium">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {dia.ejercicios.map((ejercicio) => (
                    <EjercicioRow key={ejercicio.id} ejercicio={ejercicio} />
                  ))}
                </tbody>
              </table>

              {/* Mobile stacked cards */}
              <div className="lg:hidden space-y-2">
                {dia.ejercicios.map((ejercicio) => (
                  <EjercicioRow key={ejercicio.id} ejercicio={ejercicio} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function RutinaDetalle({ rutina }: RutinaDetalleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <GlassCard>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-foreground">{rutina.nombre}</h2>
            <GlassBadge
              variant={rutina.activa ? 'success' : 'default'}
              size="sm"
            >
              {rutina.activa ? 'Activa' : 'Inactiva'}
            </GlassBadge>
          </div>
          {rutina.descripcion && (
            <p className="text-sm text-muted-foreground">{rutina.descripcion}</p>
          )}
        </div>

        <div className="space-y-3">
          {rutina.dias.map((dia, index) => (
            <DiaSection key={dia.id} dia={dia} defaultOpen={index === 0} />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
