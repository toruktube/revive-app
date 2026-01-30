'use client'

import { motion } from 'framer-motion'
import { DollarSign, Clock, AlertTriangle } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { cn } from '@/lib/utils'

interface PagosResumenProps {
  resumen: {
    totalCobrado: number
    totalPendiente: number
    totalVencido: number
    cantidadPagados: number
    cantidadPendientes: number
    cantidadVencidos: number
  }
}

const cards = [
  {
    key: 'cobrado',
    label: 'Total Cobrado',
    icon: DollarSign,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20',
  },
  {
    key: 'pendiente',
    label: 'Total Pendiente',
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20',
  },
  {
    key: 'vencido',
    label: 'Total Vencido',
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/20',
  },
] as const

export function PagosResumen({ resumen }: PagosResumenProps) {
  const dataMap = {
    cobrado: { total: resumen.totalCobrado, cantidad: resumen.cantidadPagados },
    pendiente: { total: resumen.totalPendiente, cantidad: resumen.cantidadPendientes },
    vencido: { total: resumen.totalVencido, cantidad: resumen.cantidadVencidos },
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, index) => {
        const data = dataMap[card.key]
        const Icon = card.icon

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className={cn('border', card.borderColor)}>
              <div className="flex items-center gap-3">
                <div className={cn('p-2.5 rounded-xl', card.bgColor)}>
                  <Icon className={cn('w-5 h-5', card.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className={cn('text-xl font-bold', card.color)}>
                    {data.total.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {data.cantidad} {data.cantidad === 1 ? 'pago' : 'pagos'}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )
      })}
    </div>
  )
}
