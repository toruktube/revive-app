'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  ClipboardCheck,
  User,
  FileText,
  Check,
  X,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/glass'
import type { SesionCalendario, TipoSesion, EstadoSesion } from '@/types'

interface DetalleSesionModalProps {
  sesion: SesionCalendario | null
  open: boolean
  onClose: () => void
}

const coloresTipoHeader: Record<TipoSesion, string> = {
  presencial: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
  online: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
  evaluacion: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
}

const coloresTipoText: Record<TipoSesion, string> = {
  presencial: 'text-emerald-600 dark:text-emerald-400',
  online: 'text-blue-600 dark:text-blue-400',
  evaluacion: 'text-purple-600 dark:text-purple-400',
}

const iconosTipo: Record<TipoSesion, React.ReactNode> = {
  presencial: <MapPin className="size-5" />,
  online: <Video className="size-5" />,
  evaluacion: <ClipboardCheck className="size-5" />,
}

const etiquetasTipo: Record<TipoSesion, string> = {
  presencial: 'Presencial',
  online: 'Online',
  evaluacion: 'Evaluacion',
}

const etiquetasEstado: Record<EstadoSesion, { label: string; variant: 'default' | 'success' | 'warning' | 'danger' }> = {
  programada: { label: 'Programada', variant: 'default' },
  completada: { label: 'Completada', variant: 'success' },
  cancelada: { label: 'Cancelada', variant: 'danger' },
  no_asistio: { label: 'No asistio', variant: 'warning' },
}

const iconosEstado: Record<EstadoSesion, React.ReactNode> = {
  programada: <Clock className="size-3.5" />,
  completada: <Check className="size-3.5" />,
  cancelada: <X className="size-3.5" />,
  no_asistio: <AlertCircle className="size-3.5" />,
}

function formatearFecha(fecha: string): string {
  const date = new Date(fecha + 'T00:00:00')
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function DetalleSesionModal({ sesion, open, onClose }: DetalleSesionModalProps) {
  if (!sesion) return null

  const estadoInfo = etiquetasEstado[sesion.estado]
  const nombreCompleto = sesion.cliente_apellidos
    ? `${sesion.cliente_nombre} ${sesion.cliente_apellidos}`
    : sesion.cliente_nombre

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        {/* Header con color segun tipo */}
        <DialogHeader
          className={cn(
            '-mx-6 -mt-6 px-6 pt-6 pb-4 rounded-t-lg',
            'bg-gradient-to-b border-b',
            coloresTipoHeader[sesion.tipo]
          )}
        >
          <div className="flex items-center gap-3">
            <span className={cn(coloresTipoText[sesion.tipo])}>
              {iconosTipo[sesion.tipo]}
            </span>
            <div>
              <DialogTitle className="text-lg">
                {etiquetasTipo[sesion.tipo]}
              </DialogTitle>
              <DialogDescription className="mt-1">
                Detalle de la sesion
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Contenido */}
        <div className="space-y-4 mt-2">
          {/* Cliente */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-full bg-muted/80">
              <User className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cliente</p>
              <p className="text-sm font-semibold text-foreground">{nombreCompleto}</p>
            </div>
          </div>

          {/* Fecha */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-full bg-muted/80">
              <Calendar className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fecha</p>
              <p className="text-sm font-semibold text-foreground capitalize">
                {formatearFecha(sesion.fecha)}
              </p>
            </div>
          </div>

          {/* Horario */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-full bg-muted/80">
              <Clock className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Horario</p>
              <p className="text-sm font-semibold text-foreground">
                {sesion.hora_inicio} - {sesion.hora_fin}
              </p>
            </div>
          </div>

          {/* Ubicacion (si tiene) */}
          {sesion.ubicacion && (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-full bg-muted/80">
                <MapPin className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ubicacion</p>
                <p className="text-sm font-semibold text-foreground">{sesion.ubicacion}</p>
              </div>
            </div>
          )}

          {/* Estado */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-full bg-muted/80">
              {iconosEstado[sesion.estado]}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estado</p>
              <GlassBadge variant={estadoInfo.variant} size="sm">
                {estadoInfo.label}
              </GlassBadge>
            </div>
          </div>

          {/* Notas (si tiene) */}
          {sesion.notas && (
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center size-9 rounded-full bg-muted/80 mt-0.5">
                <FileText className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Notas</p>
                <p className="text-sm text-foreground mt-0.5">{sesion.notas}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
