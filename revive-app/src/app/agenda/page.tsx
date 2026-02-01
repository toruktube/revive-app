'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { SemanaSelector, SesionCard } from '@/components/agenda'
import { FAB } from '@/components/shared/fab'
import { EmptyState } from '@/components/shared/empty-state'
import { mockSesiones } from '@/lib/mock-data'

function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const sesionesDelDia = useMemo(() => {
    const dateStr = formatDateISO(selectedDate)
    return mockSesiones
      .filter(s => s.fecha === dateStr)
      .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))
  }, [selectedDate])

  const isToday = formatDateISO(selectedDate) === formatDateISO(new Date())

  return (
    <div className="flex flex-col">
      {/* Week Selector */}
      <SemanaSelector
        sesiones={mockSesiones}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {/* Sessions List */}
      <div className="px-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between py-2 px-2">
          <h3 className="text-foreground text-sm font-bold uppercase tracking-widest flex items-center gap-2">
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
                onClick={() => console.log('Open session:', sesion.id)}
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
              onClick: () => console.log('Add session')
            }}
          />
        )}

        {/* Spacer for FAB */}
        <div className="h-8" />
      </div>

      {/* FAB */}
      <FAB onClick={() => console.log('Add new session')} />
    </div>
  )
}
