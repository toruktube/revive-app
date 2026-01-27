'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Wifi,
  MapPin,
  CheckCircle2,
  Clock,
  Calendar
} from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { cn } from '@/lib/utils'
import type { DashboardStats } from '@/types'

interface WidgetResumenProps {
  stats: DashboardStats
  className?: string
}

// Mock stats for development
export const mockStats: DashboardStats = {
  clientesActivos: 24,
  clientesOnline: 18,
  clientesPresencial: 6,
  adherenciaGlobal: 78,
  estadoAnimoPromedio: 3.8,
  alertasActivas: 5,
  alertasCriticas: 2
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  sublabel?: string
  iconBg: string
  iconColor: string
  delay?: number
}

function StatCard({ icon: Icon, label, value, sublabel, iconBg, iconColor, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl',
        'bg-muted/30 hover:bg-muted/50 transition-colors'
      )}
    >
      <div className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
        iconBg
      )}>
        <Icon className={cn('w-5 h-5', iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
        {sublabel && (
          <p className="text-xs text-muted-foreground">{sublabel}</p>
        )}
      </div>
    </motion.div>
  )
}

export function WidgetResumen({ stats = mockStats, className }: WidgetResumenProps) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  return (
    <GlassCard className={cn('h-full', className)} hover={false}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Resumen</h3>
            <p className="text-xs text-muted-foreground capitalize">{today}</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Users}
          label="Clientes activos"
          value={stats.clientesActivos}
          iconBg="bg-primary/10"
          iconColor="text-primary"
          delay={0}
        />

        <StatCard
          icon={Wifi}
          label="Online"
          value={stats.clientesOnline}
          sublabel={`${Math.round((stats.clientesOnline / stats.clientesActivos) * 100)}%`}
          iconBg="bg-chart-3/10"
          iconColor="text-chart-3"
          delay={0.1}
        />

        <StatCard
          icon={MapPin}
          label="Presencial"
          value={stats.clientesPresencial}
          sublabel={`${Math.round((stats.clientesPresencial / stats.clientesActivos) * 100)}%`}
          iconBg="bg-secondary/10"
          iconColor="text-secondary"
          delay={0.2}
        />

        <StatCard
          icon={CheckCircle2}
          label="Reportes hoy"
          value="8"
          sublabel="de 24 clientes"
          iconBg="bg-success/10"
          iconColor="text-success"
          delay={0.3}
        />
      </div>

      {/* Quick actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3">Acciones rápidas</p>
        <div className="flex gap-2">
          <button className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl',
            'bg-primary/10 text-primary hover:bg-primary/20',
            'text-sm font-medium transition-colors'
          )}>
            <Calendar className="w-4 h-4" />
            <span>Nuevo cliente</span>
          </button>
          <button className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl',
            'bg-muted hover:bg-muted/80',
            'text-sm font-medium text-foreground transition-colors'
          )}>
            <Clock className="w-4 h-4" />
            <span>Ver pendientes</span>
          </button>
        </div>
      </div>
    </GlassCard>
  )
}
