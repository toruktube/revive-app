'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/glass'
import type { Transaccion } from '@/types'

interface TransaccionCardProps {
  transaccion: Transaccion
  onClick?: () => void
  index?: number
}

export function TransaccionCard({ transaccion, onClick, index = 0 }: TransaccionCardProps) {
  const isIngreso = transaccion.tipo === 'ingreso'

  const getEstadoBadge = () => {
    switch (transaccion.estado) {
      case 'pagado':
        return <GlassBadge variant="emerald" size="sm">Pagado</GlassBadge>
      case 'pendiente':
        return <GlassBadge variant="warning" size="sm">Pendiente</GlassBadge>
      case 'vencido':
        return <GlassBadge variant="danger" size="sm">Vencido</GlassBadge>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onClick={onClick}
      className={cn(
        'group relative w-full glass-card rounded-xl p-4',
        'hover:bg-white/5 transition-all duration-300',
        'border border-white/10',
        transaccion.estado !== 'pagado' && 'cursor-pointer'
      )}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={cn(
          'size-10 rounded-xl flex items-center justify-center shrink-0',
          isIngreso ? 'bg-[var(--accent-emerald)]/10' : 'bg-destructive/10'
        )}>
          {isIngreso ? (
            <ArrowDownRight className="w-5 h-5 text-[var(--accent-emerald)]" />
          ) : (
            <ArrowUpRight className="w-5 h-5 text-destructive" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm font-semibold text-foreground truncate">
              {transaccion.cliente_nombre || transaccion.concepto}
            </h4>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {transaccion.cliente_nombre ? transaccion.concepto : new Date(transaccion.fecha).toLocaleDateString('es-ES')}
          </p>
        </div>

        {/* Amount and Status */}
        <div className="flex flex-col items-end gap-1">
          <span className={cn(
            'text-lg font-bold',
            isIngreso ? 'text-[var(--accent-emerald)]' : 'text-foreground'
          )}>
            {isIngreso ? '+' : '-'}{transaccion.monto}€
          </span>
          {getEstadoBadge()}
        </div>
      </div>

      {/* Actions for pending/overdue */}
      {transaccion.estado !== 'pagado' && transaccion.tipo === 'ingreso' && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('Mark as paid:', transaccion.id)
            }}
            className="flex-1 py-1.5 rounded-lg bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] text-xs font-medium hover:bg-[var(--accent-emerald)]/20 transition-colors"
          >
            Marcar pagado
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('Send reminder:', transaccion.id)
            }}
            className="py-1.5 px-3 rounded-lg bg-white/5 text-muted-foreground text-xs font-medium hover:bg-white/10 hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Bell className="w-3 h-3" />
            Recordar
          </button>
        </div>
      )}
    </motion.div>
  )
}
