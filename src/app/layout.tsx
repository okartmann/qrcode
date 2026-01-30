import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'QR-Code.de - Kostenloser QR-Code Generator',
  description: 'Erstellen Sie kostenlos QR-Codes für URLs, Text, WiFi, vCard und mehr. Einfach, schnell und ohne Anmeldung.',
  keywords: ['QR-Code', 'Generator', 'kostenlos', 'URL', 'WiFi', 'vCard', 'erstellen'],
  authors: [{ name: 'QR-Code.de' }],
  openGraph: {
    title: 'QR-Code.de - Kostenloser QR-Code Generator',
    description: 'Erstellen Sie kostenlos QR-Codes für URLs, Text, WiFi, vCard und mehr.',
    type: 'website',
    locale: 'de_DE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
