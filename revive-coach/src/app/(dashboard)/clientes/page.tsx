'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Users, RefreshCw } from 'lucide-react'
import { GlassCard } from '@/components/glass'
import { GlassButton } from '@/components/glass/glass-button'
import { Input } from '@/components/ui/input'
import { ClienteCard, ClienteCardSkeleton, ClienteFiltros } from '@/components/clientes'
import { useClientes } from '@/hooks'

export default function ClientesPage() {
  const { filteredClientes, isLoading, error, refetch, filters, setFilters, stats } = useClientes()
  const [searchValue, setSearchValue] = useState('')

  // Debounce search
  const handleSearch = (value: string) => {
    setSearchValue(value)
    // Update filters with debounced search
    const timeoutId = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: value }))
    }, 300)
    return () => clearTimeout(timeoutId)
  }

  // Stats display
  const statsDisplay = useMemo(() => {
    const activos = filteredClientes.filter(c => c.estado === 'activo').length
    const alerta = filteredClientes.filter(c => (c.alertasActivas || 0) > 0).length
    return { activos, alerta, total: filteredClientes.length }
  }, [filteredClientes])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Clientes</h2>
          <p className="text-muted-foreground mt-1">
            {statsDisplay.total} cliente{statsDisplay.total !== 1 ? 's' : ''}
            {filters.tipo !== 'todos' && ` ${filters.tipo}`}
            {statsDisplay.alerta > 0 && (
              <span className="text-destructive ml-2">
                ({statsDisplay.alerta} con alertas)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GlassButton variant="subtle" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4" />
          </GlassButton>
          <GlassButton variant="primary">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo cliente</span>
          </GlassButton>
        </div>
      </div>

      {/* Stats Cards - Mobile */}
      <div className="grid grid-cols-3 gap-3 sm:hidden">
        <GlassCard hover={false} className="p-3 text-center">
          <p className="text-2xl font-bold text-primary">{stats.activos}</p>
          <p className="text-xs text-muted-foreground">Activos</p>
        </GlassCard>
        <GlassCard hover={false} className="p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{stats.online}</p>
          <p className="text-xs text-muted-foreground">Online</p>
        </GlassCard>
        <GlassCard hover={false} className="p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{stats.presencial}</p>
          <p className="text-xs text-muted-foreground">Presencial</p>
        </GlassCard>
      </div>

      {/* Search and Filters */}
      <GlassCard hover={false} className="p-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nombre, email..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-muted/50 border-transparent focus:border-primary"
            />
          </div>
          <ClienteFiltros
            filters={filters}
            onFiltersChange={setFilters}
            stats={stats}
          />
        </div>
      </GlassCard>

      {/* Error State */}
      {error && (
        <GlassCard hover={false} className="p-6 text-center">
          <p className="text-destructive mb-4">{error.message}</p>
          <GlassButton variant="subtle" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4" />
            Reintentar
          </GlassButton>
        </GlassCard>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <ClienteCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredClientes.length === 0 && (
        <GlassCard hover={false} className="p-12 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No se encontraron clientes
          </h3>
          <p className="text-muted-foreground mb-4">
            {filters.search
              ? `No hay resultados para "${filters.search}"`
              : 'Ajusta los filtros o añade un nuevo cliente'}
          </p>
          <GlassButton variant="primary">
            <Plus className="w-4 h-4" />
            Añadir primer cliente
          </GlassButton>
        </GlassCard>
      )}

      {/* Clients Grid */}
      {!isLoading && !error && filteredClientes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredClientes.map((cliente, index) => (
            <ClienteCard key={cliente.id} cliente={cliente} index={index} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
