'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { SemanaSelector, SesionCard, SesionModal, NotaSesionModal } from '@/components/agenda'
import { FAB } from '@/components/shared/fab'
import { EmptyState } from '@/components/shared/empty-state'
import { mockSesiones } from '@/lib/mock-data'
import type { SesionCalendario, NotaSesion } from '@/types'

function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [sesiones, setSesiones] = useState<SesionCalendario[]>(mockSesiones)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sesionToEdit, setSesionToEdit] = useState<SesionCalendario | null>(null)

  // Nota/Report modal state
  const [isNotaModalOpen, setIsNotaModalOpen] = useState(false)
  const [sesionForNota, setSesionForNota] = useState<SesionCalendario | null>(null)

  const sesionesDelDia = useMemo(() => {
    const dateStr = formatDateISO(selectedDate)
    return sesiones
      .filter(s => s.fecha === dateStr)
      .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))
  }, [selectedDate, sesiones])

  const isToday = formatDateISO(selectedDate) === formatDateISO(new Date())

  const handleOpenNewSession = () => {
    setSesionToEdit(null)
    setIsModalOpen(true)
  }

  const handleOpenEditSession = (sesion: SesionCalendario) => {
    setSesionToEdit(sesion)
    setIsModalOpen(true)
  }

  const handleSaveSesion = (sesionData: Omit<SesionCalendario, 'id'> & { id?: string }) => {
    if (sesionData.id) {
      // Editing existing session
      setSesiones(prev => prev.map(s =>
        s.id === sesionData.id ? { ...sesionData, id: sesionData.id } as SesionCalendario : s
      ))
    } else {
      // Creating new session
      const newSesion: SesionCalendario = {
        ...sesionData,
        id: `s${Date.now()}`,
      } as SesionCalendario
      setSesiones(prev => [...prev, newSesion])
    }
  }

  const handleOpenCreateReport = (sesion: SesionCalendario) => {
    setSesionForNota(sesion)
    setIsNotaModalOpen(true)
  }

  const handleSaveNota = (notaData: Omit<NotaSesion, 'id' | 'created_at'> & { id?: string }) => {
    // In a real app, this would save to a database
    // For now, just log it
    console.log('Nota saved:', {
      ...notaData,
      id: notaData.id || `n${Date.now()}`,
      created_at: new Date().toISOString(),
    })
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 mb-4">
        <div>
          <h2 className="text-2xl font-antonio font-semibold tracking-wide text-foreground">AGENDA</h2>
          <p className="text-sm text-muted-foreground">
            {sesiones.length} sesiones programadas
          </p>
        </div>
      </div>

      {/* Week Selector */}
      <SemanaSelector
        sesiones={sesiones}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {/* Sessions List */}
      <div className="px-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between py-2 px-2">
          <h3 className="text-foreground text-base font-antonio font-medium uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            {isToday ? "Hoy" : selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}
          </h3>
          {sesionesDelDia.length > 0 && (
            <span className="text-[10px] mono-badge px-3 py-1 rounded-full font-bold backdrop-blur-sm uppercase">
              {sesionesDelDia.length} {sesionesDelDia.length === 1 ? 'sesión' : 'sesiones'}
            </span>
          )}
        </div>

        {/* Sessions or Empty State */}
        {sesionesDelDia.length > 0 ? (
          <motion.div className="space-y-4">
            {sesionesDelDia.map((sesion, index) => (
              <SesionCard
                key={sesion.id}
                sesion={sesion}
                index={index}
                onClick={() => handleOpenEditSession(sesion)}
                onCreateReport={() => handleOpenCreateReport(sesion)}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={Calendar}
            title="Sin sesiones"
            description="No hay sesiones programadas para este día"
            action={{
              label: 'Agendar sesión',
              onClick: handleOpenNewSession
            }}
          />
        )}

        {/* Spacer for FAB */}
        <div className="h-8" />
      </div>

      {/* FAB */}
      <FAB onClick={handleOpenNewSession} />

      {/* Session Modal */}
      <SesionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sesion={sesionToEdit}
        onSave={handleSaveSesion}
        selectedDate={selectedDate}
      />

      {/* Report/Nota Modal */}
      <NotaSesionModal
        isOpen={isNotaModalOpen}
        onClose={() => {
          setIsNotaModalOpen(false)
          setSesionForNota(null)
        }}
        onSave={handleSaveNota}
        sesionVinculada={sesionForNota}
      />
    </div>
  )
}
