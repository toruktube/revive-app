'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, ChevronDown, Target } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassBadge } from '@/components/glass/glass-badge'
import { cn } from '@/lib/utils'
import type { NotaSesion } from '@/types'

interface NotaSesionCardProps {
  nota: NotaSesion
  index: number
}

function MetricDots({ value, label, colorScheme }: { value: number; label: string; colorScheme: 'energia' | 'animo' | 'adherencia' }) {
  const getColor = (level: number) => {
    if (level >= 4) return 'text-success'
    if (level >= 3) return 'text-warning'
    return 'text-destructive'
  }

  const color = getColor(value)

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </span>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={cn(
              'text-sm leading-none',
              dot <= value ? color : 'text-muted-foreground/30'
            )}
          >
            {'\u25CF'}
          </span>
        ))}
      </div>
      <span className={cn('text-xs font-semibold', color)}>
        {value}/5
      </span>
    </div>
  )
}

function formatFecha(fecha: string): string {
  const date = new Date(fecha)
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getInitials(nombre: string, apellidos?: string): string {
  const first = nombre.charAt(0).toUpperCase()
  const last = apellidos ? apellidos.charAt(0).toUpperCase() : ''
  return first + last
}

export function NotaSesionCard({ nota, index }: NotaSesionCardProps) {
  const [expanded, setExpanded] = useState(false)

  const initials = getInitials(nota.cliente_nombre, nota.cliente_apellidos)
  const fullName = nota.cliente_apellidos
    ? `${nota.cliente_nombre} ${nota.cliente_apellidos}`
    : nota.cliente_nombre

  return (
    <GlassCard
      className="p-4 lg:p-5 cursor-pointer"
      hover={true}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header: Avatar + Name + Date */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">
            {fullName}
          </h4>
          <p className="text-xs text-muted-foreground">
            {formatFecha(nota.fecha)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {nota.dolor_molestias && (
            <GlassBadge variant="warning" size="sm">
              <AlertTriangle className="w-3 h-3" />
              Dolor
            </GlassBadge>
          )}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="flex items-center justify-around py-3 border-t border-b border-[var(--glass-border)]">
        <MetricDots value={nota.energia} label="Energia" colorScheme="energia" />
        <MetricDots value={nota.estado_animo} label="Animo" colorScheme="animo" />
        <MetricDots value={nota.adherencia} label="Adherencia" colorScheme="adherencia" />
      </div>

      {/* Notes Preview / Full */}
      <div className="mt-3">
        <p
          className={cn(
            'text-sm text-foreground/80 leading-relaxed',
            !expanded && 'line-clamp-3'
          )}
        >
          {nota.notas_libres}
        </p>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {nota.dolor_molestias && (
              <div className="mt-3 p-3 rounded-xl bg-warning/10 border border-warning/20">
                <p className="text-xs font-semibold text-warning mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Dolor / Molestias
                </p>
                <p className="text-sm text-foreground/80">
                  {nota.dolor_molestias}
                </p>
              </div>
            )}

            {nota.objetivos_proxima && (
              <div className="mt-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  Proxima sesion
                </p>
                <p className="text-sm text-foreground/80">
                  {nota.objetivos_proxima}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  )
}
