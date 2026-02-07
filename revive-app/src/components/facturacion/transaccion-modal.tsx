'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Euro, FileText, Calendar, User, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassButton } from '@/components/glass'
import { useModalState } from '@/hooks'
import { mockClientes } from '@/lib/mock-data'
import type { Transaccion, TipoTransaccion, EstadoPago, MetodoPago } from '@/types'

interface TransaccionModalProps {
  isOpen: boolean
  onClose: () => void
  transaccion?: Transaccion | null
  onSave: (transaccion: Omit<Transaccion, 'id'> & { id?: string }) => void
}

const inputStyles = cn(
  'w-full max-w-full min-w-0 px-3 py-2.5 rounded-xl text-sm box-border',
  'bg-white/5 border border-white/10',
  'text-foreground placeholder:text-muted-foreground',
  'focus:outline-none focus:border-white/30',
  'transition-colors'
)

const labelStyles = 'text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block'

export function TransaccionModal({ isOpen, onClose, transaccion, onSave }: TransaccionModalProps) {
  const isEditing = !!transaccion
  useModalState(isOpen)

  const [formData, setFormData] = useState({
    tipo: 'ingreso' as TipoTransaccion,
    monto: '',
    concepto: '',
    cliente_id: '',
    fecha: '',
    estado: 'pendiente' as EstadoPago,
    metodo: '' as MetodoPago | '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      if (transaccion) {
        setFormData({
          tipo: transaccion.tipo,
          monto: transaccion.monto.toString(),
          concepto: transaccion.concepto,
          cliente_id: transaccion.cliente_id || '',
          fecha: transaccion.fecha,
          estado: transaccion.estado,
          metodo: transaccion.metodo || '',
        })
      } else {
        const today = new Date().toISOString().split('T')[0]
        setFormData({
          tipo: 'ingreso',
          monto: '',
          concepto: '',
          cliente_id: '',
          fecha: today,
          estado: 'pendiente',
          metodo: '',
        })
      }
      setErrors({})
    }
  }, [isOpen, transaccion])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.monto || parseFloat(formData.monto) <= 0) {
      newErrors.monto = 'Indica un monto valido'
    }
    if (!formData.concepto.trim()) {
      newErrors.concepto = 'El concepto es obligatorio'
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

    const cliente = formData.cliente_id
      ? mockClientes.find(c => c.id === formData.cliente_id)
      : null

    onSave({
      id: transaccion?.id,
      tipo: formData.tipo,
      monto: parseFloat(formData.monto),
      concepto: formData.concepto,
      cliente_id: formData.cliente_id || undefined,
      cliente_nombre: cliente ? `${cliente.nombre} ${cliente.apellidos || ''}`.trim() : undefined,
      fecha: formData.fecha,
      estado: formData.estado,
      metodo: formData.metodo || undefined,
    })

    onClose()
  }

  const clientesActivos = mockClientes.filter(c => c.estado === 'activo')

  const metodos: { value: MetodoPago; label: string }[] = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'transferencia', label: 'Transferencia' },
    { value: 'tarjeta', label: 'Tarjeta' },
    { value: 'bizum', label: 'Bizum' },
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
                  {isEditing ? 'Editar Transaccion' : 'Nueva Transaccion'}
                </h3>
                <button
                  onClick={onClose}
                  className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
                {/* Tipo */}
                <div>
                  <label className={labelStyles}>Tipo</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo: 'ingreso' })}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border transition-all duration-200 text-sm',
                        formData.tipo === 'ingreso'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      )}
                    >
                      Ingreso
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo: 'gasto' })}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border transition-all duration-200 text-sm',
                        formData.tipo === 'gasto'
                          ? 'bg-red-500/20 border-red-500/50 text-red-400'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      )}
                    >
                      Gasto
                    </button>
                  </div>
                </div>

                {/* Monto */}
                <div>
                  <label className={labelStyles}>
                    <Euro className="w-3 h-3 inline mr-1" />
                    Monto
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.monto}
                    onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                    placeholder="0.00"
                    className={cn(inputStyles, errors.monto && 'border-red-500/50')}
                  />
                  {errors.monto && (
                    <p className="text-red-400 text-xs mt-1">{errors.monto}</p>
                  )}
                </div>

                {/* Concepto */}
                <div>
                  <label className={labelStyles}>
                    <FileText className="w-3 h-3 inline mr-1" />
                    Concepto
                  </label>
                  <input
                    type="text"
                    value={formData.concepto}
                    onChange={(e) => setFormData({ ...formData, concepto: e.target.value })}
                    placeholder="Ej: Mensualidad Enero 2025"
                    className={cn(inputStyles, errors.concepto && 'border-red-500/50')}
                  />
                  {errors.concepto && (
                    <p className="text-red-400 text-xs mt-1">{errors.concepto}</p>
                  )}
                </div>

                {/* Cliente (solo para ingresos) */}
                {formData.tipo === 'ingreso' && (
                  <div>
                    <label className={labelStyles}>
                      <User className="w-3 h-3 inline mr-1" />
                      Cliente (opcional)
                    </label>
                    <select
                      value={formData.cliente_id}
                      onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
                      className={inputStyles}
                    >
                      <option value="">Sin cliente asociado</option>
                      {clientesActivos.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre} {cliente.apellidos}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

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

                {/* Metodo de pago */}
                <div>
                  <label className={labelStyles}>
                    <CreditCard className="w-3 h-3 inline mr-1" />
                    Metodo de pago
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {metodos.map((metodo) => (
                      <button
                        key={metodo.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, metodo: metodo.value })}
                        className={cn(
                          'py-2 rounded-xl border transition-all duration-200 text-xs',
                          formData.metodo === metodo.value
                            ? 'bg-white/20 border-white/30 text-foreground'
                            : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                        )}
                      >
                        {metodo.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <label className={labelStyles}>Estado</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, estado: 'pagado' })}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border transition-all duration-200 text-sm',
                        formData.estado === 'pagado'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      )}
                    >
                      Pagado
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, estado: 'pendiente' })}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border transition-all duration-200 text-sm',
                        formData.estado === 'pendiente'
                          ? 'bg-warning/20 border-warning/50 text-warning'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      )}
                    >
                      Pendiente
                    </button>
                  </div>
                </div>
              </form>

              <div className="p-4 border-t border-white/10 flex gap-3">
                <GlassButton type="button" onClick={onClose} className="flex-1">
                  Cancelar
                </GlassButton>
                <GlassButton type="submit" variant="primary" className="flex-1" onClick={handleSubmit}>
                  {isEditing ? 'Guardar' : 'Crear'}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
