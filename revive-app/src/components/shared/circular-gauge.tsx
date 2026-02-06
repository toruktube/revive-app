'use client'

import { cn } from '@/lib/utils'

interface CircularGaugeProps {
  value: number // 0-100
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
  className?: string
}

export function CircularGauge({
  value,
  size = 'md',
  showLabel = false,
  label,
  className,
}: CircularGaugeProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value))

  // Size configurations
  const sizes = {
    sm: { width: 48, strokeWidth: 4, fontSize: 'text-sm', labelSize: 'text-[8px]' },
    md: { width: 64, strokeWidth: 5, fontSize: 'text-lg', labelSize: 'text-[9px]' },
    lg: { width: 80, strokeWidth: 6, fontSize: 'text-xl', labelSize: 'text-xs' },
  }

  const config = sizes[size]
  const radius = (config.width - config.strokeWidth) / 2
  const circumference = radius * Math.PI * 1.5 // 270 degrees (3/4 circle)
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference

  // Color based on value
  const getColor = () => {
    if (clampedValue >= 80) return 'var(--accent-emerald)'
    if (clampedValue >= 60) return 'var(--accent-blue)'
    if (clampedValue >= 40) return '#F59E0B' // amber
    return '#EF4444' // red
  }

  const getGradientId = () => `gauge-gradient-${Math.random().toString(36).substr(2, 9)}`
  const gradientId = getGradientId()

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={config.width}
        height={config.width}
        viewBox={`0 0 ${config.width} ${config.width}`}
        className="transform -rotate-[135deg]"
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="33%" stopColor="#F59E0B" />
            <stop offset="66%" stopColor="var(--accent-blue)" />
            <stop offset="100%" stopColor="var(--accent-emerald)" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          className="text-white/10"
        />

        {/* Progress arc */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${getColor()})`,
          }}
        />

      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-bold text-foreground', config.fontSize)}>
          {clampedValue}
          <span className="text-[0.6em] text-muted-foreground">%</span>
        </span>
        {showLabel && label && (
          <span className={cn('text-muted-foreground uppercase tracking-wider', config.labelSize)}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
