'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Dumbbell, Apple, Download, Send, ChevronRight, CheckCircle2 } from 'lucide-react'
import { pdf } from '@react-pdf/renderer'
import { cn } from '@/lib/utils'
import { GlassModal } from '@/components/glass'
import { ReporteAdherenciaPDF, RutinaPDF, NutricionPDF } from '@/components/pdf'
import type { ClienteConEstado, SesionCalendario, NotaSesion, RutinaEntrenamiento, PlanNutricion } from '@/types'

type TipoReporte = 'adherencia' | 'rutina' | 'nutricion'

interface EnviarReporteModalProps {
  isOpen: boolean
  onClose: () => void
  cliente: ClienteConEstado
  sesiones: SesionCalendario[]
  notas: NotaSesion[]
  rutinas: RutinaEntrenamiento[]
  planesNutricion: PlanNutricion[]
  trainerName?: string
}

const tiposReporte = [
  {
    id: 'adherencia' as TipoReporte,
    nombre: 'Reporte de Adherencia',
    descripcion: 'Estadisticas de los ultimos 30 dias, puntuacion y tendencias',
    icon: FileText,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'rutina' as TipoReporte,
    nombre: 'Rutina de Entrenamiento',
    descripcion: 'Plan completo con ejercicios, series y repeticiones',
    icon: Dumbbell,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    id: 'nutricion' as TipoReporte,
    nombre: 'Plan de Nutricion',
    descripcion: 'Comidas diarias con macros y calorias',
    icon: Apple,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
]

export function EnviarReporteModal({
  isOpen,
  onClose,
  cliente,
  sesiones,
  notas,
  rutinas,
  planesNutricion,
  trainerName = 'REVIVE Coach',
}: EnviarReporteModalProps) {
  const [selectedType, setSelectedType] = useState<TipoReporte | null>(null)
  const [selectedRutina, setSelectedRutina] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  // Get routines assigned to this client
  const rutinasCliente = useMemo(() => {
    return rutinas.filter(r =>
      r.clientes_asignados?.some(c => c.id === cliente.id)
    )
  }, [rutinas, cliente.id])

  // Reset state when closing
  const handleClose = () => {
    setSelectedType(null)
    setSelectedRutina(null)
    setSelectedPlan(null)
    setIsGenerating(false)
    setIsGenerated(false)
    onClose()
  }

  // Generate and download PDF
  const handleDownload = async () => {
    setIsGenerating(true)

    try {
      const result = await generatePDFFile()
      if (!result) throw new Error('No se pudo generar el PDF')

      const { blob, filename } = result

      // Download the file
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setIsGenerated(true)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Generate PDF blob and file
  const generatePDFFile = async (): Promise<{ blob: Blob; filename: string } | null> => {
    try {
      let blob: Blob
      let filename: string

      if (selectedType === 'adherencia') {
        const doc = <ReporteAdherenciaPDF cliente={cliente} sesiones={sesiones} notas={notas} trainerName={trainerName} />
        blob = await pdf(doc).toBlob()
        filename = `reporte_adherencia_${cliente.nombre}_${cliente.apellidos}.pdf`
      } else if (selectedType === 'rutina' && selectedRutina) {
        const rutina = rutinas.find(r => r.id === selectedRutina)
        if (!rutina) throw new Error('Rutina no encontrada')
        const doc = <RutinaPDF cliente={cliente} rutina={rutina} trainerName={trainerName} />
        blob = await pdf(doc).toBlob()
        filename = `rutina_${rutina.nombre.replace(/\s+/g, '_')}_${cliente.nombre}.pdf`
      } else if (selectedType === 'nutricion' && selectedPlan) {
        const plan = planesNutricion.find(p => p.id === selectedPlan)
        if (!plan) throw new Error('Plan no encontrado')
        const doc = <NutricionPDF cliente={cliente} plan={plan} trainerName={trainerName} />
        blob = await pdf(doc).toBlob()
        filename = `nutricion_${plan.nombre.replace(/\s+/g, '_')}_${cliente.nombre}.pdf`
      } else {
        return null
      }

      return { blob, filename }
    } catch (error) {
      console.error('Error generating PDF:', error)
      return null
    }
  }

  // Send via WhatsApp using Web Share API (works on mobile)
  const handleWhatsApp = async () => {
    setIsGenerating(true)

    try {
      const result = await generatePDFFile()
      if (!result) throw new Error('No se pudo generar el PDF')

      const { blob, filename } = result
      const file = new File([blob], filename, { type: 'application/pdf' })

      // Check if we can share files
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        // Use Web Share API - this opens native share sheet on mobile
        await navigator.share({
          files: [file],
          title: `Reporte para ${cliente.nombre}`,
          text: `Hola ${cliente.nombre}! Te envio tu ${selectedType === 'adherencia' ? 'reporte de adherencia' : selectedType === 'rutina' ? 'rutina de entrenamiento' : 'plan de nutricion'}.`,
        })
        setIsGenerated(true)
      } else {
        // Fallback: download file and open WhatsApp with message
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        // Open WhatsApp with message
        if (cliente.telefono) {
          const phone = cliente.telefono.replace(/\D/g, '')
          const fullPhone = phone.startsWith('34') ? phone : `34${phone}`
          const message = encodeURIComponent(
            `Hola ${cliente.nombre}! Te envio tu ${selectedType === 'adherencia' ? 'reporte de adherencia' : selectedType === 'rutina' ? 'rutina de entrenamiento' : 'plan de nutricion'}. *Adjunta el PDF descargado*`
          )
          window.open(`https://wa.me/${fullPhone}?text=${message}`, '_blank')
        }
        setIsGenerated(true)
      }
    } catch (error) {
      // User cancelled share or error occurred
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  // Check if can generate
  const canGenerate = selectedType === 'adherencia' ||
    (selectedType === 'rutina' && selectedRutina) ||
    (selectedType === 'nutricion' && selectedPlan)

  return (
    <GlassModal isOpen={isOpen} onClose={handleClose} title="Enviar Reporte">
      <div className="space-y-6">
        {/* Report type selection */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Selecciona el tipo de reporte</p>
          {tiposReporte.map((tipo) => {
            const Icon = tipo.icon
            const isSelected = selectedType === tipo.id
            const isDisabled =
              (tipo.id === 'rutina' && rutinasCliente.length === 0) ||
              (tipo.id === 'nutricion' && planesNutricion.length === 0)

            return (
              <motion.button
                key={tipo.id}
                whileHover={{ scale: isDisabled ? 1 : 1.01 }}
                whileTap={{ scale: isDisabled ? 1 : 0.99 }}
                onClick={() => {
                  if (!isDisabled) {
                    setSelectedType(tipo.id)
                    setSelectedRutina(null)
                    setSelectedPlan(null)
                    setIsGenerated(false)
                  }
                }}
                disabled={isDisabled}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl transition-all',
                  'border',
                  isSelected
                    ? 'bg-white/10 border-primary/50'
                    : isDisabled
                      ? 'bg-white/2 border-white/5 opacity-50 cursor-not-allowed'
                      : 'bg-white/5 border-white/10 hover:bg-white/8'
                )}
              >
                <div className={cn('p-3 rounded-xl', tipo.bgColor)}>
                  <Icon className={cn('w-5 h-5', tipo.color)} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{tipo.nombre}</p>
                  <p className="text-xs text-muted-foreground">{tipo.descripcion}</p>
                  {isDisabled && (
                    <p className="text-xs text-amber-400 mt-1">
                      {tipo.id === 'rutina' ? 'No hay rutinas asignadas' : 'No hay planes disponibles'}
                    </p>
                  )}
                </div>
                <ChevronRight className={cn(
                  'w-5 h-5 transition-transform',
                  isSelected ? 'text-primary rotate-90' : 'text-muted-foreground'
                )} />
              </motion.button>
            )
          })}
        </div>

        {/* Routine selection */}
        <AnimatePresence mode="wait">
          {selectedType === 'rutina' && rutinasCliente.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <p className="text-sm text-muted-foreground">Selecciona la rutina</p>
              {rutinasCliente.map((rutina) => (
                <button
                  key={rutina.id}
                  onClick={() => {
                    setSelectedRutina(rutina.id)
                    setIsGenerated(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-lg transition-all',
                    'border text-left',
                    selectedRutina === rutina.id
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/8'
                  )}
                >
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    selectedRutina === rutina.id ? 'bg-emerald-400' : 'bg-muted-foreground'
                  )} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{rutina.nombre}</p>
                    <p className="text-xs text-muted-foreground">{rutina.categoria} • {rutina.duracion}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {selectedType === 'nutricion' && planesNutricion.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <p className="text-sm text-muted-foreground">Selecciona el plan</p>
              {planesNutricion.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan.id)
                    setIsGenerated(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-lg transition-all',
                    'border text-left',
                    selectedPlan === plan.id
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/8'
                  )}
                >
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    selectedPlan === plan.id ? 'bg-amber-400' : 'bg-muted-foreground'
                  )} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{plan.nombre}</p>
                    <p className="text-xs text-muted-foreground">{plan.calorias_totales} kcal • {plan.comidas.length} comidas</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence>
          {isGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <p className="text-sm text-emerald-400">PDF generado correctamente</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button
            onClick={handleDownload}
            disabled={!canGenerate || isGenerating}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all',
              canGenerate && !isGenerating
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-white/10 text-muted-foreground cursor-not-allowed'
            )}
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Download className="w-4 h-4" />
                Descargar PDF
              </>
            )}
          </button>

          {cliente.telefono && (
            <button
              onClick={handleWhatsApp}
              disabled={!canGenerate || isGenerating}
              className={cn(
                'flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                canGenerate && !isGenerating
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  : 'bg-white/10 text-muted-foreground cursor-not-allowed'
              )}
            >
              <Send className="w-4 h-4" />
              WhatsApp
            </button>
          )}
        </div>
      </div>
    </GlassModal>
  )
}
