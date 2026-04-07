import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Providers } from '@/components/Providers';
import CustomCursor from '@/components/CustomCursor';
import Grain from '@/components/Grain';
import ScrollProgress from '@/components/ScrollProgress';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://costeleta-dourada.vercel.app'),
  title: 'Costeleta Dourada | Sabor do Alentejo',
  description:
    'Restaurante tradicional Alentejano em Évora. Cozinha autêntica com pratos regionais, vinhos do Alentejo e ambiente acolhedor. Reservas: +351 266 123 456',
  keywords: [
    'restaurante',
    'Alentejo',
    'Évora',
    'comida tradicional',
    'costeleta',
    'cozinha portuguesa',
    'reservas',
  ],
  authors: [{ name: 'Costeleta Dourada' }],
  openGraph: {
    title: 'Costeleta Dourada | Sabor do Alentejo',
    description: 'Restaurante tradicional Alentejano em Évora. Cozinha autêntica desde 1985.',
    url: 'https://costeleta-dourada.vercel.app',
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
    canonical: 'https://costeleta-dourada.vercel.app',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#141009',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Costeleta Dourada',
  description: 'Restaurante tradicional Alentejano com cozinha autêntica desde 1985.',
  url: 'https://costeleta-dourada.vercel.app',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning={true}
      className={`${cormorantGaramond.variable} ${dmSans.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Grain />
        <CustomCursor />
        <Providers>
          <ScrollProgress />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
