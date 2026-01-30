'use client'

import Link from 'next/link'
import { useState } from 'react'
import { QrCodeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link href="/" className="flex items-center gap-2">
            <QrCodeIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-slate-900">QR-Code.de</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#generator"
              className="text-slate-600 hover:text-primary font-medium transition-colors"
            >
              Generator
            </Link>
            <Link
              href="#features"
              className="text-slate-600 hover:text-primary font-medium transition-colors"
            >
              Funktionen
            </Link>
            <Link
              href="#faq"
              className="text-slate-600 hover:text-primary font-medium transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              <Link
                href="#generator"
                className="text-slate-600 hover:text-primary font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Generator
              </Link>
              <Link
                href="#features"
                className="text-slate-600 hover:text-primary font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Funktionen
              </Link>
              <Link
                href="#faq"
                className="text-slate-600 hover:text-primary font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
