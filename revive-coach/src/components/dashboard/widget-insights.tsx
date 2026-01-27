'use client'

import { motion } from 'framer-motion'
import {
  Lightbulb,
  Moon,
  Activity,
  AlertCircle,
  TrendingDown,
  ChevronRight
} from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassBadge } from '@/components/glass/glass-badge'
import { cn } from '@/lib/utils'
import type { Insight } from '@/types'

interface WidgetInsightsProps {
  insights: Insight[]
  className?: string
}

// Mock insights for development
export const mockInsights: Insight[] = [
  {
    id: '1',
    tipo: 'patron',
    titulo: 'Patrón de sueño detectado',
    descripcion: '3 clientes reportan menos de 6h de sueño',
    clientesAfectados: 3,
    prioridad: 'media'
  },
  {
    id: '2',
    tipo: 'alerta',
    titulo: 'Adherencia en descenso',
    descripcion: '2 clientes con adherencia -15% esta semana',
    clientesAfectados: 2,
    prioridad: 'alta'
  },
  {
    id: '3',
    tipo: 'sugerencia',
    titulo: 'Oportunidad de motivación',
    descripcion: '4 clientes cerca de sus objetivos mensuales',
    clientesAfectados: 4,
    prioridad: 'baja'
  }
]

function getInsightIcon(tipo: string) {
  switch (tipo) {
    case 'patron':
      return Moon
    case 'alerta':
      return AlertCircle
    case 'sugerencia':
      return Lightbulb
    default:
      return Activity
  }
}

function getInsightStyles(tipo: string, prioridad: string) {
  if (prioridad === 'alta') {
    return {
      iconBg: 'bg-destructive/10',
      iconColor: 'text-destructive',
      badge: 'danger' as const
    }
  }

  switch (tipo) {
    case 'patron':
      return {
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
        badge: 'default' as const
      }
    case 'alerta':
      return {
        iconBg: 'bg-warning/10',
        iconColor: 'text-warning',
        badge: 'warning' as const
      }
    case 'sugerencia':
      return {
        iconBg: 'bg-success/10',
        iconColor: 'text-success',
        badge: 'success' as const
      }
    default:
      return {
        iconBg: 'bg-muted',
        iconColor: 'text-muted-foreground',
        badge: 'default' as const
      }
  }
}

export function WidgetInsights({ insights = mockInsights, className }: WidgetInsightsProps) {
  return (
    <GlassCard className={cn('h-full', className)} hover={false}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Insights</h3>
          <p className="text-xs text-muted-foreground">Patrones detectados</p>
        </div>
      </div>

      {/* Lista de insights */}
      <div className="space-y-3">
        {insights.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay insights disponibles
          </p>
        ) : (
          insights.slice(0, 3).map((insight, index) => {
            const Icon = getInsightIcon(insight.tipo)
            const styles = getInsightStyles(insight.tipo, insight.prioridad)

            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'p-3 rounded-xl',
                  'hover:bg-muted/50 cursor-pointer transition-colors',
                  'group'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                    styles.iconBg
                  )}>
                    <Icon className={cn('w-4 h-4', styles.iconColor)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {insight.titulo}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {insight.descripcion}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <GlassBadge variant={styles.badge} size="sm">
                        {insight.clientesAfectados} clientes
                      </GlassBadge>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </GlassCard>
  )
}
