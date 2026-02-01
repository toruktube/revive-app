'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Dumbbell, Clock, BarChart2, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard, GlassBadge, GlassButton } from '@/components/glass'
import { mockRutinas } from '@/lib/mock-data'

interface RutinaDetailPageProps {
  params: Promise<{ id: string }>
}

export default function RutinaDetailPage({ params }: RutinaDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const rutina = mockRutinas.find(r => r.id === id)

  if (!rutina) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4">
        <p className="text-muted-foreground">Rutina no encontrada</p>
        <GlassButton onClick={() => router.back()} className="mt-4">
          Volver
        </GlassButton>
      </div>
    )
  }

  return (
    <div className="flex flex-col px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver</span>
      </button>

      {/* Header */}
      <GlassCard hover={false} className="mb-4">
        <div className="flex items-start gap-4">
          <div className="size-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Dumbbell className="w-7 h-7 text-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground mb-1">{rutina.nombre}</h1>
            <p className="text-sm text-muted-foreground mb-3">{rutina.descripcion}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {rutina.duracion}
              </span>
              <span className="flex items-center gap-1">
                <BarChart2 className="w-4 h-4" />
                {rutina.dias.length} días
              </span>
            </div>

            <div className="flex gap-2">
              <GlassBadge variant={
                rutina.nivel === 'principiante' ? 'emerald' :
                rutina.nivel === 'intermedio' ? 'blue' : 'violet'
              }>
                {rutina.nivel}
              </GlassBadge>
              <GlassBadge variant="default">{rutina.categoria}</GlassBadge>
            </div>
          </div>
        </div>

        {/* Assign Button */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <GlassButton className="w-full">
            <UserPlus className="w-4 h-4" />
            Asignar a cliente
          </GlassButton>
        </div>
      </GlassCard>

      {/* Days */}
      <h3 className="text-sm font-semibold text-foreground mb-3">Días de entrenamiento</h3>
      <div className="space-y-4">
        {rutina.dias.map((dia, diaIndex) => (
          <motion.div
            key={dia.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: diaIndex * 0.1 }}
          >
            <GlassCard hover={false} className="p-4">
              <h4 className="text-base font-semibold text-foreground mb-3">{dia.nombre}</h4>

              <div className="space-y-2">
                {dia.ejercicios.map((ejercicio, ejIndex) => (
                  <div
                    key={ejercicio.id}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl',
                      'bg-white/5 border border-white/5'
                    )}
                  >
                    <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-muted-foreground">{ejIndex + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{ejercicio.nombre}</p>
                      <p className="text-xs text-muted-foreground">
                        {ejercicio.series} x {ejercicio.repeticiones}
                        {ejercicio.peso && ` • ${ejercicio.peso}`}
                        {ejercicio.descanso && ` • ${ejercicio.descanso} descanso`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Spacer */}
      <div className="h-8" />
    </div>
  )
}
