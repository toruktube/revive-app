'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, CreditCard } from 'lucide-react'
import { GlassButton } from '@/components/glass/glass-button'
import { PagosResumen } from '@/components/pagos/pagos-resumen'
import { HistorialPagos } from '@/components/pagos/historial-pagos'
import { NuevoPagoForm } from '@/components/pagos/nuevo-pago-form'
import { usePagos } from '@/hooks/use-pagos'
import { useCliente } from '@/hooks/use-cliente'

export default function ClientePagosPage() {
  const params = useParams()
  const clienteId = params.id as string
  const { cliente } = useCliente(clienteId)
  const { pagosCliente, resumen } = usePagos()
  const [showNuevoPago, setShowNuevoPago] = useState(false)

  const pagos = useMemo(() => pagosCliente(clienteId), [pagosCliente, clienteId])

  // Calculate client-specific resumen
  const clienteResumen = useMemo(() => {
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

  const clienteNombre = cliente
    ? `${cliente.nombre}${cliente.apellidos ? ` ${cliente.apellidos}` : ''}`
    : 'Cliente'

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Pagos</h2>
            <p className="text-sm text-muted-foreground">
              Historial de pagos de {clienteNombre}
            </p>
          </div>
        </div>
        <GlassButton
          variant="primary"
          size="sm"
          onClick={() => setShowNuevoPago(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Registrar Pago</span>
        </GlassButton>
      </motion.div>

      {/* Resumen */}
      <PagosResumen resumen={clienteResumen} />

      {/* Historial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-base font-semibold text-foreground mb-3">Historial de pagos</h3>
        <HistorialPagos pagos={pagos} />
      </motion.div>

      {/* Nuevo Pago Modal */}
      <NuevoPagoForm
        open={showNuevoPago}
        onClose={() => setShowNuevoPago(false)}
        clienteId={clienteId}
        clienteNombre={clienteNombre}
      />
    </div>
  )
}
