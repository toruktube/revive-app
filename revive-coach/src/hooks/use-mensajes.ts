'use client'

import { useState, useMemo } from 'react'
import { mockConversaciones, mockPlantillas } from '@/lib/mock-data'
import type { ConversacionWhatsApp, PlantillaMensaje, MensajeWhatsApp } from '@/types'

interface UseMensajesResult {
  conversaciones: ConversacionWhatsApp[]
  filteredConversaciones: ConversacionWhatsApp[]
  plantillas: PlantillaMensaje[]
  search: string
  setSearch: (search: string) => void
  conversacionActiva: ConversacionWhatsApp | null
  setConversacionActiva: (conv: ConversacionWhatsApp | null) => void
  enviarMensaje: (conversacionId: string, contenido: string) => void
  totalNoLeidos: number
}

export function useMensajes(): UseMensajesResult {
  const [conversaciones, setConversaciones] = useState<ConversacionWhatsApp[]>(mockConversaciones)
  const [search, setSearch] = useState('')
  const [conversacionActiva, setConversacionActiva] = useState<ConversacionWhatsApp | null>(null)
  const plantillas = mockPlantillas

  const filteredConversaciones = useMemo(() => {
    if (!search) return conversaciones

    const searchLower = search.toLowerCase()
    return conversaciones.filter(c =>
      c.cliente_nombre.toLowerCase().includes(searchLower) ||
      (c.cliente_apellidos && c.cliente_apellidos.toLowerCase().includes(searchLower)) ||
      c.ultimo_mensaje.toLowerCase().includes(searchLower)
    )
  }, [conversaciones, search])

  const enviarMensaje = (conversacionId: string, contenido: string) => {
    const nuevoMensaje: MensajeWhatsApp = {
      id: `m-${Date.now()}`,
      conversacion_id: conversacionId,
      contenido,
      direccion: 'enviado',
      estado: 'enviado',
      hora: new Date().toISOString(),
    }

    setConversaciones(prev => prev.map(conv => {
      if (conv.id === conversacionId) {
        const updated = {
          ...conv,
          mensajes: [...conv.mensajes, nuevoMensaje],
          ultimo_mensaje: contenido,
          ultimo_mensaje_hora: nuevoMensaje.hora,
        }
        // Also update active conversation if it's the same
        if (conversacionActiva?.id === conversacionId) {
          setConversacionActiva(updated)
        }
        return updated
      }
      return conv
    }))
  }

  const totalNoLeidos = useMemo(() =>
    conversaciones.reduce((sum, c) => sum + c.no_leidos, 0),
    [conversaciones]
  )

  return {
    conversaciones,
    filteredConversaciones,
    plantillas,
    search,
    setSearch,
    conversacionActiva,
    setConversacionActiva,
    enviarMensaje,
    totalNoLeidos,
  }
}
