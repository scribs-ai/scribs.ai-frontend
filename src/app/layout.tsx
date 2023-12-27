"use client"

import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import '../i18n'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children, }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  )
}

export default RootLayout;