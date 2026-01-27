'use client'

import { cn } from '@/lib/utils'

interface GlassBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger'
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
    default: 'bg-muted/80 text-muted-foreground border-muted',
    success: 'bg-success/20 text-success border-success/30',
    warning: 'bg-warning/20 text-warning border-warning/30',
    danger: 'bg-destructive/20 text-destructive border-destructive/30',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'rounded-full border',
        'font-medium',
        'backdrop-blur-sm',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
