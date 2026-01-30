'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { ConversacionWhatsApp } from '@/types'

interface ConversacionListProps {
  conversaciones: ConversacionWhatsApp[]
  onSelect: (conv: ConversacionWhatsApp) => void
  activeId: string | null
  search: string
  onSearchChange: (value: string) => void
}

function getInitials(nombre: string, apellidos?: string): string {
  const first = nombre.charAt(0).toUpperCase()
  const last = apellidos ? apellidos.charAt(0).toUpperCase() : ''
  return first + last
}

function formatTimeDisplay(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 86400000)
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  if (messageDate.getTime() === today.getTime()) {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  if (messageDate.getTime() === yesterday.getTime()) {
    return 'Ayer'
  }

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
  })
}

function ConversacionItem({
  conversacion,
  isActive,
  onSelect,
  index,
}: {
  conversacion: ConversacionWhatsApp
  isActive: boolean
  onSelect: () => void
  index: number
}) {
  const initials = getInitials(conversacion.cliente_nombre, conversacion.cliente_apellidos)
  const displayName = conversacion.cliente_apellidos
    ? `${conversacion.cliente_nombre} ${conversacion.cliente_apellidos}`
    : conversacion.cliente_nombre

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      onClick={onSelect}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left',
        'hover:bg-muted/60',
        isActive
          ? 'bg-primary/10 border border-primary/20'
          : 'border border-transparent'
      )}
    >
      {/* Avatar */}
      <div className={cn(
        'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0',
        'bg-primary/15 text-primary font-semibold text-sm'
      )}>
        {initials}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            'font-medium text-sm truncate',
            conversacion.no_leidos > 0 ? 'text-foreground' : 'text-foreground/80'
          )}>
            {displayName}
          </span>
          <span className={cn(
            'text-[11px] flex-shrink-0',
            conversacion.no_leidos > 0 ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-muted-foreground'
          )}>
            {formatTimeDisplay(conversacion.ultimo_mensaje_hora)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className={cn(
            'text-xs truncate',
            conversacion.no_leidos > 0
              ? 'text-foreground/70 font-medium'
              : 'text-muted-foreground'
          )}>
            {conversacion.ultimo_mensaje}
          </p>
          {conversacion.no_leidos > 0 && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
              {conversacion.no_leidos}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

export function ConversacionList({
  conversaciones,
  onSelect,
  activeId,
  search,
  onSearchChange,
}: ConversacionListProps) {
  const sortedConversaciones = useMemo(() => {
    return [...conversaciones].sort(
      (a, b) => new Date(b.ultimo_mensaje_hora).getTime() - new Date(a.ultimo_mensaje_hora).getTime()
    )
  }, [conversaciones])

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-3 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar conversacion..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/50 border-transparent focus:border-primary h-9 text-sm"
          />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {sortedConversaciones.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                {search ? 'Sin resultados' : 'No hay conversaciones'}
              </p>
            </div>
          ) : (
            sortedConversaciones.map((conv, index) => (
              <ConversacionItem
                key={conv.id}
                conversacion={conv}
                isActive={activeId === conv.id}
                onSelect={() => onSelect(conv)}
                index={index}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
