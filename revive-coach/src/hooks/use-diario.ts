'use client'

import { useState, useMemo } from 'react'
import { mockNotasSesion } from '@/lib/mock-data'
import type { NotaSesion } from '@/types'

interface DiarioFilters {
  clienteId?: string
  fechaDesde?: string
  fechaHasta?: string
  energiaMin?: number
}

interface UseDiarioResult {
  notas: NotaSesion[]
  filteredNotas: NotaSesion[]
  filters: DiarioFilters
  setFilters: React.Dispatch<React.SetStateAction<DiarioFilters>>
  agregarNota: (nota: Omit<NotaSesion, 'id' | 'created_at'>) => void
  stats: {
    totalNotas: number
    energiaPromedio: number
    animoPromedio: number
    adherenciaPromedio: number
  }
}

export function useDiario(): UseDiarioResult {
  const [notas, setNotas] = useState<NotaSesion[]>(mockNotasSesion)
  const [filters, setFilters] = useState<DiarioFilters>({})

  const filteredNotas = useMemo(() => {
    let result = [...notas]

    if (filters.clienteId) {
      result = result.filter(n => n.cliente_id === filters.clienteId)
    }

    if (filters.fechaDesde) {
      result = result.filter(n => n.fecha >= filters.fechaDesde!)
    }

    if (filters.fechaHasta) {
      result = result.filter(n => n.fecha <= filters.fechaHasta!)
    }

    if (filters.energiaMin) {
      result = result.filter(n => n.energia >= filters.energiaMin!)
    }

    return result.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  }, [notas, filters])

  const agregarNota = (nota: Omit<NotaSesion, 'id' | 'created_at'>) => {
    const nuevaNota: NotaSesion = {
      ...nota,
      id: `n-${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    setNotas(prev => [nuevaNota, ...prev])
  }

  const stats = useMemo(() => {
    const total = filteredNotas.length
    if (total === 0) {
      return { totalNotas: 0, energiaPromedio: 0, animoPromedio: 0, adherenciaPromedio: 0 }
    }

    return {
      totalNotas: total,
      energiaPromedio: Math.round((filteredNotas.reduce((sum, n) => sum + n.energia, 0) / total) * 10) / 10,
      animoPromedio: Math.round((filteredNotas.reduce((sum, n) => sum + n.estado_animo, 0) / total) * 10) / 10,
      adherenciaPromedio: Math.round((filteredNotas.reduce((sum, n) => sum + n.adherencia, 0) / total) * 10) / 10,
    }
  }, [filteredNotas])

  return {
    notas,
    filteredNotas,
    filters,
    setFilters,
    agregarNota,
    stats,
  }
}
