'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Filter } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassButton } from '@/components/glass/glass-button'
import { GlassBadge } from '@/components/glass/glass-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockAlertas } from '@/components/dashboard/widget-alertas'
import { cn } from '@/lib/utils'

export default function AlertasPage() {
  const alertasActivas = mockAlertas.filter(a => !a.resuelta)
  const alertasCriticas = alertasActivas.filter(a => a.prioridad === 'alta')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Centro de Alertas</h2>
          <p className="text-muted-foreground mt-1">
            {alertasActivas.length} alertas activas, {alertasCriticas.length} críticas
          </p>
        </div>
        <GlassButton variant="subtle">
          <Filter className="w-4 h-4" />
          Filtrar
        </GlassButton>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard hover={false} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{alertasCriticas.length}</p>
              <p className="text-sm text-muted-foreground">Críticas</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {alertasActivas.filter(a => a.prioridad === 'media').length}
              </p>
              <p className="text-sm text-muted-foreground">Medias</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">12</p>
              <p className="text-sm text-muted-foreground">Resueltas esta semana</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Alerts list */}
      <GlassCard hover={false}>
        <h3 className="font-semibold text-foreground mb-4">Alertas activas</h3>
        <div className="space-y-3">
          {alertasActivas.map((alerta, index) => (
            <motion.div
              key={alerta.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl',
                'hover:bg-muted/50 cursor-pointer transition-colors',
                'border border-transparent hover:border-border'
              )}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={alerta.cliente.avatar_url} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {alerta.cliente.nombre.charAt(0)}{alerta.cliente.apellidos?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">
                  {alerta.cliente.nombre} {alerta.cliente.apellidos}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {alerta.mensaje}
                </p>
              </div>

              <GlassBadge
                variant={
                  alerta.prioridad === 'alta' ? 'danger' :
                  alerta.prioridad === 'media' ? 'warning' : 'default'
                }
              >
                {alerta.prioridad}
              </GlassBadge>

              <GlassButton variant="subtle" size="sm">
                Resolver
              </GlassButton>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
