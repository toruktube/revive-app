'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  CreditCard,
  Dumbbell,
  FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard, GlassBadge, GlassButton } from '@/components/glass'
import { mockClientes } from '@/lib/mock-data'

interface ClienteDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ClienteDetailPage({ params }: ClienteDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const cliente = mockClientes.find(c => c.id === id)

  if (!cliente) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4">
        <p className="text-muted-foreground">Cliente no encontrado</p>
        <GlassButton onClick={() => router.back()} className="mt-4">
          Volver
        </GlassButton>
      </div>
    )
  }

  const getTendenciaIcon = () => {
    switch (cliente.tendencia) {
      case 'subiendo':
        return <TrendingUp className="w-4 h-4 text-[var(--accent-emerald)]" />
      case 'bajando':
        return <TrendingDown className="w-4 h-4 text-destructive" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver</span>
      </button>

      {/* Profile Header */}
      <GlassCard hover={false} className="mb-4">
        <div className="flex items-start gap-4">
          <div
            className="size-20 rounded-2xl border-2 border-white/20 bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url('${cliente.avatar_url}')` }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-foreground truncate">
                {cliente.nombre} {cliente.apellidos}
              </h1>
              {getTendenciaIcon()}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {cliente.objetivo_principal}
            </p>
            <div className="flex gap-2 flex-wrap">
              <GlassBadge variant={cliente.estado === 'activo' ? 'emerald' : cliente.estado === 'en_pausa' ? 'warning' : 'danger'}>
                {cliente.estado === 'activo' ? 'Activo' : cliente.estado === 'en_pausa' ? 'En pausa' : 'Inactivo'}
              </GlassBadge>
              <GlassBadge variant={cliente.tipo === 'online' ? 'blue' : 'default'}>
                {cliente.tipo === 'online' ? 'Online' : 'Presencial'}
              </GlassBadge>
              <GlassBadge variant="default">
                {cliente.nivel || 'Sin nivel'}
              </GlassBadge>
            </div>
          </div>
        </div>

        {/* Adherencia */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Adherencia</span>
            <span className={cn(
              'text-2xl font-bold',
              (cliente.adherenciaPromedio || 0) >= 80 ? 'text-[var(--accent-emerald)]' :
              (cliente.adherenciaPromedio || 0) >= 60 ? 'text-warning' : 'text-destructive'
            )}>
              {cliente.adherenciaPromedio || 0}%
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${cliente.adherenciaPromedio || 0}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn(
                'h-full rounded-full',
                (cliente.adherenciaPromedio || 0) >= 80 ? 'bg-[var(--accent-emerald)]' :
                (cliente.adherenciaPromedio || 0) >= 60 ? 'bg-warning' : 'bg-destructive'
              )}
            />
          </div>
        </div>
      </GlassCard>

      {/* Contact Info */}
      <GlassCard hover={false} className="mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Contacto</h3>
        <div className="space-y-3">
          {cliente.email && (
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-foreground">{cliente.email}</span>
            </div>
          )}
          {cliente.telefono && (
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
                <Phone className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-foreground">{cliente.telefono}</span>
            </div>
          )}
          {cliente.fecha_inicio && (
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-foreground">
                Cliente desde {new Date(cliente.fecha_inicio).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <GlassCard hover={true} className="p-4 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[var(--accent-emerald)]/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[var(--accent-emerald)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Pagos</p>
              <p className="text-xs text-muted-foreground">
                {cliente.estadoPago === 'pagado' ? 'Al día' : cliente.estadoPago === 'pendiente' ? 'Pendiente' : 'Vencido'}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover={true} className="p-4 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[var(--accent-blue)]/10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-[var(--accent-blue)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Rutina</p>
              <p className="text-xs text-muted-foreground truncate">{cliente.plan_actual || 'Sin asignar'}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Notes */}
      {cliente.notas_privadas && (
        <GlassCard hover={false} className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Notas privadas</h3>
          </div>
          <p className="text-sm text-muted-foreground">{cliente.notas_privadas}</p>
        </GlassCard>
      )}

      {/* Spacer */}
      <div className="h-8" />
    </div>
  )
}
