'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DialChartProps {
  value: number
  maxValue?: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
  sublabel?: string
  showPercentage?: boolean
  className?: string
}

function getColorByValue(value: number): string {
  if (value >= 80) return 'oklch(0.65 0.2 145)' // Green - success
  if (value >= 60) return 'oklch(0.75 0.18 70)' // Yellow - warning
  return 'oklch(0.65 0.22 25)' // Red - danger
}

function getColorClass(value: number): string {
  if (value >= 80) return 'text-success'
  if (value >= 60) return 'text-warning'
  return 'text-destructive'
}

export function DialChart({
  value,
  maxValue = 100,
  size = 'md',
  label,
  sublabel,
  showPercentage = true,
  className
}: DialChartProps) {
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100)
  const color = getColorByValue(percentage)
  const colorClass = getColorClass(percentage)

  const data = [
    { name: 'value', value: percentage },
    { name: 'empty', value: 100 - percentage }
  ]

  const sizes = {
    sm: { width: 100, height: 100, innerRadius: 32, outerRadius: 42, textSize: 'text-lg' },
    md: { width: 140, height: 140, innerRadius: 45, outerRadius: 58, textSize: 'text-2xl' },
    lg: { width: 180, height: 180, innerRadius: 60, outerRadius: 78, textSize: 'text-3xl' }
  }

  const sizeConfig = sizes[size]

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div
        className="relative"
        style={{ width: sizeConfig.width, height: sizeConfig.height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={sizeConfig.innerRadius}
              outerRadius={sizeConfig.outerRadius}
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="var(--muted)" opacity={0.3} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showPercentage && (
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={cn('font-bold', sizeConfig.textSize, colorClass)}
            >
              {Math.round(percentage)}%
            </motion.span>
          )}
        </div>
      </div>

      {/* Labels */}
      {(label || sublabel) && (
        <div className="mt-2 text-center">
          {label && (
            <p className="text-sm font-medium text-foreground">{label}</p>
          )}
          {sublabel && (
            <p className="text-xs text-muted-foreground">{sublabel}</p>
          )}
        </div>
      )}
    </div>
  )
}

// Mini dial for lists
export function MiniDial({ value, className }: { value: number; className?: string }) {
  const color = getColorByValue(value)

  const data = [
    { name: 'value', value },
    { name: 'empty', value: 100 - value }
  ]

  return (
    <div className={cn('relative w-8 h-8', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={10}
            outerRadius={14}
            paddingAngle={0}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill={color} />
            <Cell fill="var(--muted)" opacity={0.3} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
