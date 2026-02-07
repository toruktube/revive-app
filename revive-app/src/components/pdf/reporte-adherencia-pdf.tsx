'use client'

import { Document, Page, Text, View, Svg, Circle, Path } from '@react-pdf/renderer'
import { baseStyles, colors, statsStyles, tableStyles } from './pdf-styles'
import type { ClienteConEstado, NotaSesion, SesionCalendario } from '@/types'
import { calcularEstadisticasCliente, formatFecha, getTendenciaTexto } from '@/lib/pdf-utils'

interface ReporteAdherenciaPDFProps {
  cliente: ClienteConEstado
  sesiones: SesionCalendario[]
  notas: NotaSesion[]
  trainerName?: string
}

// Circular Gauge Component for PDF
function CircularGaugePDF({ value, size = 80 }: { value: number; size?: number }) {
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius * 0.75 // 270 degrees
  const offset = circumference - (value / 100) * circumference

  const getColor = () => {
    if (value >= 80) return colors.emerald
    if (value >= 60) return colors.blue
    if (value >= 40) return colors.amber
    return colors.red
  }

  // Calculate arc path for 270 degrees (starting from bottom-left, going clockwise)
  const startAngle = 135 // degrees
  const endAngle = 45 // degrees (270 degree sweep)

  const polarToCartesian = (angle: number) => {
    const radians = (angle - 90) * Math.PI / 180
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    }
  }

  const start = polarToCartesian(startAngle)
  const end = polarToCartesian(endAngle)
  const progressEnd = polarToCartesian(startAngle + (270 * value / 100))

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference * 0.33}`}
          transform={`rotate(135 ${center} ${center})`}
        />
        {/* Progress arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference - offset} ${circumference + offset}`}
          transform={`rotate(135 ${center} ${center})`}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>{value}%</Text>
      </View>
    </View>
  )
}

// Small stat gauge for breakdown
function MiniGaugePDF({ value, label, color }: { value: number; label: string; color: string }) {
  const size = 50
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius * 0.75

  return (
    <View style={{ alignItems: 'center', width: 70 }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference * 0.33}`}
          transform={`rotate(135 ${center} ${center})`}
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${(circumference * value / 100)} ${circumference}`}
          transform={`rotate(135 ${center} ${center})`}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={{ fontSize: 12, fontWeight: 600, color: colors.text, marginTop: 4 }}>{value}%</Text>
      <Text style={{ fontSize: 8, color: colors.textMuted, textTransform: 'uppercase' }}>{label}</Text>
    </View>
  )
}

export function ReporteAdherenciaPDF({ cliente, sesiones, notas, trainerName = 'REVIVE Coach' }: ReporteAdherenciaPDFProps) {
  const stats = calcularEstadisticasCliente(cliente, sesiones, notas, 30)
  const fechaReporte = formatFecha(new Date())

  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        {/* Header */}
        <View style={baseStyles.header}>
          <View>
            <Text style={baseStyles.logo}>REVIVE</Text>
            <Text style={{ fontSize: 10, color: colors.textMuted }}>Reporte de Adherencia</Text>
          </View>
          <View style={baseStyles.headerRight}>
            <Text style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>
              {cliente.nombre} {cliente.apellidos}
            </Text>
            <Text style={baseStyles.date}>{fechaReporte}</Text>
          </View>
        </View>

        {/* Main adherence score */}
        <View style={[baseStyles.card, { alignItems: 'center', paddingVertical: 24 }]}>
          <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase' }}>
            Puntuacion de Adherencia
          </Text>
          <CircularGaugePDF value={stats.adherenciaPromedio} size={100} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={{ fontSize: 11, color: stats.tendencia === 'subiendo' ? colors.emerald : stats.tendencia === 'bajando' ? colors.red : colors.textMuted }}>
              {stats.tendencia === 'subiendo' ? '↑' : stats.tendencia === 'bajando' ? '↓' : '→'} {getTendenciaTexto(stats.tendencia)}
            </Text>
            <Text style={{ fontSize: 10, color: colors.textMuted, marginLeft: 8 }}>ultimos 30 dias</Text>
          </View>
        </View>

        {/* Stats grid */}
        <View style={{ marginTop: 16, marginBottom: 16 }}>
          <Text style={baseStyles.sectionTitle}>Resumen de Sesiones</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={[statsStyles.statCard, { flex: 1 }]}>
              <Text style={statsStyles.statValue}>{stats.sesionesTotales}</Text>
              <Text style={statsStyles.statLabel}>Sesiones Totales</Text>
            </View>
            <View style={[statsStyles.statCard, { flex: 1 }]}>
              <Text style={[statsStyles.statValue, { color: colors.emerald }]}>{stats.sesionesCompletadas}</Text>
              <Text style={statsStyles.statLabel}>Completadas</Text>
            </View>
            <View style={[statsStyles.statCard, { flex: 1 }]}>
              <Text style={[statsStyles.statValue, { color: colors.amber }]}>{stats.tasaAsistencia}%</Text>
              <Text style={statsStyles.statLabel}>Tasa Asistencia</Text>
            </View>
          </View>
        </View>

        {/* Breakdown gauges */}
        <View style={{ marginBottom: 16 }}>
          <Text style={baseStyles.sectionTitle}>Desglose de Metricas</Text>
          <View style={[baseStyles.card, { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20 }]}>
            <MiniGaugePDF value={stats.promedioEnergia} label="Energia" color={colors.amber} />
            <MiniGaugePDF value={stats.promedioPuntualidad} label="Puntualidad" color={colors.blue} />
            <MiniGaugePDF value={stats.promedioProgreso} label="Progreso" color={colors.emerald} />
            <MiniGaugePDF value={stats.promedioEmocional} label="Animo" color={colors.purple} />
          </View>
        </View>

        {/* Recent notes */}
        {stats.notasRecientes.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={baseStyles.sectionTitle}>Notas Recientes</Text>
            {stats.notasRecientes.map((nota, index) => (
              <View key={nota.id} style={[baseStyles.card, { marginBottom: 8 }]}>
                <View style={baseStyles.spaceBetween}>
                  <Text style={{ fontSize: 10, color: colors.primary, fontWeight: 600 }}>
                    {formatFecha(nota.fecha)}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Text style={{ fontSize: 9, color: colors.amber }}>E:{nota.energia}</Text>
                    <Text style={{ fontSize: 9, color: colors.blue }}>P:{nota.puntualidad}</Text>
                    <Text style={{ fontSize: 9, color: colors.emerald }}>Pr:{nota.progreso}</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 10, color: colors.text, marginTop: 8 }}>{nota.comentario}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Generado por {trainerName}</Text>
          <Text style={baseStyles.footerText}>REVIVE - Tu entrenador personal</Text>
        </View>
      </Page>
    </Document>
  )
}
