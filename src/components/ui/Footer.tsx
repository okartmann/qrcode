import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
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
              Kostenloser QR-Code Generator für alle Ihre Bedürfnisse.
              Erstellen Sie professionelle QR-Codes in Sekunden.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <div className="flex flex-col gap-3">
              <Link href="/#generator" className="text-slate-400 hover:text-white transition-colors">
                Generator
              </Link>
              <Link href="/#features" className="text-slate-400 hover:text-white transition-colors">
                Funktionen
              </Link>
              <Link href="/#faq" className="text-slate-400 hover:text-white transition-colors">
                FAQ
              </Link>
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
          <p>&copy; {new Date().getFullYear()} QR-Code.de - Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
