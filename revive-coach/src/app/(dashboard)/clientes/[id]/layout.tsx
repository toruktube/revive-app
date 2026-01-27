'use client'

import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Dumbbell, Apple, Heart, Clock } from 'lucide-react'
import { GlassButton } from '@/components/glass/glass-button'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'overview', label: 'General', href: '', icon: null },
  { id: 'entrenamiento', label: 'Entrenamiento', href: '/entrenamiento', icon: Dumbbell },
  { id: 'nutricion', label: 'Nutrición', href: '/nutricion', icon: Apple },
  { id: 'bienestar', label: 'Bienestar', href: '/bienestar', icon: Heart },
  { id: 'historial', label: 'Historial', href: '/historial', icon: Clock },
]

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const clienteId = params.id as string
  const basePath = `/clientes/${clienteId}`

  // Determine active tab
  const getActiveTab = () => {
    if (pathname === basePath) return 'overview'
    const segment = pathname.replace(basePath, '').replace('/', '')
    return segment || 'overview'
  }

  const activeTab = getActiveTab()

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div className="flex items-center gap-4">
        <Link href="/clientes">
          <GlassButton variant="subtle" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver</span>
          </GlassButton>
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 min-w-max"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon

            return (
              <Link
                key={tab.id}
                href={`${basePath}${tab.href}`}
              >
                <button
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                    'border',
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                      : 'bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur-value)] border-[var(--glass-border)] text-foreground hover:bg-muted/50'
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {tab.label}
                </button>
              </Link>
            )
          })}
        </motion.div>
      </div>

      {/* Page Content */}
      {children}
    </div>
  )
}
