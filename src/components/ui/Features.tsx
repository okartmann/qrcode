import {
  ClockIcon,
  ShieldCheckIcon,
  PhotoIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: ClockIcon,
    title: 'Sofort einsatzbereit',
    description: 'Erstellen Sie QR-Codes in Sekunden - ohne Anmeldung oder Software-Installation.',
  },
  {
    icon: ShieldCheckIcon,
    title: '100% Kostenlos',
    description: 'Alle Funktionen sind komplett kostenlos - ohne versteckte Kosten oder Limits.',
  },
  {
    icon: PhotoIcon,
    title: 'Hochauflösend',
    description: 'Exportieren Sie Ihre QR-Codes in hoher Qualität als PNG oder SVG.',
  },
  {
    icon: Cog6ToothIcon,
    title: 'Anpassbar',
    description: 'Passen Sie Farben und Größe an Ihre Marke und Bedürfnisse an.',
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Vielseitig',
    description: 'URLs, Text, WiFi-Zugänge, Visitenkarten, E-Mails und mehr.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Datenschutz',
    description: 'Ihre Daten bleiben bei Ihnen - alles wird lokal in Ihrem Browser verarbeitet.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Funktionen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-50 rounded-xl p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-primary to-primary-dark rounded-2xl">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
