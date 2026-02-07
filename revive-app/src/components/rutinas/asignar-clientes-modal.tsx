'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/glass'
import { useModalState } from '@/hooks'
import { mockClientes } from '@/lib/mock-data'
import type { RutinaEntrenamiento, ClienteAsignado } from '@/types'

interface AsignarClientesModalProps {
  isOpen: boolean
  onClose: () => void
  rutina: RutinaEntrenamiento | null
  onSave: (rutinaId: string, clientes: ClienteAsignado[]) => void
}

export function AsignarClientesModal({
  isOpen,
  onClose,
  rutina,
  onSave,
}: AsignarClientesModalProps) {
  useModalState(isOpen)

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  // Reset when modal opens
  useEffect(() => {
    if (isOpen && rutina) {
      const currentIds = new Set(rutina.clientes_asignados?.map(c => c.id) || [])
      setSelectedIds(currentIds)
      setSearchQuery('')
    }
  }, [isOpen, rutina])

  const clientesActivos = mockClientes.filter(c => c.estado === 'activo')

  const filteredClientes = clientesActivos.filter(cliente => {
    const fullName = `${cliente.nombre} ${cliente.apellidos || ''}`.toLowerCase()
    return fullName.includes(searchQuery.toLowerCase())
  })

  const toggleCliente = (clienteId: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(clienteId)) {
      newSelected.delete(clienteId)
    } else {
      newSelected.add(clienteId)
    }
    setSelectedIds(newSelected)
  }

  const handleSave = () => {
    if (!rutina) return

    const selectedClientes: ClienteAsignado[] = clientesActivos
      .filter(c => selectedIds.has(c.id))
      .map(c => ({
        id: c.id,
        nombre: c.nombre,
        apellidos: c.apellidos,
        avatar_url: c.avatar_url,
      }))

    onSave(rutina.id, selectedClientes)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && rutina && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[60] bg-background rounded-t-3xl border-t border-white/10 max-h-[85vh] overflow-hidden"
          >
            <div className="h-full flex flex-col overflow-hidden max-w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-antonio font-semibold tracking-wide text-foreground uppercase">
                    Asignar Clientes
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {rutina.nombre}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar cliente..."
                    className={cn(
                      'w-full pl-10 pr-4 py-2.5 rounded-xl text-sm',
                      'bg-white/5 border border-white/10',
                      'text-foreground placeholder:text-muted-foreground',
                      'focus:outline-none focus:border-white/30',
                      'transition-colors'
                    )}
                  />
                </div>
              </div>

              {/* Client List */}
              <div className="flex-1 overflow-y-auto p-4 pt-2 space-y-2">
                {filteredClientes.map((cliente) => {
                  const isSelected = selectedIds.has(cliente.id)
                  return (
                    <button
                      key={cliente.id}
                      onClick={() => toggleCliente(cliente.id)}
                      className={cn(
                        'w-full flex items-center gap-3 p-3 rounded-xl transition-all',
                        isSelected
                          ? 'bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/30'
                          : 'bg-white/5 border border-transparent hover:bg-white/10'
                      )}
                    >
                      {/* Avatar */}
                      <div
                        className="size-10 rounded-full bg-cover bg-center border-2 border-white/20 shrink-0"
                        style={{ backgroundImage: `url('${cliente.avatar_url}')` }}
                      />

                      {/* Info */}
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {cliente.nombre} {cliente.apellidos}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cliente.objetivo_principal}
                        </p>
                      </div>

                      {/* Checkbox */}
                      <div
                        className={cn(
                          'size-6 rounded-full flex items-center justify-center shrink-0 transition-all',
                          isSelected
                            ? 'bg-[var(--accent-emerald)]'
                            : 'bg-white/10 border border-white/20'
                        )}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  )
                })}

                {filteredClientes.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No se encontraron clientes
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 flex gap-3">
                <GlassButton
                  type="button"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancelar
                </GlassButton>
                <GlassButton
                  type="button"
                  variant="primary"
                  className="flex-1"
                  onClick={handleSave}
                >
                  Guardar ({selectedIds.size})
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
