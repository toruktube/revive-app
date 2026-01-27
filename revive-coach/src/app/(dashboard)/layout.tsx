'use client'

import { Sidebar } from '@/components/shared/sidebar'
import { Header } from '@/components/shared/header'
import { BottomTabs } from '@/components/shared/bottom-tabs'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mock alert count - will come from Supabase in production
  const alertCount = 5

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop only */}
      <Sidebar open={true} onClose={() => {}} />

      {/* Main content area */}
      <div className={cn(
        'transition-all duration-300',
        'lg:ml-64' // Sidebar width on desktop
      )}>
        {/* Header */}
        <Header alertCount={alertCount} />

        {/* Page content - add bottom padding for mobile tabs */}
        <main className="p-4 lg:p-6 pb-28 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Bottom Tabs - Mobile only */}
      <BottomTabs />
    </div>
  )
}
