'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { GlassButton } from '@/components/glass/glass-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { NotaSesion } from '@/types'

interface NuevaNotaFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (nota: Omit<NotaSesion, 'id' | 'created_at'>) => void
}

const clientesSelect = [
  { id: '1', nombre: 'Maria Garcia' },
  { id: '2', nombre: 'Carlos Rodriguez' },
  { id: '3', nombre: 'Laura Martinez' },
  { id: '4', nombre: 'Pedro Lopez' },
  { id: '5', nombre: 'Ana Fernandez' },
  { id: '7', nombre: 'Sofia Diaz' },
  { id: '8', nombre: 'Miguel Herrera' },
]

function RatingSelector({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  const getColor = (level: number) => {
    if (level >= 4) return 'text-success'
    if (level >= 3) return 'text-warning'
    return 'text-destructive'
  }

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={cn(
              'w-9 h-9 rounded-lg text-lg transition-all duration-150',
              'hover:scale-110 active:scale-95',
              'flex items-center justify-center',
              level <= value
                ? cn(getColor(value), 'bg-current/10')
                : 'text-muted-foreground/30 hover:text-muted-foreground/50'
            )}
          >
            {'\u25CF'}
          </button>
        ))}
        <span className={cn('text-sm font-semibold ml-2', value > 0 ? getColor(value) : 'text-muted-foreground')}>
          {value > 0 ? `${value}/5` : '-'}
        </span>
      </div>
    </div>
  )
}

function getTodayISO(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

export function NuevaNotaForm({ open, onClose, onSubmit }: NuevaNotaFormProps) {
  const [clienteId, setClienteId] = useState('')
  const [fecha, setFecha] = useState(getTodayISO())
  const [energia, setEnergia] = useState(0)
  const [estadoAnimo, setEstadoAnimo] = useState(0)
  const [adherencia, setAdherencia] = useState(0)
  const [dolorMolestias, setDolorMolestias] = useState('')
  const [notasLibres, setNotasLibres] = useState('')
  const [objetivosProxima, setObjetivosProxima] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const selectedCliente = clientesSelect.find((c) => c.id === clienteId)

  const isValid = clienteId && fecha && energia > 0 && estadoAnimo > 0 && adherencia > 0 && notasLibres.trim()

  const resetForm = () => {
    setClienteId('')
    setFecha(getTodayISO())
    setEnergia(0)
    setEstadoAnimo(0)
    setAdherencia(0)
    setDolorMolestias('')
    setNotasLibres('')
    setObjetivosProxima('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || !selectedCliente) return

    const nameParts = selectedCliente.nombre.split(' ')
    const nombre = nameParts[0]
    const apellidos = nameParts.slice(1).join(' ') || undefined

    onSubmit({
      cliente_id: clienteId,
      cliente_nombre: nombre,
      cliente_apellidos: apellidos,
      fecha,
      energia,
      estado_animo: estadoAnimo,
      adherencia,
      dolor_molestias: dolorMolestias.trim() || undefined,
      notas_libres: notasLibres.trim(),
      objetivos_proxima: objetivosProxima.trim() || undefined,
    })

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      resetForm()
      onClose()
    }, 1200)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-12 gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="w-16 h-16 text-success" />
              </motion.div>
              <p className="text-lg font-semibold text-foreground">
                Nota guardada
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <DialogHeader>
                <DialogTitle>Nueva nota de sesion</DialogTitle>
                <DialogDescription>
                  Registra las observaciones de la sesion con tu cliente.
                </DialogDescription>
              </DialogHeader>

              {/* Client Selector */}
              <div className="space-y-1.5">
                <Label htmlFor="cliente">Cliente</Label>
                <select
                  id="cliente"
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  className={cn(
                    'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    !clienteId && 'text-muted-foreground'
                  )}
                >
                  <option value="">Seleccionar cliente...</option>
                  {clientesSelect.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="bg-background"
                />
              </div>

              {/* Metrics */}
              <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-[var(--glass-border)]">
                <RatingSelector
                  label="Energia"
                  value={energia}
                  onChange={setEnergia}
                />
                <RatingSelector
                  label="Estado de animo"
                  value={estadoAnimo}
                  onChange={setEstadoAnimo}
                />
                <RatingSelector
                  label="Adherencia"
                  value={adherencia}
                  onChange={setAdherencia}
                />
              </div>

              {/* Pain/Discomfort */}
              <div className="space-y-1.5">
                <Label htmlFor="dolor">Dolor / Molestias (opcional)</Label>
                <Input
                  id="dolor"
                  type="text"
                  value={dolorMolestias}
                  onChange={(e) => setDolorMolestias(e.target.value)}
                  placeholder="Describe cualquier dolor o molestia..."
                  className="bg-background"
                />
              </div>

              {/* Free Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="notas">Notas de la sesion *</Label>
                <textarea
                  id="notas"
                  value={notasLibres}
                  onChange={(e) => setNotasLibres(e.target.value)}
                  placeholder="Observaciones, rendimiento, actitud, progreso..."
                  rows={4}
                  className={cn(
                    'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    'resize-none'
                  )}
                />
              </div>

              {/* Next Session Objectives */}
              <div className="space-y-1.5">
                <Label htmlFor="objetivos">Objetivos proxima sesion (opcional)</Label>
                <textarea
                  id="objetivos"
                  value={objetivosProxima}
                  onChange={(e) => setObjetivosProxima(e.target.value)}
                  placeholder="Objetivos y enfoque para la proxima sesion..."
                  rows={2}
                  className={cn(
                    'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    'resize-none'
                  )}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <GlassButton type="button" variant="subtle" onClick={onClose}>
                  Cancelar
                </GlassButton>
                <GlassButton
                  type="submit"
                  variant="primary"
                  disabled={!isValid}
                >
                  Guardar nota
                </GlassButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
