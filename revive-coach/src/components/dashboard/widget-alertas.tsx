'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, ChevronRight, Clock } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GlassCard } from '@/components/glass'
import { GlassBadge } from '@/components/glass/glass-badge'
import { cn } from '@/lib/utils'
import type { Alerta, Cliente } from '@/types'

interface AlertaConCliente extends Alerta {
  cliente: Cliente
}

interface WidgetAlertasProps {
  alertas: AlertaConCliente[]
  className?: string
}

// Mock data for development
export const mockAlertas: AlertaConCliente[] = [
  {
    id: '1',
    cliente_id: '1',
    tipo: 'adherencia_baja',
    mensaje: 'Adherencia < 50% esta semana',
    prioridad: 'alta',
    resuelta: false,
    created_at: new Date().toISOString(),
    cliente: {
      id: '1',
      nombre: 'María',
      apellidos: 'García',
      tipo: 'online',
      estado: 'activo',
      avatar_url: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: '2',
    cliente_id: '2',
    tipo: 'sin_reporte',
    mensaje: 'Sin reporte semanal hace 6 días',
    prioridad: 'media',
    resuelta: false,
    created_at: new Date().toISOString(),
    cliente: {
      id: '2',
      nombre: 'Carlos',
      apellidos: 'Rodríguez',
      tipo: 'presencial',
      estado: 'activo',
      avatar_url: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    id: '3',
    cliente_id: '3',
    tipo: 'animo_bajo',
    mensaje: 'Estado anímico bajo 3 días seguidos',
    prioridad: 'alta',
    resuelta: false,
    created_at: new Date().toISOString(),
    cliente: {
      id: '3',
      nombre: 'Laura',
      apellidos: 'Martínez',
      tipo: 'online',
      estado: 'activo',
      avatar_url: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
]

function getPriorityStyles(prioridad: string) {
  switch (prioridad) {
    case 'alta':
      return {
        badge: 'danger' as const,
        icon: 'text-destructive',
        bg: 'bg-destructive/10'
      }
    case 'media':
      return {
        badge: 'warning' as const,
        icon: 'text-warning',
        bg: 'bg-warning/10'
      }
    default:
      return {
        badge: 'default' as const,
        icon: 'text-muted-foreground',
        bg: 'bg-muted'
      }
  }
}

function getInitials(nombre: string, apellidos?: string): string {
  const first = nombre.charAt(0).toUpperCase()
  const last = apellidos?.charAt(0).toUpperCase() || ''
  return first + last
}

export function WidgetAlertas({ alertas = mockAlertas, className }: WidgetAlertasProps) {
  const alertasActivas = alertas.filter(a => !a.resuelta)
  const alertasCriticas = alertasActivas.filter(a => a.prioridad === 'alta')

  return (
    <GlassCard className={cn('h-full', className)} hover={false}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center',
            alertasCriticas.length > 0 ? 'bg-destructive/10' : 'bg-primary/10'
          )}>
            <AlertTriangle className={cn(
              'w-4 h-4',
              alertasCriticas.length > 0 ? 'text-destructive' : 'text-primary'
            )} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Requieren atención</h3>
            <p className="text-xs text-muted-foreground">
              {alertasActivas.length} {alertasActivas.length === 1 ? 'alerta activa' : 'alertas activas'}
            </p>
          </div>
        </div>
        {alertasCriticas.length > 0 && (
          <GlassBadge variant="danger" size="sm">
            {alertasCriticas.length} críticas
          </GlassBadge>
        )}
      </div>

      {/* Lista de alertas */}
      <div className="space-y-3">
        {alertasActivas.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay alertas activas
          </p>
        ) : (
          alertasActivas.slice(0, 4).map((alerta, index) => {
            const styles = getPriorityStyles(alerta.prioridad)
            return (
              <motion.div
                key={alerta.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl',
                  'hover:bg-muted/50 cursor-pointer transition-colors',
                  'group'
                )}
              >
                <Avatar className="w-9 h-9 border border-border">
                  <AvatarImage src={alerta.cliente.avatar_url} />
                  <AvatarFallback className={cn('text-xs font-medium', styles.bg)}>
                    {getInitials(alerta.cliente.nombre, alerta.cliente.apellidos)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {alerta.cliente.nombre} {alerta.cliente.apellidos}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {alerta.mensaje}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <GlassBadge variant={styles.badge} size="sm">
                    {alerta.prioridad}
                  </GlassBadge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Ver todas */}
      {alertasActivas.length > 4 && (
        <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors">
          Ver todas las alertas ({alertasActivas.length})
        </button>
      )}
    </GlassCard>
  )
}
