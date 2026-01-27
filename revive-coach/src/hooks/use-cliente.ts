'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type {
  Cliente,
  ClienteConEstado,
  ControlSemanal,
  PlanEntrenamiento,
  PlanNutricion,
  ParqEvaluacion,
  Alerta
} from '@/types'

export interface ClienteCompleto extends ClienteConEstado {
  controles: ControlSemanal[]
  planEntrenamiento?: PlanEntrenamiento
  planNutricion?: PlanNutricion
  evaluacionParq?: ParqEvaluacion
  alertas: Alerta[]
}

// Mock data for a single client
const mockClienteCompleto: ClienteCompleto = {
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
  notas_privadas: 'Cliente muy comprometida. Prefiere entrenar por las mañanas.',
  created_at: '2024-10-15T10:00:00Z',
  updated_at: '2025-01-24T10:00:00Z',
  adherenciaPromedio: 92,
  tendencia: 'subiendo',
  alertasActivas: 0,
  controles: [
    {
      id: 'c1-1',
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
      sensaciones: 'Me sentí muy bien esta semana, con mucha energía.',
      created_at: '2025-01-22T10:00:00Z'
    },
    {
      id: 'c1-2',
      cliente_id: '1',
      fecha: '2025-01-15',
      peso: 66.0,
      adherencia_entrenamiento: 90,
      adherencia_nutricion: 85,
      horas_sueno_promedio: 7.0,
      nivel_energia: 4,
      nivel_estres: 3,
      estado_animo: 4,
      motivacion: 8,
      sensaciones: 'Semana intensa pero productiva.',
      created_at: '2025-01-15T10:00:00Z'
    },
    {
      id: 'c1-3',
      cliente_id: '1',
      fecha: '2025-01-08',
      peso: 66.8,
      adherencia_entrenamiento: 92,
      adherencia_nutricion: 82,
      horas_sueno_promedio: 6.5,
      nivel_energia: 3,
      nivel_estres: 3,
      estado_animo: 3,
      motivacion: 7,
      sensaciones: 'Un poco cansada pero manteniendo la rutina.',
      created_at: '2025-01-08T10:00:00Z'
    },
    {
      id: 'c1-4',
      cliente_id: '1',
      fecha: '2025-01-01',
      peso: 67.2,
      adherencia_entrenamiento: 88,
      adherencia_nutricion: 75,
      horas_sueno_promedio: 6.0,
      nivel_energia: 3,
      nivel_estres: 4,
      estado_animo: 3,
      motivacion: 6,
      sensaciones: 'Las fiestas afectaron un poco la nutrición.',
      created_at: '2025-01-01T10:00:00Z'
    },
    {
      id: 'c1-5',
      cliente_id: '1',
      fecha: '2024-12-25',
      peso: 67.5,
      adherencia_entrenamiento: 85,
      adherencia_nutricion: 70,
      horas_sueno_promedio: 6.5,
      nivel_energia: 3,
      nivel_estres: 3,
      estado_animo: 4,
      motivacion: 7,
      created_at: '2024-12-25T10:00:00Z'
    },
    {
      id: 'c1-6',
      cliente_id: '1',
      fecha: '2024-12-18',
      peso: 67.8,
      adherencia_entrenamiento: 90,
      adherencia_nutricion: 85,
      horas_sueno_promedio: 7.0,
      nivel_energia: 4,
      nivel_estres: 2,
      estado_animo: 4,
      motivacion: 8,
      created_at: '2024-12-18T10:00:00Z'
    }
  ],
  planEntrenamiento: {
    id: 'pe1',
    cliente_id: '1',
    nombre: 'Full Body - Fase de Definición',
    descripcion: 'Entrenamiento de cuerpo completo 4 días/semana. Enfoque en mantenimiento muscular y gasto calórico.',
    fase: 'Definición',
    fecha_inicio: '2025-01-01',
    fecha_fin: '2025-02-28',
    activo: true,
    created_at: '2025-01-01T10:00:00Z'
  },
  planNutricion: {
    id: 'pn1',
    cliente_id: '1',
    nombre: 'Déficit Moderado',
    calorias_objetivo: 1650,
    proteinas_g: 130,
    carbohidratos_g: 150,
    grasas_g: 55,
    comidas_por_dia: 5,
    notas: 'Priorizar proteínas. Carbohidratos alrededor del entrenamiento.',
    activo: true,
    created_at: '2025-01-01T10:00:00Z'
  },
  evaluacionParq: {
    id: 'parq1',
    cliente_id: '1',
    fecha: '2024-10-15',
    peso: 72.0,
    altura: 165,
    porcentaje_grasa: 28,
    lesiones: 'Molestia leve en rodilla derecha (antigua)',
    condiciones_medicas: 'Ninguna',
    medicamentos: 'Ninguno',
    horas_sueno_promedio: 6.5,
    nivel_estres: 3,
    ocupacion: 'Diseñadora Gráfica',
    horario_trabajo: '9:00 - 18:00',
    disponibilidad_entrenamiento: 'Mañanas antes del trabajo (7:00-8:30) y fines de semana',
    dieta_actual: 'Sin dieta estructurada, saltaba comidas frecuentemente',
    alergias: 'Ninguna conocida',
    created_at: '2024-10-15T10:00:00Z'
  },
  alertas: [],
  ultimoControl: {
    id: 'c1-1',
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
    sensaciones: 'Me sentí muy bien esta semana, con mucha energía.',
    created_at: '2025-01-22T10:00:00Z'
  }
}

// Mock data for other clients
const mockClientes: Record<string, ClienteCompleto> = {
  '1': mockClienteCompleto,
  '2': {
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
    notas_privadas: 'Necesita más seguimiento. Tendencia a saltarse comidas.',
    created_at: '2024-08-01T10:00:00Z',
    updated_at: '2025-01-20T10:00:00Z',
    adherenciaPromedio: 45,
    tendencia: 'bajando',
    alertasActivas: 2,
    controles: [
      {
        id: 'c2-1',
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
        sensaciones: 'Semana complicada, mucho trabajo.',
        created_at: '2025-01-18T10:00:00Z'
      },
      {
        id: 'c2-2',
        cliente_id: '2',
        fecha: '2025-01-11',
        peso: 81.5,
        adherencia_entrenamiento: 55,
        adherencia_nutricion: 45,
        horas_sueno_promedio: 5.0,
        nivel_energia: 2,
        nivel_estres: 4,
        estado_animo: 3,
        motivacion: 5,
        created_at: '2025-01-11T10:00:00Z'
      }
    ],
    planEntrenamiento: {
      id: 'pe2',
      cliente_id: '2',
      nombre: 'Push/Pull/Legs - Hipertrofia',
      descripcion: 'Rutina PPL 6 días/semana. Enfoque en volumen y sobrecarga progresiva.',
      fase: 'Volumen',
      fecha_inicio: '2024-12-01',
      fecha_fin: '2025-02-28',
      activo: true,
      created_at: '2024-12-01T10:00:00Z'
    },
    planNutricion: {
      id: 'pn2',
      cliente_id: '2',
      nombre: 'Superávit Controlado',
      calorias_objetivo: 3200,
      proteinas_g: 180,
      carbohidratos_g: 400,
      grasas_g: 90,
      comidas_por_dia: 6,
      notas: 'Importante cumplir con todas las comidas. Suplementar con batido post-entreno.',
      activo: true,
      created_at: '2024-12-01T10:00:00Z'
    },
    alertas: [
      {
        id: 'a1',
        cliente_id: '2',
        tipo: 'adherencia_baja',
        mensaje: 'Adherencia por debajo del 50% durante 2 semanas',
        prioridad: 'alta',
        resuelta: false,
        created_at: '2025-01-19T10:00:00Z'
      },
      {
        id: 'a2',
        cliente_id: '2',
        tipo: 'sueno_bajo',
        mensaje: 'Promedio de sueño inferior a 6 horas',
        prioridad: 'media',
        resuelta: false,
        created_at: '2025-01-19T10:00:00Z'
      }
    ],
    ultimoControl: {
      id: 'c2-1',
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
      sensaciones: 'Semana complicada, mucho trabajo.',
      created_at: '2025-01-18T10:00:00Z'
    }
  }
}

interface UseClienteResult {
  cliente: ClienteCompleto | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useCliente(clienteId: string): UseClienteResult {
  const [cliente, setCliente] = useState<ClienteCompleto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCliente = useCallback(async () => {
    if (!clienteId) {
      setCliente(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Check if Supabase is configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url') {
        // Use mock data when Supabase is not configured
        console.log('Using mock data for client - Supabase not configured')
        const mockCliente = mockClientes[clienteId]
        if (mockCliente) {
          setCliente(mockCliente)
        } else {
          // Generate a basic mock for unknown IDs
          setCliente({
            ...mockClienteCompleto,
            id: clienteId,
            nombre: `Cliente ${clienteId}`
          })
        }
        setIsLoading(false)
        return
      }

      const supabase = createClient()

      // Fetch complete client data
      const { data: clienteData, error: clienteError } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', clienteId)
        .single()

      if (clienteError) throw clienteError
      if (!clienteData) throw new Error('Cliente no encontrado')

      // Fetch related data in parallel
      const [
        { data: controlesData },
        { data: planEntData },
        { data: planNutData },
        { data: parqData },
        { data: alertasData }
      ] = await Promise.all([
        supabase
          .from('controles_semanales')
          .select('*')
          .eq('cliente_id', clienteId)
          .order('fecha', { ascending: false }),
        supabase
          .from('planes_entrenamiento')
          .select('*')
          .eq('cliente_id', clienteId)
          .eq('activo', true)
          .single(),
        supabase
          .from('planes_nutricion')
          .select('*')
          .eq('cliente_id', clienteId)
          .eq('activo', true)
          .single(),
        supabase
          .from('parq_evaluaciones')
          .select('*')
          .eq('cliente_id', clienteId)
          .order('fecha', { ascending: false })
          .limit(1)
          .single(),
        supabase
          .from('alertas')
          .select('*')
          .eq('cliente_id', clienteId)
          .eq('resuelta', false)
          .order('created_at', { ascending: false })
      ])

      const controles = (controlesData || []) as ControlSemanal[]

      // Calculate computed fields
      const ultimoControl = controles[0]

      const recentControles = controles.slice(0, 4)
      const adherenciaPromedio = recentControles.length > 0
        ? Math.round(
            recentControles.reduce((acc, c) =>
              acc + ((c.adherencia_entrenamiento || 0) + (c.adherencia_nutricion || 0)) / 2, 0
            ) / recentControles.length
          )
        : undefined

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

      const clienteCompleto: ClienteCompleto = {
        ...clienteData,
        controles,
        planEntrenamiento: planEntData as PlanEntrenamiento | undefined,
        planNutricion: planNutData as PlanNutricion | undefined,
        evaluacionParq: parqData as ParqEvaluacion | undefined,
        alertas: (alertasData || []) as Alerta[],
        ultimoControl,
        adherenciaPromedio,
        tendencia,
        alertasActivas: (alertasData || []).length
      }

      setCliente(clienteCompleto)
    } catch (err) {
      console.error('Error fetching cliente:', err)
      setError(err instanceof Error ? err : new Error('Error desconocido'))
      // Fallback to mock data
      const mockCliente = mockClientes[clienteId]
      if (mockCliente) {
        setCliente(mockCliente)
      }
    } finally {
      setIsLoading(false)
    }
  }, [clienteId])

  useEffect(() => {
    fetchCliente()
  }, [fetchCliente])

  return {
    cliente,
    isLoading,
    error,
    refetch: fetchCliente
  }
}
