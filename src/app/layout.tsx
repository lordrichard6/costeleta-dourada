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
  metadataBase: new URL('https://costeletadourada.pt'),
  title: 'Costeleta Dourada | Sabor do Alentejo',
  description: 'Restaurante tradicional Alentejano em Évora. Cozinha autêntica com pratos regionais, vinhos do Alentejo e ambiente acolhedor. Reservas: +351 266 123 456',
  keywords: ['restaurante', 'Alentejo', 'Évora', 'comida tradicional', 'costeleta', 'cozinha portuguesa', 'reservas'],
  authors: [{ name: 'Costeleta Dourada' }],
  openGraph: {
    title: 'Costeleta Dourada | Sabor do Alentejo',
    description: 'Restaurante tradicional Alentejano em Évora. Cozinha autêntica desde 1985.',
    url: 'https://costeletadourada.pt',
    siteName: 'Costeleta Dourada',
    locale: 'pt_PT',
    type: 'website',
    images: [
      {
        url: '/images/hero_bg.webp',
        width: 1200,
        height: 630,
        alt: 'Costeleta Dourada - Restaurante Alentejano',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Costeleta Dourada | Sabor do Alentejo',
    description: 'Restaurante tradicional Alentejano em Évora. Cozinha autêntica desde 1985.',
    images: ['/images/hero_bg.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://costeletadourada.pt',
  },
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Costeleta Dourada',
  description: 'Restaurante tradicional Alentejano com cozinha autêntica desde 1985.',
  url: 'https://costeletadourada.pt',
  telephone: '+351 266 123 456',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Praça do Giraldo 5',
    addressLocality: 'Évora',
    addressRegion: 'Alentejo',
    postalCode: '7000-508',
    addressCountry: 'PT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.5719,
    longitude: -7.9097,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '12:00',
      closes: '15:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '19:00',
      closes: '22:30',
    },
  ],
  servesCuisine: ['Portuguese', 'Alentejana'],
  priceRange: '€€',
  image: '/images/hero_bg.webp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={clsx(cinzel.variable, inter.variable)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
