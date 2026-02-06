'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, TrendingUp, Wallet } from 'lucide-react'
import { GlassCardStatic } from '@/components/glass'
import type { ReporteMensual } from '@/types'

interface ResumenStatsProps {
  reporte: ReporteMensual
}

export function ResumenStats({ reporte }: ResumenStatsProps) {
  const stats = [
    {
      label: 'Sesiones',
      value: `${reporte.sesiones_completadas}/${reporte.sesiones_totales}`,
      subvalue: `${reporte.tasa_asistencia.toFixed(0)}% asistencia`,
      icon: Calendar,
      color: 'var(--accent-blue)',
    },
    {
      label: 'Clientes Activos',
      value: reporte.clientes_activos.toString(),
      icon: Users,
      color: 'var(--accent-emerald)',
    },
    {
      label: 'Adherencia Media',
      value: `${reporte.adherencia_promedio}%`,
      icon: TrendingUp,
      color: 'var(--accent-violet)',
    },
    {
      label: 'Ingresos',
      value: `${reporte.ingresos_totales.toLocaleString()}€`,
      icon: Wallet,
      color: 'var(--accent-emerald)',
    },
  ]

  return (
    <GlassCardStatic className="mb-4">
      <h3 className="text-lg font-antonio font-medium tracking-wide text-foreground mb-1 uppercase">{reporte.mes}</h3>
      <p className="text-xs text-muted-foreground mb-4">Resumen del mes</p>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-3 rounded-xl bg-white/5 border border-white/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="size-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <span className="text-[10px] font-antonio font-normal text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-antonio font-semibold tracking-wide text-foreground">{stat.value}</p>
            {stat.subvalue && (
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.subvalue}</p>
            )}
          </motion.div>
        ))}
      </div>
    </GlassCardStatic>
  )
}
