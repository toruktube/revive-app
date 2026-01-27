'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Smile, Meh, Frown } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { DialChart } from '@/components/charts'
import { cn } from '@/lib/utils'

interface WidgetAdherenciaProps {
  adherenciaGlobal: number
  estadoAnimoPromedio: number
  tendencia?: 'subiendo' | 'estable' | 'bajando'
  className?: string
}

function getTrendIcon(tendencia: string | undefined) {
  switch (tendencia) {
    case 'subiendo':
      return { icon: TrendingUp, color: 'text-success', label: 'Subiendo' }
    case 'bajando':
      return { icon: TrendingDown, color: 'text-destructive', label: 'Bajando' }
    default:
      return { icon: Minus, color: 'text-muted-foreground', label: 'Estable' }
  }
}

function getMoodIcon(value: number) {
  if (value >= 4) return { icon: Smile, color: 'text-success', label: 'Excelente' }
  if (value >= 3) return { icon: Meh, color: 'text-warning', label: 'Moderado' }
  return { icon: Frown, color: 'text-destructive', label: 'Bajo' }
}

export function WidgetAdherencia({
  adherenciaGlobal = 78,
  estadoAnimoPromedio = 3.8,
  tendencia = 'subiendo',
  className
}: WidgetAdherenciaProps) {
  const trend = getTrendIcon(tendencia)
  const mood = getMoodIcon(estadoAnimoPromedio)
  const TrendIcon = trend.icon
  const MoodIcon = mood.icon

  return (
    <GlassCard className={cn('h-full', className)} hover={false}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Adherencia Global</h3>
        <div className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-full',
          'bg-muted/50 text-sm'
        )}>
          <TrendIcon className={cn('w-4 h-4', trend.color)} />
          <span className={cn('text-xs font-medium', trend.color)}>
            {trend.label}
          </span>
        </div>
      </div>

      {/* Dial principal */}
      <div className="flex justify-center mb-6">
        <DialChart
          value={adherenciaGlobal}
          size="lg"
          label="Promedio semanal"
        />
      </div>

      {/* Estado anímico */}
      <div className={cn(
        'flex items-center justify-between p-3 rounded-xl',
        'bg-muted/30'
      )}>
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              mood.color === 'text-success' && 'bg-success/10',
              mood.color === 'text-warning' && 'bg-warning/10',
              mood.color === 'text-destructive' && 'bg-destructive/10'
            )}
          >
            <MoodIcon className={cn('w-5 h-5', mood.color)} />
          </motion.div>
          <div>
            <p className="text-sm font-medium text-foreground">Estado anímico</p>
            <p className="text-xs text-muted-foreground">{mood.label}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={cn('text-2xl font-bold', mood.color)}>
            {estadoAnimoPromedio.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">de 5</p>
        </div>
      </div>
    </GlassCard>
  )
}
