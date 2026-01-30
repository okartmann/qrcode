import {
  ClockIcon,
  ShieldCheckIcon,
  PhotoIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CurrencyEuroIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: CurrencyEuroIcon,
    title: '100% Kostenlos',
    description: 'Unser QR-Code Generator ist komplett kostenlos. Keine versteckten Kosten, keine Premium-Funktionen, keine Abos.',
  },
  {
    icon: ClockIcon,
    title: 'Sofort einsatzbereit',
    description: 'Erstellen Sie QR-Codes in Sekunden. Keine Anmeldung, keine Registrierung, keine Software-Installation nötig.',
  },
  {
    icon: NoSymbolIcon,
    title: 'Ohne Wasserzeichen',
    description: 'Alle QR-Codes werden ohne Wasserzeichen oder Branding erstellt. Professionelle Qualität für jeden Einsatz.',
  },
  {
    icon: PhotoIcon,
    title: 'Hochauflösend',
    description: 'Exportieren Sie Ihre QR-Codes in hoher Qualität als PNG oder SVG. Perfekt für Druck und digitale Medien.',
  },
  {
    icon: Cog6ToothIcon,
    title: 'Individuell anpassbar',
    description: 'Passen Sie Farben und Größe an Ihre Marke an. Erstellen Sie einzigartige QR-Codes für Ihr Business.',
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Vielseitig einsetzbar',
    description: 'QR-Codes für URLs, Texte, WiFi-Zugänge, Visitenkarten (vCard), E-Mails und Telefonnummern.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Datenschutz garantiert',
    description: 'Ihre Daten bleiben bei Ihnen. Alle QR-Codes werden lokal in Ihrem Browser generiert.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Unbegrenzte Nutzung',
    description: 'Erstellen Sie so viele QR-Codes wie Sie möchten. Keine Limits, keine Einschränkungen.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Warum qrcode.de?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Der beste kostenlose QR-Code Generator ohne versteckte Kosten
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="bg-slate-50 rounded-xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 mb-5 bg-gradient-to-br from-primary to-primary-dark rounded-xl">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
