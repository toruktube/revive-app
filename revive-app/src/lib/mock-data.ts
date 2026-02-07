// Mock data for REVIVE App MVP
// 10 clients with complete data

import type {
  ClienteConEstado,
  SesionCalendario,
  Transaccion,
  ResumenMensual,
  RutinaEntrenamiento,
  PlanNutricion,
  Conversacion,
  PlantillaMensaje,
  NotaSesion,
  ReporteMensual,
  ClienteAdherencia,
  TrainerPerfil,
  Preferencias,
} from '@/types'

// ==========================================
// Helpers for relative dates
// ==========================================

function getMonday(d: Date): Date {
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d)
  monday.setDate(diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function formatISO(date: Date): string {
  return date.toISOString()
}

const today = new Date()
const monday = getMonday(today)

// ==========================================
// CLIENTES (10 clientes completos)
// ==========================================

export const mockClientes: ClienteConEstado[] = [
  {
    id: '11',
    nombre: 'Alejandro',
    apellidos: 'Gutiérrez',
    email: 'alejandro.gutierrez@email.com',
    telefono: '670381225',
    avatar_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150',
    tipo: 'presencial',
    estado: 'activo',
    fecha_inicio: '2024-09-01',
    objetivo_principal: 'Ganancia muscular',
    nivel: 'medio',
    plan_actual: 'Push/Pull/Legs - Hipertrofia',
    notas_privadas: 'Trabaja turnos rotativos. Prefiere sesiones por la tarde. Muy comprometido con la dieta.',
    created_at: '2024-09-01T10:00:00Z',
    updated_at: '2025-02-05T10:00:00Z',
    adherenciaPromedio: 88,
    tendencia: 'subiendo',
    alertasActivas: 0,
    estadoPago: 'pagado',
    tipoPlanPago: 'mensual',
    proximaSesion: formatDate(addDays(monday, 1)),
    proximoPago: formatDate(addDays(today, 12)),
  },
  {
    id: '12',
    nombre: 'Laura',
    apellidos: 'Pereda',
    email: 'laura.pereda@email.com',
    telefono: '664846927',
    avatar_url: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=150',
    tipo: 'presencial',
    estado: 'activo',
    fecha_inicio: '2024-11-15',
    objetivo_principal: 'Tonificación y pérdida de grasa',
    nivel: 'inicial',
    plan_actual: 'Full Body - Definición',
    notas_privadas: 'Empezó con el objetivo de perder peso. Ya ha bajado 4kg. Muy motivada.',
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2025-02-06T14:00:00Z',
    adherenciaPromedio: 82,
    tendencia: 'subiendo',
    alertasActivas: 0,
    estadoPago: 'pagado',
    tipoPlanPago: 'mensual',
    proximaSesion: formatDate(addDays(monday, 2)),
    proximoPago: formatDate(addDays(today, 8)),
  },
  {
    id: '1',
    nombre: 'María',
    apellidos: 'García López',
    email: 'maria@email.com',
    telefono: '+34 612 345 678',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    tipo: 'online',
    estado: 'activo',
    fecha_inicio: '2024-10-15',
    objetivo_principal: 'Pérdida de grasa',
    nivel: 'medio',
    plan_actual: 'Full Body - Definición',
    created_at: '2024-10-15T10:00:00Z',
    updated_at: '2025-01-24T10:00:00Z',
    adherenciaPromedio: 92,
    tendencia: 'subiendo',
    alertasActivas: 0,
    estadoPago: 'pagado',
    tipoPlanPago: 'mensual',
    proximaSesion: formatDate(addDays(monday, 1)),
    proximoPago: formatDate(addDays(today, 15)),
  },
  {
    id: '2',
    nombre: 'Carlos',
    apellidos: 'Rodríguez Martín',
    email: 'carlos@email.com',
    telefono: '+34 623 456 789',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    tipo: 'presencial',
    estado: 'activo',
    fecha_inicio: '2024-08-01',
    objetivo_principal: 'Ganancia muscular',
    nivel: 'avanzado',
    plan_actual: 'Push/Pull/Legs',
    created_at: '2024-08-01T10:00:00Z',
    updated_at: '2025-01-20T10:00:00Z',
    adherenciaPromedio: 45,
    tendencia: 'bajando',
    alertasActivas: 2,
    estadoPago: 'vencido',
    tipoPlanPago: 'mensual',
    proximaSesion: formatDate(addDays(monday, 0)),
    proximoPago: formatDate(addDays(today, -5)),
  },
  {
    id: '3',
    nombre: 'Laura',
    apellidos: 'Martínez Sánchez',
    email: 'laura@email.com',
    telefono: '+34 634 567 890',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    tipo: 'online',
    estado: 'activo',
    fecha_inicio: '2024-11-20',
    objetivo_principal: 'Tonificación',
    nivel: 'inicial',
    plan_actual: 'Tonificación Principiante',
    created_at: '2024-11-20T10:00:00Z',
    updated_at: '2025-01-24T14:00:00Z',
    adherenciaPromedio: 78,
    tendencia: 'estable',
    alertasActivas: 0,
    estadoPago: 'pagado',
    tipoPlanPago: 'trimestral',
    proximaSesion: formatDate(addDays(monday, 2)),
    proximoPago: formatDate(addDays(today, 10)),
  },
  {
    id: '4',
    nombre: 'Pedro',
    apellidos: 'López García',
    email: 'pedro@email.com',
    telefono: '+34 645 678 901',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    tipo: 'presencial',
    estado: 'activo',
    fecha_inicio: '2024-06-10',
    objetivo_principal: 'Competición - Culturismo',
    nivel: 'competicion',
    plan_actual: 'Preparación Competición',
    created_at: '2024-06-10T10:00:00Z',
    updated_at: '2025-01-23T16:00:00Z',
    adherenciaPromedio: 98,
    tendencia: 'subiendo',
    alertasActivas: 0,
    estadoPago: 'pagado',
    tipoPlanPago: 'semestral',
    proximaSesion: formatDate(addDays(monday, 0)),
    proximoPago: formatDate(addDays(today, 20)),
  },
  {
    id: '5',
    nombre: 'Ana',
    apellidos: 'Fernández Ruiz',
    email: 'ana@email.com',
    telefono: '+34 656 789 012',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    tipo: 'online',
    estado: 'activo',
    fecha_inicio: '2024-12-01',
    objetivo_principal: 'Salud general',
    nivel: 'inicial',
    plan_actual: 'Salud General Adaptado',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2025-01-21T12:00:00Z',
    adherenciaPromedio: 65,
    tendencia: 'estable',
    alertasActivas: 1,
    estadoPago: 'pendiente',
    tipoPlanPago: 'mensual',
    proximaSesion: formatDate(addDays(monday, 3)),
    proximoPago: formatDate(addDays(today, 2)),
  },
  {
    id: '6',
    nombre: 'Javier',
    apellidos: 'Gómez Torres',
    email: 'javier@email.com',
    telefono: '+34 667 890 123',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    tipo: 'presencial',
    estado: 'inactivo',
    fecha_inicio: '2024-09-15',
    objetivo_principal: 'Rehabilitación lesión',
    nivel: 'medio',
    notas_privadas: 'Pausa por viaje de trabajo. Regresa en febrero.',
    plan_actual: 'En pausa',
    created_at: '2024-09-15T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    adherenciaPromedio: 72,
    tendencia: 'estable',
    alertasActivas: 0,
    estadoPago: 'pagado',
    tipoPlanPago: 'mensual',
    proximoPago: formatDate(addDays(today, 25)),
  },
  {
    id: '7',
    nombre: 'Sofía',
    apellidos: 'Díaz Moreno',
    email: 'sofia@email.com',
    telefono: '+34 678 901 234',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    tipo: 'online',
    estado: 'activo',
    fecha_inicio: '2025-01-05',
    objetivo_principal: 'Preparación maratón',
    nivel: 'avanzado',
    plan_actual: 'Preparación Maratón',
    created_at: '2025-01-05T10:00:00Z',
    updated_at: '2025-01-24T09:00:00Z',
    adherenciaPromedio: 95,
    tendencia: 'subiendo',
    alertasActivas: 0,
    estadoPago: 'pagado',
    tipoPlanPago: 'trimestral',
    proximaSesion: formatDate(addDays(monday, 4)),
    proximoPago: formatDate(addDays(today, 8)),
  },
  {
    id: '8',
    nombre: 'Miguel',
    apellidos: 'Herrera Vega',
    email: 'miguel@email.com',
    telefono: '+34 689 012 345',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    tipo: 'presencial',
    estado: 'activo',
    fecha_inicio: '2024-07-20',
    objetivo_principal: 'Pérdida de peso',
    nivel: 'inicial',
    plan_actual: 'Pérdida de Peso Integral',
    created_at: '2024-07-20T10:00:00Z',
    updated_at: '2025-01-22T11:00:00Z',
    adherenciaPromedio: 55,
    tendencia: 'bajando',
    alertasActivas: 3,
    estadoPago: 'vencido',
    tipoPlanPago: 'mensual',
    proximaSesion: formatDate(addDays(monday, 1)),
    proximoPago: formatDate(addDays(today, -10)),
  },
  {
    id: '9',
    nombre: 'Elena',
    apellidos: 'Navarro Cruz',
    email: 'elena@email.com',
    telefono: '+34 690 123 456',
    avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
    tipo: 'online',
    estado: 'activo',
    fecha_inicio: '2024-11-01',
    objetivo_principal: 'Fuerza y flexibilidad',
    nivel: 'medio',
    plan_actual: 'Fuerza Funcional',
    created_at: '2024-11-01T10:00:00Z',
    updated_at: '2025-01-23T15:00:00Z',
    adherenciaPromedio: 85,
    tendencia: 'subiendo',
    alertasActivas: 0,
    estadoPago: 'pagado',
    tipoPlanPago: 'anual',
    proximaSesion: formatDate(addDays(monday, 2)),
    proximoPago: formatDate(addDays(today, 12)),
  },
  {
    id: '10',
    nombre: 'David',
    apellidos: 'Serrano Blanco',
    email: 'david@email.com',
    telefono: '+34 601 234 567',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    tipo: 'presencial',
    estado: 'activo',
    fecha_inicio: '2024-10-01',
    objetivo_principal: 'Rendimiento deportivo',
    nivel: 'avanzado',
    plan_actual: 'Alto Rendimiento',
    created_at: '2024-10-01T10:00:00Z',
    updated_at: '2025-01-24T08:00:00Z',
    adherenciaPromedio: 90,
    tendencia: 'estable',
    alertasActivas: 0,
    estadoPago: 'pagado',
    tipoPlanPago: 'semestral',
    proximaSesion: formatDate(addDays(monday, 0)),
    proximoPago: formatDate(addDays(today, 5)),
  },
]

// ==========================================
// SESIONES DEL CALENDARIO (semana actual)
// ==========================================

export const mockSesiones: SesionCalendario[] = [
  // Lunes
  { id: 's1', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez', cliente_avatar: mockClientes[5].avatar_url, fecha: formatDate(addDays(monday, 0)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's2', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', cliente_avatar: mockClientes[5].avatar_url, fecha: formatDate(addDays(monday, 0)), hora_inicio: '08:30', hora_fin: '10:00', tipo: 'online', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's3', cliente_id: '10', cliente_nombre: 'David', cliente_apellidos: 'Serrano', cliente_avatar: mockClientes[1].avatar_url, fecha: formatDate(addDays(monday, 0)), hora_inicio: '11:00', hora_fin: '12:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  // Martes
  { id: 's4', cliente_id: '8', cliente_nombre: 'Miguel', cliente_apellidos: 'Herrera', cliente_avatar: mockClientes[1].avatar_url, fecha: formatDate(addDays(monday, 1)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's5', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 1)), hora_inicio: '10:00', hora_fin: '11:00', tipo: 'online', estado: 'programada' },
  { id: 's6', cliente_id: '5', cliente_nombre: 'Ana', cliente_apellidos: 'Fernández', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 1)), hora_inicio: '17:00', hora_fin: '18:00', tipo: 'online', estado: 'programada' },
  // Miércoles
  { id: 's7', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez', cliente_avatar: mockClientes[5].avatar_url, fecha: formatDate(addDays(monday, 2)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's8', cliente_id: '3', cliente_nombre: 'Laura', cliente_apellidos: 'Martínez', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 2)), hora_inicio: '10:00', hora_fin: '11:00', tipo: 'online', estado: 'programada' },
  { id: 's9', cliente_id: '9', cliente_nombre: 'Elena', cliente_apellidos: 'Navarro', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 2)), hora_inicio: '12:00', hora_fin: '13:00', tipo: 'online', estado: 'programada' },
  // Jueves
  { id: 's10', cliente_id: '8', cliente_nombre: 'Miguel', cliente_apellidos: 'Herrera', cliente_avatar: mockClientes[1].avatar_url, fecha: formatDate(addDays(monday, 3)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's11', cliente_id: '5', cliente_nombre: 'Ana', cliente_apellidos: 'Fernández', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 3)), hora_inicio: '17:00', hora_fin: '18:00', tipo: 'online', estado: 'cancelada', notas: 'Canceló por trabajo' },
  { id: 's12', cliente_id: '10', cliente_nombre: 'David', cliente_apellidos: 'Serrano', cliente_avatar: mockClientes[1].avatar_url, fecha: formatDate(addDays(monday, 3)), hora_inicio: '18:30', hora_fin: '19:30', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  // Viernes
  { id: 's13', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez', cliente_avatar: mockClientes[5].avatar_url, fecha: formatDate(addDays(monday, 4)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's14', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', cliente_avatar: mockClientes[5].avatar_url, fecha: formatDate(addDays(monday, 4)), hora_inicio: '08:30', hora_fin: '10:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's15', cliente_id: '7', cliente_nombre: 'Sofía', cliente_apellidos: 'Díaz', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 4)), hora_inicio: '12:00', hora_fin: '13:00', tipo: 'online', estado: 'programada' },
  { id: 's16', cliente_id: '3', cliente_nombre: 'Laura', cliente_apellidos: 'Martínez', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 4)), hora_inicio: '16:00', hora_fin: '17:00', tipo: 'online', estado: 'programada' },
  // Sábado
  { id: 's17', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', cliente_avatar: mockClientes[5].avatar_url, fecha: formatDate(addDays(monday, 5)), hora_inicio: '09:00', hora_fin: '10:30', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive', notas: 'Sesión extra competición' },
  { id: 's18', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 5)), hora_inicio: '11:00', hora_fin: '12:00', tipo: 'online', estado: 'programada', notas: 'Evaluación mensual' },
  // Alejandro Gutiérrez - sesiones
  { id: 's19', cliente_id: '11', cliente_nombre: 'Alejandro', cliente_apellidos: 'Gutiérrez', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 1)), hora_inicio: '18:00', hora_fin: '19:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's20', cliente_id: '11', cliente_nombre: 'Alejandro', cliente_apellidos: 'Gutiérrez', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 3)), hora_inicio: '18:00', hora_fin: '19:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's21', cliente_id: '11', cliente_nombre: 'Alejandro', cliente_apellidos: 'Gutiérrez', cliente_avatar: mockClientes[0].avatar_url, fecha: formatDate(addDays(monday, 5)), hora_inicio: '10:00', hora_fin: '11:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  // Laura Pereda - sesiones
  { id: 's22', cliente_id: '12', cliente_nombre: 'Laura', cliente_apellidos: 'Pereda', cliente_avatar: mockClientes[1].avatar_url, fecha: formatDate(addDays(monday, 0)), hora_inicio: '09:00', hora_fin: '10:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's23', cliente_id: '12', cliente_nombre: 'Laura', cliente_apellidos: 'Pereda', cliente_avatar: mockClientes[1].avatar_url, fecha: formatDate(addDays(monday, 2)), hora_inicio: '09:00', hora_fin: '10:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
  { id: 's24', cliente_id: '12', cliente_nombre: 'Laura', cliente_apellidos: 'Pereda', cliente_avatar: mockClientes[1].avatar_url, fecha: formatDate(addDays(monday, 4)), hora_inicio: '09:00', hora_fin: '10:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Club Revive' },
]

// ==========================================
// TRANSACCIONES (Facturación)
// ==========================================

export const mockTransacciones: Transaccion[] = [
  // Ingresos - Enero
  { id: 't1', cliente_id: '1', cliente_nombre: 'María García', tipo: 'ingreso', monto: 120, fecha: '2025-01-03', estado: 'pagado', metodo: 'transferencia', concepto: 'Mensualidad Enero 2025' },
  { id: 't2', cliente_id: '2', cliente_nombre: 'Carlos Rodríguez', tipo: 'ingreso', monto: 150, fecha: '2025-01-01', fecha_vencimiento: '2025-01-05', estado: 'vencido', concepto: 'Mensualidad Enero 2025' },
  { id: 't3', cliente_id: '3', cliente_nombre: 'Laura Martínez', tipo: 'ingreso', monto: 100, fecha: '2025-01-08', estado: 'pagado', metodo: 'bizum', concepto: 'Mensualidad Enero 2025' },
  { id: 't4', cliente_id: '4', cliente_nombre: 'Pedro López', tipo: 'ingreso', monto: 200, fecha: '2025-01-02', estado: 'pagado', metodo: 'tarjeta', concepto: 'Plan Competición Enero' },
  { id: 't5', cliente_id: '5', cliente_nombre: 'Ana Fernández', tipo: 'ingreso', monto: 100, fecha: '2025-01-15', fecha_vencimiento: formatDate(addDays(today, 2)), estado: 'pendiente', concepto: 'Mensualidad Enero 2025' },
  { id: 't6', cliente_id: '6', cliente_nombre: 'Javier Gómez', tipo: 'ingreso', monto: 150, fecha: '2025-01-03', estado: 'pagado', metodo: 'transferencia', concepto: 'Mensualidad Enero (en pausa)' },
  { id: 't7', cliente_id: '7', cliente_nombre: 'Sofía Díaz', tipo: 'ingreso', monto: 100, fecha: '2025-01-05', estado: 'pagado', metodo: 'bizum', concepto: 'Mensualidad Enero 2025' },
  { id: 't8', cliente_id: '8', cliente_nombre: 'Miguel Herrera', tipo: 'ingreso', monto: 150, fecha: '2025-01-01', fecha_vencimiento: '2025-01-05', estado: 'vencido', concepto: 'Mensualidad Enero 2025' },
  { id: 't9', cliente_id: '9', cliente_nombre: 'Elena Navarro', tipo: 'ingreso', monto: 120, fecha: '2025-01-04', estado: 'pagado', metodo: 'transferencia', concepto: 'Mensualidad Enero 2025' },
  { id: 't10', cliente_id: '10', cliente_nombre: 'David Serrano', tipo: 'ingreso', monto: 180, fecha: '2025-01-02', estado: 'pagado', metodo: 'tarjeta', concepto: 'Plan Alto Rendimiento Enero' },
  // Alejandro y Laura - pagos
  { id: 't14', cliente_id: '11', cliente_nombre: 'Alejandro Gutiérrez', tipo: 'ingreso', monto: 120, fecha: '2025-02-01', estado: 'pagado', metodo: 'bizum', concepto: 'Mensualidad Febrero 2025' },
  { id: 't15', cliente_id: '12', cliente_nombre: 'Laura Pereda', tipo: 'ingreso', monto: 100, fecha: '2025-02-03', estado: 'pagado', metodo: 'transferencia', concepto: 'Mensualidad Febrero 2025' },
  // Gastos
  { id: 't11', tipo: 'gasto', monto: 50, fecha: '2025-01-10', estado: 'pagado', metodo: 'tarjeta', concepto: 'Material de entrenamiento' },
  { id: 't12', tipo: 'gasto', monto: 200, fecha: '2025-01-15', estado: 'pagado', metodo: 'transferencia', concepto: 'Alquiler espacio gimnasio' },
  { id: 't13', tipo: 'gasto', monto: 30, fecha: '2025-01-20', estado: 'pagado', metodo: 'efectivo', concepto: 'Suplementos muestra clientes' },
]

export const mockResumenMensual: ResumenMensual = {
  mes: 'Enero 2025',
  totalIngresos: 1370,
  totalGastos: 280,
  balance: 1090,
  comparativaMesAnterior: 12.5,
  transaccionesPendientes: 1,
  transaccionesVencidas: 2,
}

// ==========================================
// RUTINAS DE ENTRENAMIENTO
// ==========================================

export const mockRutinas: RutinaEntrenamiento[] = [
  {
    id: 'r1',
    nombre: 'Full Body - Definición',
    descripcion: 'Rutina de cuerpo completo 4 días/semana enfocada en mantener masa muscular durante déficit.',
    categoria: 'Hipertrofia',
    duracion: '4 semanas',
    nivel: 'intermedio',
    objetivo: 'perdida_grasa',
    clientes_asignados: [
      { id: '1', nombre: 'María', apellidos: 'García López', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { id: '12', nombre: 'Laura', apellidos: 'Pereda', avatar_url: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=150' },
    ],
    created_at: '2025-01-01T10:00:00Z',
    dias: [
      {
        id: 'd1', nombre: 'Día A - Tren Superior',
        ejercicios: [
          { id: 'e1', nombre: 'Press Banca', series: 4, repeticiones: '8-10', peso: '40kg', descanso: '90s' },
          { id: 'e2', nombre: 'Remo con Mancuerna', series: 4, repeticiones: '10-12', peso: '16kg', descanso: '60s' },
          { id: 'e3', nombre: 'Press Militar', series: 3, repeticiones: '10-12', peso: '20kg', descanso: '60s' },
          { id: 'e4', nombre: 'Curl Bíceps', series: 3, repeticiones: '12-15', peso: '8kg', descanso: '45s' },
          { id: 'e5', nombre: 'Tríceps en Polea', series: 3, repeticiones: '12-15', peso: '15kg', descanso: '45s' },
        ]
      },
      {
        id: 'd2', nombre: 'Día B - Tren Inferior',
        ejercicios: [
          { id: 'e6', nombre: 'Sentadilla', series: 4, repeticiones: '8-10', peso: '50kg', descanso: '120s' },
          { id: 'e7', nombre: 'Peso Muerto Rumano', series: 4, repeticiones: '10-12', peso: '40kg', descanso: '90s' },
          { id: 'e8', nombre: 'Hip Thrust', series: 4, repeticiones: '10-12', peso: '60kg', descanso: '90s' },
          { id: 'e9', nombre: 'Zancadas', series: 3, repeticiones: '12 c/pierna', peso: '12kg', descanso: '60s' },
          { id: 'e10', nombre: 'Elevación de Gemelos', series: 4, repeticiones: '15-20', peso: 'Máquina', descanso: '45s' },
        ]
      },
    ]
  },
  {
    id: 'r2',
    nombre: 'Push/Pull/Legs - Hipertrofia',
    descripcion: 'Rutina PPL 6 días/semana para máxima ganancia muscular.',
    categoria: 'Hipertrofia',
    duracion: '8 semanas',
    nivel: 'avanzado',
    objetivo: 'ganancia_muscular',
    clientes_asignados: [
      { id: '11', nombre: 'Alejandro', apellidos: 'Gutiérrez', avatar_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150' },
      { id: '2', nombre: 'Carlos', apellidos: 'Rodríguez Martín', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    ],
    created_at: '2024-12-01T10:00:00Z',
    dias: [
      {
        id: 'd3', nombre: 'Push (Empuje)',
        ejercicios: [
          { id: 'e11', nombre: 'Press Banca', series: 5, repeticiones: '5-8', peso: '80kg', descanso: '120s' },
          { id: 'e12', nombre: 'Press Inclinado Mancuerna', series: 4, repeticiones: '8-10', peso: '30kg', descanso: '90s' },
          { id: 'e13', nombre: 'Press Militar', series: 4, repeticiones: '8-10', peso: '40kg', descanso: '90s' },
          { id: 'e14', nombre: 'Elevaciones Laterales', series: 4, repeticiones: '12-15', peso: '12kg', descanso: '45s' },
          { id: 'e15', nombre: 'Fondos', series: 3, repeticiones: '10-12', peso: '+10kg', descanso: '60s' },
        ]
      },
      {
        id: 'd4', nombre: 'Pull (Tirón)',
        ejercicios: [
          { id: 'e16', nombre: 'Peso Muerto', series: 5, repeticiones: '5', peso: '120kg', descanso: '180s' },
          { id: 'e17', nombre: 'Dominadas', series: 4, repeticiones: '8-10', peso: '+5kg', descanso: '90s' },
          { id: 'e18', nombre: 'Remo con Barra', series: 4, repeticiones: '8-10', peso: '70kg', descanso: '90s' },
          { id: 'e19', nombre: 'Face Pull', series: 4, repeticiones: '15-20', peso: '20kg', descanso: '45s' },
          { id: 'e20', nombre: 'Curl Bíceps Barra', series: 3, repeticiones: '10-12', peso: '30kg', descanso: '60s' },
        ]
      },
      {
        id: 'd5', nombre: 'Legs (Piernas)',
        ejercicios: [
          { id: 'e21', nombre: 'Sentadilla', series: 5, repeticiones: '5-8', peso: '100kg', descanso: '180s' },
          { id: 'e22', nombre: 'Prensa', series: 4, repeticiones: '10-12', peso: '200kg', descanso: '90s' },
          { id: 'e23', nombre: 'Curl Femoral', series: 4, repeticiones: '10-12', peso: '40kg', descanso: '60s' },
          { id: 'e24', nombre: 'Extensión Cuádriceps', series: 4, repeticiones: '12-15', peso: '35kg', descanso: '60s' },
          { id: 'e25', nombre: 'Gemelos en Prensa', series: 5, repeticiones: '15-20', peso: '100kg', descanso: '45s' },
        ]
      },
    ]
  },
  {
    id: 'r3',
    nombre: 'Preparación Maratón',
    descripcion: 'Complemento de fuerza para preparación de maratón. 2 días/semana.',
    categoria: 'Resistencia',
    duracion: '12 semanas',
    nivel: 'avanzado',
    objetivo: 'resistencia',
    clientes_asignados: [
      { id: '7', nombre: 'Sofía', apellidos: 'Díaz Moreno', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    ],
    created_at: '2025-01-05T10:00:00Z',
    dias: [
      {
        id: 'd8', nombre: 'Fuerza Tren Inferior',
        ejercicios: [
          { id: 'e36', nombre: 'Sentadilla Goblet', series: 3, repeticiones: '12-15', peso: '16kg', descanso: '60s' },
          { id: 'e37', nombre: 'Step Ups', series: 3, repeticiones: '10 c/pierna', peso: '8kg', descanso: '45s' },
          { id: 'e38', nombre: 'Puente Glúteo', series: 3, repeticiones: '15', peso: '30kg', descanso: '45s' },
          { id: 'e39', nombre: 'Gemelos a una pierna', series: 3, repeticiones: '15 c/pierna', descanso: '30s' },
          { id: 'e40', nombre: 'Plancha', series: 3, repeticiones: '45s', descanso: '30s' },
        ]
      },
      {
        id: 'd9', nombre: 'Core + Movilidad',
        ejercicios: [
          { id: 'e41', nombre: 'Dead Bug', series: 3, repeticiones: '10 c/lado', descanso: '30s' },
          { id: 'e42', nombre: 'Bird Dog', series: 3, repeticiones: '10 c/lado', descanso: '30s' },
          { id: 'e43', nombre: 'Plancha Lateral', series: 3, repeticiones: '30s c/lado', descanso: '30s' },
          { id: 'e44', nombre: 'Hip 90/90', series: 2, repeticiones: '10 c/lado', descanso: '30s', notas: 'Movilidad cadera' },
          { id: 'e45', nombre: 'Foam Rolling', series: 1, repeticiones: '10min', notas: 'IT band, cuádriceps, gemelos' },
        ]
      },
    ]
  },
  {
    id: 'r4',
    nombre: 'Tonificación Principiante',
    descripcion: 'Rutina full body 3 días/semana para tonificación muscular.',
    categoria: 'Tonificación',
    duracion: '6 semanas',
    nivel: 'principiante',
    objetivo: 'tonificacion',
    clientes_asignados: [
      { id: '3', nombre: 'Laura', apellidos: 'Martínez Sánchez', avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    ],
    created_at: '2025-01-15T10:00:00Z',
    dias: [
      {
        id: 'd10', nombre: 'Full Body A',
        ejercicios: [
          { id: 'e46', nombre: 'Sentadilla con TRX', series: 3, repeticiones: '12-15', descanso: '60s' },
          { id: 'e47', nombre: 'Press Mancuerna', series: 3, repeticiones: '12', peso: '6kg', descanso: '60s' },
          { id: 'e48', nombre: 'Remo TRX', series: 3, repeticiones: '12', descanso: '60s' },
          { id: 'e49', nombre: 'Zancadas', series: 3, repeticiones: '10 c/pierna', descanso: '60s' },
          { id: 'e50', nombre: 'Plancha', series: 3, repeticiones: '30s', descanso: '30s' },
        ]
      },
      {
        id: 'd11', nombre: 'Full Body B',
        ejercicios: [
          { id: 'e51', nombre: 'Sumo Squat', series: 3, repeticiones: '12-15', peso: '10kg', descanso: '60s' },
          { id: 'e52', nombre: 'Push Ups (rodillas)', series: 3, repeticiones: '10-12', descanso: '60s' },
          { id: 'e53', nombre: 'Pulldown Polea', series: 3, repeticiones: '12', peso: '25kg', descanso: '60s' },
          { id: 'e54', nombre: 'Hip Thrust', series: 3, repeticiones: '12-15', peso: '30kg', descanso: '60s' },
          { id: 'e55', nombre: 'Mountain Climbers', series: 3, repeticiones: '20', descanso: '30s' },
        ]
      },
    ]
  },
]

// ==========================================
// PLANES DE NUTRICIÓN
// ==========================================

export const mockPlanesNutricion: PlanNutricion[] = [
  {
    id: 'pn1',
    nombre: 'Déficit Calórico Moderado',
    descripcion: 'Plan de alimentación para pérdida de grasa manteniendo masa muscular',
    objetivo: 'perdida_grasa',
    calorias_totales: 1800,
    proteinas_g: 140,
    carbohidratos_g: 180,
    grasas_g: 55,
    created_at: '2025-01-01T10:00:00Z',
    comidas: [
      { id: 'c1', nombre: 'Desayuno', hora: '08:00', descripcion: 'Tortilla de claras con espinacas + tostada integral + café', calorias: 350, proteinas: 30, carbohidratos: 30, grasas: 10 },
      { id: 'c2', nombre: 'Media Mañana', hora: '11:00', descripcion: 'Yogur griego con frutos rojos y nueces', calorias: 250, proteinas: 20, carbohidratos: 25, grasas: 10 },
      { id: 'c3', nombre: 'Almuerzo', hora: '14:00', descripcion: 'Pechuga de pollo a la plancha + arroz integral + verduras salteadas', calorias: 500, proteinas: 45, carbohidratos: 50, grasas: 12 },
      { id: 'c4', nombre: 'Merienda', hora: '17:00', descripcion: 'Batido de proteína con plátano', calorias: 300, proteinas: 25, carbohidratos: 35, grasas: 8 },
      { id: 'c5', nombre: 'Cena', hora: '20:30', descripcion: 'Salmón al horno + ensalada verde + aguacate', calorias: 400, proteinas: 20, carbohidratos: 40, grasas: 15 },
    ]
  },
  {
    id: 'pn2',
    nombre: 'Volumen Muscular',
    descripcion: 'Plan hipercalórico para ganancia de masa muscular',
    objetivo: 'ganancia_muscular',
    calorias_totales: 3200,
    proteinas_g: 180,
    carbohidratos_g: 400,
    grasas_g: 90,
    created_at: '2024-12-01T10:00:00Z',
    comidas: [
      { id: 'c6', nombre: 'Desayuno', hora: '07:00', descripcion: 'Avena con leche + huevos revueltos + fruta', calorias: 600, proteinas: 35, carbohidratos: 70, grasas: 20 },
      { id: 'c7', nombre: 'Media Mañana', hora: '10:00', descripcion: 'Sandwich de pavo + batido de proteína', calorias: 500, proteinas: 40, carbohidratos: 50, grasas: 15 },
      { id: 'c8', nombre: 'Almuerzo', hora: '13:30', descripcion: 'Pasta con carne picada + ensalada', calorias: 800, proteinas: 45, carbohidratos: 90, grasas: 25 },
      { id: 'c9', nombre: 'Pre-entreno', hora: '16:30', descripcion: 'Arroz con pollo + plátano', calorias: 500, proteinas: 30, carbohidratos: 70, grasas: 10 },
      { id: 'c10', nombre: 'Post-entreno', hora: '19:30', descripcion: 'Batido de proteína + dextrosa', calorias: 300, proteinas: 30, carbohidratos: 40, grasas: 5 },
      { id: 'c11', nombre: 'Cena', hora: '21:00', descripcion: 'Pescado + patatas + verduras', calorias: 500, proteinas: 35, carbohidratos: 80, grasas: 15 },
    ]
  },
]

// ==========================================
// CONVERSACIONES / MENSAJES
// ==========================================

const ahora = new Date()
const hace1h = new Date(ahora.getTime() - 1 * 60 * 60 * 1000)
const hace2h = new Date(ahora.getTime() - 2 * 60 * 60 * 1000)
const hace3h = new Date(ahora.getTime() - 3 * 60 * 60 * 1000)
const ayer = new Date(ahora.getTime() - 24 * 60 * 60 * 1000)
const hace2d = new Date(ahora.getTime() - 48 * 60 * 60 * 1000)

export const mockConversaciones: Conversacion[] = [
  {
    id: 'conv1', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García', cliente_avatar: mockClientes[0].avatar_url,
    ultimo_mensaje: '¡Genial! Nos vemos mañana entonces 💪', ultimo_mensaje_hora: formatISO(hace1h), no_leidos: 0,
    mensajes: [
      { id: 'm1', conversacion_id: 'conv1', contenido: '¡Hola María! Te recuerdo que tienes sesión mañana a las 10:00.', direccion: 'enviado', estado: 'leido', hora: formatISO(hace2h) },
      { id: 'm2', conversacion_id: 'conv1', contenido: '¡Hola Christian! Sí, ahí estaré. ¿Hacemos tren superior?', direccion: 'recibido', estado: 'leido', hora: formatISO(new Date(hace2h.getTime() + 15 * 60000)) },
      { id: 'm3', conversacion_id: 'conv1', contenido: 'Sí, tren superior con enfoque en press banca. Trae tu cinturón si puedes.', direccion: 'enviado', estado: 'leido', hora: formatISO(new Date(hace1h.getTime() + 10 * 60000)) },
      { id: 'm4', conversacion_id: 'conv1', contenido: '¡Genial! Nos vemos mañana entonces 💪', direccion: 'recibido', estado: 'leido', hora: formatISO(hace1h) },
    ]
  },
  {
    id: 'conv2', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez', cliente_avatar: mockClientes[5].avatar_url,
    ultimo_mensaje: 'Carlos, ¿todo bien? No viniste a la sesión de hoy.', ultimo_mensaje_hora: formatISO(hace3h), no_leidos: 0,
    mensajes: [
      { id: 'm5', conversacion_id: 'conv2', contenido: 'Hola Carlos, ¿cómo vas con la dieta esta semana?', direccion: 'enviado', estado: 'leido', hora: formatISO(ayer) },
      { id: 'm6', conversacion_id: 'conv2', contenido: 'Bien, más o menos... me cuesta el tema de las comidas', direccion: 'recibido', estado: 'leido', hora: formatISO(new Date(ayer.getTime() + 3 * 60 * 60000)) },
      { id: 'm7', conversacion_id: 'conv2', contenido: 'Vamos a simplificar el plan. Te mando opciones más fáciles.', direccion: 'enviado', estado: 'leido', hora: formatISO(new Date(ayer.getTime() + 4 * 60 * 60000)) },
      { id: 'm8', conversacion_id: 'conv2', contenido: 'Carlos, ¿todo bien? No viniste a la sesión de hoy.', direccion: 'enviado', estado: 'entregado', hora: formatISO(hace3h) },
    ]
  },
  {
    id: 'conv3', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', cliente_avatar: mockClientes[5].avatar_url,
    ultimo_mensaje: '¡Vamos con todo! La competición está cerca 🏆', ultimo_mensaje_hora: formatISO(ayer), no_leidos: 1,
    mensajes: [
      { id: 'm9', conversacion_id: 'conv3', contenido: 'Pedro, mañana hacemos la sesión de posing extra. 9:00 en el gimnasio.', direccion: 'enviado', estado: 'leido', hora: formatISO(hace2d) },
      { id: 'm10', conversacion_id: 'conv3', contenido: '¡Vamos con todo! La competición está cerca 🏆', direccion: 'recibido', estado: 'leido', hora: formatISO(ayer) },
    ]
  },
  {
    id: 'conv4', cliente_id: '7', cliente_nombre: 'Sofía', cliente_apellidos: 'Díaz', cliente_avatar: mockClientes[0].avatar_url,
    ultimo_mensaje: 'Completé los 18km hoy 🏃‍♀️ Ritmo 5:28/km', ultimo_mensaje_hora: formatISO(ayer), no_leidos: 2,
    mensajes: [
      { id: 'm11', conversacion_id: 'conv4', contenido: 'Sofía, ¿cómo fue la tirada larga?', direccion: 'enviado', estado: 'leido', hora: formatISO(hace2d) },
      { id: 'm12', conversacion_id: 'conv4', contenido: 'Completé los 18km hoy 🏃‍♀️ Ritmo 5:28/km', direccion: 'recibido', estado: 'leido', hora: formatISO(ayer) },
      { id: 'm13', conversacion_id: 'conv4', contenido: '¿Y la hidratación? ¿Cómo te sentiste en los últimos 5km?', direccion: 'recibido', estado: 'leido', hora: formatISO(new Date(ayer.getTime() + 30 * 60000)) },
    ]
  },
  {
    id: 'conv5', cliente_id: '8', cliente_nombre: 'Miguel', cliente_apellidos: 'Herrera', cliente_avatar: mockClientes[1].avatar_url,
    ultimo_mensaje: 'Miguel, es importante que hablemos. ¿Podemos agendar una llamada?', ultimo_mensaje_hora: formatISO(hace2d), no_leidos: 0,
    mensajes: [
      { id: 'm14', conversacion_id: 'conv5', contenido: 'Hola Miguel, no te vi en el gimnasio. ¿Todo bien?', direccion: 'enviado', estado: 'entregado', hora: formatISO(new Date(hace2d.getTime() - 2 * 60 * 60000)) },
      { id: 'm15', conversacion_id: 'conv5', contenido: 'Miguel, es importante que hablemos. ¿Podemos agendar una llamada?', direccion: 'enviado', estado: 'enviado', hora: formatISO(hace2d) },
    ]
  },
]

export const mockPlantillas: PlantillaMensaje[] = [
  { id: 'pl1', nombre: 'Recordatorio de sesión', contenido: '¡Hola {nombre}! 👋 Te recuerdo que tienes sesión mañana a las {hora}. ¡Nos vemos!', categoria: 'recordatorio_sesion' },
  { id: 'pl2', nombre: 'Seguimiento de progreso', contenido: '¡Hola {nombre}! ¿Cómo te has sentido esta semana? Me encantaría saber cómo vas con el plan de entrenamiento 💪', categoria: 'seguimiento_progreso' },
  { id: 'pl3', nombre: 'Recordatorio de pago', contenido: 'Hola {nombre}, te recuerdo que tienes pendiente el pago de la mensualidad. ¿Me confirmas cuando puedas? Gracias 🙏', categoria: 'recordatorio_pago' },
  { id: 'pl4', nombre: 'Motivación', contenido: '¡Buenos días {nombre}! 💪 Empezamos semana nueva. Recuerda: cada entrenamiento cuenta. ¡Vamos a por ello!', categoria: 'motivacion' },
  { id: 'pl5', nombre: 'Bienvenida', contenido: '¡Bienvenido/a a REVIVE, {nombre}! 🎊 Estoy emocionado de acompañarte en este camino. ¿Alguna duda para empezar?', categoria: 'general' },
]

// ==========================================
// NOTAS DE SESIÓN (Reportes)
// ==========================================

export const mockNotasSesion: NotaSesion[] = [
  {
    id: 'n1', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García', cliente_avatar: mockClientes[0].avatar_url,
    fecha: formatDate(addDays(today, -1)), energia: 4, puntualidad: 5, progreso: 4, estado_emocional: 5,
    comentario: 'Excelente sesión. María está muy motivada y se nota el progreso en sentadillas. Subimos peso en press banca.',
    created_at: formatISO(addDays(today, -1))
  },
  {
    id: 'n2', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez', cliente_avatar: mockClientes[5].avatar_url,
    fecha: formatDate(addDays(today, -1)), energia: 2, puntualidad: 3, progreso: 2, estado_emocional: 2,
    comentario: 'Carlos llegó cansado y desmotivado. No cumplió la dieta esta semana. Hay que hablar seriamente sobre compromiso.',
    created_at: formatISO(addDays(today, -1))
  },
  {
    id: 'n3', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', cliente_avatar: mockClientes[5].avatar_url,
    fecha: formatDate(addDays(today, -2)), energia: 5, puntualidad: 5, progreso: 5, estado_emocional: 5,
    comentario: 'Pedro en modo competición. Todos los levantamientos con buena técnica. Peso corporal estable en 78.5kg.',
    created_at: formatISO(addDays(today, -2))
  },
  {
    id: 'n4', cliente_id: '7', cliente_nombre: 'Sofía', cliente_apellidos: 'Díaz', cliente_avatar: mockClientes[0].avatar_url,
    fecha: formatDate(addDays(today, -3)), energia: 5, puntualidad: 5, progreso: 5, estado_emocional: 4,
    comentario: 'Sofía completó 18km sin parar. Ritmo constante de 5:30/km. Preparación para maratón va según plan.',
    created_at: formatISO(addDays(today, -3))
  },
  {
    id: 'n5', cliente_id: '10', cliente_nombre: 'David', cliente_apellidos: 'Serrano', cliente_avatar: mockClientes[1].avatar_url,
    fecha: formatDate(addDays(today, -2)), energia: 4, puntualidad: 5, progreso: 4, estado_emocional: 4,
    comentario: 'David mantiene muy buen nivel. Ajustamos carga en ejercicios de fuerza explosiva.',
    created_at: formatISO(addDays(today, -2))
  },
  // Alejandro Gutiérrez - notas de sesión
  {
    id: 'n6', cliente_id: '11', cliente_nombre: 'Alejandro', cliente_apellidos: 'Gutiérrez', cliente_avatar: mockClientes[0].avatar_url,
    fecha: formatDate(addDays(today, -2)), energia: 5, puntualidad: 5, progreso: 4, estado_emocional: 5,
    comentario: 'Alejandro viene con mucha energía. Aumentamos peso en press banca a 70kg. Técnica muy limpia.',
    created_at: formatISO(addDays(today, -2))
  },
  {
    id: 'n7', cliente_id: '11', cliente_nombre: 'Alejandro', cliente_apellidos: 'Gutiérrez', cliente_avatar: mockClientes[0].avatar_url,
    fecha: formatDate(addDays(today, -5)), energia: 4, puntualidad: 5, progreso: 4, estado_emocional: 4,
    comentario: 'Buen trabajo en día de pierna. Sentadilla mejorando, llegamos a 80kg. Seguimos con el plan de volumen.',
    created_at: formatISO(addDays(today, -5))
  },
  {
    id: 'n8', cliente_id: '11', cliente_nombre: 'Alejandro', cliente_apellidos: 'Gutiérrez', cliente_avatar: mockClientes[0].avatar_url,
    fecha: formatDate(addDays(today, -7)), energia: 4, puntualidad: 4, progreso: 5, estado_emocional: 4,
    comentario: 'Día de tirón excelente. Dominadas con +5kg, muy contento con su progreso.',
    created_at: formatISO(addDays(today, -7))
  },
  // Laura Pereda - notas de sesión
  {
    id: 'n9', cliente_id: '12', cliente_nombre: 'Laura', cliente_apellidos: 'Pereda', cliente_avatar: mockClientes[1].avatar_url,
    fecha: formatDate(addDays(today, -1)), energia: 4, puntualidad: 5, progreso: 4, estado_emocional: 5,
    comentario: 'Laura muy motivada. Ya nota cambios en su cuerpo. Hoy hicimos full body con más intensidad.',
    created_at: formatISO(addDays(today, -1))
  },
  {
    id: 'n10', cliente_id: '12', cliente_nombre: 'Laura', cliente_apellidos: 'Pereda', cliente_avatar: mockClientes[1].avatar_url,
    fecha: formatDate(addDays(today, -3)), energia: 4, puntualidad: 5, progreso: 4, estado_emocional: 4,
    comentario: 'Mejorando en técnica de sentadilla. Añadimos hip thrust con 40kg. Excelente actitud.',
    created_at: formatISO(addDays(today, -3))
  },
  {
    id: 'n11', cliente_id: '12', cliente_nombre: 'Laura', cliente_apellidos: 'Pereda', cliente_avatar: mockClientes[1].avatar_url,
    fecha: formatDate(addDays(today, -6)), energia: 3, puntualidad: 5, progreso: 4, estado_emocional: 4,
    comentario: 'Vino un poco cansada del trabajo pero completó toda la sesión. Muy constante.',
    created_at: formatISO(addDays(today, -6))
  },
]

export const mockReporteMensual: ReporteMensual = {
  mes: 'Enero 2025',
  sesiones_totales: 45,
  sesiones_completadas: 42,
  tasa_asistencia: 93.3,
  clientes_activos: 9,
  adherencia_promedio: 78,
  ingresos_totales: 1370,
}

export const mockClientesAdherencia: ClienteAdherencia[] = [
  { cliente_id: '4', cliente_nombre: 'Pedro López', cliente_avatar: mockClientes[5].avatar_url, adherencia: 98, tendencia: 'subiendo' },
  { cliente_id: '7', cliente_nombre: 'Sofía Díaz', cliente_avatar: mockClientes[0].avatar_url, adherencia: 95, tendencia: 'subiendo' },
  { cliente_id: '1', cliente_nombre: 'María García', cliente_avatar: mockClientes[0].avatar_url, adherencia: 92, tendencia: 'subiendo' },
  { cliente_id: '10', cliente_nombre: 'David Serrano', cliente_avatar: mockClientes[1].avatar_url, adherencia: 90, tendencia: 'estable' },
  { cliente_id: '11', cliente_nombre: 'Alejandro Gutiérrez', cliente_avatar: mockClientes[0].avatar_url, adherencia: 88, tendencia: 'subiendo' },
  { cliente_id: '9', cliente_nombre: 'Elena Navarro', cliente_avatar: mockClientes[0].avatar_url, adherencia: 85, tendencia: 'subiendo' },
  { cliente_id: '12', cliente_nombre: 'Laura Pereda', cliente_avatar: mockClientes[1].avatar_url, adherencia: 82, tendencia: 'subiendo' },
]

// ==========================================
// TRAINER PERFIL Y PREFERENCIAS
// ==========================================

export const mockTrainerPerfil: TrainerPerfil = {
  id: 'trainer1',
  nombre: 'Christian',
  apellidos: 'Revive',
  email: 'christian@revive.fit',
  telefono: '+34 600 123 456',
  avatar_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150',
  especialidad: 'Entrenamiento Personal y Preparación Física',
  descripcion: 'Entrenador certificado con más de 10 años de experiencia en transformación física y preparación para competiciones.',
}

export const mockPreferencias: Preferencias = {
  tema: 'dark',
  idioma: 'es',
  notificaciones_email: true,
  notificaciones_push: true,
  recordatorios_sesion: true,
  recordatorios_pago: true,
}
