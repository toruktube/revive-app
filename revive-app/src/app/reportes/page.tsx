'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, BarChart3 } from 'lucide-react'
import { NotaSesionCard, AdherenciaChart, ResumenStats } from '@/components/reportes'
import { NotaSesionModal } from '@/components/agenda'
import { FAB } from '@/components/shared/fab'
import { EmptyState } from '@/components/shared/empty-state'
import { cn } from '@/lib/utils'
import { mockNotasSesion, mockReporteMensual, mockClientesAdherencia } from '@/lib/mock-data'

type TabType = 'notas' | 'reportes'

export default function ReportesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('notas')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tabs: { value: TabType; label: string; icon: React.ElementType }[] = [
    { value: 'notas', label: 'Notas Sesión', icon: FileText },
    { value: 'reportes', label: 'Reporte Mensual', icon: BarChart3 },
  ]

  return (
    <div className="flex flex-col px-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-4">
        <div>
          <h2 className="text-2xl font-antonio font-semibold tracking-wide text-foreground">REPORTES</h2>
          <p className="text-sm text-muted-foreground">
            {activeTab === 'notas'
              ? `${mockNotasSesion.length} notas recientes`
              : 'Resumen del mes'
            }
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 p-1 rounded-2xl bg-white/5 border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium',
              'transition-all duration-200',
              activeTab === tab.value
                ? 'bg-white text-black'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: activeTab === 'notas' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'notas' ? (
          mockNotasSesion.length > 0 ? (
            <div className="space-y-3">
              {mockNotasSesion.map((nota, index) => (
                <NotaSesionCard
                  key={nota.id}
                  nota={nota}
                  index={index}
                  onClick={() => console.log('Open note:', nota.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title="Sin notas"
              description="No hay notas de sesión registradas"
              action={{
                label: 'Crear nota',
                onClick: () => console.log('Create note')
              }}
            />
          )
        ) : (
          <div className="space-y-4">
            <ResumenStats reporte={mockReporteMensual} />
            <AdherenciaChart clientes={mockClientesAdherencia} />
          </div>
        )}
      </motion.div>

      {/* Spacer */}
      <div className="h-8" />

      {/* FAB - only for notes tab */}
      {activeTab === 'notas' && (
        <FAB onClick={() => setIsModalOpen(true)} />
      )}

      {/* Modal */}
      <NotaSesionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(notaData) => {
          console.log('New note:', notaData)
        }}
      />
    </div>
  )
}
