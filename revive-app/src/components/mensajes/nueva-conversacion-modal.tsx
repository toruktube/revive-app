'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useModalState } from '@/hooks'
import { mockClientes } from '@/lib/mock-data'

interface NuevaConversacionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectCliente: (clienteId: string) => void
}

export function NuevaConversacionModal({ isOpen, onClose, onSelectCliente }: NuevaConversacionModalProps) {
  useModalState(isOpen)
  const [searchQuery, setSearchQuery] = useState('')

  const clientesActivos = mockClientes.filter(c => {
    if (c.estado !== 'activo') return false
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      c.nombre.toLowerCase().includes(query) ||
      c.apellidos?.toLowerCase().includes(query)
    )
  })

  const handleSelectCliente = (clienteId: string) => {
    onSelectCliente(clienteId)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[60] bg-background rounded-t-3xl border-t border-white/10 max-h-[70vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-antonio font-semibold tracking-wide text-foreground uppercase">
                Nueva Conversacion
              </h3>
              <button
                onClick={onClose}
                className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar cliente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    'w-full pl-10 pr-4 py-2.5 rounded-xl',
                    'bg-white/5 border border-white/10',
                    'text-foreground placeholder:text-muted-foreground',
                    'focus:outline-none focus:border-white/30',
                    'transition-colors'
                  )}
                />
              </div>
            </div>

            {/* Clients List */}
            <div className="overflow-y-auto max-h-[calc(70vh-140px)] p-4 space-y-2">
              {clientesActivos.length > 0 ? (
                clientesActivos.map((cliente) => (
                  <button
                    key={cliente.id}
                    onClick={() => handleSelectCliente(cliente.id)}
                    className={cn(
                      'w-full p-3 rounded-xl border text-left transition-all',
                      'bg-white/5 border-white/10 hover:bg-white/10',
                      'flex items-center gap-3'
                    )}
                  >
                    <div
                      className="size-10 rounded-full border-2 border-white/20 bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url('${cliente.avatar_url}')` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {cliente.nombre} {cliente.apellidos}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {cliente.tipo === 'online' ? 'Online' : 'Presencial'}
                      </p>
                    </div>
                    <MessageCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                  </button>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground text-sm">No se encontraron clientes</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
