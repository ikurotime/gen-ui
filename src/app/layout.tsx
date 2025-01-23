import './globals.css'

import { Geist, Geist_Mono } from 'next/font/google'

import type { Metadata } from 'next'
import { Providers } from '@/components/Providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Gen UI',
  description: 'A Generative UI test built with Next.js'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <script src='https://unpkg.com/react-scan/dist/auto.global.js' async />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
