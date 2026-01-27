'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Cliente, ClienteConEstado, ControlSemanal } from '@/types'

export interface ClienteFilters {
  search?: string
  tipo?: 'online' | 'presencial' | 'todos'
  estado?: 'activo' | 'en_pausa' | 'finalizado' | 'todos'
  adherenciaMin?: number
  ordenar?: 'nombre' | 'adherencia' | 'fecha' | 'actualizado'
  orden?: 'asc' | 'desc'
}

interface UseClientesResult {
  clientes: ClienteConEstado[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
  filteredClientes: ClienteConEstado[]
  filters: ClienteFilters
  setFilters: React.Dispatch<React.SetStateAction<ClienteFilters>>
  stats: {
    total: number
    online: number
    presencial: number
    activos: number
  }
}

// Datos mock para desarrollo sin Supabase
const mockClientes: ClienteConEstado[] = [
  {
    id: '1',
    nombre: 'María',
    apellidos: 'García López',
    email: 'maria@email.com',
    telefono: '+34 612 345 678',
    tipo: 'online',
    estado: 'activo',
    fecha_inicio: '2024-10-15',
    objetivo_principal: 'Pérdida de grasa',
    nivel: 'medio',
    created_at: '2024-10-15T10:00:00Z',
    updated_at: '2025-01-24T10:00:00Z',
    adherenciaPromedio: 92,
    tendencia: 'subiendo',
    alertasActivas: 0,
    ultimoControl: {
      id: 'c1',
      cliente_id: '1',
      fecha: '2025-01-22',
      peso: 65.5,
      adherencia_entrenamiento: 95,
      adherencia_nutricion: 88,
      horas_sueno_promedio: 7.5,
      nivel_energia: 4,
      nivel_estres: 2,
      estado_animo: 4,
      motivacion: 8,
      created_at: '2025-01-22T10:00:00Z'
    }
  },
  {
    id: '2',
    nombre: 'Carlos',
    apellidos: 'Rodríguez Martín',
    email: 'carlos@email.com',
    telefono: '+34 623 456 789',
    tipo: 'presencial',
    estado: 'activo',
    fecha_inicio: '2024-08-01',
    objetivo_principal: 'Ganancia muscular',
    nivel: 'avanzado',
    created_at: '2024-08-01T10:00:00Z',
    updated_at: '2025-01-20T10:00:00Z',
    adherenciaPromedio: 45,
    tendencia: 'bajando',
    alertasActivas: 2,
    ultimoControl: {
      id: 'c2',
      cliente_id: '2',
      fecha: '2025-01-18',
      peso: 82.0,
      adherencia_entrenamiento: 40,
      adherencia_nutricion: 50,
      horas_sueno_promedio: 5.5,
      nivel_energia: 2,
      nivel_estres: 4,
      estado_animo: 2,
      motivacion: 4,
      created_at: '2025-01-18T10:00:00Z'
    }
  },
  {
    id: '3',
    nombre: 'Laura',
    apellidos: 'Martínez Sánchez',
    email: 'laura@email.com',
    telefono: '+34 634 567 890',
    tipo: 'online',
    estado: 'activo',
    fecha_inicio: '2024-11-20',
    objetivo_principal: 'Tonificación',
    nivel: 'inicial',
    created_at: '2024-11-20T10:00:00Z',
    updated_at: '2025-01-24T14:00:00Z',
    adherenciaPromedio: 78,
    tendencia: 'estable',
    alertasActivas: 0,
    ultimoControl: {
      id: 'c3',
      cliente_id: '3',
      fecha: '2025-01-24',
      peso: 58.0,
      adherencia_entrenamiento: 80,
      adherencia_nutricion: 75,
      horas_sueno_promedio: 7.0,
      nivel_energia: 4,
      nivel_estres: 3,
      estado_animo: 4,
      motivacion: 7,
      created_at: '2025-01-24T10:00:00Z'
    }
  },
  {
    id: '4',
    nombre: 'Pedro',
    apellidos: 'López García',
    email: 'pedro@email.com',
    telefono: '+34 645 678 901',
    tipo: 'presencial',
    estado: 'activo',
    fecha_inicio: '2024-06-10',
    objetivo_principal: 'Competición - Culturismo',
    nivel: 'competicion',
    created_at: '2024-06-10T10:00:00Z',
    updated_at: '2025-01-23T16:00:00Z',
    adherenciaPromedio: 88,
    tendencia: 'subiendo',
    alertasActivas: 0,
    ultimoControl: {
      id: 'c4',
      cliente_id: '4',
      fecha: '2025-01-23',
      peso: 78.5,
      adherencia_entrenamiento: 92,
      adherencia_nutricion: 85,
      horas_sueno_promedio: 8.0,
      nivel_energia: 5,
      nivel_estres: 2,
      estado_animo: 5,
      motivacion: 9,
      created_at: '2025-01-23T10:00:00Z'
    }
  },
  {
    id: '5',
    nombre: 'Ana',
    apellidos: 'Fernández Ruiz',
    email: 'ana@email.com',
    telefono: '+34 656 789 012',
    tipo: 'online',
    estado: 'activo',
    fecha_inicio: '2024-12-01',
    objetivo_principal: 'Salud general',
    nivel: 'inicial',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2025-01-21T12:00:00Z',
    adherenciaPromedio: 65,
    tendencia: 'estable',
    alertasActivas: 1,
    ultimoControl: {
      id: 'c5',
      cliente_id: '5',
      fecha: '2025-01-21',
      peso: 70.0,
      adherencia_entrenamiento: 70,
      adherencia_nutricion: 60,
      horas_sueno_promedio: 6.0,
      nivel_energia: 3,
      nivel_estres: 3,
      estado_animo: 3,
      motivacion: 6,
      created_at: '2025-01-21T10:00:00Z'
    }
  },
  {
    id: '6',
    nombre: 'Javier',
    apellidos: 'Gómez Torres',
    email: 'javier@email.com',
    telefono: '+34 667 890 123',
    tipo: 'presencial',
    estado: 'en_pausa',
    fecha_inicio: '2024-09-15',
    objetivo_principal: 'Rehabilitación lesión',
    nivel: 'medio',
    notas_privadas: 'Pausa por viaje de trabajo. Regresa en febrero.',
    created_at: '2024-09-15T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    adherenciaPromedio: 72,
    tendencia: 'estable',
    alertasActivas: 0
  },
  {
    id: '7',
    nombre: 'Sofía',
    apellidos: 'Díaz Moreno',
    email: 'sofia@email.com',
    telefono: '+34 678 901 234',
    tipo: 'online',
    estado: 'activo',
    fecha_inicio: '2025-01-05',
    objetivo_principal: 'Preparación maratón',
    nivel: 'avanzado',
    created_at: '2025-01-05T10:00:00Z',
    updated_at: '2025-01-24T09:00:00Z',
    adherenciaPromedio: 95,
    tendencia: 'subiendo',
    alertasActivas: 0,
    ultimoControl: {
      id: 'c7',
      cliente_id: '7',
      fecha: '2025-01-24',
      peso: 55.0,
      adherencia_entrenamiento: 98,
      adherencia_nutricion: 92,
      horas_sueno_promedio: 8.5,
      nivel_energia: 5,
      nivel_estres: 1,
      estado_animo: 5,
      motivacion: 10,
      created_at: '2025-01-24T09:00:00Z'
    }
  },
  {
    id: '8',
    nombre: 'Miguel',
    apellidos: 'Herrera Vega',
    email: 'miguel@email.com',
    telefono: '+34 689 012 345',
    tipo: 'presencial',
    estado: 'activo',
    fecha_inicio: '2024-07-20',
    objetivo_principal: 'Pérdida de peso',
    nivel: 'inicial',
    created_at: '2024-07-20T10:00:00Z',
    updated_at: '2025-01-22T11:00:00Z',
    adherenciaPromedio: 55,
    tendencia: 'bajando',
    alertasActivas: 3,
    ultimoControl: {
      id: 'c8',
      cliente_id: '8',
      fecha: '2025-01-16',
      peso: 95.0,
      adherencia_entrenamiento: 50,
      adherencia_nutricion: 60,
      horas_sueno_promedio: 5.0,
      nivel_energia: 2,
      nivel_estres: 4,
      estado_animo: 2,
      motivacion: 4,
      created_at: '2025-01-16T10:00:00Z'
    }
  }
]

export function useClientes(): UseClientesResult {
  const [clientes, setClientes] = useState<ClienteConEstado[]>([])
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
        setClientes(mockClientes)
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
      setClientes(mockClientes)
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
