'use client'

import { useState, useMemo } from 'react'
import { mockPagos } from '@/lib/mock-data'
import type { Pago, EstadoPago } from '@/types'

interface PagosFilters {
  clienteId?: string
  estado?: EstadoPago | 'todos'
}

interface UsePagosResult {
  pagos: Pago[]
  filteredPagos: Pago[]
  filters: PagosFilters
  setFilters: React.Dispatch<React.SetStateAction<PagosFilters>>
  registrarPago: (pago: Omit<Pago, 'id'>) => void
  resumen: {
    totalCobrado: number
    totalPendiente: number
    totalVencido: number
    cantidadPagados: number
    cantidadPendientes: number
    cantidadVencidos: number
  }
  pagosCliente: (clienteId: string) => Pago[]
}

export function usePagos(): UsePagosResult {
  const [pagos, setPagos] = useState<Pago[]>(mockPagos)
  const [filters, setFilters] = useState<PagosFilters>({ estado: 'todos' })

  const filteredPagos = useMemo(() => {
    let result = [...pagos]

    if (filters.clienteId) {
      result = result.filter(p => p.cliente_id === filters.clienteId)
    }

    if (filters.estado && filters.estado !== 'todos') {
      result = result.filter(p => p.estado === filters.estado)
    }

    return result.sort((a, b) => new Date(b.fecha_emision).getTime() - new Date(a.fecha_emision).getTime())
  }, [pagos, filters])

  const registrarPago = (pago: Omit<Pago, 'id'>) => {
    const nuevoPago: Pago = {
      ...pago,
      id: `p-${Date.now()}`,
    }
    setPagos(prev => [nuevoPago, ...prev])
  }

  const resumen = useMemo(() => {
    const pagados = pagos.filter(p => p.estado === 'pagado')
    const pendientes = pagos.filter(p => p.estado === 'pendiente')
    const vencidos = pagos.filter(p => p.estado === 'vencido')

    return {
      totalCobrado: pagados.reduce((sum, p) => sum + p.monto, 0),
      totalPendiente: pendientes.reduce((sum, p) => sum + p.monto, 0),
      totalVencido: vencidos.reduce((sum, p) => sum + p.monto, 0),
      cantidadPagados: pagados.length,
      cantidadPendientes: pendientes.length,
      cantidadVencidos: vencidos.length,
    }
  }, [pagos])

  const pagosCliente = (clienteId: string) => {
    return pagos
      .filter(p => p.cliente_id === clienteId)
      .sort((a, b) => new Date(b.fecha_emision).getTime() - new Date(a.fecha_emision).getTime())
  }

  return {
    pagos,
    filteredPagos,
    filters,
    setFilters,
    registrarPago,
    resumen,
    pagosCliente,
  }
}
