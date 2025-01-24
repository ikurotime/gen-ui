import './globals.css'

import { Geist, Geist_Mono } from 'next/font/google'

import type { Metadata } from 'next'
import React from 'react'
import { ReactScan } from './react-scan'

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:text-white`}
      >
        <ReactScan />
        {children}
      </body>
    </html>
  )
}
