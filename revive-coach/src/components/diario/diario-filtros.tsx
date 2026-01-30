'use client'

import { useMemo } from 'react'
import { Filter, X } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassButton } from '@/components/glass/glass-button'
import { GlassBadge } from '@/components/glass/glass-badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface DiarioFilters {
  clienteId?: string
  fechaDesde?: string
  fechaHasta?: string
  energiaMin?: number
}

interface DiarioFiltrosProps {
  filters: DiarioFilters
  setFilters: React.Dispatch<React.SetStateAction<DiarioFilters>>
}

const clientesSelect = [
  { id: '1', nombre: 'Maria Garcia' },
  { id: '2', nombre: 'Carlos Rodriguez' },
  { id: '3', nombre: 'Laura Martinez' },
  { id: '4', nombre: 'Pedro Lopez' },
  { id: '5', nombre: 'Ana Fernandez' },
  { id: '7', nombre: 'Sofia Diaz' },
  { id: '8', nombre: 'Miguel Herrera' },
]

export function DiarioFiltros({ filters, setFilters }: DiarioFiltrosProps) {
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.clienteId) count++
    if (filters.fechaDesde) count++
    if (filters.fechaHasta) count++
    if (filters.energiaMin) count++
    return count
  }, [filters])

  const resetFilters = () => {
    setFilters({})
  }

  return (
    <GlassCard hover={false} className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Filtros</span>
        {activeFilterCount > 0 && (
          <GlassBadge variant="success" size="sm">
            {activeFilterCount}
          </GlassBadge>
        )}
        {activeFilterCount > 0 && (
          <GlassButton
            variant="subtle"
            size="sm"
            onClick={resetFilters}
            className="ml-auto"
          >
            <X className="w-3 h-3" />
            Limpiar
          </GlassButton>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Client Filter */}
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Cliente</Label>
          <select
            value={filters.clienteId || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                clienteId: e.target.value || undefined,
              }))
            }
            className={cn(
              'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            )}
          >
            <option value="">Todos</option>
            {clientesSelect.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Date From */}
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Desde</Label>
          <Input
            type="date"
            value={filters.fechaDesde || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                fechaDesde: e.target.value || undefined,
              }))
            }
            className="bg-background"
          />
        </div>

        {/* Date To */}
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Hasta</Label>
          <Input
            type="date"
            value={filters.fechaHasta || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                fechaHasta: e.target.value || undefined,
              }))
            }
            className="bg-background"
          />
        </div>

        {/* Energy Minimum */}
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Energia minima</Label>
          <select
            value={filters.energiaMin || ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                energiaMin: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
            className={cn(
              'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            )}
          >
            <option value="">Todos</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </GlassCard>
  )
}
