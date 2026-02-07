'use client'

import { Document, Page, Text, View } from '@react-pdf/renderer'
import { baseStyles, colors, tableStyles } from './pdf-styles'
import type { ClienteConEstado, RutinaEntrenamiento } from '@/types'
import { formatFecha, getNivelTexto, getObjetivoTexto } from '@/lib/pdf-utils'

interface RutinaPDFProps {
  cliente: ClienteConEstado
  rutina: RutinaEntrenamiento
  trainerName?: string
}

export function RutinaPDF({ cliente, rutina, trainerName = 'REVIVE Coach' }: RutinaPDFProps) {
  const fechaReporte = formatFecha(new Date())

  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        {/* Header */}
        <View style={baseStyles.header}>
          <View>
            <Text style={baseStyles.logo}>REVIVE</Text>
            <Text style={{ fontSize: 10, color: colors.textMuted }}>Plan de Entrenamiento</Text>
          </View>
          <View style={baseStyles.headerRight}>
            <Text style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>
              {cliente.nombre} {cliente.apellidos}
            </Text>
            <Text style={baseStyles.date}>{fechaReporte}</Text>
          </View>
        </View>

        {/* Routine info card */}
        <View style={[baseStyles.card, { marginBottom: 20 }]}>
          <Text style={{ fontSize: 18, fontWeight: 700, color: colors.text, marginBottom: 8 }}>
            {rutina.nombre}
          </Text>
          {rutina.descripcion && (
            <Text style={{ fontSize: 10, color: colors.textMuted, marginBottom: 12 }}>
              {rutina.descripcion}
            </Text>
          )}
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[baseStyles.badge, { backgroundColor: 'rgba(99, 102, 241, 0.2)' }]}>
                <Text style={[baseStyles.badgeText, { color: colors.primary }]}>{rutina.categoria}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[baseStyles.badge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[baseStyles.badgeText, { color: colors.emerald }]}>{getNivelTexto(rutina.nivel)}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[baseStyles.badge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Text style={[baseStyles.badgeText, { color: colors.amber }]}>{rutina.duracion}</Text>
              </View>
            </View>
          </View>
          {rutina.objetivo && (
            <Text style={{ fontSize: 10, color: colors.textMuted, marginTop: 12 }}>
              Objetivo: {getObjetivoTexto(rutina.objetivo)}
            </Text>
          )}
        </View>

        {/* Training days */}
        {rutina.dias.map((dia, diaIndex) => (
          <View key={dia.id} style={{ marginBottom: 16 }} wrap={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
              }}>
                <Text style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>{diaIndex + 1}</Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{dia.nombre}</Text>
            </View>

            {/* Exercise table */}
            <View style={[baseStyles.card, { padding: 0, overflow: 'hidden' }]}>
              {/* Table header */}
              <View style={tableStyles.tableHeader}>
                <Text style={[tableStyles.tableHeaderCell, { flex: 3 }]}>Ejercicio</Text>
                <Text style={[tableStyles.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Series</Text>
                <Text style={[tableStyles.tableHeaderCell, { flex: 1.5, textAlign: 'center' }]}>Reps</Text>
                <Text style={[tableStyles.tableHeaderCell, { flex: 1.5, textAlign: 'center' }]}>Peso</Text>
                <Text style={[tableStyles.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Desc.</Text>
              </View>

              {/* Table rows */}
              {dia.ejercicios.map((ejercicio, ejIndex) => (
                <View
                  key={ejercicio.id}
                  style={ejIndex % 2 === 0 ? tableStyles.tableRow : tableStyles.tableRowAlt}
                >
                  <View style={{ flex: 3 }}>
                    <Text style={tableStyles.tableCell}>{ejercicio.nombre}</Text>
                    {ejercicio.notas && (
                      <Text style={{ fontSize: 8, color: colors.textMuted, marginTop: 2 }}>
                        {ejercicio.notas}
                      </Text>
                    )}
                  </View>
                  <Text style={[tableStyles.tableCell, { flex: 1, textAlign: 'center' }]}>
                    {ejercicio.series}
                  </Text>
                  <Text style={[tableStyles.tableCell, { flex: 1.5, textAlign: 'center' }]}>
                    {ejercicio.repeticiones}
                  </Text>
                  <Text style={[tableStyles.tableCellMuted, { flex: 1.5, textAlign: 'center' }]}>
                    {ejercicio.peso || '-'}
                  </Text>
                  <Text style={[tableStyles.tableCellMuted, { flex: 1, textAlign: 'center' }]}>
                    {ejercicio.descanso || '-'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Footer */}
        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Generado por {trainerName}</Text>
          <Text style={baseStyles.footerText}>REVIVE - Tu entrenador personal</Text>
        </View>
      </Page>
    </Document>
  )
}
