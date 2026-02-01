import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import { Header } from '@/components/shared/header'
import { BottomTabs } from '@/components/shared/bottom-tabs'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'REVIVE - Personal Training App',
  description: 'App de gestión para entrenadores personales',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'REVIVE',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#12121A' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
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
            <BottomTabs />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
