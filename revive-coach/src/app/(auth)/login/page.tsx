'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Mail, Lock, ArrowRight } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassButton } from '@/components/glass/glass-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement Supabase authentication
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/'
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="p-8" hover={false}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={cn(
              'w-16 h-16 rounded-2xl',
              'bg-primary flex items-center justify-center',
              'shadow-lg shadow-primary/25'
            )}
          >
            <Dumbbell className="w-8 h-8 text-primary-foreground" />
          </motion.div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Revive Coach
          </h1>
          <p className="text-muted-foreground mt-2">
            Inicia sesión para acceder al panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="christian@revive.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              <>
                Iniciar sesión
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </GlassButton>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Panel exclusivo para Christian Revive
        </p>
      </GlassCard>
    </motion.div>
  )
}
