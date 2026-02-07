'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, ChevronRight, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/glass'
import { CircularGauge } from '@/components/shared'
import type { ClienteConEstado } from '@/types'

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

interface ClienteCardProps {
  cliente: ClienteConEstado
  onClick?: () => void
  onSendReport?: () => void
  index?: number
}

export function ClienteCard({ cliente, onClick, onSendReport, index = 0 }: ClienteCardProps) {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigating to client profile
    if (!cliente.telefono) return

    // Clean phone number (remove spaces, dashes, etc.)
    const phone = cliente.telefono.replace(/\D/g, '')
    // Add Spain country code if not present
    const fullPhone = phone.startsWith('34') ? phone : `34${phone}`

    window.open(`https://wa.me/${fullPhone}`, '_blank')
  }

  const handleSendReportClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigating to client profile
    onSendReport?.()
  }

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

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onSendReport && (
            <button
              onClick={handleSendReportClick}
              className="size-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              title="Enviar reporte"
            >
              <FileText className="w-4 h-4 text-primary" />
            </button>
          )}
          {cliente.telefono && (
            <button
              onClick={handleWhatsAppClick}
              className="size-9 rounded-full bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-green-500" />
            </button>
          )}
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
