'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'

export function Footer() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 [&_span]:text-white [&_.text-slate-900]:text-white [&_.text-slate-500]:text-slate-400">
              <Logo />
            </div>
            <p className="text-slate-400 max-w-md">
              Der kostenlose QR-Code Generator ohne versteckte Kosten.
              Erstellen Sie professionelle QR-Codes in Sekunden - ohne Anmeldung.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('generator')}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                Generator
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                Funktionen
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                FAQ
              </button>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <div className="flex flex-col gap-3">
              <Link href="/impressum" className="text-slate-400 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-slate-400 hover:text-white transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} qrcode.de - Kostenloser QR-Code Generator</p>
        </div>
      </div>
    </footer>
  )
}
