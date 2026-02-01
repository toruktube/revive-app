'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCardStatic } from '@/components/glass'
import type { SesionCalendario } from '@/types'

interface SemanaSelectorProps {
  sesiones: SesionCalendario[]
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

function getMonday(d: Date): Date {
  const date = new Date(d)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  date.setDate(diff)
  date.setHours(0, 0, 0, 0)
  return date
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export function SemanaSelector({ sesiones, selectedDate, onDateSelect }: SemanaSelectorProps) {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()))
  const today = useMemo(() => new Date(), [])

  const weekDays = useMemo(() => {
    // Start from Sunday
    const sunday = addDays(weekStart, -1)
    return Array.from({ length: 7 }, (_, i) => addDays(sunday, i))
  }, [weekStart])

  const sesionesPerDay = useMemo(() => {
    const map: Record<string, SesionCalendario[]> = {}
    sesiones.forEach(sesion => {
      if (!map[sesion.fecha]) map[sesion.fecha] = []
      map[sesion.fecha].push(sesion)
    })
    return map
  }, [sesiones])

  const getSessionDots = (date: Date) => {
    const dateStr = formatDateISO(date)
    const daySesiones = sesionesPerDay[dateStr] || []
    const tipos = [...new Set(daySesiones.map(s => s.tipo))]
    return tipos.slice(0, 3)
  }

  const monthYear = useMemo(() => {
    const midWeek = addDays(weekStart, 3)
    return `${meses[midWeek.getMonth()]} ${midWeek.getFullYear()}`
  }, [weekStart])

  const prevWeek = () => setWeekStart(prev => addDays(prev, -7))
  const nextWeek = () => setWeekStart(prev => addDays(prev, 7))

  return (
    <GlassCardStatic className="mx-4 mb-4 p-4">
      {/* Month and Navigation */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-lg font-bold text-foreground tracking-wide">{monthYear}</h2>
        <div className="flex gap-2">
          <button
            onClick={prevWeek}
            className="size-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-foreground hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextWeek}
            className="size-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-foreground hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="flex justify-between items-start gap-1 overflow-x-auto no-scrollbar pb-1">
        {weekDays.map((day, index) => {
          const isToday = isSameDay(day, today)
          const isSelected = isSameDay(day, selectedDate)
          const dots = getSessionDots(day)
          const isPast = day < today && !isToday

          return (
            <div key={index} className="flex flex-col items-center min-w-[44px]">
              <span className={cn(
                'text-[10px] font-medium uppercase tracking-wider mb-2',
                isSelected ? 'text-foreground font-bold' : 'text-muted-foreground'
              )}>
                {diasSemana[day.getDay()]}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onDateSelect(day)}
                className={cn(
                  'size-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                  isSelected
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : isPast
                      ? 'text-muted-foreground hover:bg-white/10'
                      : 'text-foreground hover:bg-white/10'
                )}
              >
                <span className="relative z-10">{day.getDate()}</span>
              </motion.button>
              <div className="flex gap-1 mt-1.5 h-1">
                {dots.map((tipo, i) => (
                  <div
                    key={i}
                    className={cn(
                      'size-1 rounded-full',
                      tipo === 'presencial' && 'bg-[var(--accent-emerald)]',
                      tipo === 'online' && 'bg-[var(--accent-blue)]',
                      tipo === 'evaluacion' && 'bg-[var(--accent-violet)]'
                    )}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </GlassCardStatic>
  )
}
