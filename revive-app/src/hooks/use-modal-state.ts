'use client'

import { useEffect } from 'react'
import { useModal } from '@/providers/modal-provider'
import { useLockBodyScroll } from './use-lock-body-scroll'

export function useModalState(isOpen: boolean) {
  const { openModal, closeModal } = useModal()

  useLockBodyScroll(isOpen)

  useEffect(() => {
    if (isOpen) {
      openModal()
    } else {
      closeModal()
    }
  }, [isOpen, openModal, closeModal])
}
