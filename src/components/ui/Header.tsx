'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Logo } from './Logo'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)

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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('generator')}
              className="text-slate-600 hover:text-primary font-medium transition-colors"
            >
              Generator
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-slate-600 hover:text-primary font-medium transition-colors"
            >
              Funktionen
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-slate-600 hover:text-primary font-medium transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü öffnen"
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
              <button
                onClick={() => scrollToSection('generator')}
                className="text-left text-slate-600 hover:text-primary font-medium"
              >
                Generator
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-slate-600 hover:text-primary font-medium"
              >
                Funktionen
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-slate-600 hover:text-primary font-medium"
              >
                FAQ
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
