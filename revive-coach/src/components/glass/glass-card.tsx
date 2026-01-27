'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      className={cn(
        'rounded-2xl p-6',
        'bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur-value)]',
        'border border-[var(--glass-border)]',
        'shadow-[var(--glass-shadow)]',
        'transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function GlassCardStatic({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        'bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur-value)]',
        'border border-[var(--glass-border)]',
        'shadow-[var(--glass-shadow)]',
        'transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
