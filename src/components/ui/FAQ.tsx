'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'Was ist ein QR-Code?',
    answer: 'Ein QR-Code (Quick Response Code) ist ein zweidimensionaler Barcode, der Informationen speichert und von Smartphones und anderen Geräten gescannt werden kann. QR-Codes können URLs, Text, Kontaktdaten und vieles mehr enthalten.',
  },
  {
    question: 'Sind die QR-Codes wirklich kostenlos?',
    answer: 'Ja! Alle QR-Codes, die Sie auf QR-Code.de erstellen, sind zu 100% kostenlos. Es gibt keine versteckten Kosten, keine Limits und keine Wasserzeichen.',
  },
  {
    question: 'Kann ich die QR-Codes kommerziell nutzen?',
    answer: 'Ja, Sie können alle erstellten QR-Codes uneingeschränkt für private und kommerzielle Zwecke verwenden.',
  },
  {
    question: 'Welches Format sollte ich wählen - PNG oder SVG?',
    answer: 'PNG eignet sich für die meisten Anwendungen wie Websites und Dokumente. SVG ist ideal für den Druck, da es ohne Qualitätsverlust skaliert werden kann.',
  },
  {
    question: 'Wie groß sollte mein QR-Code sein?',
    answer: 'Die Mindestgröße hängt vom Scanabstand ab. Als Faustregel gilt: Der QR-Code sollte mindestens 2 cm × 2 cm groß sein. Für größere Abstände entsprechend größer.',
  },
  {
    question: 'Werden meine Daten gespeichert?',
    answer: 'Nein. Alle QR-Codes werden direkt in Ihrem Browser generiert. Ihre Daten verlassen niemals Ihr Gerät und werden nicht auf unseren Servern gespeichert.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Häufig gestellte Fragen
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold hover:text-primary transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <ChevronDownIcon
                  className={`w-5 h-5 text-primary transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
