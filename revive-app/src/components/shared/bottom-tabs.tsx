'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, useSpring, useTransform } from 'framer-motion'
import {
  Calendar,
  Users,
  CreditCard,
  Dumbbell,
  MessageCircle,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TabItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const tabs: TabItem[] = [
  { label: 'Agenda', href: '/agenda', icon: Calendar },
  { label: 'Clientes', href: '/clientes', icon: Users },
  { label: 'Pagos', href: '/facturacion', icon: CreditCard },
  { label: 'Rutinas', href: '/rutinas', icon: Dumbbell },
  { label: 'Mensajes', href: '/mensajes', icon: MessageCircle },
  { label: 'Reportes', href: '/reportes', icon: BarChart3 },
]

export function BottomTabs() {
  const pathname = usePathname()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [tabWidth, setTabWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)

  // Find active tab index
  const activeIndex = tabs.findIndex(tab =>
    pathname === tab.href || pathname.startsWith(tab.href + '/')
  )

  // Spring animation for smooth movement
  const springConfig = { stiffness: 400, damping: 30, mass: 1 }
  const x = useSpring(activeIndex * tabWidth, springConfig)

  const pillScale = useTransform(
    x,
    [0, tabWidth * (tabs.length - 1)],
    [1, 1]
  )

  // Calculate tab width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth / tabs.length
        setTabWidth(width)
        x.set(activeIndex >= 0 ? activeIndex * width : 0)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [activeIndex, x])

  // Update position when active tab changes (not during drag)
  useEffect(() => {
    if (!isDragging && tabWidth > 0 && activeIndex >= 0) {
      x.set(activeIndex * tabWidth)
    }
  }, [activeIndex, tabWidth, isDragging, x])

  // Touch handlers for iOS Safari
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    setStartX(touch.clientX)
    setCurrentX(x.get())
    setIsDragging(true)
  }, [x])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const touch = e.touches[0]
    const deltaX = touch.clientX - startX
    const newX = currentX + deltaX

    const minX = 0
    const maxX = tabWidth * (tabs.length - 1)
    const clampedX = Math.max(minX, Math.min(maxX, newX))

    x.set(clampedX)
  }, [isDragging, startX, currentX, tabWidth, x])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    const endX = x.get()
    let targetIndex = Math.round(endX / tabWidth)
    targetIndex = Math.max(0, Math.min(tabs.length - 1, targetIndex))

    x.set(targetIndex * tabWidth)

    if (targetIndex !== activeIndex) {
      router.push(tabs[targetIndex].href)
    }
  }, [isDragging, tabWidth, activeIndex, router, x])

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 z-50',
      'px-4 pb-6 pt-2'
    )}>
      {/* Glass container */}
      <div
        ref={containerRef}
        className={cn(
          'relative flex items-center justify-around',
          'glass-card rounded-3xl py-2 px-1',
          'border border-white/10'
        )}
        style={{
          touchAction: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding pill indicator */}
        {activeIndex >= 0 && (
          <motion.div
            className={cn(
              'absolute top-1.5 bottom-1.5 left-1',
              'rounded-2xl',
              'bg-white/20 dark:bg-white/10',
              'border border-white/30 dark:border-white/15',
              'pointer-events-none'
            )}
            style={{
              x,
              width: tabWidth > 0 ? tabWidth - 8 : '14%',
              scale: pillScale,
              willChange: 'transform',
            }}
          />
        )}

        {/* Tab buttons */}
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'relative z-10 flex flex-col items-center justify-center',
                'flex-1 py-2 px-0.5',
                'transition-colors duration-200'
              )}
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault()
                }
              }}
            >
              {/* Icon */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }}
              >
                <tab.icon className={cn(
                  'w-5 h-5 transition-all duration-200',
                  isActive
                    ? 'text-foreground drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]'
                    : 'text-muted-foreground'
                )} />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.6,
                }}
                className={cn(
                  'text-[9px] font-bold mt-0.5 uppercase tracking-wider',
                  'transition-all duration-200',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {tab.label}
              </motion.span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
