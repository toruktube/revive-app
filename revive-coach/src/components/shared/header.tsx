'use client'

import { Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from './theme-toggle'
import { NotificationBell } from './notification-bell'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title?: string
  alertCount?: number
}

export function Header({ title = 'Dashboard', alertCount = 0 }: HeaderProps) {
  return (
    <header className={cn(
      'h-16 px-4 lg:px-6',
      'flex items-center justify-between gap-2 lg:gap-4',
      'border-b border-border',
      'bg-background/80 backdrop-blur-sm',
      'sticky top-0 z-30'
    )}>
      {/* Title - hidden on mobile to make room */}
      <h1 className="hidden sm:block text-xl font-semibold text-foreground">
        {title}
      </h1>

      {/* Spacer for mobile hamburger menu */}
      <div className="w-10 sm:hidden" />

      {/* Search - hidden on small mobile */}
      <div className="hidden sm:flex flex-1 max-w-md mx-4" suppressHydrationWarning>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar clientes..."
            suppressHydrationWarning
            className={cn(
              'flex h-9 w-full rounded-xl border border-transparent bg-muted/50 px-3 py-1 pl-10 text-base shadow-xs transition-colors',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:bg-background focus-visible:border-input',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'md:text-sm'
            )}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search button for mobile */}
        <button className="sm:hidden p-2 rounded-xl hover:bg-muted transition-colors">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>

        <NotificationBell count={alertCount} />
        <ThemeToggle />

        {/* User avatar */}
        <div className="ml-1 lg:ml-2 flex items-center">
          <Avatar className="w-8 h-8 lg:w-9 lg:h-9 border-2 border-primary/20">
            <AvatarImage src="/avatar-christian.jpg" alt="Christian" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs lg:text-sm font-medium">
              CR
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
