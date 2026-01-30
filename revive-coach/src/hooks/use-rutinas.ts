'use client'

import { useState } from 'react'
import { mockRutinas, mockPlantillasRutina } from '@/lib/mock-data'
import type { RutinaEntrenamiento } from '@/types'

interface UseRutinasResult {
  rutinas: RutinaEntrenamiento[]
  plantillas: RutinaEntrenamiento[]
  rutinasCliente: (clienteId: string) => RutinaEntrenamiento[]
  rutinaActiva: (clienteId: string) => RutinaEntrenamiento | undefined
  agregarRutina: (rutina: Omit<RutinaEntrenamiento, 'id' | 'created_at'>) => void
}

export function useRutinas(): UseRutinasResult {
  const [rutinas, setRutinas] = useState<RutinaEntrenamiento[]>(mockRutinas)
  const plantillas = mockPlantillasRutina

  const rutinasCliente = (clienteId: string) => {
    return rutinas.filter(r => r.cliente_id === clienteId)
  }

  const rutinaActiva = (clienteId: string) => {
    return rutinas.find(r => r.cliente_id === clienteId && r.activa)
  }

  const agregarRutina = (rutina: Omit<RutinaEntrenamiento, 'id' | 'created_at'>) => {
    const nueva: RutinaEntrenamiento = {
      ...rutina,
      id: `r-${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    setRutinas(prev => [nueva, ...prev])
  }

  return {
    rutinas,
    plantillas,
    rutinasCliente,
    rutinaActiva,
    agregarRutina,
  }
}
