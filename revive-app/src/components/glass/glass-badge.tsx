'use client'

import { cn } from '@/lib/utils'

interface GlassBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'emerald' | 'blue' | 'violet' | 'warning' | 'danger' | 'mono'
  size?: 'sm' | 'md'
  className?: string
}

export function GlassBadge({
  children,
  variant = 'default',
  size = 'md',
  className
}: GlassBadgeProps) {
  const variants = {
    default: 'bg-white/5 text-muted-foreground border-white/10',
    emerald: 'badge-emerald',
    blue: 'badge-blue',
    violet: 'badge-violet',
    warning: 'bg-warning/10 text-warning border-warning/30 shadow-[0_0_10px_rgba(245,158,11,0.25)]',
    danger: 'bg-destructive/10 text-destructive border-destructive/30 shadow-[0_0_10px_rgba(239,68,68,0.25)]',
    mono: 'mono-badge',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'rounded-md border',
        'font-semibold uppercase tracking-wide',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
