'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Info } from 'lucide-react'
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

interface RutinaEditorProps {
  open: boolean
  onClose: () => void
}

export function RutinaEditor({ open, onClose }: RutinaEditorProps) {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock save
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-primary" />
            Nueva Rutina
          </DialogTitle>
          <DialogDescription>
            Crear una nueva rutina de entrenamiento
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre_rutina">Nombre de la rutina</Label>
            <Input
              id="nombre_rutina"
              placeholder="Ej: Full Body - Fase de Volumen"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion_rutina">Descripcion</Label>
            <Input
              id="descripcion_rutina"
              placeholder="Breve descripcion de la rutina..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
          >
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Editor de rutinas
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Funcionalidad completa proximamente. Podras agregar dias, ejercicios,
                series y repeticiones directamente desde esta interfaz.
              </p>
            </div>
          </motion.div>

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
              Guardar
            </GlassButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
