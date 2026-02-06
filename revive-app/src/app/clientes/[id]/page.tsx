'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  CreditCard,
  Dumbbell,
  Utensils,
  FileText,
  X,
  Check,
  Plus,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard, GlassBadge, GlassButton } from '@/components/glass'
import { CircularGauge } from '@/components/shared'
import { useModalState } from '@/hooks'
import { mockClientes, mockRutinas, mockPlanesNutricion } from '@/lib/mock-data'

interface ClienteDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ClienteDetailPage({ params }: ClienteDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const cliente = mockClientes.find(c => c.id === id)
  const [showRutinaSelector, setShowRutinaSelector] = useState(false)
  const [showNutricionSelector, setShowNutricionSelector] = useState(false)
  const [selectedRutina, setSelectedRutina] = useState(cliente?.plan_actual || '')
  const [selectedNutricion, setSelectedNutricion] = useState('')
  useModalState(showRutinaSelector || showNutricionSelector)

  const handleSelectRutina = (rutinaNombre: string) => {
    setSelectedRutina(rutinaNombre)
    setShowRutinaSelector(false)
  }

  const handleSelectNutricion = (planNombre: string) => {
    setSelectedNutricion(planNombre)
    setShowNutricionSelector(false)
  }

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
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => router.back()}
          className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-xl font-antonio font-semibold tracking-wide text-foreground uppercase">Perfil</h2>
      </div>

      {/* Profile Header */}
      <GlassCard hover={false} className="mb-4">
        <div className="flex items-start gap-4">
          <div
            className="size-20 rounded-2xl border-2 border-white/20 bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url('${cliente.avatar_url}')` }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-antonio font-medium tracking-wide text-foreground truncate uppercase">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Adherencia</span>
              {(cliente.adherenciaPromedio || 0) < 80 && (
                <AlertCircle className={cn(
                  "w-3.5 h-3.5",
                  (cliente.adherenciaPromedio || 0) >= 60 ? 'text-warning' : 'text-destructive'
                )} />
              )}
            </div>
            <CircularGauge value={cliente.adherenciaPromedio || 0} size="lg" />
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
      <div className="grid grid-cols-3 gap-3 mb-4">
        <GlassCard hover={true} className="p-3 cursor-pointer relative">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className={cn(
              "size-10 rounded-xl flex items-center justify-center",
              cliente.estadoPago === 'pagado' ? 'bg-[var(--accent-emerald)]/10' :
              cliente.estadoPago === 'pendiente' ? 'bg-warning/10' : 'bg-destructive/10'
            )}>
              <CreditCard className={cn(
                "w-5 h-5",
                cliente.estadoPago === 'pagado' ? 'text-[var(--accent-emerald)]' :
                cliente.estadoPago === 'pendiente' ? 'text-warning' : 'text-destructive'
              )} />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground flex items-center justify-center gap-1">
                Pagos
                {cliente.estadoPago !== 'pagado' && (
                  <AlertCircle className={cn(
                    "w-3 h-3",
                    cliente.estadoPago === 'pendiente' ? 'text-warning' : 'text-destructive'
                  )} />
                )}
              </p>
              <p className={cn(
                "text-[10px]",
                cliente.estadoPago === 'pagado' ? 'text-[var(--accent-emerald)]' :
                cliente.estadoPago === 'pendiente' ? 'text-warning' : 'text-destructive'
              )}>
                {cliente.estadoPago === 'pagado' ? 'Al día' : cliente.estadoPago === 'pendiente' ? 'Pendiente' : 'Vencido'}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard
          hover={true}
          className="p-3 cursor-pointer"
          onClick={() => setShowRutinaSelector(true)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="size-10 rounded-xl bg-[var(--accent-blue)]/10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-[var(--accent-blue)]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground">Rutina</p>
              <p className="text-[10px] text-muted-foreground truncate">{selectedRutina || 'Sin asignar'}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard
          hover={true}
          className="p-3 cursor-pointer"
          onClick={() => setShowNutricionSelector(true)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="size-10 rounded-xl bg-[var(--accent-violet)]/10 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-[var(--accent-violet)]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground">Nutrición</p>
              <p className="text-[10px] text-muted-foreground truncate">{selectedNutricion || 'Sin asignar'}</p>
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

      {/* Rutina Selector Bottom Sheet */}
      <AnimatePresence>
        {showRutinaSelector && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowRutinaSelector(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl border-t border-white/10 max-h-[70vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-antonio font-semibold tracking-wide text-foreground uppercase">
                  Seleccionar Rutina
                </h3>
                <button
                  onClick={() => setShowRutinaSelector(false)}
                  className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Rutinas List */}
              <div className="overflow-y-auto max-h-[calc(70vh-60px)] p-4 space-y-2">
                {mockRutinas.map((rutina) => (
                  <button
                    key={rutina.id}
                    onClick={() => handleSelectRutina(rutina.nombre)}
                    className={cn(
                      'w-full p-4 rounded-xl border text-left transition-all',
                      selectedRutina === rutina.nombre
                        ? 'bg-[var(--accent-blue)]/10 border-[var(--accent-blue)]/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {rutina.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {rutina.categoria} · {rutina.nivel} · {rutina.duracion}
                        </p>
                      </div>
                      {selectedRutina === rutina.nombre && (
                        <Check className="w-5 h-5 text-[var(--accent-blue)] shrink-0 ml-2" />
                      )}
                    </div>
                  </button>
                ))}

                {/* Crear Nueva Rutina */}
                <button
                  onClick={() => {
                    setShowRutinaSelector(false)
                    router.push('/rutinas?crear=true')
                  }}
                  className="w-full p-4 rounded-xl border border-dashed border-white/20 bg-transparent hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Crear nueva rutina</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Nutricion Selector Bottom Sheet */}
      <AnimatePresence>
        {showNutricionSelector && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowNutricionSelector(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl border-t border-white/10 max-h-[70vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-antonio font-semibold tracking-wide text-foreground uppercase">
                  Plan de Nutrición
                </h3>
                <button
                  onClick={() => setShowNutricionSelector(false)}
                  className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Planes List */}
              <div className="overflow-y-auto max-h-[calc(70vh-60px)] p-4 space-y-2">
                {mockPlanesNutricion.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handleSelectNutricion(plan.nombre)}
                    className={cn(
                      'w-full p-4 rounded-xl border text-left transition-all',
                      selectedNutricion === plan.nombre
                        ? 'bg-[var(--accent-violet)]/10 border-[var(--accent-violet)]/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {plan.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {plan.calorias_totales} kcal · P:{plan.proteinas_g}g · C:{plan.carbohidratos_g}g · G:{plan.grasas_g}g
                        </p>
                      </div>
                      {selectedNutricion === plan.nombre && (
                        <Check className="w-5 h-5 text-[var(--accent-violet)] shrink-0 ml-2" />
                      )}
                    </div>
                  </button>
                ))}

                {/* Crear Nuevo Plan */}
                <button
                  onClick={() => {
                    setShowNutricionSelector(false)
                    router.push('/rutinas?tab=nutricion&crear=true')
                  }}
                  className="w-full p-4 rounded-xl border border-dashed border-white/20 bg-transparent hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Crear nuevo plan</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
