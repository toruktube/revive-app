import type { ClienteConEstado, NotaSesion, SesionCalendario } from '@/types'

export interface EstadisticasCliente {
  adherenciaPromedio: number
  sesionesTotales: number
  sesionesCompletadas: number
  sesionesNoAsistio: number
  sesionesCanceladas: number
  tasaAsistencia: number
  tendencia: 'subiendo' | 'estable' | 'bajando'
  promedioEnergia: number
  promedioPuntualidad: number
  promedioProgreso: number
  promedioEmocional: number
  notasRecientes: NotaSesion[]
}

export function calcularEstadisticasCliente(
  cliente: ClienteConEstado,
  sesiones: SesionCalendario[],
  notas: NotaSesion[],
  diasAtras: number = 30
): EstadisticasCliente {
  const fechaLimite = new Date()
  fechaLimite.setDate(fechaLimite.getDate() - diasAtras)

  // Filter sessions for this client in the time period
  const sesionesCliente = sesiones.filter(s =>
    s.cliente_id === cliente.id &&
    new Date(s.fecha) >= fechaLimite
  )

  // Filter notes for this client in the time period
  const notasCliente = notas.filter(n =>
    n.cliente_id === cliente.id &&
    new Date(n.fecha) >= fechaLimite
  ).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())

  // Calculate session stats
  const sesionesTotales = sesionesCliente.length
  const sesionesCompletadas = sesionesCliente.filter(s => s.estado === 'completada').length
  const sesionesNoAsistio = sesionesCliente.filter(s => s.estado === 'no_asistio').length
  const sesionesCanceladas = sesionesCliente.filter(s => s.estado === 'cancelada').length
  const tasaAsistencia = sesionesTotales > 0
    ? Math.round((sesionesCompletadas / sesionesTotales) * 100)
    : 0

  // Calculate averages from notes
  const promedioEnergia = notasCliente.length > 0
    ? Math.round(notasCliente.reduce((acc, n) => acc + n.energia, 0) / notasCliente.length * 20)
    : 0
  const promedioPuntualidad = notasCliente.length > 0
    ? Math.round(notasCliente.reduce((acc, n) => acc + n.puntualidad, 0) / notasCliente.length * 20)
    : 0
  const promedioProgreso = notasCliente.length > 0
    ? Math.round(notasCliente.reduce((acc, n) => acc + n.progreso, 0) / notasCliente.length * 20)
    : 0
  const promedioEmocional = notasCliente.length > 0
    ? Math.round(notasCliente.reduce((acc, n) => acc + n.estado_emocional, 0) / notasCliente.length * 20)
    : 0

  return {
    adherenciaPromedio: cliente.adherenciaPromedio || 0,
    sesionesTotales,
    sesionesCompletadas,
    sesionesNoAsistio,
    sesionesCanceladas,
    tasaAsistencia,
    tendencia: cliente.tendencia || 'estable',
    promedioEnergia,
    promedioPuntualidad,
    promedioProgreso,
    promedioEmocional,
    notasRecientes: notasCliente.slice(0, 3),
  }
}

export function formatFecha(fecha: string | Date): string {
  const d = new Date(fecha)
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatFechaCorta(fecha: string | Date): string {
  const d = new Date(fecha)
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })
}

export function getTendenciaTexto(tendencia: 'subiendo' | 'estable' | 'bajando'): string {
  switch (tendencia) {
    case 'subiendo':
      return 'Mejorando'
    case 'bajando':
      return 'Decreciendo'
    default:
      return 'Estable'
  }
}

export function getObjetivoTexto(objetivo: string | undefined): string {
  if (!objetivo) return 'Sin especificar'

  const objetivos: Record<string, string> = {
    'perdida_grasa': 'Perdida de grasa',
    'ganancia_muscular': 'Ganancia muscular',
    'tonificacion': 'Tonificacion',
    'resistencia': 'Resistencia',
    'fuerza': 'Fuerza',
    'salud_general': 'Salud general',
  }

  return objetivos[objetivo] || objetivo
}

export function getNivelTexto(nivel: string | undefined): string {
  if (!nivel) return 'Sin especificar'

  const niveles: Record<string, string> = {
    'principiante': 'Principiante',
    'intermedio': 'Intermedio',
    'avanzado': 'Avanzado',
    'inicial': 'Inicial',
    'medio': 'Medio',
    'competicion': 'Competicion',
  }

  return niveles[nivel] || nivel
}

// Generate circular gauge SVG path for PDF
export function generateGaugeSvg(value: number, size: number = 100): string {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * Math.PI * 1.5 // 270 degrees
  const offset = circumference - (value / 100) * circumference

  // Get color based on value
  const getColor = () => {
    if (value >= 80) return '#10B981' // emerald
    if (value >= 60) return '#3B82F6' // blue
    if (value >= 40) return '#F59E0B' // amber
    return '#EF4444' // red
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        transform="rotate(-135 ${size / 2} ${size / 2})"
      />
      <circle
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        fill="none"
        stroke="${getColor()}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"
        transform="rotate(-135 ${size / 2} ${size / 2})"
      />
    </svg>
  `
}
