'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'Ist der QR-Code Generator wirklich kostenlos?',
    answer: 'Ja, absolut! qrcode.de ist zu 100% kostenlos. Es gibt keine versteckten Kosten, keine Premium-Funktionen, keine Abonnements und keine Wasserzeichen. Sie können unbegrenzt viele QR-Codes erstellen.',
  },
  {
    question: 'Was ist ein QR-Code?',
    answer: 'Ein QR-Code (Quick Response Code) ist ein zweidimensionaler Barcode, der Informationen speichert und von Smartphones gescannt werden kann. QR-Codes können URLs, Text, WiFi-Zugangsdaten, Kontaktdaten (vCard) und vieles mehr enthalten.',
  },
  {
    question: 'Muss ich mich registrieren?',
    answer: 'Nein, Sie können sofort loslegen. qrcode.de erfordert keine Anmeldung, keine Registrierung und keine E-Mail-Adresse. Einfach QR-Code erstellen und herunterladen.',
  },
  {
    question: 'Kann ich die QR-Codes kommerziell nutzen?',
    answer: 'Ja, Sie können alle erstellten QR-Codes uneingeschränkt für private und kommerzielle Zwecke verwenden. Keine Lizenzgebühren, keine Einschränkungen.',
  },
  {
    question: 'Welches Format sollte ich wählen - PNG oder SVG?',
    answer: 'PNG eignet sich für Websites, E-Mails und digitale Dokumente. SVG ist ideal für den Druck (Flyer, Visitenkarten, Plakate), da es ohne Qualitätsverlust beliebig skaliert werden kann.',
  },
  {
    question: 'Wie groß sollte mein QR-Code sein?',
    answer: 'Als Faustregel gilt: Der QR-Code sollte mindestens 2 cm × 2 cm groß sein. Für Plakate oder größere Scanabstände entsprechend größer. Testen Sie den QR-Code vor dem Druck mit Ihrem Smartphone.',
  },
  {
    question: 'Werden meine Daten gespeichert?',
    answer: 'Nein. Alle QR-Codes werden direkt in Ihrem Browser generiert. Ihre eingegebenen Daten (URLs, Texte, Kontakte) verlassen niemals Ihr Gerät und werden nicht auf unseren Servern gespeichert.',
  },
  {
    question: 'Gibt es eine Begrenzung für die Anzahl der QR-Codes?',
    answer: 'Nein, Sie können unbegrenzt viele QR-Codes erstellen. Es gibt keine täglichen, monatlichen oder sonstigen Limits bei qrcode.de.',
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
