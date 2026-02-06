'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className={cn(
      'flex items-center justify-between px-6 pt-14 pb-4 shrink-0 bg-transparent z-20',
      className
    )}>
      <div className="flex items-center gap-3">
        {/* Logo Icon - Rhino */}
        <div className="size-10 rounded-xl bg-black dark:bg-black border border-white/10 dark:border-white/15 flex items-center justify-center group shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image
            src="/images/logo.png"
            alt="REVIVE"
            width={24}
            height={24}
            className="invert dark:invert"
          />
        </div>
        {/* Logo Text */}
        <h1 className="text-3xl font-antonio font-bold tracking-wide text-foreground leading-none flex items-center gap-[1px]">
          R<span className="backward-e">E</span>VIVE
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="relative size-10 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Cambiar tema"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
        </button>

        {/* Profile Avatar */}
        <div className="relative size-10 rounded-full border border-black/15 dark:border-white/15 p-[2px] overflow-hidden bg-black/5 dark:bg-white/5">
          <Image
            src="/images/profile-christian.jpg"
            alt="Christian"
            width={40}
            height={40}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
