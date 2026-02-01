'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FABProps {
  onClick?: () => void
  className?: string
}

export function FAB({ onClick, className }: FABProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'fixed bottom-28 right-6 z-30',
        'size-14 rounded-full',
        'bg-gradient-to-br from-white to-gray-200',
        'dark:from-white dark:to-gray-300',
        'shadow-[0_0_20px_rgba(255,255,255,0.2)]',
        'flex items-center justify-center',
        'text-black',
        'border border-white/40',
        'group',
        className
      )}
    >
      <Plus
        className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300"
        strokeWidth={2.5}
      />
    </motion.button>
  )
}
