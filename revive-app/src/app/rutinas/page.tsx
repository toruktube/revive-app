'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Dumbbell, Utensils } from 'lucide-react'
import { RutinaCard, PlanNutricionCard } from '@/components/rutinas'
import { FAB } from '@/components/shared/fab'
import { EmptyState } from '@/components/shared/empty-state'
import { cn } from '@/lib/utils'
import { mockRutinas, mockPlanesNutricion } from '@/lib/mock-data'

type TabType = 'entrenamiento' | 'nutricion'

export default function RutinasPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('entrenamiento')

  const tabs: { value: TabType; label: string; icon: React.ElementType }[] = [
    { value: 'entrenamiento', label: 'Entrenamiento', icon: Dumbbell },
    { value: 'nutricion', label: 'Nutrición', icon: Utensils },
  ]

  return (
    <div className="flex flex-col px-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-4">
        <div>
          <h2 className="text-2xl font-antonio font-semibold tracking-wide text-foreground">RUTINAS</h2>
          <p className="text-sm text-muted-foreground">
            {activeTab === 'entrenamiento'
              ? `${mockRutinas.length} rutinas de entrenamiento`
              : `${mockPlanesNutricion.length} planes de nutrición`
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
        initial={{ opacity: 0, x: activeTab === 'entrenamiento' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'entrenamiento' ? (
          mockRutinas.length > 0 ? (
            <div className="space-y-3">
              {mockRutinas.map((rutina, index) => (
                <RutinaCard
                  key={rutina.id}
                  rutina={rutina}
                  index={index}
                  onClick={() => router.push(`/rutinas/${rutina.id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Dumbbell}
              title="Sin rutinas"
              description="No hay rutinas de entrenamiento creadas"
              action={{
                label: 'Crear rutina',
                onClick: () => console.log('Create routine')
              }}
            />
          )
        ) : (
          mockPlanesNutricion.length > 0 ? (
            <div className="space-y-3">
              {mockPlanesNutricion.map((plan, index) => (
                <PlanNutricionCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  onClick={() => console.log('Open nutrition plan:', plan.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Utensils}
              title="Sin planes"
              description="No hay planes de nutrición creados"
              action={{
                label: 'Crear plan',
                onClick: () => console.log('Create nutrition plan')
              }}
            />
          )
        )}
      </motion.div>

      {/* Spacer */}
      <div className="h-8" />

      {/* FAB */}
      <FAB onClick={() => console.log('Add new routine/plan')} />
    </div>
  )
}
