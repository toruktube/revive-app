'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
}

export function GlassButton({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: GlassButtonProps) {
  const variants = {
    default: 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-foreground',
    primary: 'bg-primary/80 border-primary/30 text-primary-foreground',
    subtle: 'bg-transparent border-transparent hover:bg-[var(--glass-bg)]',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-2xl',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'backdrop-blur-[var(--glass-blur-value)]',
        'border',
        'shadow-sm',
        'font-medium',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
