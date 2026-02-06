'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Calendar, Zap, Clock, TrendingUp, FileText, Link } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/glass'
import { useModalState } from '@/hooks'
import { mockClientes } from '@/lib/mock-data'
import type { NotaSesion, SesionCalendario } from '@/types'

interface NotaSesionModalProps {
  isOpen: boolean
  onClose: () => void
  nota?: NotaSesion | null
  onSave: (nota: Omit<NotaSesion, 'id' | 'created_at'> & { id?: string }) => void
  sesionVinculada?: SesionCalendario | null
}

const inputStyles = cn(
  'w-full max-w-full min-w-0 px-3 py-2.5 rounded-xl text-sm box-border',
  'bg-white/5 border border-white/10',
  'text-foreground placeholder:text-muted-foreground',
  'focus:outline-none focus:border-white/30',
  'transition-colors'
)

const labelStyles = 'text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block'

function RatingSelector({
  value,
  onChange,
  max = 5
}: {
  value: number
  onChange: (value: number) => void
  max?: number
}) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className={cn(
            'size-8 rounded-full transition-all duration-200',
            i < value
              ? 'bg-[var(--accent-emerald)] shadow-[0_0_10px_rgba(16,185,129,0.4)]'
              : 'bg-white/10 hover:bg-white/20'
          )}
        />
      ))}
    </div>
  )
}

export function NotaSesionModal({
  isOpen,
  onClose,
  nota,
  onSave,
  sesionVinculada
}: NotaSesionModalProps) {
  const isEditing = !!nota
  useModalState(isOpen)

  const [formData, setFormData] = useState({
    cliente_id: '',
    sesion_id: undefined as string | undefined,
    fecha: '',
    energia: 3,
    puntualidad: 3,
    progreso: 3,
    comentario: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (nota) {
        // Editing existing nota
        setFormData({
          cliente_id: nota.cliente_id,
          sesion_id: nota.sesion_id,
          fecha: nota.fecha,
          energia: nota.energia,
          puntualidad: nota.puntualidad,
          progreso: nota.progreso,
          comentario: nota.comentario,
        })
      } else if (sesionVinculada) {
        // Creating from a session - pre-fill data
        setFormData({
          cliente_id: sesionVinculada.cliente_id,
          sesion_id: sesionVinculada.id,
          fecha: sesionVinculada.fecha,
          energia: 3,
          puntualidad: 3,
          progreso: 3,
          comentario: '',
        })
      } else {
        // Creating new without session link
        const today = new Date()
        setFormData({
          cliente_id: '',
          sesion_id: undefined,
          fecha: today.toISOString().split('T')[0],
          energia: 3,
          puntualidad: 3,
          progreso: 3,
          comentario: '',
        })
      }
      setErrors({})
    }
  }, [isOpen, nota, sesionVinculada])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.cliente_id) {
      newErrors.cliente_id = 'Selecciona un cliente'
    }
    if (!formData.fecha) {
      newErrors.fecha = 'Selecciona una fecha'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const cliente = mockClientes.find(c => c.id === formData.cliente_id)
    if (!cliente) return

    onSave({
      id: nota?.id,
      cliente_id: formData.cliente_id,
      cliente_nombre: cliente.nombre,
      cliente_apellidos: cliente.apellidos,
      cliente_avatar: cliente.avatar_url,
      sesion_id: formData.sesion_id,
      fecha: formData.fecha,
      energia: formData.energia,
      puntualidad: formData.puntualidad,
      progreso: formData.progreso,
      comentario: formData.comentario,
    })

    onClose()
  }

  const clientesActivos = mockClientes.filter(c => c.estado === 'activo')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-16 bottom-4 z-[60] overflow-hidden rounded-3xl"
          >
            <div className="glass-card h-full flex flex-col overflow-hidden max-w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h2 className="text-lg font-bold text-foreground">
                  {isEditing ? 'Editar reporte' : 'Nuevo reporte'}
                </h2>
                <button
                  onClick={onClose}
                  className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overflow-x-hidden p-5 space-y-4">
                {/* Linked Session Badge */}
                {formData.sesion_id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30"
                  >
                    <Link className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400">
                      Vinculado a sesión del {new Date(formData.fecha + 'T00:00:00').toLocaleDateString('es-ES', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </motion.div>
                )}

                {/* Cliente */}
                <div>
                  <label className={labelStyles}>
                    <User className="w-3 h-3 inline mr-1" />
                    Cliente
                  </label>
                  <select
                    value={formData.cliente_id}
                    onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
                    disabled={!!sesionVinculada}
                    className={cn(
                      inputStyles,
                      errors.cliente_id && 'border-red-500/50',
                      sesionVinculada && 'opacity-60 cursor-not-allowed'
                    )}
                  >
                    <option value="">Seleccionar cliente...</option>
                    {clientesActivos.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre} {cliente.apellidos}
                      </option>
                    ))}
                  </select>
                  {errors.cliente_id && (
                    <p className="text-red-400 text-xs mt-1">{errors.cliente_id}</p>
                  )}
                </div>

                {/* Fecha */}
                <div>
                  <label className={labelStyles}>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    disabled={!!sesionVinculada}
                    className={cn(
                      inputStyles,
                      errors.fecha && 'border-red-500/50',
                      sesionVinculada && 'opacity-60 cursor-not-allowed'
                    )}
                  />
                  {errors.fecha && (
                    <p className="text-red-400 text-xs mt-1">{errors.fecha}</p>
                  )}
                </div>

                {/* Ratings */}
                <div className="space-y-4 pt-2">
                  {/* Energía */}
                  <div>
                    <label className={labelStyles}>
                      <Zap className="w-3 h-3 inline mr-1 text-warning" />
                      Energía
                    </label>
                    <RatingSelector
                      value={formData.energia}
                      onChange={(v) => setFormData({ ...formData, energia: v })}
                    />
                  </div>

                  {/* Puntualidad */}
                  <div>
                    <label className={labelStyles}>
                      <Clock className="w-3 h-3 inline mr-1 text-[var(--accent-blue)]" />
                      Puntualidad
                    </label>
                    <RatingSelector
                      value={formData.puntualidad}
                      onChange={(v) => setFormData({ ...formData, puntualidad: v })}
                    />
                  </div>

                  {/* Progreso */}
                  <div>
                    <label className={labelStyles}>
                      <TrendingUp className="w-3 h-3 inline mr-1 text-[var(--accent-emerald)]" />
                      Progreso
                    </label>
                    <RatingSelector
                      value={formData.progreso}
                      onChange={(v) => setFormData({ ...formData, progreso: v })}
                    />
                  </div>
                </div>

                {/* Comentario */}
                <div>
                  <label className={labelStyles}>
                    <FileText className="w-3 h-3 inline mr-1" />
                    Comentario (opcional)
                  </label>
                  <textarea
                    value={formData.comentario}
                    onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
                    placeholder="Describe cómo fue la sesión..."
                    rows={4}
                    className={cn(inputStyles, 'resize-none')}
                  />
                </div>
              </form>

              {/* Footer */}
              <div className="p-5 border-t border-white/10 flex gap-3">
                <GlassButton
                  type="button"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancelar
                </GlassButton>
                <GlassButton
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  onClick={handleSubmit}
                >
                  {isEditing ? 'Guardar cambios' : 'Crear reporte'}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
