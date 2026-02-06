'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/glass'
import { CircularGauge } from '@/components/shared'
import type { ClienteConEstado } from '@/types'

interface ClienteCardProps {
  cliente: ClienteConEstado
  onClick?: () => void
  index?: number
}

export function ClienteCard({ cliente, onClick, index = 0 }: ClienteCardProps) {
  const getTendenciaIcon = () => {
    switch (cliente.tendencia) {
      case 'subiendo':
        return <TrendingUp className="w-3 h-3 text-[var(--accent-emerald)]" />
      case 'bajando':
        return <TrendingDown className="w-3 h-3 text-destructive" />
      default:
        return <Minus className="w-3 h-3 text-muted-foreground" />
    }
  }

  const getEstadoBadge = () => {
    switch (cliente.estado) {
      case 'activo':
        return <GlassBadge variant="emerald" size="sm">Activo</GlassBadge>
      case 'inactivo':
        return <GlassBadge variant="danger" size="sm">Inactivo</GlassBadge>
      case 'en_pausa':
        return <GlassBadge variant="warning" size="sm">En pausa</GlassBadge>
    }
  }

  const getPagoBadge = () => {
    switch (cliente.estadoPago) {
      case 'pagado':
        return null
      case 'pendiente':
        return <GlassBadge variant="warning" size="sm">Pago pendiente</GlassBadge>
      case 'vencido':
        return <GlassBadge variant="danger" size="sm">Pago vencido</GlassBadge>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={cn(
        'group relative w-full glass-card rounded-2xl p-4',
        'hover:bg-white/5 transition-all duration-300',
        'border border-white/10',
        'cursor-pointer'
      )}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="size-12 rounded-full border-2 border-white/20 bg-cover bg-center"
            style={{ backgroundImage: `url('${cliente.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}')` }}
          />
          {cliente.estado === 'activo' && (
            <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-[var(--accent-emerald)] border-2 border-background" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-foreground font-semibold truncate">
              {cliente.nombre} {cliente.apellidos}
            </h4>
            {getTendenciaIcon()}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              {cliente.tipo === 'online' ? 'Online' : 'Presencial'}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground truncate">
              {cliente.plan_actual || cliente.objetivo_principal}
            </span>
          </div>
        </div>

        {/* Adherencia Gauge */}
        <div className="flex items-center gap-2">
          <CircularGauge value={cliente.adherenciaPromedio || 0} size="sm" />
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Badges Row */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
        {getEstadoBadge()}
        {getPagoBadge()}
        {(cliente.alertasActivas || 0) > 0 && (
          <GlassBadge variant="danger" size="sm">
            {cliente.alertasActivas} alerta{cliente.alertasActivas !== 1 ? 's' : ''}
          </GlassBadge>
        )}
      </div>
    </motion.div>
  )
}
