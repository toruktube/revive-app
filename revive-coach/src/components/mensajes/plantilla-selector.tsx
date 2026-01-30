'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Sparkles, Bell, Apple, BarChart3, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { GlassBadge } from '@/components/glass/glass-badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { PlantillaMensaje, CategoriaPlantilla } from '@/types'

interface PlantillaSelectorProps {
  open: boolean
  onClose: () => void
  plantillas: PlantillaMensaje[]
  onSelect: (contenido: string) => void
}

const CATEGORIAS: { value: CategoriaPlantilla | 'todas'; label: string; icon: React.ReactNode }[] = [
  { value: 'todas', label: 'Todas', icon: <FileText className="w-3.5 h-3.5" /> },
  { value: 'motivacion', label: 'Motivacion', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { value: 'recordatorio', label: 'Recordatorio', icon: <Bell className="w-3.5 h-3.5" /> },
  { value: 'nutricion', label: 'Nutricion', icon: <Apple className="w-3.5 h-3.5" /> },
  { value: 'seguimiento', label: 'Seguimiento', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  { value: 'general', label: 'General', icon: <MessageCircle className="w-3.5 h-3.5" /> },
]

export function PlantillaSelector({
  open,
  onClose,
  plantillas,
  onSelect,
}: PlantillaSelectorProps) {
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaPlantilla | 'todas'>('todas')

  const filteredPlantillas = categoriaActiva === 'todas'
    ? plantillas
    : plantillas.filter(p => p.categoria === categoriaActiva)

  const handleSelect = (contenido: string) => {
    onSelect(contenido)
    onClose()
    setCategoriaActiva('todas')
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Plantillas de mensajes
          </DialogTitle>
          <DialogDescription>
            Selecciona una plantilla para enviar rapidamente
          </DialogDescription>
        </DialogHeader>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2 pb-2">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoriaActiva(cat.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
                'border transition-all duration-200',
                categoriaActiva === cat.value
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
              )}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates List */}
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-2 pb-2">
            <AnimatePresence mode="popLayout">
              {filteredPlantillas.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center"
                >
                  <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No hay plantillas en esta categoria
                  </p>
                </motion.div>
              ) : (
                filteredPlantillas.map((plantilla) => (
                  <motion.button
                    key={plantilla.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => handleSelect(plantilla.contenido)}
                    className={cn(
                      'w-full text-left p-3 rounded-xl transition-all duration-200',
                      'border border-border/50 hover:border-primary/30',
                      'hover:bg-primary/5',
                      'group'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {plantilla.nombre}
                      </span>
                      <GlassBadge size="sm" variant="default">
                        {plantilla.categoria}
                      </GlassBadge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {plantilla.contenido}
                    </p>
                  </motion.button>
                ))
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
