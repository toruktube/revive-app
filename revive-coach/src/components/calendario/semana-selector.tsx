'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TipoSesion } from '@/types'

interface DiaInfo {
  fecha: string
  dia: number
  diaSemana: string // L, M, X, J, V, S, D
  esHoy: boolean
  tipos: TipoSesion[] // tipos de sesiones para mostrar dots
}

interface SemanaSelectorProps {
  mes: string
  anio: number
  dias: DiaInfo[]
  diaSeleccionado: number
  onSelectDia: (index: number) => void
  onSemanaAnterior: () => void
  onSemanaSiguiente: () => void
}

// Map tipo to color
const tipoColors: Record<TipoSesion, string> = {
  presencial: 'bg-emerald-500',
  online: 'bg-blue-500',
  evaluacion: 'bg-violet-500',
}

export function SemanaSelector({
  mes,
  anio,
  dias,
  diaSeleccionado,
  onSelectDia,
  onSemanaAnterior,
  onSemanaSiguiente,
}: SemanaSelectorProps) {
  return (
    <div className="glass-card rounded-3xl p-4 relative overflow-hidden">
      {/* Background rhino watermark */}
      <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none transform -rotate-12 scale-150">
        <svg fill="white" height="100" viewBox="0 0 200 100" width="200">
          <path d="M20,80 L40,80 L50,60 L80,60 L90,80 L130,80 L140,50 L180,40 L195,20 L160,30 L150,10 L120,30 L100,10 L60,10 L30,40 Z" />
        </svg>
      </div>

      {/* Header with month/year and nav arrows */}
      <div className="flex items-center justify-between mb-4 px-2 relative z-10">
        <h2 className="text-lg font-bold text-white tracking-wide uppercase">
          {mes} {anio}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onSemanaAnterior}
            className="size-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={onSemanaSiguiente}
            className="size-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 relative z-10 w-full">
        {dias.map((dia, index) => {
          const isSelected = index === diaSeleccionado
          const isWeekend = index >= 5 // Sabado (5) y Domingo (6)

          return (
            <div key={dia.fecha} className="flex flex-col items-center">
              {/* Day letter */}
              <span
                className={cn(
                  'text-[10px] font-bold uppercase tracking-wider mb-2',
                  isSelected ? 'text-white' : isWeekend ? 'text-zinc-500' : 'text-zinc-400'
                )}
              >
                {dia.diaSemana}
              </span>

              {/* Day number button */}
              <button
                onClick={() => onSelectDia(index)}
                className={cn(
                  'size-9 sm:size-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200',
                  isSelected
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : isWeekend
                      ? 'text-zinc-500 hover:bg-white/10'
                      : 'text-white hover:bg-white/10'
                )}
              >
                {dia.dia}
              </button>

              {/* Event dots */}
              <div className="flex gap-1 mt-1.5 h-1">
                {dia.tipos.slice(0, 2).map((tipo, i) => (
                  <div key={i} className={cn('size-1 rounded-full', tipoColors[tipo])} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
