'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, CalendarDays } from 'lucide-react'
import { SemanaSelector } from '@/components/calendario/semana-selector'
import { SesionCardV2 } from '@/components/calendario/sesion-card-v2'
import { DetalleSesionModal } from '@/components/calendario/detalle-sesion-modal'
import { NuevaSesionForm } from '@/components/calendario/nueva-sesion-form'
import { useAgenda } from '@/hooks/use-agenda'
import type { SesionCalendario, TipoSesion } from '@/types'

// Nombres cortos de los dias
const DIAS_SEMANA_CORTOS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function esHoy(fecha: string): boolean {
  return fecha === formatDate(new Date())
}

export default function AgendaPage() {
  const {
    sesionesPorDia,
    semanaActual,
    irSemanaSiguiente,
    irSemanaAnterior,
  } = useAgenda()

  // State for selected day (mobile view)
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(() => {
    const hoy = new Date()
    const dia = hoy.getDay()
    return dia === 0 ? 6 : dia - 1
  })

  // State for modals
  const [sesionDetalle, setSesionDetalle] = useState<SesionCalendario | null>(null)
  const [detalleOpen, setDetalleOpen] = useState(false)
  const [nuevaSesionOpen, setNuevaSesionOpen] = useState(false)

  // Generate week dates
  const fechasSemana = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const fecha = addDays(semanaActual, i)
      const fechaStr = formatDate(fecha)
      const sesionesDelDia = sesionesPorDia[fechaStr] || []
      const tipos: TipoSesion[] = [...new Set(sesionesDelDia.map(s => s.tipo))]

      return {
        fecha: fechaStr,
        dia: fecha.getDate(),
        diaSemana: DIAS_SEMANA_CORTOS[i],
        esHoy: esHoy(fechaStr),
        tipos,
      }
    })
  }, [semanaActual, sesionesPorDia])

  // Get month and year from selected day
  const fechaSeleccionada = addDays(semanaActual, diaSeleccionado)
  const mes = MESES[fechaSeleccionada.getMonth()]
  const anio = fechaSeleccionada.getFullYear()

  // Sessions for selected day
  const sesionesHoy = sesionesPorDia[fechasSemana[diaSeleccionado]?.fecha] || []

  function handleClickSesion(sesion: SesionCalendario) {
    setSesionDetalle(sesion)
    setDetalleOpen(true)
  }

  function handleCloseDetalle() {
    setDetalleOpen(false)
    setTimeout(() => setSesionDetalle(null), 200)
  }

  return (
    <div className="relative min-h-screen">
      {/* Ambient lighting effects */}
      <div className="ambient-light ambient-light-top" />
      <div className="ambient-light ambient-light-bottom" />

      {/* Main content */}
      <div className="relative z-10 space-y-4 pb-32">
        {/* Week selector card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SemanaSelector
            mes={mes}
            anio={anio}
            dias={fechasSemana}
            diaSeleccionado={diaSeleccionado}
            onSelectDia={setDiaSeleccionado}
            onSemanaAnterior={irSemanaAnterior}
            onSemanaSiguiente={irSemanaSiguiente}
          />
        </motion.div>

        {/* Today's agenda header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-between py-2 px-2"
        >
          <h3 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            AGENDA DE HOY
          </h3>
          <span className="text-[10px] mono-badge px-3 py-1 rounded-full font-bold backdrop-blur-sm">
            {sesionesHoy.length} SESION{sesionesHoy.length !== 1 ? 'ES' : ''}
          </span>
        </motion.div>

        {/* Sessions list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-4"
        >
          {sesionesHoy.length > 0 ? (
            sesionesHoy.map((sesion, index) => (
              <motion.div
                key={sesion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <SesionCardV2 sesion={sesion} onClick={handleClickSesion} />
              </motion.div>
            ))
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <CalendarDays className="size-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 font-medium">Sin sesiones programadas</p>
              <p className="text-zinc-600 text-sm mt-1">
                Toca + para agregar una nueva sesion
              </p>
            </div>
          )}
        </motion.div>

        {/* Spacer for FAB */}
        <div className="h-8" />
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setNuevaSesionOpen(true)}
        className="fixed bottom-28 right-6 z-30 size-14 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center text-black hover:scale-105 transition-all duration-300 group border border-white/40"
      >
        <Plus className="size-7 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
      </button>

      {/* Modals */}
      <DetalleSesionModal
        sesion={sesionDetalle}
        open={detalleOpen}
        onClose={handleCloseDetalle}
      />

      <NuevaSesionForm
        open={nuevaSesionOpen}
        onClose={() => setNuevaSesionOpen(false)}
      />
    </div>
  )
}
