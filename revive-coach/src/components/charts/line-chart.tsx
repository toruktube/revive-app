'use client'

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { cn } from '@/lib/utils'

interface DataPoint {
  name: string
  value: number
  [key: string]: string | number
}

interface LineChartProps {
  data: DataPoint[]
  dataKey?: string
  xAxisKey?: string
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
  showArea?: boolean
  color?: string
  strokeWidth?: number
  className?: string
}

export function LineChartComponent({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  height = 200,
  showGrid = false,
  showTooltip = true,
  showArea = true,
  color = 'oklch(0.65 0.2 145)',
  strokeWidth = 2,
  className
}: LineChartProps) {
  const ChartComponent = showArea ? AreaChart : RechartsLineChart

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            domain={[0, 'auto']}
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
          {showArea ? (
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={strokeWidth}
              fill={color}
              fillOpacity={0.1}
            />
          ) : (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={strokeWidth}
              dot={{ fill: color, strokeWidth: 0, r: 4 }}
              activeDot={{ fill: color, strokeWidth: 2, stroke: 'var(--background)', r: 6 }}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  )
}
