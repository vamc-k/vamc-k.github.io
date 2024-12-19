import * as React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import { NavBar } from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vamsi Krishna Kolli - Portfolio',
  description: 'Senior Platform Engineer | Full Stack Developer',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="vk-theme"
        >
          <div className="relative min-h-screen bg-background font-sans antialiased">
            <NavBar />
            <main className="relative">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
