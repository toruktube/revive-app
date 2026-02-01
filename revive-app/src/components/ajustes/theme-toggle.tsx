'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const options = [
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Oscuro', icon: Moon },
    { value: 'system', label: 'Sistema', icon: Monitor },
  ]

  return (
    <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium',
            'transition-all duration-200',
            theme === option.value
              ? 'bg-white text-black'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <option.icon className="w-4 h-4" />
          {option.label}
        </button>
      ))}
    </div>
  )
}
