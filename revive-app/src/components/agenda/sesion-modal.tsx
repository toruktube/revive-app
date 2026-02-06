'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, MapPin, User, FileText, Video, Building, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/glass'
import { useModalState } from '@/hooks'
import { mockClientes } from '@/lib/mock-data'
import type { SesionCalendario, TipoSesion } from '@/types'

interface SesionModalProps {
  isOpen: boolean
  onClose: () => void
  sesion?: SesionCalendario | null
  onSave: (sesion: Omit<SesionCalendario, 'id'> & { id?: string }) => void
  selectedDate?: Date
}

const inputStyles = cn(
  'w-full max-w-full min-w-0 px-3 py-2.5 rounded-xl text-sm box-border',
  'bg-white/5 border border-white/10',
  'text-foreground placeholder:text-muted-foreground',
  'focus:outline-none focus:border-white/30',
  'transition-colors',
  '[&::-webkit-datetime-edit]:text-sm',
  '[&::-webkit-calendar-picker-indicator]:opacity-50'
)

const labelStyles = 'text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block'

export function SesionModal({ isOpen, onClose, sesion, onSave, selectedDate }: SesionModalProps) {
  const isEditing = !!sesion
  useModalState(isOpen)

  const [formData, setFormData] = useState({
    cliente_id: '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    tipo: 'presencial' as TipoSesion,
    ubicacion: '',
    notas: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (sesion) {
        setFormData({
          cliente_id: sesion.cliente_id,
          fecha: sesion.fecha,
          hora_inicio: sesion.hora_inicio,
          hora_fin: sesion.hora_fin,
          tipo: sesion.tipo,
          ubicacion: sesion.ubicacion || '',
          notas: sesion.notas || '',
        })
      } else {
        const defaultDate = selectedDate || new Date()
        setFormData({
          cliente_id: '',
          fecha: defaultDate.toISOString().split('T')[0],
          hora_inicio: '09:00',
          hora_fin: '10:00',
          tipo: 'presencial',
          ubicacion: 'Club Revive',
          notas: '',
        })
      }
      setErrors({})
    }
  }, [isOpen, sesion, selectedDate])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.cliente_id) {
      newErrors.cliente_id = 'Selecciona un cliente'
    }
    if (!formData.fecha) {
      newErrors.fecha = 'Selecciona una fecha'
    }
    if (!formData.hora_inicio) {
      newErrors.hora_inicio = 'Indica hora de inicio'
    }
    if (!formData.hora_fin) {
      newErrors.hora_fin = 'Indica hora de fin'
    }
    if (formData.hora_inicio && formData.hora_fin && formData.hora_inicio >= formData.hora_fin) {
      newErrors.hora_fin = 'La hora de fin debe ser posterior'
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
      id: sesion?.id,
      cliente_id: formData.cliente_id,
      cliente_nombre: cliente.nombre,
      cliente_apellidos: cliente.apellidos,
      cliente_avatar: cliente.avatar_url,
      fecha: formData.fecha,
      hora_inicio: formData.hora_inicio,
      hora_fin: formData.hora_fin,
      tipo: formData.tipo,
      estado: sesion?.estado || 'programada',
      ubicacion: formData.tipo === 'presencial' ? formData.ubicacion : undefined,
      notas: formData.notas || undefined,
    })

    onClose()
  }

  const clientesActivos = mockClientes.filter(c => c.estado === 'activo')

  const handleWhatsAppReminder = () => {
    const cliente = mockClientes.find(c => c.id === formData.cliente_id)
    if (!cliente) return

    // Phone number for WhatsApp
    const phone = '34664846927'

    // Format date for message
    const fechaObj = new Date(formData.fecha + 'T00:00:00')
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })

    // Build reminder message
    const mensaje = `¡Hola Laura! 👋

Te recuerdo que tienes sesión de entrenamiento:

📅 ${fechaFormateada}
🕐 ${formData.hora_inicio} - ${formData.hora_fin}
${formData.tipo === 'presencial' ? `📍 ${formData.ubicacion || 'Club Revive'}` : '💻 Online'}

¡Nos vemos! 💪`

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`
    window.open(whatsappUrl, '_blank')
  }

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
            className="fixed inset-x-0 top-0 bottom-0 z-[60] overflow-hidden bg-background"
          >
            <div className="h-full flex flex-col overflow-hidden max-w-full pt-12">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h2 className="text-lg font-bold text-foreground">
                  {isEditing ? 'Editar sesión' : 'Nueva sesión'}
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
                {/* Cliente */}
                <div>
                  <label className={labelStyles}>
                    <User className="w-3 h-3 inline mr-1" />
                    Cliente
                  </label>
                  <select
                    value={formData.cliente_id}
                    onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
                    className={cn(inputStyles, errors.cliente_id && 'border-red-500/50')}
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
                    className={cn(inputStyles, errors.fecha && 'border-red-500/50')}
                  />
                  {errors.fecha && (
                    <p className="text-red-400 text-xs mt-1">{errors.fecha}</p>
                  )}
                </div>

                {/* Horario */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="min-w-0 overflow-hidden">
                    <label className={labelStyles}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      Hora inicio
                    </label>
                    <input
                      type="time"
                      value={formData.hora_inicio}
                      onChange={(e) => setFormData({ ...formData, hora_inicio: e.target.value })}
                      className={cn(inputStyles, errors.hora_inicio && 'border-red-500/50')}
                    />
                    {errors.hora_inicio && (
                      <p className="text-red-400 text-xs mt-1">{errors.hora_inicio}</p>
                    )}
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <label className={labelStyles}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      Hora fin
                    </label>
                    <input
                      type="time"
                      value={formData.hora_fin}
                      onChange={(e) => setFormData({ ...formData, hora_fin: e.target.value })}
                      className={cn(inputStyles, errors.hora_fin && 'border-red-500/50')}
                    />
                    {errors.hora_fin && (
                      <p className="text-red-400 text-xs mt-1">{errors.hora_fin}</p>
                    )}
                  </div>
                </div>

                {/* Tipo de sesión */}
                <div>
                  <label className={labelStyles}>Tipo de sesión</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo: 'presencial' })}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 text-sm',
                        formData.tipo === 'presencial'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      )}
                    >
                      <Building className="w-4 h-4" />
                      Presencial
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo: 'online' })}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 text-sm',
                        formData.tipo === 'online'
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      )}
                    >
                      <Video className="w-4 h-4" />
                      Online
                    </button>
                  </div>
                </div>

                {/* Ubicación (solo presencial) */}
                <AnimatePresence>
                  {formData.tipo === 'presencial' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className={labelStyles}>
                        <MapPin className="w-3 h-3 inline mr-1" />
                        Ubicación
                      </label>
                      <input
                        type="text"
                        value={formData.ubicacion}
                        onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                        placeholder="Ej: Club Revive"
                        className={inputStyles}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Notas */}
                <div>
                  <label className={labelStyles}>
                    <FileText className="w-3 h-3 inline mr-1" />
                    Notas (opcional)
                  </label>
                  <textarea
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                    placeholder="Notas adicionales..."
                    rows={3}
                    className={cn(inputStyles, 'resize-none')}
                  />
                </div>

                {/* WhatsApp Reminder */}
                {formData.cliente_id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      type="button"
                      onClick={handleWhatsAppReminder}
                      className={cn(
                        'w-full py-2.5 rounded-xl border transition-all duration-200 text-sm',
                        'bg-green-500/10 border-green-500/30 text-green-400',
                        'hover:bg-green-500/20 hover:border-green-500/50',
                        'flex items-center justify-center gap-2'
                      )}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Enviar recordatorio por WhatsApp
                    </button>
                  </motion.div>
                )}
              </form>

              {/* Footer */}
              <div className="p-5 pb-8 border-t border-white/10 flex gap-3">
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
                  {isEditing ? 'Guardar cambios' : 'Crear sesión'}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
