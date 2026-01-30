'use client'

import { motion } from 'framer-motion'
import { Banknote, CreditCard, ArrowRightLeft, Smartphone, Calendar, CheckCircle2 } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassBadge } from '@/components/glass/glass-badge'
import { cn } from '@/lib/utils'
import type { Pago, MetodoPago, EstadoPago } from '@/types'

interface HistorialPagosProps {
  pagos: Pago[]
}

function getMetodoIcon(metodo?: MetodoPago) {
  switch (metodo) {
    case 'efectivo':
      return <Banknote className="w-4 h-4 text-muted-foreground" />
    case 'tarjeta':
      return <CreditCard className="w-4 h-4 text-muted-foreground" />
    case 'transferencia':
      return <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
    case 'bizum':
      return <Smartphone className="w-4 h-4 text-muted-foreground" />
    default:
      return null
  }
}

function getMetodoLabel(metodo?: MetodoPago): string {
  switch (metodo) {
    case 'efectivo':
      return 'Efectivo'
    case 'tarjeta':
      return 'Tarjeta'
    case 'transferencia':
      return 'Transferencia'
    case 'bizum':
      return 'Bizum'
    default:
      return ''
  }
}

function getEstadoBadge(estado: EstadoPago) {
  const config = {
    pagado: { variant: 'success' as const, label: 'Pagado' },
    pendiente: { variant: 'warning' as const, label: 'Pendiente' },
    vencido: { variant: 'danger' as const, label: 'Vencido' },
  }
  const { variant, label } = config[estado]
  return <GlassBadge variant={variant} size="sm">{label}</GlassBadge>
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function HistorialPagos({ pagos }: HistorialPagosProps) {
  const sorted = [...pagos].sort(
    (a, b) => new Date(b.fecha_emision).getTime() - new Date(a.fecha_emision).getTime()
  )

  if (sorted.length === 0) {
    return (
      <GlassCard>
        <div className="text-center py-8">
          <CreditCard className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No hay pagos registrados</p>
        </div>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-3">
      {sorted.map((pago, index) => (
        <motion.div
          key={pago.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <GlassCard className="hover:ring-1 hover:ring-primary/10 transition-all">
            {/* Mobile layout */}
            <div className="lg:hidden space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{pago.concepto}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(pago.fecha_emision)}</span>
                  </div>
                </div>
                <p className="text-lg font-bold text-foreground ml-3">
                  {pago.monto.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getEstadoBadge(pago.estado)}
                  {pago.metodo && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {getMetodoIcon(pago.metodo)}
                      {getMetodoLabel(pago.metodo)}
                    </span>
                  )}
                </div>
                {pago.estado === 'pagado' && pago.fecha_pago && (
                  <span className="flex items-center gap-1 text-xs text-success">
                    <CheckCircle2 className="w-3 h-3" />
                    {formatDate(pago.fecha_pago)}
                  </span>
                )}
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{pago.concepto}</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground w-32">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(pago.fecha_emision)}</span>
              </div>
              <div className="w-24 text-right">
                <p className="font-bold text-foreground">
                  {pago.monto.toFixed(2)}
                </p>
              </div>
              <div className="w-24 flex justify-center">
                {getEstadoBadge(pago.estado)}
              </div>
              <div className="w-28 flex items-center gap-1.5 text-sm text-muted-foreground">
                {pago.metodo && (
                  <>
                    {getMetodoIcon(pago.metodo)}
                    <span>{getMetodoLabel(pago.metodo)}</span>
                  </>
                )}
              </div>
              <div className="w-32 text-right">
                {pago.estado === 'pagado' && pago.fecha_pago && (
                  <span className="flex items-center gap-1 text-xs text-success justify-end">
                    <CheckCircle2 className="w-3 h-3" />
                    {formatDate(pago.fecha_pago)}
                  </span>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}
