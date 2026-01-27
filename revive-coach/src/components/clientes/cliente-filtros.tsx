'use client'

import { useState } from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassButton } from '@/components/glass/glass-button'
import { GlassCardStatic } from '@/components/glass/glass-card'
import { GlassBadge } from '@/components/glass/glass-badge'
import { cn } from '@/lib/utils'
import type { ClienteFilters } from '@/hooks/use-clientes'

interface ClienteFiltrosProps {
  filters: ClienteFilters
  onFiltersChange: (filters: ClienteFilters) => void
  stats: {
    total: number
    online: number
    presencial: number
    activos: number
  }
}

export function ClienteFiltros({ filters, onFiltersChange, stats }: ClienteFiltrosProps) {
  const [isOpen, setIsOpen] = useState(false)

  const activeFiltersCount = [
    filters.tipo && filters.tipo !== 'todos',
    filters.estado && filters.estado !== 'activo',
    filters.adherenciaMin !== undefined && filters.adherenciaMin > 0,
    filters.ordenar && filters.ordenar !== 'actualizado'
  ].filter(Boolean).length

  const handleReset = () => {
    onFiltersChange({
      tipo: 'todos',
      estado: 'activo',
      ordenar: 'actualizado',
      orden: 'desc',
      search: filters.search
    })
  }

  return (
    <div className="relative">
      <GlassButton
        variant="subtle"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          activeFiltersCount > 0 && 'ring-2 ring-primary/30'
        )}
      >
        <Filter className="w-4 h-4" />
        Filtros
        {activeFiltersCount > 0 && (
          <GlassBadge size="sm" variant="success" className="ml-1">
            {activeFiltersCount}
          </GlassBadge>
        )}
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </GlassButton>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 min-w-[320px]"
            >
              <GlassCardStatic className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Filtrar clientes</h4>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleReset}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Tipo de cliente */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Tipo de cliente
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 'todos', label: 'Todos', count: stats.total },
                      { value: 'online', label: 'Online', count: stats.online },
                      { value: 'presencial', label: 'Presencial', count: stats.presencial }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => onFiltersChange({ ...filters, tipo: option.value as ClienteFilters['tipo'] })}
                        className={cn(
                          'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all',
                          'border',
                          filters.tipo === option.value
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-muted/50 text-foreground border-transparent hover:border-border'
                        )}
                      >
                        {option.label}
                        <span className="ml-1 text-xs opacity-70">({option.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estado */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Estado
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 'activo', label: 'Activos' },
                      { value: 'en_pausa', label: 'En pausa' },
                      { value: 'finalizado', label: 'Finalizados' },
                      { value: 'todos', label: 'Todos' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => onFiltersChange({ ...filters, estado: option.value as ClienteFilters['estado'] })}
                        className={cn(
                          'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all',
                          'border',
                          filters.estado === option.value
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-muted/50 text-foreground border-transparent hover:border-border'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adherencia mínima */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Adherencia mínima: {filters.adherenciaMin || 0}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={filters.adherenciaMin || 0}
                    onChange={(e) => onFiltersChange({ ...filters, adherenciaMin: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Ordenar por */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Ordenar por
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'actualizado', label: 'Última actividad' },
                      { value: 'nombre', label: 'Nombre' },
                      { value: 'adherencia', label: 'Adherencia' },
                      { value: 'fecha', label: 'Fecha inicio' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => onFiltersChange({ ...filters, ordenar: option.value as ClienteFilters['ordenar'] })}
                        className={cn(
                          'py-2 px-3 rounded-lg text-sm font-medium transition-all',
                          'border text-left',
                          filters.ordenar === option.value
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-muted/50 text-foreground border-transparent hover:border-border'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orden */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onFiltersChange({ ...filters, orden: 'desc' })}
                    className={cn(
                      'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all border',
                      filters.orden === 'desc'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted/50 text-foreground border-transparent hover:border-border'
                    )}
                  >
                    Descendente
                  </button>
                  <button
                    onClick={() => onFiltersChange({ ...filters, orden: 'asc' })}
                    className={cn(
                      'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all border',
                      filters.orden === 'asc'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted/50 text-foreground border-transparent hover:border-border'
                    )}
                  >
                    Ascendente
                  </button>
                </div>
              </GlassCardStatic>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
