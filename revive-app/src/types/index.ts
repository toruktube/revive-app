// Tipos principales del sistema REVIVE App MVP

export type TipoCliente = 'online' | 'presencial'
export type EstadoCliente = 'activo' | 'inactivo' | 'en_pausa'
export type NivelCliente = 'inicial' | 'medio' | 'avanzado' | 'competicion'

// --- CLIENTE ---
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
  plan_actual?: string
  created_at: string
  updated_at: string
}

export interface ClienteConEstado extends Cliente {
  adherenciaPromedio?: number
  tendencia?: 'subiendo' | 'estable' | 'bajando'
  alertasActivas?: number
  estadoPago?: EstadoPago
  proximaSesion?: string
  proximoPago?: string
}

// --- AGENDA / SESIONES ---
export type TipoSesion = 'presencial' | 'online' | 'evaluacion'
export type EstadoSesion = 'programada' | 'completada' | 'cancelada' | 'no_asistio'

export interface SesionCalendario {
  id: string
  cliente_id: string
  cliente_nombre: string
  cliente_apellidos?: string
  cliente_avatar?: string
  fecha: string
  hora_inicio: string
  hora_fin: string
  tipo: TipoSesion
  estado: EstadoSesion
  notas?: string
  ubicacion?: string
}

// --- FACTURACION / PAGOS ---
export type EstadoPago = 'pagado' | 'pendiente' | 'vencido'
export type MetodoPago = 'efectivo' | 'transferencia' | 'tarjeta' | 'bizum'
export type TipoTransaccion = 'ingreso' | 'gasto'

export interface Transaccion {
  id: string
  cliente_id?: string
  cliente_nombre?: string
  tipo: TipoTransaccion
  monto: number
  fecha: string
  fecha_vencimiento?: string
  fecha_pago?: string
  estado: EstadoPago
  metodo?: MetodoPago
  concepto: string
  notas?: string
}

export interface ResumenMensual {
  mes: string
  totalIngresos: number
  totalGastos: number
  balance: number
  comparativaMesAnterior: number
  transaccionesPendientes: number
  transaccionesVencidas: number
}

// --- RUTINAS ---
export type TipoRutina = 'entrenamiento' | 'nutricion'
export type ObjetivoRutina = 'perdida_grasa' | 'ganancia_muscular' | 'tonificacion' | 'resistencia' | 'fuerza' | 'salud_general'
export type NivelRutina = 'principiante' | 'intermedio' | 'avanzado'

export interface EjercicioRutina {
  id: string
  nombre: string
  series: number
  repeticiones: string
  peso?: string
  descanso?: string
  notas?: string
}

export interface DiaRutina {
  id: string
  nombre: string
  ejercicios: EjercicioRutina[]
}

export interface RutinaEntrenamiento {
  id: string
  nombre: string
  descripcion?: string
  categoria: string
  duracion: string
  nivel: NivelRutina
  objetivo?: ObjetivoRutina
  dias: DiaRutina[]
  created_at: string
}

export interface ComidaPlanNutricion {
  id: string
  nombre: string
  hora?: string
  descripcion: string
  calorias?: number
  proteinas?: number
  carbohidratos?: number
  grasas?: number
}

export interface PlanNutricion {
  id: string
  nombre: string
  descripcion?: string
  objetivo?: ObjetivoRutina
  calorias_totales: number
  proteinas_g: number
  carbohidratos_g: number
  grasas_g: number
  comidas: ComidaPlanNutricion[]
  created_at: string
}

// --- MENSAJES ---
export type DireccionMensaje = 'enviado' | 'recibido'
export type EstadoMensaje = 'enviado' | 'entregado' | 'leido'
export type CategoriaPlantilla = 'recordatorio_sesion' | 'seguimiento_progreso' | 'recordatorio_pago' | 'motivacion' | 'general'

export interface Mensaje {
  id: string
  conversacion_id: string
  contenido: string
  direccion: DireccionMensaje
  estado: EstadoMensaje
  hora: string
}

export interface Conversacion {
  id: string
  cliente_id: string
  cliente_nombre: string
  cliente_apellidos?: string
  cliente_avatar?: string
  ultimo_mensaje: string
  ultimo_mensaje_hora: string
  no_leidos: number
  mensajes: Mensaje[]
}

export interface PlantillaMensaje {
  id: string
  nombre: string
  contenido: string
  categoria: CategoriaPlantilla
}

// --- REPORTES ---
export interface NotaSesion {
  id: string
  cliente_id: string
  cliente_nombre: string
  cliente_apellidos?: string
  cliente_avatar?: string
  sesion_id?: string
  fecha: string
  energia: number
  puntualidad: number
  progreso: number
  comentario: string
  created_at: string
}

export interface ReporteMensual {
  mes: string
  sesiones_totales: number
  sesiones_completadas: number
  tasa_asistencia: number
  clientes_activos: number
  adherencia_promedio: number
  ingresos_totales: number
}

export interface ClienteAdherencia {
  cliente_id: string
  cliente_nombre: string
  cliente_avatar?: string
  adherencia: number
  tendencia: 'subiendo' | 'estable' | 'bajando'
}

// --- AJUSTES / TRAINER ---
export interface TrainerPerfil {
  id: string
  nombre: string
  apellidos?: string
  email: string
  telefono?: string
  avatar_url?: string
  especialidad?: string
  descripcion?: string
}

export interface Preferencias {
  tema: 'light' | 'dark' | 'system'
  idioma: 'es' | 'en'
  notificaciones_email: boolean
  notificaciones_push: boolean
  recordatorios_sesion: boolean
  recordatorios_pago: boolean
}
