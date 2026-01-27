'use client'

import { motion, type Variants } from 'framer-motion'
import {
  WidgetAlertas,
  WidgetAdherencia,
  WidgetInsights,
  WidgetResumen,
  mockAlertas,
  mockInsights,
  mockStats
} from '@/components/dashboard'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export default function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome message */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-foreground">
          Buenos días, Christian
        </h2>
        <p className="text-muted-foreground mt-1">
          Aquí tienes el resumen de tu día
        </p>
      </motion.div>

      {/* Widgets grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Widget Alertas - takes 2 columns on xl */}
        <motion.div variants={itemVariants} className="xl:col-span-2">
          <WidgetAlertas alertas={mockAlertas} />
        </motion.div>

        {/* Widget Adherencia */}
        <motion.div variants={itemVariants}>
          <WidgetAdherencia
            adherenciaGlobal={mockStats.adherenciaGlobal}
            estadoAnimoPromedio={mockStats.estadoAnimoPromedio}
            tendencia="subiendo"
          />
        </motion.div>

        {/* Widget Resumen */}
        <motion.div variants={itemVariants}>
          <WidgetResumen stats={mockStats} />
        </motion.div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget Insights - takes 2 columns */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <WidgetInsights insights={mockInsights} />
        </motion.div>

        {/* Quick stats or additional widget */}
        <motion.div variants={itemVariants}>
          <div className="glass-card p-6 h-full">
            <h3 className="font-semibold text-foreground mb-4">Actividad reciente</h3>
            <div className="space-y-4">
              {[
                { time: 'Hace 5 min', action: 'María García completó su reporte semanal' },
                { time: 'Hace 1h', action: 'Nuevo cliente: Pedro López' },
                { time: 'Hace 2h', action: 'Carlos Rodríguez actualizó su peso' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
