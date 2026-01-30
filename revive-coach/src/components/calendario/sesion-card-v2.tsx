'use client'

import { MoreHorizontal, Video, MapPin, ClipboardCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SesionCalendario, TipoSesion } from '@/types'

interface SesionCardV2Props {
  sesion: SesionCalendario
  onClick?: (sesion: SesionCalendario) => void
}

// Badge styles per session type
const tipoBadgeStyles: Record<TipoSesion, string> = {
  presencial: 'badge-emerald',
  online: 'badge-blue',
  evaluacion: 'badge-violet',
}

const tipoLabels: Record<TipoSesion, string> = {
  presencial: 'Presencial',
  online: 'Online',
  evaluacion: 'Evaluacion',
}

const tipoIcons: Record<TipoSesion, React.ReactNode> = {
  presencial: <MapPin className="size-3" />,
  online: <Video className="size-3" />,
  evaluacion: <ClipboardCheck className="size-3" />,
}

function getInitials(nombre: string, apellidos?: string): string {
  const parts = apellidos ? `${nombre} ${apellidos}` : nombre
  return parts
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Generate a consistent avatar URL based on client name (placeholder)
function getAvatarUrl(clienteId: string): string {
  // Using a placeholder service for demo - in production use real client avatars
  const seed = clienteId.charCodeAt(0) + (clienteId.charCodeAt(1) || 0)
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
}

export function SesionCardV2({ sesion, onClick }: SesionCardV2Props) {
  const isOnline = sesion.tipo === 'online'

  return (
    <button
      onClick={() => onClick?.(sesion)}
      className="group relative w-full glass-card rounded-2xl p-5 hover:bg-white/5 transition-all duration-300 border border-[rgba(255,255,255,0.15)] text-left"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="flex justify-between items-start relative z-10 mb-5">
        <div className="flex gap-4 items-center">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="size-14 rounded-full border-2 border-white/20 bg-cover bg-center bg-zinc-800 flex items-center justify-center text-white font-bold text-lg"
              style={{
                backgroundImage: `url('${getAvatarUrl(sesion.cliente_id)}')`,
              }}
            >
              {/* Fallback initials if image fails */}
            </div>
            {/* Online indicator dot */}
            {isOnline && (
              <div className="absolute bottom-0 right-0 bg-[#12121A] size-4 rounded-full flex items-center justify-center ring-2 ring-[#12121A]">
                <div className="bg-white size-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              </div>
            )}
          </div>

          {/* Time and name */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-white font-bold text-xl tracking-tight">
                {sesion.hora_inicio} - {sesion.hora_fin}
              </span>
            </div>
            <h4
              className={cn(
                'font-medium text-sm tracking-wide',
                sesion.estado === 'cancelada' || sesion.estado === 'no_asistio'
                  ? 'text-zinc-500 line-through'
                  : 'text-zinc-400'
              )}
            >
              {sesion.cliente_nombre} {sesion.cliente_apellidos}
            </h4>
          </div>
        </div>

        {/* More options button */}
        <button
          className="size-6 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition"
          onClick={(e) => {
            e.stopPropagation()
            // Handle more options
          }}
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      {/* Bottom badges */}
      <div className="flex items-center gap-2 relative z-10 pt-4 border-t border-white/10">
        {/* Type badge with glow */}
        <span
          className={cn(
            'px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide',
            tipoBadgeStyles[sesion.tipo]
          )}
        >
          {tipoLabels[sesion.tipo]}
        </span>

        {/* Location badge */}
        {sesion.ubicacion && (
          <span className="px-3 py-1 rounded-md bg-white/5 text-zinc-400 text-[10px] font-semibold border border-white/10 uppercase">
            {sesion.ubicacion}
          </span>
        )}

        {/* Video call indicator for online */}
        {isOnline && !sesion.ubicacion && (
          <span className="px-3 py-1 rounded-md bg-white/5 text-zinc-400 text-[10px] font-semibold border border-white/10 uppercase flex items-center gap-1">
            <Video className="size-3" /> Zoom
          </span>
        )}

        {/* Cancelled badge */}
        {(sesion.estado === 'cancelada' || sesion.estado === 'no_asistio') && (
          <span className="px-3 py-1 rounded-md bg-red-500/10 text-red-400 text-[10px] font-semibold border border-red-500/30 uppercase">
            {sesion.estado === 'cancelada' ? 'Cancelada' : 'No asistio'}
          </span>
        )}
      </div>
    </button>
  )
}
