'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCardStatic } from '@/components/glass'
import type { ClienteAdherencia } from '@/types'

interface AdherenciaChartProps {
  clientes: ClienteAdherencia[]
}

export function AdherenciaChart({ clientes }: AdherenciaChartProps) {
  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'subiendo':
        return <TrendingUp className="w-3 h-3 text-[var(--accent-emerald)]" />
      case 'bajando':
        return <TrendingDown className="w-3 h-3 text-destructive" />
      default:
        return <Minus className="w-3 h-3 text-muted-foreground" />
    }
  }

  return (
    <GlassCardStatic className="mb-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Mayor Adherencia</h3>

      <div className="space-y-3">
        {clientes.slice(0, 5).map((cliente, index) => (
          <motion.div
            key={cliente.cliente_id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            {/* Rank */}
            <div className={cn(
              'size-6 rounded-full flex items-center justify-center text-xs font-bold',
              index === 0 ? 'bg-warning/20 text-warning' :
              index === 1 ? 'bg-white/20 text-foreground' :
              index === 2 ? 'bg-[#CD7F32]/20 text-[#CD7F32]' :
              'bg-white/5 text-muted-foreground'
            )}>
              {index + 1}
            </div>

            {/* Avatar */}
            <div
              className="size-8 rounded-full border border-white/20 bg-cover bg-center"
              style={{ backgroundImage: `url('${cliente.cliente_avatar}')` }}
            />

            {/* Name and Progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground truncate">
                  {cliente.cliente_nombre}
                </span>
                {getTendenciaIcon(cliente.tendencia)}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cliente.adherencia}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={cn(
                      'h-full rounded-full',
                      cliente.adherencia >= 90 ? 'bg-[var(--accent-emerald)]' :
                      cliente.adherencia >= 70 ? 'bg-[var(--accent-blue)]' :
                      'bg-warning'
                    )}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-8 text-right">
                  {cliente.adherencia}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCardStatic>
  )
}
