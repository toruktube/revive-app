// Mock data centralizado para MVP Revive Coach
// Todos los datos hardcodeados para las 5 funcionalidades

import type {
  SesionCalendario,
  Pago,
  NotaSesion,
  PlantillaMensaje,
  MensajeWhatsApp,
  ConversacionWhatsApp,
  RutinaEntrenamiento,
  ClienteConPago,
} from '@/types'

// ==========================================
// Helpers para fechas relativas
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
// CLIENTES CON PAGO (extiende los 8 existentes)
// ==========================================

export const mockClientesConPago: ClienteConPago[] = [
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
    estadoPago: 'pagado',
    proximaSesion: formatDate(addDays(monday, 1)),
    proximoPago: formatDate(addDays(today, 15)),
    ultimoControl: {
      id: 'c1', cliente_id: '1', fecha: '2025-01-22',
      peso: 65.5, adherencia_entrenamiento: 95, adherencia_nutricion: 88,
      horas_sueno_promedio: 7.5, nivel_energia: 4, nivel_estres: 2,
      estado_animo: 4, motivacion: 8, created_at: '2025-01-22T10:00:00Z'
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
    estadoPago: 'vencido',
    proximaSesion: formatDate(addDays(monday, 0)),
    proximoPago: formatDate(addDays(today, -5)),
    ultimoControl: {
      id: 'c2', cliente_id: '2', fecha: '2025-01-18',
      peso: 82.0, adherencia_entrenamiento: 40, adherencia_nutricion: 50,
      horas_sueno_promedio: 5.5, nivel_energia: 2, nivel_estres: 4,
      estado_animo: 2, motivacion: 4, created_at: '2025-01-18T10:00:00Z'
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
    estadoPago: 'pagado',
    proximaSesion: formatDate(addDays(monday, 2)),
    proximoPago: formatDate(addDays(today, 10)),
    ultimoControl: {
      id: 'c3', cliente_id: '3', fecha: '2025-01-24',
      peso: 58.0, adherencia_entrenamiento: 80, adherencia_nutricion: 75,
      horas_sueno_promedio: 7.0, nivel_energia: 4, nivel_estres: 3,
      estado_animo: 4, motivacion: 7, created_at: '2025-01-24T10:00:00Z'
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
    estadoPago: 'pagado',
    proximaSesion: formatDate(addDays(monday, 0)),
    proximoPago: formatDate(addDays(today, 20)),
    ultimoControl: {
      id: 'c4', cliente_id: '4', fecha: '2025-01-23',
      peso: 78.5, adherencia_entrenamiento: 92, adherencia_nutricion: 85,
      horas_sueno_promedio: 8.0, nivel_energia: 5, nivel_estres: 2,
      estado_animo: 5, motivacion: 9, created_at: '2025-01-23T10:00:00Z'
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
    estadoPago: 'pendiente',
    proximaSesion: formatDate(addDays(monday, 3)),
    proximoPago: formatDate(addDays(today, 2)),
    ultimoControl: {
      id: 'c5', cliente_id: '5', fecha: '2025-01-21',
      peso: 70.0, adherencia_entrenamiento: 70, adherencia_nutricion: 60,
      horas_sueno_promedio: 6.0, nivel_energia: 3, nivel_estres: 3,
      estado_animo: 3, motivacion: 6, created_at: '2025-01-21T10:00:00Z'
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
    alertasActivas: 0,
    estadoPago: 'pagado',
    proximoPago: formatDate(addDays(today, 25)),
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
    estadoPago: 'pagado',
    proximaSesion: formatDate(addDays(monday, 4)),
    proximoPago: formatDate(addDays(today, 8)),
    ultimoControl: {
      id: 'c7', cliente_id: '7', fecha: '2025-01-24',
      peso: 55.0, adherencia_entrenamiento: 98, adherencia_nutricion: 92,
      horas_sueno_promedio: 8.5, nivel_energia: 5, nivel_estres: 1,
      estado_animo: 5, motivacion: 10, created_at: '2025-01-24T09:00:00Z'
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
    estadoPago: 'vencido',
    proximaSesion: formatDate(addDays(monday, 1)),
    proximoPago: formatDate(addDays(today, -10)),
    ultimoControl: {
      id: 'c8', cliente_id: '8', fecha: '2025-01-16',
      peso: 95.0, adherencia_entrenamiento: 50, adherencia_nutricion: 60,
      horas_sueno_promedio: 5.0, nivel_energia: 2, nivel_estres: 4,
      estado_animo: 2, motivacion: 4, created_at: '2025-01-16T10:00:00Z'
    }
  },
]

// ==========================================
// SESIONES DEL CALENDARIO (semana actual)
// ==========================================

export const mockSesiones: SesionCalendario[] = [
  // Lunes
  { id: 's1', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez', fecha: formatDate(addDays(monday, 0)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Gimnasio Central' },
  { id: 's2', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', fecha: formatDate(addDays(monday, 0)), hora_inicio: '08:30', hora_fin: '10:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Gimnasio Central' },
  { id: 's3', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García', fecha: formatDate(addDays(monday, 0)), hora_inicio: '11:00', hora_fin: '12:00', tipo: 'online', estado: 'completada', notas: 'Buen progreso en sentadillas' },
  // Martes
  { id: 's4', cliente_id: '8', cliente_nombre: 'Miguel', cliente_apellidos: 'Herrera', fecha: formatDate(addDays(monday, 1)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Gimnasio Central' },
  { id: 's5', cliente_id: '3', cliente_nombre: 'Laura', cliente_apellidos: 'Martínez', fecha: formatDate(addDays(monday, 1)), hora_inicio: '10:00', hora_fin: '11:00', tipo: 'online', estado: 'programada' },
  { id: 's6', cliente_id: '5', cliente_nombre: 'Ana', cliente_apellidos: 'Fernández', fecha: formatDate(addDays(monday, 1)), hora_inicio: '17:00', hora_fin: '18:00', tipo: 'online', estado: 'programada' },
  // Miércoles
  { id: 's7', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez', fecha: formatDate(addDays(monday, 2)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Gimnasio Central' },
  { id: 's8', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', fecha: formatDate(addDays(monday, 2)), hora_inicio: '08:30', hora_fin: '10:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Gimnasio Central' },
  { id: 's9', cliente_id: '7', cliente_nombre: 'Sofía', cliente_apellidos: 'Díaz', fecha: formatDate(addDays(monday, 2)), hora_inicio: '12:00', hora_fin: '13:00', tipo: 'online', estado: 'programada' },
  // Jueves
  { id: 's10', cliente_id: '8', cliente_nombre: 'Miguel', cliente_apellidos: 'Herrera', fecha: formatDate(addDays(monday, 3)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Gimnasio Central' },
  { id: 's11', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García', fecha: formatDate(addDays(monday, 3)), hora_inicio: '11:00', hora_fin: '12:00', tipo: 'online', estado: 'programada' },
  { id: 's12', cliente_id: '5', cliente_nombre: 'Ana', cliente_apellidos: 'Fernández', fecha: formatDate(addDays(monday, 3)), hora_inicio: '17:00', hora_fin: '18:00', tipo: 'online', estado: 'cancelada', notas: 'Canceló por trabajo' },
  // Viernes
  { id: 's13', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez', fecha: formatDate(addDays(monday, 4)), hora_inicio: '07:00', hora_fin: '08:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Gimnasio Central' },
  { id: 's14', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', fecha: formatDate(addDays(monday, 4)), hora_inicio: '08:30', hora_fin: '10:00', tipo: 'presencial', estado: 'programada', ubicacion: 'Gimnasio Central' },
  { id: 's15', cliente_id: '7', cliente_nombre: 'Sofía', cliente_apellidos: 'Díaz', fecha: formatDate(addDays(monday, 4)), hora_inicio: '12:00', hora_fin: '13:00', tipo: 'online', estado: 'programada' },
  { id: 's16', cliente_id: '3', cliente_nombre: 'Laura', cliente_apellidos: 'Martínez', fecha: formatDate(addDays(monday, 4)), hora_inicio: '16:00', hora_fin: '17:00', tipo: 'online', estado: 'programada' },
  // Sábado
  { id: 's17', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', fecha: formatDate(addDays(monday, 5)), hora_inicio: '09:00', hora_fin: '10:30', tipo: 'presencial', estado: 'programada', ubicacion: 'Gimnasio Central', notas: 'Sesión extra competición' },
  { id: 's18', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García', fecha: formatDate(addDays(monday, 5)), hora_inicio: '10:00', hora_fin: '11:00', tipo: 'evaluacion', estado: 'programada', notas: 'Evaluación mensual' },
]

// ==========================================
// PAGOS
// ==========================================

export const mockPagos: Pago[] = [
  // María - al día
  { id: 'p1', cliente_id: '1', cliente_nombre: 'María García', monto: 120, fecha_emision: '2025-01-01', fecha_vencimiento: '2025-01-05', fecha_pago: '2025-01-03', estado: 'pagado', metodo: 'transferencia', concepto: 'Mensualidad Enero 2025' },
  { id: 'p2', cliente_id: '1', cliente_nombre: 'María García', monto: 120, fecha_emision: '2024-12-01', fecha_vencimiento: '2024-12-05', fecha_pago: '2024-12-02', estado: 'pagado', metodo: 'transferencia', concepto: 'Mensualidad Diciembre 2024' },
  { id: 'p3', cliente_id: '1', cliente_nombre: 'María García', monto: 120, fecha_emision: '2024-11-01', fecha_vencimiento: '2024-11-05', fecha_pago: '2024-11-04', estado: 'pagado', metodo: 'bizum', concepto: 'Mensualidad Noviembre 2024' },
  // Carlos - vencido
  { id: 'p4', cliente_id: '2', cliente_nombre: 'Carlos Rodríguez', monto: 150, fecha_emision: '2025-01-01', fecha_vencimiento: '2025-01-05', estado: 'vencido', concepto: 'Mensualidad Enero 2025', notas: 'Reclamado 2 veces' },
  { id: 'p5', cliente_id: '2', cliente_nombre: 'Carlos Rodríguez', monto: 150, fecha_emision: '2024-12-01', fecha_vencimiento: '2024-12-05', fecha_pago: '2024-12-15', estado: 'pagado', metodo: 'efectivo', concepto: 'Mensualidad Diciembre 2024' },
  // Laura - al día
  { id: 'p6', cliente_id: '3', cliente_nombre: 'Laura Martínez', monto: 100, fecha_emision: '2025-01-01', fecha_vencimiento: '2025-01-10', fecha_pago: '2025-01-08', estado: 'pagado', metodo: 'bizum', concepto: 'Mensualidad Enero 2025' },
  // Pedro - al día
  { id: 'p7', cliente_id: '4', cliente_nombre: 'Pedro López', monto: 200, fecha_emision: '2025-01-01', fecha_vencimiento: '2025-01-05', fecha_pago: '2025-01-02', estado: 'pagado', metodo: 'tarjeta', concepto: 'Mensualidad Enero 2025 (Competición)' },
  { id: 'p8', cliente_id: '4', cliente_nombre: 'Pedro López', monto: 200, fecha_emision: '2024-12-01', fecha_vencimiento: '2024-12-05', fecha_pago: '2024-12-01', estado: 'pagado', metodo: 'tarjeta', concepto: 'Mensualidad Diciembre 2024' },
  // Ana - pendiente
  { id: 'p9', cliente_id: '5', cliente_nombre: 'Ana Fernández', monto: 100, fecha_emision: '2025-01-15', fecha_vencimiento: formatDate(addDays(today, 2)), estado: 'pendiente', concepto: 'Mensualidad Enero 2025 (2ª quincena)' },
  { id: 'p10', cliente_id: '5', cliente_nombre: 'Ana Fernández', monto: 100, fecha_emision: '2025-01-01', fecha_vencimiento: '2025-01-10', fecha_pago: '2025-01-09', estado: 'pagado', metodo: 'bizum', concepto: 'Mensualidad Enero 2025 (1ª quincena)' },
  // Javier - al día (en pausa pero pagó)
  { id: 'p11', cliente_id: '6', cliente_nombre: 'Javier Gómez', monto: 150, fecha_emision: '2025-01-01', fecha_vencimiento: '2025-01-05', fecha_pago: '2025-01-03', estado: 'pagado', metodo: 'transferencia', concepto: 'Mensualidad Enero 2025' },
  // Sofía - al día
  { id: 'p12', cliente_id: '7', cliente_nombre: 'Sofía Díaz', monto: 100, fecha_emision: '2025-01-05', fecha_vencimiento: '2025-01-10', fecha_pago: '2025-01-05', estado: 'pagado', metodo: 'bizum', concepto: 'Mensualidad Enero 2025' },
  // Miguel - vencido
  { id: 'p13', cliente_id: '8', cliente_nombre: 'Miguel Herrera', monto: 150, fecha_emision: '2025-01-01', fecha_vencimiento: '2025-01-05', estado: 'vencido', concepto: 'Mensualidad Enero 2025', notas: 'No contesta mensajes' },
  { id: 'p14', cliente_id: '8', cliente_nombre: 'Miguel Herrera', monto: 150, fecha_emision: '2024-12-01', fecha_vencimiento: '2024-12-05', estado: 'vencido', concepto: 'Mensualidad Diciembre 2024' },
]

// ==========================================
// NOTAS DEL DIARIO (post-sesión)
// ==========================================

export const mockNotasSesion: NotaSesion[] = [
  {
    id: 'n1', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García',
    fecha: formatDate(addDays(today, -1)), energia: 4, estado_animo: 5, adherencia: 4,
    notas_libres: 'Excelente sesión. María está muy motivada y se nota el progreso en sentadillas. Subimos peso en press banca.',
    objetivos_proxima: 'Probar peso récord en sentadilla',
    created_at: formatISO(addDays(today, -1))
  },
  {
    id: 'n2', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez',
    fecha: formatDate(addDays(today, -1)), energia: 2, estado_animo: 2, adherencia: 2,
    dolor_molestias: 'Molestia leve en hombro derecho',
    notas_libres: 'Carlos llegó cansado y desmotivado. No cumplió la dieta esta semana. Hay que hablar seriamente sobre compromiso.',
    objetivos_proxima: 'Conversación sobre adherencia y ajuste de plan',
    created_at: formatISO(addDays(today, -1))
  },
  {
    id: 'n3', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López',
    fecha: formatDate(addDays(today, -2)), energia: 5, estado_animo: 5, adherencia: 5,
    notas_libres: 'Pedro en modo competición. Todos los levantamientos con buena técnica. Peso corporal estable en 78.5kg.',
    objetivos_proxima: 'Ensayo de posing + ajuste carbs',
    created_at: formatISO(addDays(today, -2))
  },
  {
    id: 'n4', cliente_id: '3', cliente_nombre: 'Laura', cliente_apellidos: 'Martínez',
    fecha: formatDate(addDays(today, -2)), energia: 3, estado_animo: 4, adherencia: 3,
    notas_libres: 'Laura va bien pero le cuesta la parte de nutrición. Le preparé un plan de comidas más sencillo para esta semana.',
    objetivos_proxima: 'Revisar adherencia al nuevo plan nutricional',
    created_at: formatISO(addDays(today, -2))
  },
  {
    id: 'n5', cliente_id: '7', cliente_nombre: 'Sofía', cliente_apellidos: 'Díaz',
    fecha: formatDate(addDays(today, -3)), energia: 5, estado_animo: 4, adherencia: 5,
    notas_libres: 'Sofía completó 18km sin parar. Ritmo constante de 5:30/km. Preparación para maratón va según plan.',
    objetivos_proxima: 'Semana de descarga antes de la tirada larga',
    created_at: formatISO(addDays(today, -3))
  },
  {
    id: 'n6', cliente_id: '5', cliente_nombre: 'Ana', cliente_apellidos: 'Fernández',
    fecha: formatDate(addDays(today, -3)), energia: 3, estado_animo: 3, adherencia: 3,
    dolor_molestias: 'Dolor lumbar leve',
    notas_libres: 'Ana tiene dolor lumbar. Modificamos ejercicios para evitar carga axial. Recomiendo yoga o stretching extra.',
    objetivos_proxima: 'Seguimiento del dolor lumbar',
    created_at: formatISO(addDays(today, -3))
  },
  {
    id: 'n7', cliente_id: '8', cliente_nombre: 'Miguel', cliente_apellidos: 'Herrera',
    fecha: formatDate(addDays(today, -4)), energia: 2, estado_animo: 2, adherencia: 1,
    notas_libres: 'Miguel faltó a la sesión anterior sin avisar. Hoy vino pero sin ganas. Peso subió a 95kg. Necesita intervención urgente.',
    objetivos_proxima: 'Reunión motivacional + revisión completa del plan',
    created_at: formatISO(addDays(today, -4))
  },
  {
    id: 'n8', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García',
    fecha: formatDate(addDays(today, -5)), energia: 4, estado_animo: 4, adherencia: 4,
    notas_libres: 'Sesión de tren inferior. Buen volumen. Progresamos en hip thrust. Nutrición al día.',
    created_at: formatISO(addDays(today, -5))
  },
  {
    id: 'n9', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez',
    fecha: formatDate(addDays(today, -5)), energia: 3, estado_animo: 3, adherencia: 2,
    notas_libres: 'Carlos mejoró un poco respecto a la semana pasada. Pero sigue sin cumplir comidas. Le mandé recordatorios.',
    created_at: formatISO(addDays(today, -5))
  },
  {
    id: 'n10', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López',
    fecha: formatDate(addDays(today, -6)), energia: 4, estado_animo: 5, adherencia: 5,
    notas_libres: 'Entrenamiento de posing. Pedro cada vez más seguro. Competición en 6 semanas.',
    created_at: formatISO(addDays(today, -6))
  },
  {
    id: 'n11', cliente_id: '7', cliente_nombre: 'Sofía', cliente_apellidos: 'Díaz',
    fecha: formatDate(addDays(today, -7)), energia: 4, estado_animo: 5, adherencia: 5,
    notas_libres: 'Series de tempo a 5:15/km. Excelente forma. Ajustamos hidratación para las tiradas largas.',
    created_at: formatISO(addDays(today, -7))
  },
  {
    id: 'n12', cliente_id: '3', cliente_nombre: 'Laura', cliente_apellidos: 'Martínez',
    fecha: formatDate(addDays(today, -7)), energia: 3, estado_animo: 3, adherencia: 3,
    notas_libres: 'Laura un poco estancada. Sugiero cambiar rutina para generar nuevo estímulo.',
    objetivos_proxima: 'Nuevo plan de entrenamiento',
    created_at: formatISO(addDays(today, -7))
  },
]

// ==========================================
// PLANTILLAS DE MENSAJES
// ==========================================

export const mockPlantillas: PlantillaMensaje[] = [
  { id: 'pl1', nombre: 'Recordatorio sesión', contenido: '¡Hola {nombre}! 👋 Te recuerdo que tienes sesión mañana a las {hora}. ¡Nos vemos!', categoria: 'recordatorio' },
  { id: 'pl2', nombre: 'Motivación semanal', contenido: '¡Buenos días {nombre}! 💪 Empezamos semana nueva. Recuerda: cada entrenamiento cuenta. ¡Vamos a por ello!', categoria: 'motivacion' },
  { id: 'pl3', nombre: 'Seguimiento nutrición', contenido: 'Hola {nombre}, ¿cómo vas con la alimentación esta semana? 🥗 Recuerda priorizar las proteínas y mantenerte hidratado/a.', categoria: 'nutricion' },
  { id: 'pl4', nombre: 'Felicitación progreso', contenido: '¡{nombre}! Quería felicitarte por tu progreso 🎉 Los resultados se están notando. ¡Sigue así!', categoria: 'motivacion' },
  { id: 'pl5', nombre: 'Recordatorio pago', contenido: 'Hola {nombre}, te recuerdo que tienes pendiente el pago de la mensualidad. ¿Me confirmas cuando puedas? Gracias 🙏', categoria: 'recordatorio' },
  { id: 'pl6', nombre: 'Seguimiento post-sesión', contenido: '¡Hola {nombre}! ¿Cómo te encuentras después de la sesión de hoy? Alguna molestia o todo bien? 😊', categoria: 'seguimiento' },
  { id: 'pl7', nombre: 'Hidratación', contenido: '💧 Recordatorio: ¡No olvides beber al menos 2L de agua hoy, {nombre}!', categoria: 'nutricion' },
  { id: 'pl8', nombre: 'Descanso', contenido: 'Hola {nombre}, recuerda que el descanso es parte del entrenamiento. Intenta dormir al menos 7-8 horas esta noche 😴', categoria: 'seguimiento' },
  { id: 'pl9', nombre: 'Bienvenida', contenido: '¡Bienvenido/a a Revive, {nombre}! 🎊 Estoy emocionado de acompañarte en este camino. ¿Alguna duda para empezar?', categoria: 'general' },
  { id: 'pl10', nombre: 'Cancelación sesión', contenido: 'Hola {nombre}, necesito reprogramar la sesión de {fecha}. ¿Te viene bien {alternativa}?', categoria: 'recordatorio' },
]

// ==========================================
// CONVERSACIONES WHATSAPP
// ==========================================

const ahora = new Date()
const hace1h = new Date(ahora.getTime() - 1 * 60 * 60 * 1000)
const hace2h = new Date(ahora.getTime() - 2 * 60 * 60 * 1000)
const hace3h = new Date(ahora.getTime() - 3 * 60 * 60 * 1000)
const hace5h = new Date(ahora.getTime() - 5 * 60 * 60 * 1000)
const ayer = new Date(ahora.getTime() - 24 * 60 * 60 * 1000)
const hace2d = new Date(ahora.getTime() - 48 * 60 * 60 * 1000)

export const mockConversaciones: ConversacionWhatsApp[] = [
  {
    id: 'conv1', cliente_id: '1', cliente_nombre: 'María', cliente_apellidos: 'García', cliente_telefono: '+34 612 345 678',
    ultimo_mensaje: '¡Genial! Nos vemos mañana entonces 💪', ultimo_mensaje_hora: formatISO(hace1h), no_leidos: 0,
    mensajes: [
      { id: 'm1', conversacion_id: 'conv1', contenido: '¡Hola María! Te recuerdo que tienes sesión mañana a las 11:00.', direccion: 'enviado', estado: 'leido', hora: formatISO(hace2h) },
      { id: 'm2', conversacion_id: 'conv1', contenido: '¡Hola Christian! Sí, ahí estaré. ¿Hacemos tren superior?', direccion: 'recibido', estado: 'leido', hora: formatISO(new Date(hace2h.getTime() + 15 * 60000)) },
      { id: 'm3', conversacion_id: 'conv1', contenido: 'Sí, tren superior con enfoque en press banca. Trae tu cinturón si puedes.', direccion: 'enviado', estado: 'leido', hora: formatISO(new Date(hace1h.getTime() + 10 * 60000)) },
      { id: 'm4', conversacion_id: 'conv1', contenido: '¡Genial! Nos vemos mañana entonces 💪', direccion: 'recibido', estado: 'leido', hora: formatISO(hace1h) },
    ]
  },
  {
    id: 'conv2', cliente_id: '2', cliente_nombre: 'Carlos', cliente_apellidos: 'Rodríguez', cliente_telefono: '+34 623 456 789',
    ultimo_mensaje: 'Carlos, ¿todo bien? No viniste a la sesión de hoy.', ultimo_mensaje_hora: formatISO(hace3h), no_leidos: 0,
    mensajes: [
      { id: 'm5', conversacion_id: 'conv2', contenido: 'Hola Carlos, ¿cómo vas con la dieta esta semana?', direccion: 'enviado', estado: 'leido', hora: formatISO(ayer) },
      { id: 'm6', conversacion_id: 'conv2', contenido: 'Bien, más o menos... me cuesta el tema de las comidas', direccion: 'recibido', estado: 'leido', hora: formatISO(new Date(ayer.getTime() + 3 * 60 * 60000)) },
      { id: 'm7', conversacion_id: 'conv2', contenido: 'Vamos a simplificar el plan. Te mando opciones más fáciles.', direccion: 'enviado', estado: 'leido', hora: formatISO(new Date(ayer.getTime() + 4 * 60 * 60000)) },
      { id: 'm8', conversacion_id: 'conv2', contenido: 'Carlos, ¿todo bien? No viniste a la sesión de hoy.', direccion: 'enviado', estado: 'entregado', hora: formatISO(hace3h) },
    ]
  },
  {
    id: 'conv3', cliente_id: '4', cliente_nombre: 'Pedro', cliente_apellidos: 'López', cliente_telefono: '+34 645 678 901',
    ultimo_mensaje: '¡Vamos con todo! La competición está cerca 🏆', ultimo_mensaje_hora: formatISO(hace5h), no_leidos: 1,
    mensajes: [
      { id: 'm9', conversacion_id: 'conv3', contenido: 'Pedro, mañana hacemos la sesión de posing extra. 9:00 en el gimnasio.', direccion: 'enviado', estado: 'leido', hora: formatISO(hace5h) },
      { id: 'm10', conversacion_id: 'conv3', contenido: '¡Vamos con todo! La competición está cerca 🏆', direccion: 'recibido', estado: 'leido', hora: formatISO(hace5h) },
    ]
  },
  {
    id: 'conv4', cliente_id: '7', cliente_nombre: 'Sofía', cliente_apellidos: 'Díaz', cliente_telefono: '+34 678 901 234',
    ultimo_mensaje: 'Completé los 18km hoy 🏃‍♀️ Ritmo 5:28/km', ultimo_mensaje_hora: formatISO(ayer), no_leidos: 2,
    mensajes: [
      { id: 'm11', conversacion_id: 'conv4', contenido: 'Sofía, ¿cómo fue la tirada larga?', direccion: 'enviado', estado: 'leido', hora: formatISO(hace2d) },
      { id: 'm12', conversacion_id: 'conv4', contenido: 'Completé los 18km hoy 🏃‍♀️ Ritmo 5:28/km', direccion: 'recibido', estado: 'leido', hora: formatISO(ayer) },
      { id: 'm13', conversacion_id: 'conv4', contenido: '¿Y la hidratación? ¿Cómo te sentiste en los últimos 5km?', direccion: 'recibido', estado: 'leido', hora: formatISO(new Date(ayer.getTime() + 30 * 60000)) },
    ]
  },
  {
    id: 'conv5', cliente_id: '8', cliente_nombre: 'Miguel', cliente_apellidos: 'Herrera', cliente_telefono: '+34 689 012 345',
    ultimo_mensaje: 'Miguel, es importante que hablemos. ¿Podemos agendar una llamada?', ultimo_mensaje_hora: formatISO(hace2d), no_leidos: 0,
    mensajes: [
      { id: 'm14', conversacion_id: 'conv5', contenido: 'Hola Miguel, no te vi en el gimnasio. ¿Todo bien?', direccion: 'enviado', estado: 'entregado', hora: formatISO(new Date(hace2d.getTime() - 2 * 60 * 60000)) },
      { id: 'm15', conversacion_id: 'conv5', contenido: 'Miguel, es importante que hablemos. ¿Podemos agendar una llamada?', direccion: 'enviado', estado: 'enviado', hora: formatISO(hace2d) },
    ]
  },
  {
    id: 'conv6', cliente_id: '5', cliente_nombre: 'Ana', cliente_apellidos: 'Fernández', cliente_telefono: '+34 656 789 012',
    ultimo_mensaje: 'Vale, lo tendré en cuenta. Gracias!', ultimo_mensaje_hora: formatISO(ayer), no_leidos: 0,
    mensajes: [
      { id: 'm16', conversacion_id: 'conv6', contenido: 'Ana, ¿cómo sigue el dolor lumbar?', direccion: 'enviado', estado: 'leido', hora: formatISO(new Date(ayer.getTime() - 3 * 60 * 60000)) },
      { id: 'm17', conversacion_id: 'conv6', contenido: 'Un poco mejor, pero sigo notando cuando me agacho', direccion: 'recibido', estado: 'leido', hora: formatISO(new Date(ayer.getTime() - 2 * 60 * 60000)) },
      { id: 'm18', conversacion_id: 'conv6', contenido: 'Perfecto, mañana en la sesión evitaremos peso muerto y sentadillas profundas. Haremos más trabajo de core y movilidad.', direccion: 'enviado', estado: 'leido', hora: formatISO(new Date(ayer.getTime() - 1 * 60 * 60000)) },
      { id: 'm19', conversacion_id: 'conv6', contenido: 'Vale, lo tendré en cuenta. Gracias!', direccion: 'recibido', estado: 'leido', hora: formatISO(ayer) },
    ]
  },
]

// ==========================================
// RUTINAS DE ENTRENAMIENTO
// ==========================================

export const mockRutinas: RutinaEntrenamiento[] = [
  {
    id: 'r1', cliente_id: '1', nombre: 'Full Body - Definición',
    descripcion: 'Rutina de cuerpo completo 4 días/semana enfocada en mantener masa muscular durante déficit.',
    activa: true, fecha_inicio: '2025-01-01', fecha_fin: '2025-02-28', created_at: '2025-01-01T10:00:00Z',
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
    id: 'r2', cliente_id: '2', nombre: 'Push/Pull/Legs - Hipertrofia',
    descripcion: 'Rutina PPL 6 días/semana para máxima ganancia muscular.',
    activa: true, fecha_inicio: '2024-12-01', fecha_fin: '2025-02-28', created_at: '2024-12-01T10:00:00Z',
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
    id: 'r3', cliente_id: '4', nombre: 'Preparación Competición - 6 Semanas',
    descripcion: 'Rutina de definición extrema para competición de culturismo.',
    activa: true, fecha_inicio: '2025-01-15', fecha_fin: '2025-02-28', created_at: '2025-01-15T10:00:00Z',
    dias: [
      {
        id: 'd6', nombre: 'Pecho + Bíceps',
        ejercicios: [
          { id: 'e26', nombre: 'Press Banca Inclinado', series: 4, repeticiones: '10-12', peso: '70kg', descanso: '60s' },
          { id: 'e27', nombre: 'Aperturas con Mancuerna', series: 4, repeticiones: '12-15', peso: '16kg', descanso: '45s' },
          { id: 'e28', nombre: 'Pullover', series: 3, repeticiones: '12-15', peso: '20kg', descanso: '45s' },
          { id: 'e29', nombre: 'Curl Martillo', series: 4, repeticiones: '12-15', peso: '14kg', descanso: '45s' },
          { id: 'e30', nombre: 'Curl Concentrado', series: 3, repeticiones: '12-15', peso: '10kg', descanso: '30s' },
        ]
      },
      {
        id: 'd7', nombre: 'Espalda + Tríceps',
        ejercicios: [
          { id: 'e31', nombre: 'Jalón al Pecho', series: 4, repeticiones: '10-12', peso: '60kg', descanso: '60s' },
          { id: 'e32', nombre: 'Remo Bajo', series: 4, repeticiones: '10-12', peso: '55kg', descanso: '60s' },
          { id: 'e33', nombre: 'Remo con Mancuerna', series: 3, repeticiones: '10-12', peso: '25kg', descanso: '45s' },
          { id: 'e34', nombre: 'Press Francés', series: 4, repeticiones: '12-15', peso: '25kg', descanso: '45s' },
          { id: 'e35', nombre: 'Extensión Tríceps Polea', series: 3, repeticiones: '15-20', peso: '20kg', descanso: '30s' },
        ]
      },
    ]
  },
  {
    id: 'r4', cliente_id: '7', nombre: 'Preparación Maratón',
    descripcion: 'Complemento de fuerza para preparación de maratón. 2 días/semana.',
    activa: true, fecha_inicio: '2025-01-05', created_at: '2025-01-05T10:00:00Z',
    dias: [
      {
        id: 'd8', nombre: 'Fuerza Tren Inferior',
        ejercicios: [
          { id: 'e36', nombre: 'Sentadilla Goblet', series: 3, repeticiones: '12-15', peso: '16kg', descanso: '60s' },
          { id: 'e37', nombre: 'Step Ups', series: 3, repeticiones: '10 c/pierna', peso: '8kg', descanso: '45s' },
          { id: 'e38', nombre: 'Puente Glúteo', series: 3, repeticiones: '15', peso: '30kg', descanso: '45s' },
          { id: 'e39', nombre: 'Gemelos a una pierna', series: 3, repeticiones: '15 c/pierna', peso: 'Bodyweight', descanso: '30s' },
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
    id: 'r5', cliente_id: '3', nombre: 'Tonificación General - Principiante',
    descripcion: 'Rutina full body 3 días/semana para tonificación muscular.',
    activa: true, fecha_inicio: '2025-01-15', created_at: '2025-01-15T10:00:00Z',
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
  {
    id: 'r6', cliente_id: '5', nombre: 'Salud General - Adaptado',
    descripcion: 'Rutina adaptada para salud general con precauciones lumbares.',
    activa: true, fecha_inicio: '2025-01-10', created_at: '2025-01-10T10:00:00Z',
    dias: [
      {
        id: 'd12', nombre: 'Día 1 - Tren Superior + Core',
        ejercicios: [
          { id: 'e56', nombre: 'Press Mancuerna Sentada', series: 3, repeticiones: '12', peso: '5kg', descanso: '60s' },
          { id: 'e57', nombre: 'Remo Mancuerna (banco)', series: 3, repeticiones: '12', peso: '8kg', descanso: '60s' },
          { id: 'e58', nombre: 'Elevaciones Laterales', series: 3, repeticiones: '15', peso: '3kg', descanso: '45s' },
          { id: 'e59', nombre: 'Dead Bug', series: 3, repeticiones: '10 c/lado', descanso: '30s', notas: 'Activación core sin carga lumbar' },
          { id: 'e60', nombre: 'Bird Dog', series: 3, repeticiones: '10 c/lado', descanso: '30s' },
        ]
      },
      {
        id: 'd13', nombre: 'Día 2 - Tren Inferior (sin carga axial)',
        ejercicios: [
          { id: 'e61', nombre: 'Prensa (ligera)', series: 3, repeticiones: '15', peso: '40kg', descanso: '60s', notas: 'Sin carga axial por dolor lumbar' },
          { id: 'e62', nombre: 'Curl Femoral', series: 3, repeticiones: '12', peso: '15kg', descanso: '60s' },
          { id: 'e63', nombre: 'Puente Glúteo', series: 3, repeticiones: '15', peso: '20kg', descanso: '45s' },
          { id: 'e64', nombre: 'Abductores Máquina', series: 3, repeticiones: '15', peso: '25kg', descanso: '45s' },
          { id: 'e65', nombre: 'Stretching Lumbar', series: 1, repeticiones: '5min', notas: 'Cat-cow, child pose, rodillas al pecho' },
        ]
      },
    ]
  },
]

// ==========================================
// PLANTILLAS DE RUTINAS (templates reutilizables)
// ==========================================

export const mockPlantillasRutina: RutinaEntrenamiento[] = [
  {
    id: 'tpl1', cliente_id: '', nombre: 'Full Body Principiante',
    descripcion: 'Plantilla base para principiantes. 3 días/semana.',
    activa: false, fecha_inicio: '', created_at: '',
    dias: [
      {
        id: 'tpl-d1', nombre: 'Full Body',
        ejercicios: [
          { id: 'tpl-e1', nombre: 'Sentadilla Goblet', series: 3, repeticiones: '12-15', descanso: '60s' },
          { id: 'tpl-e2', nombre: 'Press Mancuerna', series: 3, repeticiones: '12', descanso: '60s' },
          { id: 'tpl-e3', nombre: 'Remo Mancuerna', series: 3, repeticiones: '12', descanso: '60s' },
          { id: 'tpl-e4', nombre: 'Zancadas', series: 3, repeticiones: '10 c/pierna', descanso: '60s' },
          { id: 'tpl-e5', nombre: 'Plancha', series: 3, repeticiones: '30s', descanso: '30s' },
        ]
      },
    ]
  },
  {
    id: 'tpl2', cliente_id: '', nombre: 'Upper/Lower Intermedio',
    descripcion: 'Plantilla torso/pierna para nivel intermedio. 4 días/semana.',
    activa: false, fecha_inicio: '', created_at: '',
    dias: [
      {
        id: 'tpl-d2', nombre: 'Upper A',
        ejercicios: [
          { id: 'tpl-e6', nombre: 'Press Banca', series: 4, repeticiones: '8-10', descanso: '90s' },
          { id: 'tpl-e7', nombre: 'Remo con Barra', series: 4, repeticiones: '8-10', descanso: '90s' },
          { id: 'tpl-e8', nombre: 'Press Militar', series: 3, repeticiones: '10-12', descanso: '60s' },
          { id: 'tpl-e9', nombre: 'Curl Bíceps', series: 3, repeticiones: '12-15', descanso: '45s' },
          { id: 'tpl-e10', nombre: 'Tríceps Polea', series: 3, repeticiones: '12-15', descanso: '45s' },
        ]
      },
      {
        id: 'tpl-d3', nombre: 'Lower A',
        ejercicios: [
          { id: 'tpl-e11', nombre: 'Sentadilla', series: 4, repeticiones: '8-10', descanso: '120s' },
          { id: 'tpl-e12', nombre: 'Peso Muerto Rumano', series: 4, repeticiones: '10-12', descanso: '90s' },
          { id: 'tpl-e13', nombre: 'Prensa', series: 3, repeticiones: '12-15', descanso: '60s' },
          { id: 'tpl-e14', nombre: 'Curl Femoral', series: 3, repeticiones: '12-15', descanso: '60s' },
          { id: 'tpl-e15', nombre: 'Gemelos', series: 4, repeticiones: '15-20', descanso: '45s' },
        ]
      },
    ]
  },
]
