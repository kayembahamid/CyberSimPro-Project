import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CyberSim Pro | Professional Cybersecurity Training Platform',
  description: 'Secure everything your code depends on. Expose, prioritize, and fix supply-chain risk without slowing your security teams.',
  keywords: ['cybersecurity', 'training', 'security', 'simulation', 'compliance'],
  authors: [{ name: 'CyberSim Pro' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cybersimpro.com',
    title: 'CyberSim Pro | Professional Cybersecurity Training Platform',
    description: 'Secure everything your code depends on. Expose, prioritize, and fix supply-chain risk without slowing your security teams.',
    siteName: 'CyberSim Pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberSim Pro | Professional Cybersecurity Training Platform',
    description: 'Secure everything your code depends on. Expose, prioritize, and fix supply-chain risk without slowing your security teams.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={cn(inter.className, 'antialiased')}>
        {children}
      </body>
    </html>
  )
}
