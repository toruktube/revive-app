'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, Search } from 'lucide-react'
import { ConversacionItem } from '@/components/mensajes'
import { FAB } from '@/components/shared/fab'
import { EmptyState } from '@/components/shared/empty-state'
import { cn } from '@/lib/utils'
import { mockConversaciones } from '@/lib/mock-data'

export default function MensajesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const conversacionesFiltradas = useMemo(() => {
    if (!searchQuery) return mockConversaciones

    const query = searchQuery.toLowerCase()
    return mockConversaciones.filter(c =>
      c.cliente_nombre.toLowerCase().includes(query) ||
      c.cliente_apellidos?.toLowerCase().includes(query) ||
      c.ultimo_mensaje.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const totalNoLeidos = mockConversaciones.reduce((acc, c) => acc + c.no_leidos, 0)

  return (
    <div className="flex flex-col px-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-4">
        <div>
          <h2 className="text-2xl font-antonio font-semibold tracking-wide text-foreground">MENSAJES</h2>
          <p className="text-sm text-muted-foreground">
            {totalNoLeidos > 0 ? `${totalNoLeidos} sin leer` : 'Todo al día'}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar conversación..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            'w-full pl-10 pr-4 py-2.5 rounded-xl',
            'bg-white/5 border border-white/10',
            'text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:border-white/30',
            'transition-colors'
          )}
        />
      </div>

      {/* Conversations List */}
      {conversacionesFiltradas.length > 0 ? (
        <div className="space-y-3">
          {conversacionesFiltradas.map((conversacion, index) => (
            <ConversacionItem
              key={conversacion.id}
              conversacion={conversacion}
              index={index}
              onClick={() => router.push(`/mensajes/${conversacion.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={MessageCircle}
          title="Sin conversaciones"
          description={searchQuery ? 'No se encontraron conversaciones' : 'No hay conversaciones aún'}
        />
      )}

      {/* Spacer */}
      <div className="h-8" />

      {/* FAB */}
      <FAB onClick={() => console.log('New message')} />
    </div>
  )
}
