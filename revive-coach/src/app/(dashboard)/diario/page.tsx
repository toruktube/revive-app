'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, BookOpen } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassButton } from '@/components/glass/glass-button'
import { NotaSesionCard, NuevaNotaForm, DiarioFiltros, DiarioStats } from '@/components/diario'
import { useDiario } from '@/hooks/use-diario'

export default function DiarioPage() {
  const { filteredNotas, filters, setFilters, agregarNota, stats } = useDiario()
  const [formOpen, setFormOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Diario del Entrenador
          </h2>
          <p className="text-muted-foreground mt-1">
            Registra y consulta las notas de cada sesion con tus clientes.
          </p>
        </div>
        <GlassButton variant="primary" onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nueva Nota</span>
          <span className="sm:hidden">Nueva</span>
        </GlassButton>
      </div>

      {/* Stats */}
      <DiarioStats stats={stats} />

      {/* Filters */}
      <DiarioFiltros filters={filters} setFilters={setFilters} />

      {/* Notes List */}
      {filteredNotas.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredNotas.map((nota, index) => (
            <NotaSesionCard key={nota.id} nota={nota} index={index} />
          ))}
        </div>
      ) : (
        <GlassCard hover={false} className="p-12 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Sin notas registradas
          </h3>
          <p className="text-muted-foreground mb-4">
            {filters.clienteId || filters.fechaDesde || filters.fechaHasta || filters.energiaMin
              ? 'No hay notas que coincidan con los filtros aplicados.'
              : 'Comienza registrando las observaciones de tu primera sesion.'}
          </p>
          <GlassButton variant="primary" onClick={() => setFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Crear primera nota
          </GlassButton>
        </GlassCard>
      )}

      {/* New Note Modal */}
      <NuevaNotaForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={agregarNota}
      />
    </motion.div>
  )
}
