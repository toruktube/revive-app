'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Dumbbell, FileText, Clock, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/glass'
import { useModalState } from '@/hooks'
import type { RutinaEntrenamiento, NivelRutina, ObjetivoRutina } from '@/types'

interface RutinaModalProps {
  isOpen: boolean
  onClose: () => void
  rutina?: RutinaEntrenamiento | null
  onSave: (rutina: Partial<RutinaEntrenamiento>) => void
}

const inputStyles = cn(
  'w-full max-w-full min-w-0 px-3 py-2.5 rounded-xl text-sm box-border',
  'bg-white/5 border border-white/10',
  'text-foreground placeholder:text-muted-foreground',
  'focus:outline-none focus:border-white/30',
  'transition-colors'
)

const labelStyles = 'text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block'

export function RutinaModal({ isOpen, onClose, rutina, onSave }: RutinaModalProps) {
  const isEditing = !!rutina
  useModalState(isOpen)

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    duracion: '',
    nivel: 'intermedio' as NivelRutina,
    objetivo: '' as ObjetivoRutina | '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      if (rutina) {
        setFormData({
          nombre: rutina.nombre,
          descripcion: rutina.descripcion || '',
          categoria: rutina.categoria,
          duracion: rutina.duracion,
          nivel: rutina.nivel,
          objetivo: rutina.objetivo || '',
        })
      } else {
        setFormData({
          nombre: '',
          descripcion: '',
          categoria: '',
          duracion: '4 semanas',
          nivel: 'intermedio',
          objetivo: '',
        })
      }
      setErrors({})
    }
  }, [isOpen, rutina])

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
      id: rutina?.id,
      nombre: formData.nombre,
      descripcion: formData.descripcion || undefined,
      categoria: formData.categoria || 'General',
      duracion: formData.duracion,
      nivel: formData.nivel,
      objetivo: formData.objetivo || undefined,
      dias: rutina?.dias || [],
    })

    onClose()
  }

  const niveles: { value: NivelRutina; label: string }[] = [
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' },
  ]

  const objetivos: { value: ObjetivoRutina; label: string }[] = [
    { value: 'perdida_grasa', label: 'Perdida grasa' },
    { value: 'ganancia_muscular', label: 'Ganancia muscular' },
    { value: 'tonificacion', label: 'Tonificacion' },
    { value: 'fuerza', label: 'Fuerza' },
    { value: 'resistencia', label: 'Resistencia' },
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
                  {isEditing ? 'Editar Rutina' : 'Nueva Rutina'}
                </h3>
                <button
                  onClick={onClose}
                  className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
                {/* Nombre */}
                <div>
                  <label className={labelStyles}>
                    <Dumbbell className="w-3 h-3 inline mr-1" />
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Full Body - Definicion"
                    className={cn(inputStyles, errors.nombre && 'border-red-500/50')}
                  />
                  {errors.nombre && (
                    <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>
                  )}
                </div>

                {/* Descripcion */}
                <div>
                  <label className={labelStyles}>
                    <FileText className="w-3 h-3 inline mr-1" />
                    Descripcion (opcional)
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Describe la rutina..."
                    rows={2}
                    className={cn(inputStyles, 'resize-none')}
                  />
                </div>

                {/* Categoria y Duracion */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelStyles}>Categoria</label>
                    <input
                      type="text"
                      value={formData.categoria}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      placeholder="Ej: Hipertrofia"
                      className={inputStyles}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      Duracion
                    </label>
                    <input
                      type="text"
                      value={formData.duracion}
                      onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                      placeholder="Ej: 4 semanas"
                      className={inputStyles}
                    />
                  </div>
                </div>

                {/* Nivel */}
                <div>
                  <label className={labelStyles}>Nivel</label>
                  <div className="flex gap-2">
                    {niveles.map((nivel) => (
                      <button
                        key={nivel.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, nivel: nivel.value })}
                        className={cn(
                          'flex-1 py-2.5 rounded-xl border transition-all duration-200 text-sm',
                          formData.nivel === nivel.value
                            ? 'bg-[var(--accent-blue)]/20 border-[var(--accent-blue)]/50 text-[var(--accent-blue)]'
                            : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                        )}
                      >
                        {nivel.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Objetivo */}
                <div>
                  <label className={labelStyles}>
                    <Target className="w-3 h-3 inline mr-1" />
                    Objetivo
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {objetivos.map((obj) => (
                      <button
                        key={obj.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, objetivo: obj.value })}
                        className={cn(
                          'py-2 rounded-xl border transition-all duration-200 text-xs',
                          formData.objetivo === obj.value
                            ? 'bg-white/20 border-white/30 text-foreground'
                            : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                        )}
                      >
                        {obj.label}
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
                  {isEditing ? 'Guardar' : 'Crear rutina'}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
