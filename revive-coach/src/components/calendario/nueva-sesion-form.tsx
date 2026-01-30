'use client'

import { useState } from 'react'
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
import { GlassButton } from '@/components/glass'
import { Plus, CalendarPlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TipoSesion } from '@/types'

interface NuevaSesionFormProps {
  open: boolean
  onClose: () => void
}

const clientesMock = [
  { id: '1', nombre: 'Maria Garcia' },
  { id: '2', nombre: 'Carlos Rodriguez' },
  { id: '3', nombre: 'Laura Martinez' },
  { id: '4', nombre: 'Pedro Lopez' },
  { id: '5', nombre: 'Ana Fernandez' },
  { id: '7', nombre: 'Sofia Diaz' },
  { id: '8', nombre: 'Miguel Herrera' },
]

const tiposSesion: { value: TipoSesion; label: string }[] = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'online', label: 'Online' },
  { value: 'evaluacion', label: 'Evaluacion' },
]

export function NuevaSesionForm({ open, onClose }: NuevaSesionFormProps) {
  const [clienteId, setClienteId] = useState('')
  const [fecha, setFecha] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFin, setHoraFin] = useState('')
  const [tipo, setTipo] = useState<TipoSesion>('presencial')
  const [notas, setNotas] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      resetForm()
      onClose()
    }, 1500)
  }

  function resetForm() {
    setClienteId('')
    setFecha('')
    setHoraInicio('')
    setHoraFin('')
    setTipo('presencial')
    setNotas('')
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      resetForm()
      setEnviado(false)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-full bg-primary/20">
              <CalendarPlus className="size-4 text-primary" />
            </div>
            <div>
              <DialogTitle>Nueva sesion</DialogTitle>
              <DialogDescription>
                Programa una nueva sesion con un cliente
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {enviado ? (
          <div className="py-8 text-center space-y-2">
            <div className="flex items-center justify-center size-12 rounded-full bg-emerald-500/20 mx-auto">
              <Plus className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-foreground">Sesion creada</p>
            <p className="text-xs text-muted-foreground">
              La sesion ha sido programada correctamente
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Cliente */}
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <select
                id="cliente"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
                className={cn(
                  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1',
                  'text-sm shadow-xs transition-colors',
                  'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  'dark:bg-input/30'
                )}
              >
                <option value="" disabled>
                  Seleccionar cliente...
                </option>
                {clientesMock.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            {/* Horarios */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="hora-inicio">Hora inicio</Label>
                <Input
                  id="hora-inicio"
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora-fin">Hora fin</Label>
                <Input
                  id="hora-fin"
                  type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <Label>Tipo de sesion</Label>
              <div className="flex gap-2">
                {tiposSesion.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTipo(t.value)}
                    className={cn(
                      'flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200',
                      tipo === t.value
                        ? 'bg-primary/20 border-primary/40 text-primary'
                        : 'bg-muted/40 border-muted text-muted-foreground hover:bg-muted/60'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notas */}
            <div className="space-y-2">
              <Label htmlFor="notas">Notas (opcional)</Label>
              <textarea
                id="notas"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                rows={3}
                placeholder="Notas adicionales sobre la sesion..."
                className={cn(
                  'flex w-full rounded-md border border-input bg-transparent px-3 py-2',
                  'text-sm shadow-xs transition-colors resize-none',
                  'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                  'placeholder:text-muted-foreground',
                  'dark:bg-input/30'
                )}
              />
            </div>

            <DialogFooter>
              <GlassButton
                type="button"
                variant="subtle"
                size="sm"
                onClick={() => handleOpenChange(false)}
              >
                Cancelar
              </GlassButton>
              <GlassButton type="submit" variant="primary" size="sm">
                <Plus className="size-4" />
                Crear sesion
              </GlassButton>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
