import type { Metadata, Viewport } from 'next'
import { Saira_Condensed, Antonio } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import { AppShell } from '@/components/shared/app-shell'
import './globals.css'

const sairaCondensed = Saira_Condensed({
  variable: '--font-saira',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const antonio = Antonio({
  variable: '--font-antonio',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
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
      <body className={`${sairaCondensed.variable} ${antonio.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
