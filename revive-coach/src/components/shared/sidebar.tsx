'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  Dumbbell
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Clientes', href: '/clientes', icon: Users },
  { label: 'Alertas', href: '/alertas', icon: Bell },
  { label: 'Configuración', href: '/configuracion', icon: Settings },
]

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 h-screen w-64',
        'bg-sidebar border-r border-sidebar-border',
        'flex flex-col',
        // Hidden on mobile, visible on desktop
        'hidden lg:flex'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'h-16 flex items-center px-4',
        'border-b border-sidebar-border'
      )}>
        <Link href="/" className="flex items-center gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-xl',
              'bg-primary flex items-center justify-center',
              'shadow-lg shadow-primary/25'
            )}
          >
            <Dumbbell className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-sidebar-foreground">
            Revive
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                    'transition-all duration-200',
                    'group relative',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-primary'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-6 bg-sidebar-primary rounded-r-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <item.icon className={cn(
                    'w-5 h-5 shrink-0',
                    isActive ? 'text-sidebar-primary' : 'text-current'
                  )} />
                  <span className="font-medium">
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          Revive Coach v1.0
        </p>
      </div>
    </aside>
  )
}
