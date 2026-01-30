'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GlassButton } from '@/components/glass/glass-button'
import type { MetodoPago } from '@/types'

interface NuevoPagoFormProps {
  open: boolean
  onClose: () => void
  clienteId: string
  clienteNombre: string
}

const metodos: { value: MetodoPago; label: string }[] = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'transferencia', label: 'Transferencia' },
  { value: 'tarjeta', label: 'Tarjeta' },
  { value: 'bizum', label: 'Bizum' },
]

export function NuevoPagoForm({ open, onClose, clienteId, clienteNombre }: NuevoPagoFormProps) {
  const [concepto, setConcepto] = useState('')
  const [monto, setMonto] = useState('')
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split('T')[0])
  const [metodo, setMetodo] = useState<MetodoPago>('transferencia')
  const [notas, setNotas] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submit - show success toast
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      resetForm()
      onClose()
    }, 1500)
  }

  const resetForm = () => {
    setConcepto('')
    setMonto('')
    setFechaPago(new Date().toISOString().split('T')[0])
    setMetodo('transferencia')
    setNotas('')
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="sm:max-w-md">
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-8 gap-3"
          >
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <p className="text-lg font-semibold text-foreground">Pago registrado</p>
            <p className="text-sm text-muted-foreground">
              El pago de {clienteNombre} se ha registrado correctamente.
            </p>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Registrar Pago</DialogTitle>
              <DialogDescription>
                Registrar un nuevo pago para {clienteNombre}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="concepto">Concepto</Label>
                <Input
                  id="concepto"
                  placeholder="Ej: Mensualidad enero"
                  value={concepto}
                  onChange={(e) => setConcepto(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monto">Monto (&euro;)</Label>
                  <Input
                    id="monto"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha_pago">Fecha de pago</Label>
                  <Input
                    id="fecha_pago"
                    type="date"
                    value={fechaPago}
                    onChange={(e) => setFechaPago(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metodo">Metodo de pago</Label>
                <select
                  id="metodo"
                  value={metodo}
                  onChange={(e) => setMetodo(e.target.value as MetodoPago)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  {metodos.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notas">Notas (opcional)</Label>
                <Input
                  id="notas"
                  placeholder="Notas adicionales..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />
              </div>

              <DialogFooter>
                <GlassButton
                  type="button"
                  variant="subtle"
                  onClick={onClose}
                >
                  Cancelar
                </GlassButton>
                <GlassButton
                  type="submit"
                  variant="primary"
                >
                  Registrar Pago
                </GlassButton>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
