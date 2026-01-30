'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/glass'
import { GlassBadge } from '@/components/glass/glass-badge'
import { ConversacionList } from '@/components/mensajes/conversacion-list'
import { ConversacionChat } from '@/components/mensajes/conversacion-chat'
import { useMensajes } from '@/hooks'
import type { ConversacionWhatsApp } from '@/types'

type MobileView = 'list' | 'chat'

export default function MensajesPage() {
  const {
    filteredConversaciones,
    plantillas,
    search,
    setSearch,
    conversacionActiva,
    setConversacionActiva,
    enviarMensaje,
    totalNoLeidos,
  } = useMensajes()

  const [mobileView, setMobileView] = useState<MobileView>('list')

  const handleSelectConversacion = useCallback((conv: ConversacionWhatsApp) => {
    setConversacionActiva(conv)
    setMobileView('chat')
  }, [setConversacionActiva])

  const handleBack = useCallback(() => {
    setMobileView('list')
    setConversacionActiva(null)
  }, [setConversacionActiva])

  const handleSendMessage = useCallback((conversacionId: string, contenido: string) => {
    enviarMensaje(conversacionId, contenido)
  }, [enviarMensaje])

  const handleSelectPlantilla = useCallback((_contenido: string) => {
    // The plantilla content is handled in ConversacionChat
    // which sets it as input value
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 lg:space-y-6"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">Mensajes</h2>
          {totalNoLeidos > 0 && (
            <GlassBadge variant="success" size="sm">
              {totalNoLeidos} sin leer
            </GlassBadge>
          )}
        </div>
      </div>

      {/* Main Content */}
      <GlassCard
        hover={false}
        className={cn(
          'p-0 overflow-hidden',
          'h-[calc(100vh-12rem)] lg:h-[calc(100vh-11rem)]'
        )}
      >
        {/* DESKTOP Layout: Split view */}
        <div className="hidden lg:flex h-full">
          {/* Left Panel - Conversation List */}
          <div className="w-[340px] xl:w-[380px] border-r border-border/50 flex-shrink-0">
            <ConversacionList
              conversaciones={filteredConversaciones}
              onSelect={handleSelectConversacion}
              activeId={conversacionActiva?.id ?? null}
              search={search}
              onSearchChange={setSearch}
            />
          </div>

          {/* Right Panel - Chat */}
          <div className="flex-1 min-w-0">
            <ConversacionChat
              conversacion={conversacionActiva}
              onSendMessage={handleSendMessage}
              onBack={handleBack}
              plantillas={plantillas}
              onSelectPlantilla={handleSelectPlantilla}
            />
          </div>
        </div>

        {/* MOBILE Layout: View switching */}
        <div className="lg:hidden h-full">
          <AnimatePresence mode="wait">
            {mobileView === 'list' ? (
              <motion.div
                key="mobile-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ConversacionList
                  conversaciones={filteredConversaciones}
                  onSelect={handleSelectConversacion}
                  activeId={conversacionActiva?.id ?? null}
                  search={search}
                  onSearchChange={setSearch}
                />
              </motion.div>
            ) : (
              <motion.div
                key="mobile-chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ConversacionChat
                  conversacion={conversacionActiva}
                  onSendMessage={handleSendMessage}
                  onBack={handleBack}
                  plantillas={plantillas}
                  onSelectPlantilla={handleSelectPlantilla}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </motion.div>
  )
}
