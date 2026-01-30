'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, Dumbbell, BookTemplate } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassButton } from '@/components/glass/glass-button'
import { GlassBadge } from '@/components/glass/glass-badge'
import { RutinaCard } from '@/components/rutinas/rutina-card'
import { RutinaDetalle } from '@/components/rutinas/rutina-detalle'
import { RutinaEditor } from '@/components/rutinas/rutina-editor'
import { PlantillaRutinaList } from '@/components/rutinas/plantilla-rutina-list'
import { useRutinas } from '@/hooks/use-rutinas'
import { useCliente } from '@/hooks/use-cliente'
import type { RutinaEntrenamiento } from '@/types'

export default function ClienteRutinasPage() {
  const params = useParams()
  const clienteId = params.id as string
  const { cliente } = useCliente(clienteId)
  const { rutinasCliente, rutinaActiva, plantillas } = useRutinas()
  const [showEditor, setShowEditor] = useState(false)
  const [selectedRutina, setSelectedRutina] = useState<RutinaEntrenamiento | null>(null)

  const clienteRutinas = useMemo(() => rutinasCliente(clienteId), [rutinasCliente, clienteId])
  const activa = useMemo(() => rutinaActiva(clienteId), [rutinaActiva, clienteId])

  const clienteNombre = cliente
    ? `${cliente.nombre}${cliente.apellidos ? ` ${cliente.apellidos}` : ''}`
    : 'Cliente'

  const handleSelectRutina = (rutina: RutinaEntrenamiento) => {
    setSelectedRutina(rutina)
  }

  const handleSelectPlantilla = (_plantilla: RutinaEntrenamiento) => {
    // Mock: Open editor with template data
    setShowEditor(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Dumbbell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Rutinas</h2>
            <p className="text-sm text-muted-foreground">
              Rutinas de entrenamiento de {clienteNombre}
            </p>
          </div>
        </div>
        <GlassButton
          variant="primary"
          size="sm"
          onClick={() => setShowEditor(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nueva Rutina</span>
        </GlassButton>
      </motion.div>

      {/* Rutina Activa */}
      {activa && !selectedRutina && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-base font-semibold text-foreground">Rutina activa</h3>
            <GlassBadge variant="success" size="sm">En uso</GlassBadge>
          </div>
          <RutinaDetalle rutina={activa} />
        </motion.div>
      )}

      {/* Selected Rutina Detail */}
      {selectedRutina && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-foreground">Detalle de rutina</h3>
            <GlassButton
              variant="subtle"
              size="sm"
              onClick={() => setSelectedRutina(null)}
            >
              Volver al listado
            </GlassButton>
          </div>
          <RutinaDetalle rutina={selectedRutina} />
        </motion.div>
      )}

      {/* Client Routines List */}
      {!selectedRutina && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-base font-semibold text-foreground mb-3">
            Todas las rutinas
          </h3>
          {clienteRutinas.length > 0 ? (
            <div className="space-y-3">
              {clienteRutinas.map((rutina, index) => (
                <RutinaCard
                  key={rutina.id}
                  rutina={rutina}
                  index={index}
                  onClick={() => handleSelectRutina(rutina)}
                />
              ))}
            </div>
          ) : (
            <GlassCard>
              <div className="text-center py-8">
                <Dumbbell className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No hay rutinas asignadas</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Crea una nueva rutina o utiliza una plantilla
                </p>
              </div>
            </GlassCard>
          )}
        </motion.div>
      )}

      {/* Templates Section */}
      {!selectedRutina && plantillas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BookTemplate className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-base font-semibold text-foreground">Plantillas disponibles</h3>
          </div>
          <PlantillaRutinaList
            plantillas={plantillas}
            onSelect={handleSelectPlantilla}
          />
        </motion.div>
      )}

      {/* Editor Modal */}
      <RutinaEditor
        open={showEditor}
        onClose={() => setShowEditor(false)}
      />
    </div>
  )
}
