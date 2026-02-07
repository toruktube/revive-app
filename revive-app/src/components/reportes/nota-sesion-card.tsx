'use client'

import { motion } from 'framer-motion'
import { Zap, Clock, TrendingUp, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NotaSesion } from '@/types'

interface NotaSesionCardProps {
  nota: NotaSesion
  onClick?: () => void
  index?: number
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
}

type MetricColor = 'energia' | 'puntualidad' | 'progreso' | 'emocional'

const metricColors: Record<MetricColor, string> = {
  energia: 'bg-[#F59E0B]',
  puntualidad: 'bg-[#3B82F6]',
  progreso: 'bg-[#10B981]',
  emocional: 'bg-[#A855F7]',
}

function RatingDots({ value, color, max = 5 }: { value: number; color: MetricColor; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={cn(
            'size-2 rounded-full',
            i < value ? metricColors[color] : 'bg-black/10 dark:bg-white/10'
          )}
        />
      ))}
    </div>
  )
}

export function NotaSesionCard({ nota, onClick, index = 0 }: NotaSesionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        'group relative w-full glass-card rounded-2xl p-4',
        'hover:bg-white/5 transition-all duration-300',
        'border border-white/10',
        'cursor-pointer'
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div
          className="size-10 rounded-full border-2 border-white/20 bg-cover bg-center shrink-0"
          style={{ backgroundImage: `url('${nota.cliente_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}')` }}
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground truncate">
              {nota.cliente_nombre} {nota.cliente_apellidos}
            </h4>
            <span className="text-xs text-muted-foreground shrink-0 ml-2">
              {formatDate(nota.fecha)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {nota.comentario}
          </p>
        </div>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-[#F59E0B]" />
          <RatingDots value={nota.energia} color="energia" />
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-[#3B82F6]" />
          <RatingDots value={nota.puntualidad} color="puntualidad" />
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3 h-3 text-[#10B981]" />
          <RatingDots value={nota.progreso} color="progreso" />
        </div>
        <div className="flex items-center gap-1.5">
          <Heart className="w-3 h-3 text-[#A855F7]" />
          <RatingDots value={nota.estado_emocional} color="emocional" />
        </div>
      </div>
    </motion.div>
  )
}
