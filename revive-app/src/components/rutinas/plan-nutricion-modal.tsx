'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Utensils, FileText, Flame, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/glass'
import { useModalState } from '@/hooks'
import type { PlanNutricion, ObjetivoRutina } from '@/types'

interface PlanNutricionModalProps {
  isOpen: boolean
  onClose: () => void
  plan?: PlanNutricion | null
  onSave: (plan: Partial<PlanNutricion>) => void
}

const inputStyles = cn(
  'w-full max-w-full min-w-0 px-3 py-2.5 rounded-xl text-sm box-border',
  'bg-white/5 border border-white/10',
  'text-foreground placeholder:text-muted-foreground',
  'focus:outline-none focus:border-white/30',
  'transition-colors'
)

const labelStyles = 'text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block'

export function PlanNutricionModal({ isOpen, onClose, plan, onSave }: PlanNutricionModalProps) {
  const isEditing = !!plan
  useModalState(isOpen)

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    objetivo: '' as ObjetivoRutina | '',
    calorias_totales: '',
    proteinas_g: '',
    carbohidratos_g: '',
    grasas_g: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      if (plan) {
        setFormData({
          nombre: plan.nombre,
          descripcion: plan.descripcion || '',
          objetivo: plan.objetivo || '',
          calorias_totales: plan.calorias_totales.toString(),
          proteinas_g: plan.proteinas_g.toString(),
          carbohidratos_g: plan.carbohidratos_g.toString(),
          grasas_g: plan.grasas_g.toString(),
        })
      } else {
        setFormData({
          nombre: '',
          descripcion: '',
          objetivo: '',
          calorias_totales: '',
          proteinas_g: '',
          carbohidratos_g: '',
          grasas_g: '',
        })
      }
      setErrors({})
    }
  }, [isOpen, plan])

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
      id: plan?.id,
      nombre: formData.nombre,
      descripcion: formData.descripcion || undefined,
      objetivo: formData.objetivo || undefined,
      calorias_totales: parseInt(formData.calorias_totales) || 0,
      proteinas_g: parseInt(formData.proteinas_g) || 0,
      carbohidratos_g: parseInt(formData.carbohidratos_g) || 0,
      grasas_g: parseInt(formData.grasas_g) || 0,
      comidas: plan?.comidas || [],
    })

    onClose()
  }

  const objetivos: { value: ObjetivoRutina; label: string }[] = [
    { value: 'perdida_grasa', label: 'Perdida grasa' },
    { value: 'ganancia_muscular', label: 'Volumen' },
    { value: 'tonificacion', label: 'Tonificacion' },
    { value: 'salud_general', label: 'Salud general' },
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
                  {isEditing ? 'Editar Plan' : 'Nuevo Plan'}
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
                    <Utensils className="w-3 h-3 inline mr-1" />
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Deficit Calorico Moderado"
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
                    placeholder="Describe el plan..."
                    rows={2}
                    className={cn(inputStyles, 'resize-none')}
                  />
                </div>

                {/* Objetivo */}
                <div>
                  <label className={labelStyles}>
                    <Target className="w-3 h-3 inline mr-1" />
                    Objetivo
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {objetivos.map((obj) => (
                      <button
                        key={obj.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, objetivo: obj.value })}
                        className={cn(
                          'py-2.5 rounded-xl border transition-all duration-200 text-sm',
                          formData.objetivo === obj.value
                            ? 'bg-[var(--accent-violet)]/20 border-[var(--accent-violet)]/50 text-[var(--accent-violet)]'
                            : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                        )}
                      >
                        {obj.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Macros */}
                <div>
                  <label className={labelStyles}>
                    <Flame className="w-3 h-3 inline mr-1" />
                    Macronutrientes
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="number"
                        value={formData.calorias_totales}
                        onChange={(e) => setFormData({ ...formData, calorias_totales: e.target.value })}
                        placeholder="Calorias"
                        className={inputStyles}
                      />
                      <span className="text-xs text-muted-foreground mt-1 block">kcal/dia</span>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={formData.proteinas_g}
                        onChange={(e) => setFormData({ ...formData, proteinas_g: e.target.value })}
                        placeholder="Proteinas"
                        className={inputStyles}
                      />
                      <span className="text-xs text-muted-foreground mt-1 block">g proteina</span>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={formData.carbohidratos_g}
                        onChange={(e) => setFormData({ ...formData, carbohidratos_g: e.target.value })}
                        placeholder="Carbohidratos"
                        className={inputStyles}
                      />
                      <span className="text-xs text-muted-foreground mt-1 block">g carbos</span>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={formData.grasas_g}
                        onChange={(e) => setFormData({ ...formData, grasas_g: e.target.value })}
                        placeholder="Grasas"
                        className={inputStyles}
                      />
                      <span className="text-xs text-muted-foreground mt-1 block">g grasas</span>
                    </div>
                  </div>
                </div>
              </form>

              <div className="p-4 border-t border-white/10 flex gap-3">
                <GlassButton type="button" onClick={onClose} className="flex-1">
                  Cancelar
                </GlassButton>
                <GlassButton type="submit" variant="primary" className="flex-1" onClick={handleSubmit}>
                  {isEditing ? 'Guardar' : 'Crear plan'}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
