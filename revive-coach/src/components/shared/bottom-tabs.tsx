'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, useSpring, useTransform } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Bell,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TabItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const tabs: TabItem[] = [
  { label: 'Inicio', href: '/', icon: LayoutDashboard },
  { label: 'Clientes', href: '/clientes', icon: Users },
  { label: 'Alertas', href: '/alertas', icon: Bell },
  { label: 'Ajustes', href: '/configuracion', icon: Settings },
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
    pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
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
        x.set(activeIndex * width)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [activeIndex, x])

  // Update position when active tab changes (not during drag)
  useEffect(() => {
    if (!isDragging && tabWidth > 0) {
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

    // Prevent page scrolling while swiping tabs
    e.preventDefault()

    const touch = e.touches[0]
    const deltaX = touch.clientX - startX
    const newX = currentX + deltaX

    // Clamp to valid range (no elastic bounds to prevent bounce)
    const minX = 0
    const maxX = tabWidth * (tabs.length - 1)
    const clampedX = Math.max(minX, Math.min(maxX, newX))

    x.set(clampedX)
  }, [isDragging, startX, currentX, tabWidth, x])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    const endX = x.get()

    // Calculate target based on final pill position (where finger released)
    // Round to nearest tab index
    let targetIndex = Math.round(endX / tabWidth)

    // Clamp to valid range
    targetIndex = Math.max(0, Math.min(tabs.length - 1, targetIndex))

    // Animate pill to target position
    x.set(targetIndex * tabWidth)

    // Navigate if tab changed
    if (targetIndex !== activeIndex) {
      router.push(tabs[targetIndex].href)
    }
  }, [isDragging, tabWidth, activeIndex, router, x])

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 z-50',
      'lg:hidden',
      'px-4 pb-8 pt-2'
    )}>
      {/* Liquid Glass container - fully transparent */}
      <div
        ref={containerRef}
        className={cn(
          'relative flex items-center justify-around',
          'rounded-full py-2 px-1.5',
          'bg-white/20 dark:bg-white/10',
          'border border-white/30 dark:border-white/20',
          'shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.4)]',
          'dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]'
        )}
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          touchAction: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding pill indicator - glass effect */}
        <motion.div
          className={cn(
            'absolute top-1.5 bottom-1.5 left-1.5',
            'rounded-full',
            'bg-white/60 dark:bg-white/20',
            'shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]',
            'dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]',
            'border border-white/50 dark:border-white/15',
            'pointer-events-none'
          )}
          style={{
            x,
            width: tabWidth > 0 ? tabWidth - 8 : '22%',
            scale: pillScale,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            willChange: 'transform',
          }}
        />

        {/* Tab buttons */}
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'relative z-10 flex flex-col items-center justify-center',
                'flex-1 py-2 px-1',
                'transition-colors duration-200'
              )}
              onClick={(e) => {
                // Prevent navigation if we just finished dragging
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
                    ? 'text-primary'
                    : 'text-foreground/50'
                )} />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.6,
                }}
                className={cn(
                  'text-[9px] font-medium mt-0.5',
                  'transition-all duration-200',
                  isActive
                    ? 'text-primary'
                    : 'text-foreground/70'
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
