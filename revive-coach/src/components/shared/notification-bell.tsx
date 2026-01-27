'use client'

import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NotificationBellProps {
  count?: number
  className?: string
  onClick?: () => void
}

export function NotificationBell({ count = 0, className, onClick }: NotificationBellProps) {
  const hasNotifications = count > 0

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative w-9 h-9 rounded-xl',
        'bg-[var(--glass-bg)] backdrop-blur-sm',
        'border border-[var(--glass-border)]',
        'flex items-center justify-center',
        'transition-colors duration-200',
        'hover:bg-muted',
        className
      )}
      aria-label={`Notificaciones${hasNotifications ? ` (${count})` : ''}`}
    >
      <Bell className={cn(
        'h-4 w-4',
        hasNotifications ? 'text-primary' : 'text-muted-foreground'
      )} />
      {hasNotifications && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            'absolute -top-1 -right-1',
            'min-w-[18px] h-[18px]',
            'flex items-center justify-center',
            'rounded-full',
            'bg-destructive text-destructive-foreground',
            'text-[10px] font-bold',
            'px-1'
          )}
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </motion.button>
  )
}
