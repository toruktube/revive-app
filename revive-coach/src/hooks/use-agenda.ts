'use client'

import { useState, useMemo } from 'react'
import { mockSesiones } from '@/lib/mock-data'
import type { SesionCalendario } from '@/types'

interface UseAgendaResult {
  sesiones: SesionCalendario[]
  sesionesPorDia: Record<string, SesionCalendario[]>
  semanaActual: Date
  setSemanaActual: (date: Date) => void
  irSemanaSiguiente: () => void
  irSemanaAnterior: () => void
  irHoy: () => void
  sesionesDelDia: (fecha: string) => SesionCalendario[]
  totalSemana: number
  completadas: number
  canceladas: number
}

function getMonday(d: Date): Date {
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d)
  monday.setDate(diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function useAgenda(): UseAgendaResult {
  const [semanaActual, setSemanaActual] = useState<Date>(getMonday(new Date()))

  const sesiones = mockSesiones

  const sesionesPorDia = useMemo(() => {
    const map: Record<string, SesionCalendario[]> = {}
    for (let i = 0; i < 7; i++) {
      const fecha = formatDate(addDays(semanaActual, i))
      map[fecha] = sesiones
        .filter(s => s.fecha === fecha)
        .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))
    }
    return map
  }, [sesiones, semanaActual])

  const sesionesDelDia = (fecha: string) => {
    return sesiones
      .filter(s => s.fecha === fecha)
      .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))
  }

  const irSemanaSiguiente = () => {
    setSemanaActual(prev => addDays(prev, 7))
  }

  const irSemanaAnterior = () => {
    setSemanaActual(prev => addDays(prev, -7))
  }

  const irHoy = () => {
    setSemanaActual(getMonday(new Date()))
  }

  const totalSemana = Object.values(sesionesPorDia).flat().length
  const completadas = Object.values(sesionesPorDia).flat().filter(s => s.estado === 'completada').length
  const canceladas = Object.values(sesionesPorDia).flat().filter(s => s.estado === 'cancelada').length

  return {
    sesiones,
    sesionesPorDia,
    semanaActual,
    setSemanaActual,
    irSemanaSiguiente,
    irSemanaAnterior,
    irHoy,
    sesionesDelDia,
    totalSemana,
    completadas,
    canceladas,
  }
}
