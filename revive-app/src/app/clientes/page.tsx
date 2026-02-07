'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Users } from 'lucide-react'
import { ClienteCard, ClienteFiltros, ClienteModal, EnviarReporteModal } from '@/components/clientes'
import { FAB } from '@/components/shared/fab'
import { EmptyState } from '@/components/shared/empty-state'
import { mockClientes, mockSesiones, mockNotasSesion, mockRutinas, mockPlanesNutricion } from '@/lib/mock-data'
import type { ClienteConEstado } from '@/types'

export default function ClientesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [selectedClienteForReport, setSelectedClienteForReport] = useState<ClienteConEstado | null>(null)

  const handleSendReport = (cliente: ClienteConEstado) => {
    setSelectedClienteForReport(cliente)
    setIsReportModalOpen(true)
  }

  const clientesFiltrados = useMemo(() => {
    return mockClientes.filter(cliente => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = searchQuery === '' ||
        cliente.nombre.toLowerCase().includes(searchLower) ||
        cliente.apellidos?.toLowerCase().includes(searchLower) ||
        cliente.email?.toLowerCase().includes(searchLower)

      // Estado filter
      const matchesEstado = filtroEstado === 'todos' || cliente.estado === filtroEstado

      // Tipo filter
      const matchesTipo = filtroTipo === 'todos' || cliente.tipo === filtroTipo

      return matchesSearch && matchesEstado && matchesTipo
    })
  }, [searchQuery, filtroEstado, filtroTipo])

  const clientesActivos = mockClientes.filter(c => c.estado === 'activo').length

  return (
    <div className="flex flex-col px-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-4">
        <div>
          <h2 className="text-2xl font-antonio font-semibold tracking-wide text-foreground">CLIENTES</h2>
          <p className="text-sm text-muted-foreground">
            {clientesActivos} activos de {mockClientes.length} total
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <ClienteFiltros
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filtroEstado={filtroEstado}
          onFiltroEstadoChange={setFiltroEstado}
          filtroTipo={filtroTipo}
          onFiltroTipoChange={setFiltroTipo}
        />
      </div>

      {/* Clients List */}
      {clientesFiltrados.length > 0 ? (
        <div className="space-y-3">
          {clientesFiltrados.map((cliente, index) => (
            <ClienteCard
              key={cliente.id}
              cliente={cliente}
              index={index}
              onClick={() => router.push(`/clientes/${cliente.id}`)}
              onSendReport={() => handleSendReport(cliente)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="Sin resultados"
          description="No se encontraron clientes con los filtros seleccionados"
          action={{
            label: 'Limpiar filtros',
            onClick: () => {
              setSearchQuery('')
              setFiltroEstado('todos')
              setFiltroTipo('todos')
            }
          }}
        />
      )}

      {/* Spacer */}
      <div className="h-8" />

      {/* FAB */}
      <FAB onClick={() => setIsModalOpen(true)} />

      {/* Modal */}
      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(clienteData) => {
          console.log('New client:', clienteData)
        }}
      />

      {/* Report Modal */}
      {selectedClienteForReport && (
        <EnviarReporteModal
          isOpen={isReportModalOpen}
          onClose={() => {
            setIsReportModalOpen(false)
            setSelectedClienteForReport(null)
          }}
          cliente={selectedClienteForReport}
          sesiones={mockSesiones}
          notas={mockNotasSesion}
          rutinas={mockRutinas}
          planesNutricion={mockPlanesNutricion}
        />
      )}
    </div>
  )
}
