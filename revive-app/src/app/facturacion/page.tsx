'use client'

import { useState, useMemo } from 'react'
import { CreditCard } from 'lucide-react'
import { ResumenMensualCard, TransaccionCard } from '@/components/facturacion'
import { FAB } from '@/components/shared/fab'
import { EmptyState } from '@/components/shared/empty-state'
import { cn } from '@/lib/utils'
import { mockTransacciones, mockResumenMensual } from '@/lib/mock-data'

type FiltroTipo = 'todos' | 'ingresos' | 'gastos' | 'pendientes'

export default function FacturacionPage() {
  const [filtro, setFiltro] = useState<FiltroTipo>('todos')

  const transaccionesFiltradas = useMemo(() => {
    return mockTransacciones.filter(t => {
      switch (filtro) {
        case 'ingresos':
          return t.tipo === 'ingreso'
        case 'gastos':
          return t.tipo === 'gasto'
        case 'pendientes':
          return t.estado === 'pendiente' || t.estado === 'vencido'
        default:
          return true
      }
    }).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  }, [filtro])

  const filtros: { value: FiltroTipo; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'ingresos', label: 'Ingresos' },
    { value: 'gastos', label: 'Gastos' },
    { value: 'pendientes', label: 'Pendientes' },
  ]

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 mb-4">
        <div>
          <h2 className="text-2xl font-antonio font-semibold tracking-wide text-foreground">PAGOS</h2>
          <p className="text-sm text-muted-foreground">
            {mockTransacciones.length} transacciones este mes
          </p>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="px-4">
        <ResumenMensualCard resumen={mockResumenMensual} />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar px-4">
        {filtros.map((f) => (
          <button
            key={f.value}
            onClick={() => setFiltro(f.value)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap',
              'border transition-all duration-200',
              filtro === f.value
                ? 'bg-white text-black border-white'
                : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-foreground'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transactions Header */}
      <div className="flex items-center justify-between mb-3 px-4">
        <h3 className="text-sm font-semibold text-foreground">Transacciones</h3>
        <span className="text-xs text-muted-foreground">
          {transaccionesFiltradas.length} {transaccionesFiltradas.length === 1 ? 'transacción' : 'transacciones'}
        </span>
      </div>

      {/* Transactions List */}
      {transaccionesFiltradas.length > 0 ? (
        <div className="space-y-3 px-4">
          {transaccionesFiltradas.map((transaccion, index) => (
            <TransaccionCard
              key={transaccion.id}
              transaccion={transaccion}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="px-4">
          <EmptyState
            icon={CreditCard}
            title="Sin transacciones"
            description="No hay transacciones que coincidan con el filtro seleccionado"
          />
        </div>
      )}

      {/* Spacer */}
      <div className="h-8" />

      {/* FAB */}
      <FAB onClick={() => console.log('Add new transaction')} />
    </div>
  )
}
