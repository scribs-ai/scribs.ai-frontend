import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scribs.ai',
  description: 'Login Setup',
}
const RootLayout = ({ children, }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='h-screen flex flex-col justify-center items-center'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;