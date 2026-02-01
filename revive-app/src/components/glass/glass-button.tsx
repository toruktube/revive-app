'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'subtle'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export function GlassButton({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: GlassButtonProps) {
  const variants = {
    default: 'bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 text-foreground hover:bg-white hover:text-black hover:border-white',
    primary: 'bg-white text-black border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]',
    subtle: 'bg-transparent border-transparent hover:bg-white/10',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-2xl',
    icon: 'p-2 rounded-full',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'border',
        'font-medium',
        'transition-all duration-300',
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
