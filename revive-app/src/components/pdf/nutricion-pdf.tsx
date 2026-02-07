'use client'

import { Document, Page, Text, View } from '@react-pdf/renderer'
import { baseStyles, colors, macroStyles } from './pdf-styles'
import type { ClienteConEstado, PlanNutricion } from '@/types'
import { formatFecha, getObjetivoTexto } from '@/lib/pdf-utils'

interface NutricionPDFProps {
  cliente: ClienteConEstado
  plan: PlanNutricion
  trainerName?: string
}

// Macro bar component
function MacroBar({ proteinas, carbohidratos, grasas }: { proteinas: number; carbohidratos: number; grasas: number }) {
  const total = proteinas + carbohidratos + grasas
  const protPercent = (proteinas / total) * 100
  const carbPercent = (carbohidratos / total) * 100
  const grasPercent = (grasas / total) * 100

  return (
    <View style={{ marginBottom: 20 }}>
      {/* Bar */}
      <View style={macroStyles.macroBar}>
        <View style={[macroStyles.macroSegment, { flex: protPercent, backgroundColor: colors.blue }]} />
        <View style={[macroStyles.macroSegment, { flex: carbPercent, backgroundColor: colors.amber }]} />
        <View style={[macroStyles.macroSegment, { flex: grasPercent, backgroundColor: colors.purple }]} />
      </View>

      {/* Legend */}
      <View style={macroStyles.macroLegend}>
        <View style={macroStyles.macroItem}>
          <View style={[macroStyles.macroDot, { backgroundColor: colors.blue }]} />
          <Text style={macroStyles.macroValue}>{proteinas}g</Text>
          <Text style={macroStyles.macroLabel}>Proteinas</Text>
        </View>
        <View style={macroStyles.macroItem}>
          <View style={[macroStyles.macroDot, { backgroundColor: colors.amber }]} />
          <Text style={macroStyles.macroValue}>{carbohidratos}g</Text>
          <Text style={macroStyles.macroLabel}>Carbohidratos</Text>
        </View>
        <View style={macroStyles.macroItem}>
          <View style={[macroStyles.macroDot, { backgroundColor: colors.purple }]} />
          <Text style={macroStyles.macroValue}>{grasas}g</Text>
          <Text style={macroStyles.macroLabel}>Grasas</Text>
        </View>
      </View>
    </View>
  )
}

// Meal card component
function MealCard({ nombre, hora, descripcion, calorias, proteinas, carbohidratos, grasas, index }: {
  nombre: string
  hora?: string
  descripcion: string
  calorias?: number
  proteinas?: number
  carbohidratos?: number
  grasas?: number
  index: number
}) {
  return (
    <View style={[baseStyles.card, { marginBottom: 10 }]} wrap={false}>
      <View style={baseStyles.spaceBetween}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
            <Text style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{index + 1}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>{nombre}</Text>
            {hora && <Text style={{ fontSize: 9, color: colors.textMuted }}>{hora}</Text>}
          </View>
        </View>
        {calorias && (
          <View style={[baseStyles.badge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
            <Text style={[baseStyles.badgeText, { color: colors.emerald }]}>{calorias} kcal</Text>
          </View>
        )}
      </View>

      <Text style={{ fontSize: 10, color: colors.text, marginTop: 10, lineHeight: 1.4 }}>
        {descripcion}
      </Text>

      {(proteinas || carbohidratos || grasas) && (
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${colors.border}` }}>
          {proteinas !== undefined && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.blue, marginRight: 4 }} />
              <Text style={{ fontSize: 9, color: colors.textMuted }}>P: {proteinas}g</Text>
            </View>
          )}
          {carbohidratos !== undefined && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.amber, marginRight: 4 }} />
              <Text style={{ fontSize: 9, color: colors.textMuted }}>C: {carbohidratos}g</Text>
            </View>
          )}
          {grasas !== undefined && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.purple, marginRight: 4 }} />
              <Text style={{ fontSize: 9, color: colors.textMuted }}>G: {grasas}g</Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export function NutricionPDF({ cliente, plan, trainerName = 'REVIVE Coach' }: NutricionPDFProps) {
  const fechaReporte = formatFecha(new Date())

  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        {/* Header */}
        <View style={baseStyles.header}>
          <View>
            <Text style={baseStyles.logo}>REVIVE</Text>
            <Text style={{ fontSize: 10, color: colors.textMuted }}>Plan de Nutricion</Text>
          </View>
          <View style={baseStyles.headerRight}>
            <Text style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>
              {cliente.nombre} {cliente.apellidos}
            </Text>
            <Text style={baseStyles.date}>{fechaReporte}</Text>
          </View>
        </View>

        {/* Plan info card */}
        <View style={[baseStyles.card, { marginBottom: 20 }]}>
          <Text style={{ fontSize: 18, fontWeight: 700, color: colors.text, marginBottom: 8 }}>
            {plan.nombre}
          </Text>
          {plan.descripcion && (
            <Text style={{ fontSize: 10, color: colors.textMuted, marginBottom: 12 }}>
              {plan.descripcion}
            </Text>
          )}

          {/* Calories highlight */}
          <View style={{
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: 8,
            padding: 16,
            alignItems: 'center',
            marginVertical: 12,
          }}>
            <Text style={{ fontSize: 32, fontWeight: 700, color: colors.primary }}>
              {plan.calorias_totales}
            </Text>
            <Text style={{ fontSize: 11, color: colors.textMuted, textTransform: 'uppercase' }}>
              Calorias Diarias
            </Text>
          </View>

          {/* Macro distribution */}
          <MacroBar
            proteinas={plan.proteinas_g}
            carbohidratos={plan.carbohidratos_g}
            grasas={plan.grasas_g}
          />

          {plan.objetivo && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Text style={{ fontSize: 10, color: colors.textMuted }}>Objetivo: </Text>
              <View style={[baseStyles.badge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[baseStyles.badgeText, { color: colors.emerald }]}>
                  {getObjetivoTexto(plan.objetivo)}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Meals section */}
        <View style={{ marginBottom: 16 }}>
          <Text style={baseStyles.sectionTitle}>Comidas del Dia</Text>

          {plan.comidas.map((comida, index) => (
            <MealCard
              key={comida.id}
              nombre={comida.nombre}
              hora={comida.hora}
              descripcion={comida.descripcion}
              calorias={comida.calorias}
              proteinas={comida.proteinas}
              carbohidratos={comida.carbohidratos}
              grasas={comida.grasas}
              index={index}
            />
          ))}
        </View>

        {/* Tips section */}
        <View style={[baseStyles.card, { backgroundColor: 'rgba(99, 102, 241, 0.05)' }]} wrap={false}>
          <Text style={{ fontSize: 11, fontWeight: 600, color: colors.primary, marginBottom: 8 }}>
            Recomendaciones
          </Text>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 9, color: colors.textMuted }}>
              • Bebe al menos 2L de agua al dia
            </Text>
            <Text style={{ fontSize: 9, color: colors.textMuted }}>
              • Respeta los horarios de comidas
            </Text>
            <Text style={{ fontSize: 9, color: colors.textMuted }}>
              • Puedes ajustar cantidades segun tu hambre, pero mantén las proporciones
            </Text>
            <Text style={{ fontSize: 9, color: colors.textMuted }}>
              • Si tienes dudas, consulta con tu entrenador
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={baseStyles.footer}>
          <Text style={baseStyles.footerText}>Generado por {trainerName}</Text>
          <Text style={baseStyles.footerText}>REVIVE - Tu entrenador personal</Text>
        </View>
      </Page>
    </Document>
  )
}
