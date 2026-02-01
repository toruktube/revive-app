'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground leading-none flex items-center gap-[1px]">
          R<span className="backward-e">E</span>VIVE
        </h1>
      </div>

      {/* Profile Avatar */}
      <div className="relative size-10 rounded-full border border-white/20 dark:border-white/15 p-[2px] overflow-hidden bg-white/5">
        <div
          className="w-full h-full rounded-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150')" }}
        />
      </div>
    </header>
  )
}
