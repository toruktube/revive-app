'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GlassCard } from '@/components/glass'
import { GlassBadge } from '@/components/glass/glass-badge'
import { MiniDial } from '@/components/charts'
import { cn } from '@/lib/utils'
import type { ClienteConPago } from '@/types'

interface ClienteCardProps {
  cliente: ClienteConPago
  index?: number
}

function getInitials(nombre: string, apellidos?: string): string {
  const parts = apellidos ? `${nombre} ${apellidos}` : nombre
  return parts.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function formatUltimoReporte(fecha?: string): string {
  if (!fecha) return 'Sin reportes'

  const now = new Date()
  const reportDate = new Date(fecha)
  const diffTime = now.getTime() - reportDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  if (diffDays < 14) return 'Hace 1 semana'
  return `Hace ${Math.floor(diffDays / 7)} semanas`
}

function TrendIcon({ tendencia }: { tendencia?: 'subiendo' | 'estable' | 'bajando' }) {
  if (tendencia === 'subiendo') {
    return <TrendingUp className="w-4 h-4 text-success" />
  }
  if (tendencia === 'bajando') {
    return <TrendingDown className="w-4 h-4 text-destructive" />
  }
  return <Minus className="w-4 h-4 text-muted-foreground" />
}

export function ClienteCard({ cliente, index = 0 }: ClienteCardProps) {
  const estadoAnimo = cliente.ultimoControl?.estado_animo || 0
  const ultimoReporte = formatUltimoReporte(cliente.ultimoControl?.fecha)
  const tieneAlertas = (cliente.alertasActivas || 0) > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/clientes/${cliente.id}`}>
        <GlassCard className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all relative">
          {/* Alert indicator */}
          {tieneAlertas && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center animate-pulse">
              <AlertCircle className="w-3 h-3 text-white" />
            </div>
          )}

          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12 border-2 border-border">
              <AvatarImage src={cliente.avatar_url} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {getInitials(cliente.nombre, cliente.apellidos)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground truncate">
                  {cliente.nombre} {cliente.apellidos}
                </h3>
                <GlassBadge
                  variant={cliente.tipo === 'online' ? 'default' : 'success'}
                  size="sm"
                >
                  {cliente.tipo}
                </GlassBadge>
                {cliente.estado !== 'activo' && (
                  <GlassBadge
                    variant={cliente.estado === 'en_pausa' ? 'warning' : 'default'}
                    size="sm"
                  >
                    {cliente.estado === 'en_pausa' ? 'Pausa' : 'Fin'}
                  </GlassBadge>
                )}
                {cliente.estadoPago && (
                  <GlassBadge
                    variant={
                      cliente.estadoPago === 'pagado' ? 'success' :
                      cliente.estadoPago === 'pendiente' ? 'warning' : 'danger'
                    }
                    size="sm"
                  >
                    {cliente.estadoPago === 'pagado' ? 'Al día' :
                     cliente.estadoPago === 'pendiente' ? 'Pendiente' : 'Vencido'}
                  </GlassBadge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {cliente.objetivo_principal || 'Sin objetivo definido'}
              </p>
              {cliente.nivel && (
                <p className="text-xs text-muted-foreground/70 capitalize mt-0.5">
                  Nivel: {cliente.nivel}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-1">
              <MiniDial value={cliente.adherenciaPromedio || 0} />
              <TrendIcon tendencia={cliente.tendencia} />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {ultimoReporte}
            </span>
            <div className="flex items-center gap-2">
              {tieneAlertas && (
                <span className="text-destructive text-xs font-medium">
                  {cliente.alertasActivas} alerta{cliente.alertasActivas !== 1 ? 's' : ''}
                </span>
              )}
              <div className="flex items-center gap-1">
                <span className={cn(
                  'font-medium',
                  estadoAnimo >= 4 ? 'text-success' :
                  estadoAnimo >= 3 ? 'text-warning' : 'text-destructive'
                )}>
                  {estadoAnimo}/5
                </span>
                <span className="text-muted-foreground">ánimo</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}

// Skeleton for loading state
export function ClienteCardSkeleton() {
  return (
    <div className="rounded-2xl p-6 bg-muted/30 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-32 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
        <div className="w-8 h-8 bg-muted rounded-full" />
      </div>
      <div className="mt-4 pt-4 border-t border-border flex justify-between">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-16 bg-muted rounded" />
      </div>
    </div>
  )
}
