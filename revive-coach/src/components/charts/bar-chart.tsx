'use client'

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
import { cn } from '@/lib/utils'

interface DataPoint {
  name: string
  value: number
  [key: string]: string | number
}

interface BarChartProps {
  data: DataPoint[]
  dataKey?: string
  xAxisKey?: string
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
  colorByValue?: boolean
  barRadius?: number
  className?: string
}

function getBarColor(value: number): string {
  if (value >= 80) return 'oklch(0.65 0.2 145)'
  if (value >= 60) return 'oklch(0.75 0.18 70)'
  return 'oklch(0.65 0.22 25)'
}

export function BarChartComponent({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  height = 200,
  showGrid = false,
  showTooltip = true,
  colorByValue = true,
  barRadius = 6,
  className
}: BarChartProps) {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
          )}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                boxShadow: 'var(--glass-shadow)'
              }}
              labelStyle={{ color: 'var(--foreground)' }}
              itemStyle={{ color: 'var(--muted-foreground)' }}
            />
          )}
          <Bar
            dataKey={dataKey}
            radius={[barRadius, barRadius, 0, 0]}
            maxBarSize={40}
          >
            {colorByValue && data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry[dataKey] as number)}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
