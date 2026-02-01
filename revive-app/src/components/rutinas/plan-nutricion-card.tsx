'use client'

import { motion } from 'framer-motion'
import { Utensils, Flame, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/glass'
import type { PlanNutricion } from '@/types'

interface PlanNutricionCardProps {
  plan: PlanNutricion
  onClick?: () => void
  index?: number
}

export function PlanNutricionCard({ plan, onClick, index = 0 }: PlanNutricionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={cn(
        'group relative w-full glass-card rounded-2xl p-4',
        'hover:bg-white/5 transition-all duration-300',
        'border border-white/10',
        'cursor-pointer'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="size-12 rounded-xl bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/20 flex items-center justify-center shrink-0">
          <Utensils className="w-6 h-6 text-[var(--accent-emerald)]" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-foreground mb-1 truncate">
            {plan.nombre}
          </h4>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {plan.descripcion}
          </p>

          {/* Calories */}
          <div className="flex items-center gap-2">
            <Flame className="w-3 h-3 text-warning" />
            <span className="text-sm font-semibold text-foreground">
              {plan.calorias_totales.toLocaleString()} kcal
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
      </div>

      {/* Macros */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10">
        <div className="flex-1 text-center">
          <p className="text-lg font-bold text-[var(--accent-blue)]">{plan.proteinas_g}g</p>
          <p className="text-[10px] text-muted-foreground uppercase">Proteína</p>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex-1 text-center">
          <p className="text-lg font-bold text-warning">{plan.carbohidratos_g}g</p>
          <p className="text-[10px] text-muted-foreground uppercase">Carbos</p>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex-1 text-center">
          <p className="text-lg font-bold text-[var(--accent-violet)]">{plan.grasas_g}g</p>
          <p className="text-[10px] text-muted-foreground uppercase">Grasas</p>
        </div>
      </div>
    </motion.div>
  )
}
