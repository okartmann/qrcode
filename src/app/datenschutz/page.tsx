import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung von qrcode.de - Kostenloser QR-Code Generator. Wir speichern keine personenbezogenen Daten.',
}

export default function DatenschutzPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Datenschutzerklärung</h1>

        <div className="card prose prose-slate max-w-none">
          <h2 className="text-xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>

          <h3 className="text-lg font-medium mb-3 mt-6">Allgemeine Hinweise</h3>
          <p className="text-slate-600 mb-4">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
            Daten passiert, wenn Sie diese Website besuchen.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">
              Kurz gesagt: Wir speichern keine personenbezogenen Daten.
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-8">2. Keine Erhebung personenbezogener Daten</h2>
          <p className="text-slate-600 mb-4">
            Diese Website wurde bewusst so gestaltet, dass <strong>keine personenbezogenen Daten</strong> erhoben,
            gespeichert oder verarbeitet werden. Alle QR-Codes werden ausschließlich lokal in Ihrem Browser
            generiert. Ihre eingegebenen Daten (URLs, Texte, Kontaktdaten etc.) verlassen zu keinem Zeitpunkt
            Ihr Gerät.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-8">3. Cookies</h2>
          <p className="text-slate-600 mb-4">
            Diese Website verwendet <strong>keine Tracking-Cookies</strong> und keine Cookies zu Werbezwecken.
          </p>
          <p className="text-slate-600 mb-4">
            Es werden lediglich technisch notwendige <strong>Session-Cookies</strong> verwendet, die für die
            grundlegende Funktionalität der Website erforderlich sind. Diese Cookies:
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
            <li>Enthalten keine personenbezogenen Daten</li>
            <li>Werden automatisch gelöscht, wenn Sie Ihren Browser schließen</li>
            <li>Dienen ausschließlich der technischen Bereitstellung der Website</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 mt-8">4. Keine Analyse-Tools</h2>
          <p className="text-slate-600 mb-4">
            Wir verwenden keine Analyse-Tools wie Google Analytics oder ähnliche Dienste. Es findet kein
            Tracking Ihres Nutzerverhaltens statt.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-8">5. Keine Weitergabe von Daten</h2>
          <p className="text-slate-600 mb-4">
            Da wir keine personenbezogenen Daten erheben, findet auch keine Weitergabe an Dritte statt.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-8">6. Hosting</h2>
          <p className="text-slate-600 mb-4">
            Diese Website wird bei einem externen Dienstleister gehostet. Beim Aufruf dieser Website werden
            automatisch Informationen in sogenannten Server-Log-Dateien gespeichert, die Ihr Browser automatisch
            übermittelt. Dies sind:
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse (anonymisiert)</li>
          </ul>
          <p className="text-slate-600 mb-4">
            Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und nach kurzer Zeit automatisch
            gelöscht.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-8">7. Ihre Rechte</h2>
          <p className="text-slate-600 mb-4">
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
            Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf
            Berichtigung oder Löschung dieser Daten. Da wir jedoch keine personenbezogenen Daten speichern,
            gibt es in der Regel keine Daten, über die wir Auskunft erteilen könnten.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-8">8. Verantwortliche Stelle</h2>
          <address className="not-italic text-slate-600">
            <p className="font-semibold">Ortwin Kartmann</p>
            <p>Voelckerstr. 6</p>
            <p>60322 Frankfurt am Main</p>
            <p>Deutschland</p>
          </address>
        </div>
      </div>
    </div>
  )
}
