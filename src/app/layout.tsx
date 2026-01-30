import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://qrcode.de'),
  title: {
    default: 'Kostenloser QR-Code Generator | qrcode.de',
    template: '%s | qrcode.de',
  },
  description: 'Erstellen Sie kostenlos QR-Codes ohne versteckte Kosten. Generator für URLs, Text, WiFi, vCard, E-Mail und Telefon. Keine Anmeldung erforderlich, keine Werbung, 100% gratis.',
  keywords: [
    'QR-Code Generator',
    'QR-Code erstellen',
    'kostenlos',
    'gratis',
    'ohne Anmeldung',
    'ohne versteckte Kosten',
    'QR Code',
    'URL QR-Code',
    'WiFi QR-Code',
    'vCard QR-Code',
    'QR-Code kostenlos erstellen',
    'QR-Code Generator deutsch',
  ],
  authors: [{ name: 'qrcode.de' }],
  creator: 'qrcode.de',
  publisher: 'qrcode.de',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Kostenloser QR-Code Generator | qrcode.de',
    description: 'Erstellen Sie kostenlos QR-Codes ohne versteckte Kosten. Keine Anmeldung, keine Werbung, 100% gratis.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://qrcode.de',
    siteName: 'qrcode.de',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kostenloser QR-Code Generator | qrcode.de',
    description: 'Erstellen Sie kostenlos QR-Codes ohne versteckte Kosten. Keine Anmeldung erforderlich.',
  },
  alternates: {
    canonical: 'https://qrcode.de',
  },
  verification: {
    // Google Search Console verification (optional - add your verification code)
    // google: 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
