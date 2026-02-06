'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCardStatic } from '@/components/glass'
import type { ResumenMensual } from '@/types'

interface ResumenMensualProps {
  resumen: ResumenMensual
}

export function ResumenMensualCard({ resumen }: ResumenMensualProps) {
  const isPositive = resumen.comparativaMesAnterior >= 0

  return (
    <GlassCardStatic className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-antonio font-medium tracking-wide text-foreground uppercase">{resumen.mes}</h2>
        <div className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
          isPositive ? 'bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)]' : 'bg-destructive/10 text-destructive'
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? '+' : ''}{resumen.comparativaMesAnterior}%
        </div>
      </div>

      {/* Main Balance */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-1">Balance</p>
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl font-antonio font-bold tracking-wide text-foreground"
        >
          {resumen.balance.toLocaleString('es-ES')}€
        </motion.p>
      </div>

      {/* Income/Expense */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 rounded-xl bg-[var(--accent-emerald)]/5 border border-[var(--accent-emerald)]/20">
          <p className="text-xs text-muted-foreground mb-1">Ingresos</p>
          <p className="text-2xl font-antonio font-semibold tracking-wide text-[var(--accent-emerald)]">
            +{resumen.totalIngresos.toLocaleString('es-ES')}€
          </p>
        </div>
        <div className="text-center p-3 rounded-xl bg-destructive/5 border border-destructive/20">
          <p className="text-xs text-muted-foreground mb-1">Gastos</p>
          <p className="text-2xl font-antonio font-semibold tracking-wide text-destructive">
            -{resumen.totalGastos.toLocaleString('es-ES')}€
          </p>
        </div>
      </div>

      {/* Alerts */}
      {(resumen.transaccionesPendientes > 0 || resumen.transaccionesVencidas > 0) && (
        <div className="flex gap-2 pt-4 border-t border-white/10">
          {resumen.transaccionesPendientes > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/20">
              <Clock className="w-3.5 h-3.5 text-warning" />
              <span className="text-xs font-medium text-warning">
                {resumen.transaccionesPendientes} pendiente{resumen.transaccionesPendientes !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          {resumen.transaccionesVencidas > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="w-3.5 h-3.5 text-destructive" />
              <span className="text-xs font-medium text-destructive">
                {resumen.transaccionesVencidas} vencido{resumen.transaccionesVencidas !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      )}
    </GlassCardStatic>
  )
}
