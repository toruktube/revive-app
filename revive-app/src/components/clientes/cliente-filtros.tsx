'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ClienteFiltrosProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filtroEstado: string
  onFiltroEstadoChange: (estado: string) => void
  filtroTipo: string
  onFiltroTipoChange: (tipo: string) => void
}

export function ClienteFiltros({
  searchQuery,
  onSearchChange,
  filtroEstado,
  onFiltroEstadoChange,
  filtroTipo,
  onFiltroTipoChange,
}: ClienteFiltrosProps) {
  const estadoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'activo', label: 'Activos' },
    { value: 'inactivo', label: 'Inactivos' },
    { value: 'en_pausa', label: 'En pausa' },
  ]

  const tipoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'presencial', label: 'Presencial' },
    { value: 'online', label: 'Online' },
  ]

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            'w-full pl-10 pr-4 py-2.5 rounded-xl',
            'bg-white/5 border border-white/10',
            'text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:border-white/30',
            'transition-colors'
          )}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {/* Estado Filter */}
        <div className="flex gap-1">
          {estadoOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFiltroEstadoChange(option.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap',
                'border transition-all duration-200',
                filtroEstado === option.value
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-foreground'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="w-px bg-white/10 mx-1" />

        {/* Tipo Filter */}
        <div className="flex gap-1">
          {tipoOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFiltroTipoChange(option.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap',
                'border transition-all duration-200',
                filtroTipo === option.value
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-foreground'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
