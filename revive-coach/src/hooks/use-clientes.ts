'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Cliente, ClienteConEstado, ClienteConPago, ControlSemanal } from '@/types'
import { mockClientesConPago } from '@/lib/mock-data'

export interface ClienteFilters {
  search?: string
  tipo?: 'online' | 'presencial' | 'todos'
  estado?: 'activo' | 'en_pausa' | 'finalizado' | 'todos'
  adherenciaMin?: number
  ordenar?: 'nombre' | 'adherencia' | 'fecha' | 'actualizado'
  orden?: 'asc' | 'desc'
}

interface UseClientesResult {
  clientes: ClienteConPago[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
  filteredClientes: ClienteConPago[]
  filters: ClienteFilters
  setFilters: React.Dispatch<React.SetStateAction<ClienteFilters>>
  stats: {
    total: number
    online: number
    presencial: number
    activos: number
  }
}

export function useClientes(): UseClientesResult {
  const [clientes, setClientes] = useState<ClienteConPago[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [filters, setFilters] = useState<ClienteFilters>({
    tipo: 'todos',
    estado: 'activo',
    ordenar: 'actualizado',
    orden: 'desc'
  })

  const fetchClientes = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Check if Supabase is configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url') {
        // Use mock data when Supabase is not configured
        console.log('Using mock data - Supabase not configured')
        setClientes(mockClientesConPago)
        setIsLoading(false)
        return
      }

      const supabase = createClient()

      // Fetch clients with their latest control
      const { data: clientesData, error: clientesError } = await supabase
        .from('clientes')
        .select(`
          *,
          controles_semanales (
            id,
            fecha,
            peso,
            adherencia_entrenamiento,
            adherencia_nutricion,
            horas_sueno_promedio,
            nivel_energia,
            nivel_estres,
            estado_animo,
            motivacion,
            created_at
          ),
          alertas (
            id,
            resuelta
          )
        `)
        .order('updated_at', { ascending: false })

      if (clientesError) {
        throw clientesError
      }

      // Transform data to include computed fields
      const transformedClientes: ClienteConEstado[] = (clientesData || []).map(cliente => {
        const controles = cliente.controles_semanales || []
        const alertas = cliente.alertas || []

        // Get latest control
        const ultimoControl = controles.length > 0
          ? controles.sort((a: ControlSemanal, b: ControlSemanal) =>
              new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
            )[0] as ControlSemanal
          : undefined

        // Calculate average adherence
        const recentControles = controles.slice(0, 4)
        const adherenciaPromedio = recentControles.length > 0
          ? Math.round(
              recentControles.reduce((acc: number, c: ControlSemanal) =>
                acc + ((c.adherencia_entrenamiento || 0) + (c.adherencia_nutricion || 0)) / 2, 0
              ) / recentControles.length
            )
          : undefined

        // Calculate trend
        let tendencia: 'subiendo' | 'estable' | 'bajando' | undefined = undefined
        if (controles.length >= 2) {
          const last = controles[0]
          const prev = controles[1]
          const lastAdh = ((last?.adherencia_entrenamiento || 0) + (last?.adherencia_nutricion || 0)) / 2
          const prevAdh = ((prev?.adherencia_entrenamiento || 0) + (prev?.adherencia_nutricion || 0)) / 2
          const diff = lastAdh - prevAdh
          if (diff > 5) tendencia = 'subiendo'
          else if (diff < -5) tendencia = 'bajando'
          else tendencia = 'estable'
        }

        // Count active alerts
        const alertasActivas = alertas.filter((a: { resuelta: boolean }) => !a.resuelta).length

        return {
          ...cliente,
          ultimoControl,
          adherenciaPromedio,
          tendencia,
          alertasActivas
        } as ClienteConEstado
      })

      setClientes(transformedClientes)
    } catch (err) {
      console.error('Error fetching clientes:', err)
      setError(err instanceof Error ? err : new Error('Error desconocido'))
      // Fallback to mock data on error
      setClientes(mockClientesConPago)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClientes()
  }, [fetchClientes])

  // Apply filters and sorting
  const filteredClientes = useMemo(() => {
    let result = [...clientes]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(c =>
        c.nombre.toLowerCase().includes(searchLower) ||
        c.apellidos?.toLowerCase().includes(searchLower) ||
        c.email?.toLowerCase().includes(searchLower)
      )
    }

    // Tipo filter
    if (filters.tipo && filters.tipo !== 'todos') {
      result = result.filter(c => c.tipo === filters.tipo)
    }

    // Estado filter
    if (filters.estado && filters.estado !== 'todos') {
      result = result.filter(c => c.estado === filters.estado)
    }

    // Adherencia min filter
    if (filters.adherenciaMin !== undefined) {
      result = result.filter(c =>
        (c.adherenciaPromedio || 0) >= (filters.adherenciaMin || 0)
      )
    }

    // Sorting
    const sortOrder = filters.orden === 'asc' ? 1 : -1
    result.sort((a, b) => {
      switch (filters.ordenar) {
        case 'nombre':
          return sortOrder * a.nombre.localeCompare(b.nombre)
        case 'adherencia':
          return sortOrder * ((b.adherenciaPromedio || 0) - (a.adherenciaPromedio || 0))
        case 'fecha':
          return sortOrder * (new Date(b.fecha_inicio || 0).getTime() - new Date(a.fecha_inicio || 0).getTime())
        case 'actualizado':
        default:
          return sortOrder * (new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      }
    })

    return result
  }, [clientes, filters])

  // Stats
  const stats = useMemo(() => ({
    total: clientes.length,
    online: clientes.filter(c => c.tipo === 'online').length,
    presencial: clientes.filter(c => c.tipo === 'presencial').length,
    activos: clientes.filter(c => c.estado === 'activo').length
  }), [clientes])

  return {
    clientes,
    isLoading,
    error,
    refetch: fetchClientes,
    filteredClientes,
    filters,
    setFilters,
    stats
  }
}
