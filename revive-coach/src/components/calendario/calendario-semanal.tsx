'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Plus,
  CheckCircle2,
  XCircle,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/glass'
import { GlassButton } from '@/components/glass'
import { GlassBadge } from '@/components/glass'
import { useAgenda } from '@/hooks/use-agenda'
import { SesionCard } from './sesion-card'
import { DetalleSesionModal } from './detalle-sesion-modal'
import { NuevaSesionForm } from './nueva-sesion-form'
import type { SesionCalendario } from '@/types'

// Nombres de los dias de la semana
const DIAS_SEMANA = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
const DIAS_SEMANA_COMPLETO = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

const MESES = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
]

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function getWeekLabel(monday: Date): string {
  const sunday = addDays(monday, 6)
  const diaInicio = monday.getDate()
  const mesInicio = MESES[monday.getMonth()]
  const diaFin = sunday.getDate()
  const mesFin = MESES[sunday.getMonth()]
  const anio = monday.getFullYear()

  if (monday.getMonth() === sunday.getMonth()) {
    return `${diaInicio} - ${diaFin} ${mesInicio} ${anio}`
  }
  return `${diaInicio} ${mesInicio} - ${diaFin} ${mesFin} ${anio}`
}

function esHoy(fecha: string): boolean {
  return fecha === formatDate(new Date())
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function CalendarioSemanal() {
  const {
    sesionesPorDia,
    semanaActual,
    irSemanaSiguiente,
    irSemanaAnterior,
    irHoy,
    totalSemana,
    completadas,
    canceladas,
  } = useAgenda()

  // Estado para el dia seleccionado (vista movil)
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(() => {
    const hoy = new Date()
    const dia = hoy.getDay()
    // Convertir de domingo=0 a lunes=0
    return dia === 0 ? 6 : dia - 1
  })

  // Estado para modales
  const [sesionDetalle, setSesionDetalle] = useState<SesionCalendario | null>(null)
  const [detalleOpen, setDetalleOpen] = useState(false)
  const [nuevaSesionOpen, setNuevaSesionOpen] = useState(false)

  function handleClickSesion(sesion: SesionCalendario) {
    setSesionDetalle(sesion)
    setDetalleOpen(true)
  }

  function handleCloseDetalle() {
    setDetalleOpen(false)
    setTimeout(() => setSesionDetalle(null), 200)
  }

  // Generar fechas de la semana
  const fechasSemana = Array.from({ length: 7 }, (_, i) => {
    const fecha = addDays(semanaActual, i)
    return {
      fecha: formatDate(fecha),
      dia: fecha.getDate(),
      diaSemana: DIAS_SEMANA[i],
      diaSemanaCompleto: DIAS_SEMANA_COMPLETO[i],
      esHoy: esHoy(formatDate(fecha)),
    }
  })

  // Sesiones del dia seleccionado (movil)
  const fechaMovil = fechasSemana[diaSeleccionado]
  const sesionesMovil = sesionesPorDia[fechaMovil.fecha] || []

  return (
    <>
      <GlassCard hover={false} className="p-0 overflow-hidden">
        {/* Header: Navegacion de semana */}
        <div className="px-4 pt-4 pb-3 lg:px-6 lg:pt-6 lg:pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/15">
                <CalendarDays className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {getWeekLabel(semanaActual)}
                </h3>
                <p className="text-xs text-muted-foreground">Agenda semanal</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <GlassButton
                variant="subtle"
                size="sm"
                onClick={irSemanaAnterior}
                aria-label="Semana anterior"
              >
                <ChevronLeft className="size-4" />
              </GlassButton>

              <GlassButton
                variant="default"
                size="sm"
                onClick={irHoy}
              >
                Hoy
              </GlassButton>

              <GlassButton
                variant="subtle"
                size="sm"
                onClick={irSemanaSiguiente}
                aria-label="Semana siguiente"
              >
                <ChevronRight className="size-4" />
              </GlassButton>

              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => setNuevaSesionOpen(true)}
                className="ml-1"
              >
                <Plus className="size-4" />
                <span className="hidden sm:inline">Nueva</span>
              </GlassButton>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <GlassBadge variant="default" size="sm">
              <BarChart3 className="size-3" />
              {totalSemana} sesiones
            </GlassBadge>
            <GlassBadge variant="success" size="sm">
              <CheckCircle2 className="size-3" />
              {completadas} completadas
            </GlassBadge>
            {canceladas > 0 && (
              <GlassBadge variant="danger" size="sm">
                <XCircle className="size-3" />
                {canceladas} canceladas
              </GlassBadge>
            )}
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-[var(--glass-border)]" />

        {/* ================================ */}
        {/* VISTA MOVIL: selector de dia + lista */}
        {/* ================================ */}
        <div className="lg:hidden">
          {/* Selector de dias (tabs horizontales) */}
          <div className="flex border-b border-[var(--glass-border)]">
            {fechasSemana.map((d, i) => (
              <button
                key={d.fecha}
                onClick={() => setDiaSeleccionado(i)}
                className={cn(
                  'flex-1 py-3 text-center transition-all duration-200 relative',
                  diaSeleccionado === i
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <p className="text-xs">{d.diaSemana}</p>
                <p className={cn(
                  'text-sm mt-0.5 font-bold',
                  d.esHoy && 'text-primary'
                )}>
                  {d.dia}
                </p>
                {/* Indicador de sesiones */}
                {(sesionesPorDia[d.fecha]?.length || 0) > 0 && (
                  <span className={cn(
                    'absolute bottom-1 left-1/2 -translate-x-1/2 size-1.5 rounded-full',
                    diaSeleccionado === i ? 'bg-primary' : 'bg-muted-foreground/50'
                  )} />
                )}
                {/* Underline activo */}
                {diaSeleccionado === i && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Lista de sesiones del dia seleccionado */}
          <div className="p-4">
            <p className="text-sm font-semibold text-foreground mb-3">
              {fechaMovil.diaSemanaCompleto} {fechaMovil.dia}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={fechaMovil.fecha}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {sesionesMovil.length > 0 ? (
                  sesionesMovil.map((sesion) => (
                    <SesionCard
                      key={sesion.id}
                      sesion={sesion}
                      onClick={handleClickSesion}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <CalendarDays className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Sin sesiones programadas
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================================ */}
        {/* VISTA DESKTOP: grid de 7 columnas */}
        {/* ================================ */}
        <div className="hidden lg:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-7 divide-x divide-[var(--glass-border)]"
          >
            {fechasSemana.map((d, i) => {
              const sesiones = sesionesPorDia[d.fecha] || []

              return (
                <motion.div
                  key={d.fecha}
                  variants={itemVariants}
                  className={cn(
                    'min-h-[320px]',
                    d.esHoy && 'bg-primary/[0.03]'
                  )}
                >
                  {/* Cabecera del dia */}
                  <div className={cn(
                    'px-3 py-2.5 text-center border-b border-[var(--glass-border)]',
                    d.esHoy && 'bg-primary/10'
                  )}>
                    <p className={cn(
                      'text-xs font-medium',
                      d.esHoy ? 'text-primary' : 'text-muted-foreground'
                    )}>
                      {d.diaSemana}
                    </p>
                    <p className={cn(
                      'text-lg font-bold mt-0.5',
                      d.esHoy
                        ? 'text-primary'
                        : 'text-foreground'
                    )}>
                      {d.dia}
                    </p>
                    {d.esHoy && (
                      <span className="inline-block text-[10px] font-semibold text-primary bg-primary/15 rounded-full px-1.5 py-0.5 mt-0.5">
                        HOY
                      </span>
                    )}
                  </div>

                  {/* Sesiones del dia */}
                  <div className="p-2 space-y-1.5">
                    {sesiones.length > 0 ? (
                      sesiones.map((sesion) => (
                        <SesionCard
                          key={sesion.id}
                          sesion={sesion}
                          onClick={handleClickSesion}
                        />
                      ))
                    ) : (
                      <div className="py-6 text-center">
                        <p className="text-xs text-muted-foreground/50">
                          Sin sesiones
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </GlassCard>

      {/* Modales */}
      <DetalleSesionModal
        sesion={sesionDetalle}
        open={detalleOpen}
        onClose={handleCloseDetalle}
      />

      <NuevaSesionForm
        open={nuevaSesionOpen}
        onClose={() => setNuevaSesionOpen(false)}
      />
    </>
  )
}
