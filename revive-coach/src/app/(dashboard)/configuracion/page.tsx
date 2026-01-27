'use client'

import { motion } from 'framer-motion'
import { Settings, User, Bell, Shield, Palette } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { ThemeToggle } from '@/components/shared'
import { cn } from '@/lib/utils'

const settingsSections = [
  {
    icon: User,
    title: 'Perfil',
    description: 'Gestiona tu información personal',
    href: '#'
  },
  {
    icon: Bell,
    title: 'Notificaciones',
    description: 'Configura alertas y recordatorios',
    href: '#'
  },
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Contraseña y autenticación',
    href: '#'
  },
  {
    icon: Palette,
    title: 'Apariencia',
    description: 'Tema y preferencias visuales',
    href: '#'
  }
]

export default function ConfiguracionPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-3xl"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
        <p className="text-muted-foreground mt-1">
          Personaliza tu experiencia
        </p>
      </div>

      {/* Settings sections */}
      <div className="space-y-4">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Quick theme toggle */}
      <GlassCard hover={false}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Palette className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Cambio rápido de tema</h3>
              <p className="text-sm text-muted-foreground">
                Alterna entre modo claro y oscuro
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </GlassCard>
    </motion.div>
  )
}
