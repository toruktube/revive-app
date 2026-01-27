// Tipos principales del sistema Revive Coach

export type TipoCliente = 'online' | 'presencial'
export type EstadoCliente = 'activo' | 'en_pausa' | 'finalizado'
export type NivelCliente = 'inicial' | 'medio' | 'avanzado' | 'competicion'
export type PrioridadAlerta = 'baja' | 'media' | 'alta'
export type TipoMensaje = 'automatico' | 'manual'

export interface Cliente {
  id: string
  nombre: string
  apellidos?: string
  email?: string
  telefono?: string
  avatar_url?: string
  tipo: TipoCliente
  estado: EstadoCliente
  fecha_inicio?: string
  objetivo_principal?: string
  nivel?: NivelCliente
  notas_privadas?: string
  created_at: string
  updated_at: string
}

export interface ParqEvaluacion {
  id: string
  cliente_id: string
  fecha: string
  peso?: number
  altura?: number
  porcentaje_grasa?: number
  lesiones?: string
  condiciones_medicas?: string
  medicamentos?: string
  horas_sueno_promedio?: number
  nivel_estres?: number
  ocupacion?: string
  horario_trabajo?: string
  disponibilidad_entrenamiento?: string
  dieta_actual?: string
  alergias?: string
  created_at: string
}

export interface PlanEntrenamiento {
  id: string
  cliente_id: string
  nombre?: string
  descripcion?: string
  fase?: string
  fecha_inicio?: string
  fecha_fin?: string
  activo: boolean
  created_at: string
}

export interface PlanNutricion {
  id: string
  cliente_id: string
  nombre?: string
  calorias_objetivo?: number
  proteinas_g?: number
  carbohidratos_g?: number
  grasas_g?: number
  comidas_por_dia: number
  notas?: string
  activo: boolean
  created_at: string
}

export interface ControlSemanal {
  id: string
  cliente_id: string
  fecha: string
  peso?: number
  adherencia_entrenamiento?: number
  adherencia_nutricion?: number
  horas_sueno_promedio?: number
  nivel_energia?: number
  nivel_estres?: number
  estado_animo?: number
  motivacion?: number
  sensaciones?: string
  fotos_urls?: string[]
  created_at: string
}

export interface Alerta {
  id: string
  cliente_id: string
  tipo?: string
  mensaje?: string
  prioridad: PrioridadAlerta
  resuelta: boolean
  created_at: string
  cliente?: Cliente
}

export interface Mensaje {
  id: string
  cliente_id: string
  contenido?: string
  tipo: TipoMensaje
  enviado_at?: string
  leido: boolean
  created_at: string
}

// Tipos para estadísticas del dashboard
export interface DashboardStats {
  clientesActivos: number
  clientesOnline: number
  clientesPresencial: number
  adherenciaGlobal: number
  estadoAnimoPromedio: number
  alertasActivas: number
  alertasCriticas: number
}

export interface ClienteConEstado extends Cliente {
  ultimoControl?: ControlSemanal
  adherenciaPromedio?: number
  tendencia?: 'subiendo' | 'estable' | 'bajando'
  alertasActivas?: number
}

// Tipos para insights
export interface Insight {
  id: string
  tipo: 'alerta' | 'sugerencia' | 'patron'
  titulo: string
  descripcion: string
  clientesAfectados: number
  prioridad: PrioridadAlerta
}
