'use client'

import { ReactNode } from 'react'
import { Header } from './header'
import { BottomTabs } from './bottom-tabs'
import { ModalProvider, useModal } from '@/providers/modal-provider'

function AppShellContent({ children }: { children: ReactNode }) {
  const { isModalOpen } = useModal()

  return (
    <>
      {/* Ambient lighting effects */}
      <div className="dark:block hidden">
        <div className="ambient-light ambient-light-top" />
        <div className="ambient-light ambient-light-bottom" />
      </div>

      {/* Rhino watermark */}
      <div className="fixed top-[35%] left-0 w-full h-full pointer-events-none z-0 opacity-100 mix-blend-overlay dark:block hidden">
        <div className="rhino-watermark" />
      </div>

      {/* Main app container */}
      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
          {children}
        </main>
        {!isModalOpen && <BottomTabs />}
      </div>
    </>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <AppShellContent>{children}</AppShellContent>
    </ModalProvider>
  )
}
