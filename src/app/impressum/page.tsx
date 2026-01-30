import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Kontaktinformationen von qrcode.de - Kostenloser QR-Code Generator',
}

export default function ImpressumPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Impressum</h1>

        <div className="card prose prose-slate max-w-none">
          <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>

          <address className="not-italic mb-8">
            <p className="font-semibold">Ortwin Kartmann</p>
            <p>Voelckerstr. 6</p>
            <p>60322 Frankfurt am Main</p>
            <p>Deutschland</p>
          </address>

          <h2 className="text-xl font-semibold mb-4 mt-8">Kontakt</h2>
          <p className="text-slate-600 mb-8">
            Bei Fragen oder Anmerkungen zu dieser Website können Sie uns gerne kontaktieren.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-8">Haftung für Inhalte</h2>
          <p className="text-slate-600 mb-4">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="text-slate-600 mb-8">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
            der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-8">Haftung für Links</h2>
          <p className="text-slate-600 mb-8">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
            verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-8">Urheberrecht</h2>
          <p className="text-slate-600">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
            deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
            außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
            Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet.
          </p>
        </div>
      </div>
    </div>
  )
}
