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

// ==========================================
// Nuevos tipos para MVP (5 funcionalidades)
// ==========================================

// --- AGENDA ---
export type TipoSesion = 'presencial' | 'online' | 'evaluacion'
export type EstadoSesion = 'programada' | 'completada' | 'cancelada' | 'no_asistio'

export interface SesionCalendario {
  id: string
  cliente_id: string
  cliente_nombre: string
  cliente_apellidos?: string
  fecha: string // ISO date string
  hora_inicio: string // "HH:mm"
  hora_fin: string // "HH:mm"
  tipo: TipoSesion
  estado: EstadoSesion
  notas?: string
  ubicacion?: string
}

// --- PAGOS ---
export type EstadoPago = 'pagado' | 'pendiente' | 'vencido'
export type MetodoPago = 'efectivo' | 'transferencia' | 'tarjeta' | 'bizum'

export interface Pago {
  id: string
  cliente_id: string
  cliente_nombre: string
  monto: number
  fecha_emision: string
  fecha_vencimiento: string
  fecha_pago?: string
  estado: EstadoPago
  metodo?: MetodoPago
  concepto: string
  notas?: string
}

// --- DIARIO (Notas post-sesión) ---
export interface NotaSesion {
  id: string
  cliente_id: string
  cliente_nombre: string
  cliente_apellidos?: string
  sesion_id?: string
  fecha: string
  energia: number // 1-5
  estado_animo: number // 1-5
  adherencia: number // 1-5
  dolor_molestias?: string
  notas_libres: string
  objetivos_proxima?: string
  created_at: string
}

// --- MENSAJES WHATSAPP ---
export type CategoriaPlantilla = 'motivacion' | 'recordatorio' | 'nutricion' | 'seguimiento' | 'general'
export type EstadoMensajeWA = 'enviado' | 'entregado' | 'leido'
export type DireccionMensaje = 'enviado' | 'recibido'

export interface PlantillaMensaje {
  id: string
  nombre: string
  contenido: string
  categoria: CategoriaPlantilla
}

export interface MensajeWhatsApp {
  id: string
  conversacion_id: string
  contenido: string
  direccion: DireccionMensaje
  estado: EstadoMensajeWA
  hora: string // ISO string
}

export interface ConversacionWhatsApp {
  id: string
  cliente_id: string
  cliente_nombre: string
  cliente_apellidos?: string
  cliente_telefono: string
  ultimo_mensaje: string
  ultimo_mensaje_hora: string
  no_leidos: number
  mensajes: MensajeWhatsApp[]
}

// --- RUTINAS ---
export interface EjercicioRutina {
  id: string
  nombre: string
  series: number
  repeticiones: string // "8-12" o "30s" etc.
  peso?: string // "20kg" o "Bodyweight"
  descanso?: string // "60s"
  notas?: string
}

export interface DiaRutina {
  id: string
  nombre: string // "Día 1 - Tren Superior"
  ejercicios: EjercicioRutina[]
}

export interface RutinaEntrenamiento {
  id: string
  cliente_id: string
  nombre: string
  descripcion?: string
  dias: DiaRutina[]
  activa: boolean
  fecha_inicio: string
  fecha_fin?: string
  created_at: string
}

// Extender ClienteConEstado con datos de pago
export interface ClienteConPago extends ClienteConEstado {
  estadoPago?: EstadoPago
  proximaSesion?: string // ISO date
  proximoPago?: string // ISO date
}
