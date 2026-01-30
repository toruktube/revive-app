'use client'

import { motion } from 'framer-motion'
import { FileText, Zap, Smile, TrendingUp } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { cn } from '@/lib/utils'

interface DiarioStatsProps {
  stats: {
    totalNotas: number
    energiaPromedio: number
    animoPromedio: number
    adherenciaPromedio: number
  }
}

function getMetricColor(value: number): string {
  if (value >= 4) return 'text-success'
  if (value >= 3) return 'text-warning'
  return 'text-destructive'
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  suffix?: string
  colorClass?: string
  index: number
}

function StatCard({ icon, label, value, suffix, colorClass, index }: StatCardProps) {
  return (
    <GlassCard
      hover={false}
      className="p-3 lg:p-4 text-center"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
    >
      <div className="flex items-center justify-center mb-2 text-muted-foreground">
        {icon}
      </div>
      <p className={cn('text-xl lg:text-2xl font-bold', colorClass || 'text-foreground')}>
        {value}
        {suffix && (
          <span className="text-sm font-normal text-muted-foreground">{suffix}</span>
        )}
      </p>
      <p className="text-[10px] lg:text-xs text-muted-foreground mt-1 uppercase tracking-wider">
        {label}
      </p>
    </GlassCard>
  )
}

export function DiarioStats({ stats }: DiarioStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        icon={<FileText className="w-4 h-4" />}
        label="Total notas"
        value={stats.totalNotas}
        index={0}
      />
      <StatCard
        icon={<Zap className="w-4 h-4" />}
        label="Energia promedio"
        value={stats.energiaPromedio}
        suffix="/5"
        colorClass={stats.energiaPromedio > 0 ? getMetricColor(stats.energiaPromedio) : undefined}
        index={1}
      />
      <StatCard
        icon={<Smile className="w-4 h-4" />}
        label="Animo promedio"
        value={stats.animoPromedio}
        suffix="/5"
        colorClass={stats.animoPromedio > 0 ? getMetricColor(stats.animoPromedio) : undefined}
        index={2}
      />
      <StatCard
        icon={<TrendingUp className="w-4 h-4" />}
        label="Adherencia promedio"
        value={stats.adherenciaPromedio}
        suffix="/5"
        colorClass={stats.adherenciaPromedio > 0 ? getMetricColor(stats.adherenciaPromedio) : undefined}
        index={3}
      />
    </div>
  )
}
