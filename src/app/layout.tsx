import type { Metadata } from 'next'
import { Cinzel, Inter } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Costeleta Dourada | Sabor do Alentejo',
  description: 'Restaurante tradicional Alentejano com um toque moderno. Venha provar as nossas especialidades.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={clsx(cinzel.variable, inter.variable)}>{children}</body>
    </html>
  )
}
