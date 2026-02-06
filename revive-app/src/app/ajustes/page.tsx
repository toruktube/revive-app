'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  Bell,
  BellOff,
  Calendar,
  CreditCard,
  Globe,
  LogOut,
  Lock,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard, GlassButton } from '@/components/glass'
import { ThemeToggle } from '@/components/ajustes'
import { mockTrainerPerfil, mockPreferencias } from '@/lib/mock-data'

export default function AjustesPage() {
  const [preferencias, setPreferencias] = useState(mockPreferencias)

  const togglePreference = (key: keyof typeof preferencias) => {
    if (typeof preferencias[key] === 'boolean') {
      setPreferencias(prev => ({
        ...prev,
        [key]: !prev[key]
      }))
    }
  }

  return (
    <div className="flex flex-col px-4">
      {/* Header */}
      <div className="py-2 mb-4">
        <h2 className="text-2xl font-antonio font-semibold tracking-wide text-foreground">AJUSTES</h2>
        <p className="text-sm text-muted-foreground">Configuración de la app</p>
      </div>

      {/* Profile Card */}
      <GlassCard hover={false} className="mb-4">
        <div className="flex items-center gap-4">
          <div
            className="size-16 rounded-2xl border-2 border-white/20 bg-cover bg-center"
            style={{ backgroundImage: `url('${mockTrainerPerfil.avatar_url}')` }}
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">
              {mockTrainerPerfil.nombre} {mockTrainerPerfil.apellidos}
            </h3>
            <p className="text-sm text-muted-foreground">{mockTrainerPerfil.especialidad}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{mockTrainerPerfil.email}</span>
          </div>
          {mockTrainerPerfil.telefono && (
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{mockTrainerPerfil.telefono}</span>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Theme */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">Tema visual</h3>
        <ThemeToggle />
      </div>

      {/* Notifications */}
      <GlassCard hover={false} className="mb-4 p-0">
        <div className="px-5 py-3 border-b border-white/10">
          <h3 className="text-sm font-semibold text-foreground">Notificaciones</h3>
        </div>

        <div className="divide-y divide-white/5">
          {/* Email notifications */}
          <button
            onClick={() => togglePreference('notificaciones_email')}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-[var(--accent-blue)]/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-[var(--accent-blue)]" />
              </div>
              <span className="text-sm text-foreground">Email</span>
            </div>
            <div className={cn(
              'size-6 rounded-full transition-colors flex items-center justify-center',
              preferencias.notificaciones_email ? 'bg-[var(--accent-emerald)]' : 'bg-white/10'
            )}>
              {preferencias.notificaciones_email ? (
                <Bell className="w-3.5 h-3.5 text-white" />
              ) : (
                <BellOff className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </div>
          </button>

          {/* Push notifications */}
          <button
            onClick={() => togglePreference('notificaciones_push')}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-[var(--accent-violet)]/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-[var(--accent-violet)]" />
              </div>
              <span className="text-sm text-foreground">Push</span>
            </div>
            <div className={cn(
              'size-6 rounded-full transition-colors flex items-center justify-center',
              preferencias.notificaciones_push ? 'bg-[var(--accent-emerald)]' : 'bg-white/10'
            )}>
              {preferencias.notificaciones_push ? (
                <Bell className="w-3.5 h-3.5 text-white" />
              ) : (
                <BellOff className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </div>
          </button>

          {/* Session reminders */}
          <button
            onClick={() => togglePreference('recordatorios_sesion')}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-[var(--accent-emerald)]/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[var(--accent-emerald)]" />
              </div>
              <span className="text-sm text-foreground">Recordatorios de sesión</span>
            </div>
            <div className={cn(
              'size-6 rounded-full transition-colors flex items-center justify-center',
              preferencias.recordatorios_sesion ? 'bg-[var(--accent-emerald)]' : 'bg-white/10'
            )}>
              {preferencias.recordatorios_sesion ? (
                <Bell className="w-3.5 h-3.5 text-white" />
              ) : (
                <BellOff className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </div>
          </button>

          {/* Payment reminders */}
          <button
            onClick={() => togglePreference('recordatorios_pago')}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-warning" />
              </div>
              <span className="text-sm text-foreground">Recordatorios de pago</span>
            </div>
            <div className={cn(
              'size-6 rounded-full transition-colors flex items-center justify-center',
              preferencias.recordatorios_pago ? 'bg-[var(--accent-emerald)]' : 'bg-white/10'
            )}>
              {preferencias.recordatorios_pago ? (
                <Bell className="w-3.5 h-3.5 text-white" />
              ) : (
                <BellOff className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </div>
          </button>
        </div>
      </GlassCard>

      {/* Language */}
      <GlassCard hover={false} className="mb-4 p-0">
        <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Globe className="w-4 h-4 text-foreground" />
            </div>
            <span className="text-sm text-foreground">Idioma</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Español</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>
      </GlassCard>

      {/* Account Actions */}
      <GlassCard hover={false} className="mb-4 p-0">
        <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Lock className="w-4 h-4 text-foreground" />
            </div>
            <span className="text-sm text-foreground">Cambiar contraseña</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </GlassCard>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <GlassButton
          variant="default"
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => console.log('Logout')}
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </GlassButton>
      </motion.div>

      {/* Version */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        REVIVE v1.0.0 MVP
      </p>

      {/* Spacer */}
      <div className="h-8" />
    </div>
  )
}
