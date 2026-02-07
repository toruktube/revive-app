'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Phone, Target, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/glass'
import { useModalState } from '@/hooks'
import type { Cliente, TipoCliente, NivelCliente } from '@/types'

interface ClienteModalProps {
  isOpen: boolean
  onClose: () => void
  cliente?: Cliente | null
  onSave: (cliente: Omit<Cliente, 'id' | 'created_at' | 'updated_at'> & { id?: string }) => void
}

const inputStyles = cn(
  'w-full max-w-full min-w-0 px-3 py-2.5 rounded-xl text-sm box-border',
  'bg-white/5 border border-white/10',
  'text-foreground placeholder:text-muted-foreground',
  'focus:outline-none focus:border-white/30',
  'transition-colors'
)

const labelStyles = 'text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block'

export function ClienteModal({ isOpen, onClose, cliente, onSave }: ClienteModalProps) {
  const isEditing = !!cliente
  useModalState(isOpen)

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    tipo: 'presencial' as TipoCliente,
    objetivo_principal: '',
    nivel: 'inicial' as NivelCliente,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      if (cliente) {
        setFormData({
          nombre: cliente.nombre,
          apellidos: cliente.apellidos || '',
          email: cliente.email || '',
          telefono: cliente.telefono || '',
          tipo: cliente.tipo,
          objetivo_principal: cliente.objetivo_principal || '',
          nivel: cliente.nivel || 'inicial',
        })
      } else {
        setFormData({
          nombre: '',
          apellidos: '',
          email: '',
          telefono: '',
          tipo: 'presencial',
          objetivo_principal: '',
          nivel: 'inicial',
        })
      }
      setErrors({})
    }
  }, [isOpen, cliente])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    onSave({
      id: cliente?.id,
      nombre: formData.nombre,
      apellidos: formData.apellidos || undefined,
      email: formData.email || undefined,
      telefono: formData.telefono || undefined,
      tipo: formData.tipo,
      estado: cliente?.estado || 'activo',
      objetivo_principal: formData.objetivo_principal || undefined,
      nivel: formData.nivel,
    })

    onClose()
  }

  const niveles: { value: NivelCliente; label: string }[] = [
    { value: 'inicial', label: 'Inicial' },
    { value: 'medio', label: 'Medio' },
    { value: 'avanzado', label: 'Avanzado' },
    { value: 'competicion', label: 'Competicion' },
  ]

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
            className="fixed bottom-0 left-0 right-0 z-[60] bg-background rounded-t-3xl border-t border-white/10 max-h-[85vh] overflow-hidden"
          >
            <div className="h-full flex flex-col overflow-hidden max-w-full">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-antonio font-semibold tracking-wide text-foreground uppercase">
                  {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
                </h3>
                <button
                  onClick={onClose}
                  className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
                {/* Nombre y Apellidos */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelStyles}>
                      <User className="w-3 h-3 inline mr-1" />
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Nombre"
                      className={cn(inputStyles, errors.nombre && 'border-red-500/50')}
                    />
                    {errors.nombre && (
                      <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyles}>Apellidos</label>
                    <input
                      type="text"
                      value={formData.apellidos}
                      onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                      placeholder="Apellidos"
                      className={inputStyles}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelStyles}>
                    <Mail className="w-3 h-3 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@ejemplo.com"
                    className={inputStyles}
                  />
                </div>

                {/* Telefono */}
                <div>
                  <label className={labelStyles}>
                    <Phone className="w-3 h-3 inline mr-1" />
                    Telefono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="+34 600 000 000"
                    className={inputStyles}
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label className={labelStyles}>Tipo de cliente</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo: 'presencial' })}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border transition-all duration-200 text-sm',
                        formData.tipo === 'presencial'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      )}
                    >
                      Presencial
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo: 'online' })}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border transition-all duration-200 text-sm',
                        formData.tipo === 'online'
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      )}
                    >
                      Online
                    </button>
                  </div>
                </div>

                {/* Objetivo */}
                <div>
                  <label className={labelStyles}>
                    <Target className="w-3 h-3 inline mr-1" />
                    Objetivo principal
                  </label>
                  <input
                    type="text"
                    value={formData.objetivo_principal}
                    onChange={(e) => setFormData({ ...formData, objetivo_principal: e.target.value })}
                    placeholder="Ej: Perdida de grasa, Ganancia muscular..."
                    className={inputStyles}
                  />
                </div>

                {/* Nivel */}
                <div>
                  <label className={labelStyles}>
                    <Activity className="w-3 h-3 inline mr-1" />
                    Nivel
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {niveles.map((nivel) => (
                      <button
                        key={nivel.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, nivel: nivel.value })}
                        className={cn(
                          'py-2 rounded-xl border transition-all duration-200 text-xs',
                          formData.nivel === nivel.value
                            ? 'bg-white/20 border-white/30 text-foreground'
                            : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                        )}
                      >
                        {nivel.label}
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              <div className="p-4 border-t border-white/10 flex gap-3">
                <GlassButton type="button" onClick={onClose} className="flex-1">
                  Cancelar
                </GlassButton>
                <GlassButton type="submit" variant="primary" className="flex-1" onClick={handleSubmit}>
                  {isEditing ? 'Guardar' : 'Crear cliente'}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
