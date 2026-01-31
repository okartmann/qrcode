// QR Code Types
export type QRCodeType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'whatsapp'
  | 'location'
  | 'event'
  | 'paypal'
  | 'bitcoin'
  | 'social'

// Design Options - Dot/Module Styles
export type DotStyle =
  | 'square'
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'diamond'
  | 'star'

// Corner/Eye Frame Styles (outer square of the 3 corner markers)
export type CornerFrameStyle =
  | 'square'
  | 'rounded'
  | 'circle'
  | 'rounded-sm'

// Corner/Eye Dot Styles (inner dot of the 3 corner markers)
export type CornerDotStyle =
  | 'square'
  | 'dot'
  | 'rounded'

// Frame Styles for the QR code border
export type FrameStyle =
  | 'none'
  // Simple frames
  | 'simple'
  | 'rounded'
  | 'circle'
  // Text frames - bottom
  | 'banner-bottom'
  | 'badge-bottom'
  | 'ribbon-bottom'
  | 'ticket-bottom'
  // Text frames - top
  | 'banner-top'
  | 'badge-top'
  // Decorative frames
  | 'balloon'
  | 'speech-bubble'
  | 'heart'
  | 'star-frame'
  // Use case specific
  | 'gift'
  | 'shopping'
  | 'restaurant'
  | 'wifi-frame'
  | 'contact'
  | 'social-frame'
  | 'event-frame'
  | 'business'

// Pre-defined Social Media Logos
export type SocialLogo =
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'x'
  | 'youtube'
  | 'tiktok'
  | 'linkedin'
  | 'whatsapp'
  | 'telegram'
  | 'snapchat'
  | 'pinterest'
  | 'github'
  | 'spotify'
  | 'apple'
  | 'google'
  | 'paypal'
  | 'bitcoin-logo'
  | 'wifi-logo'
  | 'email-logo'
  | 'phone-logo'

// Color Palette Interface
export interface ColorPalette {
  id: string
  name: string
  primary: string    // QR code color
  secondary: string  // Background color
  accent?: string    // Optional accent/corner color
}

// Pre-defined color palettes
export const colorPalettes: ColorPalette[] = [
  // Classic
  { id: 'classic-black', name: 'Klassisch', primary: '#000000', secondary: '#ffffff' },
  { id: 'classic-navy', name: 'Navy', primary: '#1e3a5f', secondary: '#ffffff' },
  { id: 'classic-gray', name: 'Grau', primary: '#374151', secondary: '#ffffff' },

  // Modern & Professional
  { id: 'modern-blue', name: 'Modern Blau', primary: '#2563eb', secondary: '#ffffff', accent: '#1d4ed8' },
  { id: 'modern-green', name: 'Modern Grün', primary: '#16a34a', secondary: '#ffffff', accent: '#15803d' },
  { id: 'modern-purple', name: 'Modern Lila', primary: '#7c3aed', secondary: '#ffffff', accent: '#6d28d9' },
  { id: 'modern-teal', name: 'Modern Türkis', primary: '#0d9488', secondary: '#ffffff', accent: '#0f766e' },

  // Warm Colors
  { id: 'warm-orange', name: 'Warm Orange', primary: '#ea580c', secondary: '#ffffff', accent: '#c2410c' },
  { id: 'warm-red', name: 'Warm Rot', primary: '#dc2626', secondary: '#ffffff', accent: '#b91c1c' },
  { id: 'warm-pink', name: 'Warm Pink', primary: '#db2777', secondary: '#ffffff', accent: '#be185d' },
  { id: 'warm-amber', name: 'Warm Amber', primary: '#d97706', secondary: '#ffffff', accent: '#b45309' },

  // Cool Colors
  { id: 'cool-cyan', name: 'Cool Cyan', primary: '#0891b2', secondary: '#ffffff', accent: '#0e7490' },
  { id: 'cool-indigo', name: 'Cool Indigo', primary: '#4f46e5', secondary: '#ffffff', accent: '#4338ca' },
  { id: 'cool-sky', name: 'Cool Himmel', primary: '#0284c7', secondary: '#ffffff', accent: '#0369a1' },

  // Nature
  { id: 'nature-forest', name: 'Wald', primary: '#166534', secondary: '#ffffff', accent: '#14532d' },
  { id: 'nature-ocean', name: 'Ozean', primary: '#0c4a6e', secondary: '#ffffff', accent: '#082f49' },
  { id: 'nature-sunset', name: 'Sonnenuntergang', primary: '#c2410c', secondary: '#fef3c7', accent: '#9a3412' },

  // Pastel
  { id: 'pastel-lavender', name: 'Lavendel', primary: '#8b5cf6', secondary: '#f5f3ff' },
  { id: 'pastel-mint', name: 'Minze', primary: '#34d399', secondary: '#ecfdf5' },
  { id: 'pastel-peach', name: 'Pfirsich', primary: '#f97316', secondary: '#fff7ed' },
  { id: 'pastel-rose', name: 'Rose', primary: '#f472b6', secondary: '#fdf2f8' },

  // Dark Mode
  { id: 'dark-blue', name: 'Dunkel Blau', primary: '#60a5fa', secondary: '#1e293b' },
  { id: 'dark-green', name: 'Dunkel Grün', primary: '#4ade80', secondary: '#1e293b' },
  { id: 'dark-purple', name: 'Dunkel Lila', primary: '#a78bfa', secondary: '#1e293b' },
  { id: 'dark-gold', name: 'Dunkel Gold', primary: '#fbbf24', secondary: '#1e293b' },

  // Brand-like
  { id: 'brand-facebook', name: 'Facebook', primary: '#1877f2', secondary: '#ffffff' },
  { id: 'brand-instagram', name: 'Instagram', primary: '#e4405f', secondary: '#ffffff' },
  { id: 'brand-whatsapp', name: 'WhatsApp', primary: '#25d366', secondary: '#ffffff' },
  { id: 'brand-linkedin', name: 'LinkedIn', primary: '#0a66c2', secondary: '#ffffff' },
]

// Frame Templates
export interface FrameTemplate {
  id: FrameStyle
  name: string
  description: string
  category: 'none' | 'simple' | 'text' | 'decorative' | 'usecase'
  hasText: boolean
  defaultText?: string
}

export const frameTemplates: FrameTemplate[] = [
  // None
  { id: 'none', name: 'Kein Rahmen', description: 'Nur QR-Code', category: 'none', hasText: false },

  // Simple frames
  { id: 'simple', name: 'Einfach', description: 'Einfacher Rahmen', category: 'simple', hasText: false },
  { id: 'rounded', name: 'Abgerundet', description: 'Abgerundete Ecken', category: 'simple', hasText: false },
  { id: 'circle', name: 'Kreis', description: 'Kreisförmiger Rahmen', category: 'simple', hasText: false },

  // Text frames - bottom
  { id: 'banner-bottom', name: 'Banner unten', description: 'Banner mit Text unten', category: 'text', hasText: true, defaultText: 'Jetzt scannen!' },
  { id: 'badge-bottom', name: 'Badge unten', description: 'Badge-Stil unten', category: 'text', hasText: true, defaultText: 'Scan mich!' },
  { id: 'ribbon-bottom', name: 'Schleife unten', description: 'Schleife mit Text', category: 'text', hasText: true, defaultText: 'QR-Code' },
  { id: 'ticket-bottom', name: 'Ticket', description: 'Ticket-Stil', category: 'text', hasText: true, defaultText: 'Eintrittskarte' },

  // Text frames - top
  { id: 'banner-top', name: 'Banner oben', description: 'Banner mit Text oben', category: 'text', hasText: true, defaultText: 'Jetzt scannen!' },
  { id: 'badge-top', name: 'Badge oben', description: 'Badge-Stil oben', category: 'text', hasText: true, defaultText: 'NEU!' },

  // Decorative
  { id: 'balloon', name: 'Sprechblase', description: 'Comic-Sprechblase', category: 'decorative', hasText: true, defaultText: 'Hey!' },
  { id: 'speech-bubble', name: 'Gedankenblase', description: 'Gedankenblase', category: 'decorative', hasText: true, defaultText: 'Mehr Info?' },
  { id: 'heart', name: 'Herz', description: 'Herzförmig', category: 'decorative', hasText: false },
  { id: 'star-frame', name: 'Stern', description: 'Sternförmig', category: 'decorative', hasText: false },

  // Use case specific
  { id: 'gift', name: 'Geschenk', description: 'Für Geschenke', category: 'usecase', hasText: true, defaultText: 'Überraschung!' },
  { id: 'shopping', name: 'Shopping', description: 'Für Einkäufe', category: 'usecase', hasText: true, defaultText: 'Jetzt kaufen!' },
  { id: 'restaurant', name: 'Restaurant', description: 'Für Speisekarten', category: 'usecase', hasText: true, defaultText: 'Zur Speisekarte' },
  { id: 'wifi-frame', name: 'WLAN', description: 'Für WLAN-Zugänge', category: 'usecase', hasText: true, defaultText: 'WLAN verbinden' },
  { id: 'contact', name: 'Kontakt', description: 'Für Visitenkarten', category: 'usecase', hasText: true, defaultText: 'Kontakt speichern' },
  { id: 'social-frame', name: 'Social Media', description: 'Für soziale Medien', category: 'usecase', hasText: true, defaultText: 'Folge mir!' },
  { id: 'event-frame', name: 'Event', description: 'Für Veranstaltungen', category: 'usecase', hasText: true, defaultText: 'Zum Event' },
  { id: 'business', name: 'Business', description: 'Professionell', category: 'usecase', hasText: true, defaultText: 'Mehr erfahren' },
]

// Social Media Logo Data with SVG paths
export interface SocialLogoData {
  id: SocialLogo
  name: string
  color: string
  svgPath: string
  viewBox?: string
}

export const socialLogos: SocialLogoData[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877f2',
    svgPath: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#e4405f',
    svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    color: '#1da1f2',
    svgPath: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
  },
  {
    id: 'x',
    name: 'X',
    color: '#000000',
    svgPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: '#ff0000',
    svgPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#000000',
    svgPath: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0a66c2',
    svgPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    color: '#25d366',
    svgPath: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    color: '#0088cc',
    svgPath: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    color: '#fffc00',
    svgPath: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    color: '#bd081c',
    svgPath: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z',
  },
  {
    id: 'github',
    name: 'GitHub',
    color: '#181717',
    svgPath: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    color: '#1db954',
    svgPath: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
  },
  {
    id: 'apple',
    name: 'Apple',
    color: '#000000',
    svgPath: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z',
  },
  {
    id: 'google',
    name: 'Google',
    color: '#4285f4',
    svgPath: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    color: '#00457c',
    svgPath: 'M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z',
  },
  {
    id: 'bitcoin-logo',
    name: 'Bitcoin',
    color: '#f7931a',
    svgPath: 'M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.7-.168-1.053-.25l.53-2.12-1.317-.328-.54 2.152c-.286-.064-.566-.13-.84-.2l-1.815-.45-.35 1.407s.975.224.955.237c.535.136.63.493.615.775l-.618 2.478c.037.01.086.024.14.046l-.142-.036-.867 3.473c-.063.164-.233.4-.61.31.015.02-.956-.24-.956-.24l-.652 1.506 1.71.426.94.242-.54 2.19 1.313.328.54-2.165c.36.1.707.19 1.05.273l-.538 2.155 1.315.33.54-2.19c2.24.423 3.926.253 4.64-1.774.57-1.637-.03-2.58-1.22-3.2.86-.2 1.52-.766 1.69-1.93zm-3.03 4.243c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.222 3.757.667 3.33 2.37zm.41-4.27c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.186 3.137.53 2.75 2.09z',
  },
  {
    id: 'wifi-logo',
    name: 'WLAN',
    color: '#000000',
    svgPath: 'M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4c1.9-1.9 5.1-1.9 7 0l1.4-1.4c-2.7-2.7-7.1-2.7-9.8 0zm-2.8-2.8l1.4 1.4c3.5-3.5 9.2-3.5 12.7 0l1.4-1.4c-4.3-4.3-11.3-4.3-15.6 0zM1.4 10l1.4 1.4c5.1-5.1 13.3-5.1 18.4 0l1.4-1.4c-5.9-5.9-15.4-5.9-21.2 0z',
  },
  {
    id: 'email-logo',
    name: 'E-Mail',
    color: '#ea4335',
    svgPath: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
  {
    id: 'phone-logo',
    name: 'Telefon',
    color: '#34a853',
    svgPath: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  },
]

export interface QROptions {
  size: number
  color: string
  bgColor: string
  // Dot/Module style
  dotStyle: DotStyle
  // Corner/Eye styles
  cornerFrameStyle: CornerFrameStyle
  cornerDotStyle: CornerDotStyle
  cornerColor: string
  cornerDotColor: string
  // Gradient
  gradientEnabled: boolean
  gradientColor: string
  gradientType: 'linear' | 'radial'
  // Logo
  logo: string | null
  logoSize: number
  logoPadding: number
  logoBackgroundColor: string
  // Frame
  frameStyle: FrameStyle
  frameColor: string
  frameText: string
  // Error correction
  errorCorrection: 'L' | 'M' | 'Q' | 'H'
}

export interface WiFiData {
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'nopass'
  hidden: boolean
}

export interface VCardData {
  name: string
  firstName: string
  lastName: string
  phone: string
  mobile: string
  email: string
  company: string
  jobTitle: string
  website: string
  address: string
  city: string
  zip: string
  country: string
  note: string
}

export interface EmailData {
  address: string
  subject: string
  body: string
}

export interface SMSData {
  phone: string
  message: string
}

export interface WhatsAppData {
  phone: string
  message: string
}

export interface LocationData {
  latitude: string
  longitude: string
  query: string
}

export interface EventData {
  title: string
  location: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  description: string
  allDay: boolean
}

export interface PayPalData {
  email: string
  itemName: string
  price: string
  currency: string
}

export interface BitcoinData {
  address: string
  amount: string
  label: string
  message: string
}

export interface SocialData {
  facebook: string
  instagram: string
  twitter: string
  linkedin: string
  youtube: string
  tiktok: string
  github: string
  website: string
}

// Default QR Options
export const defaultQROptions: QROptions = {
  size: 300,
  color: '#000000',
  bgColor: '#ffffff',
  dotStyle: 'square',
  cornerFrameStyle: 'square',
  cornerDotStyle: 'square',
  cornerColor: '#000000',
  cornerDotColor: '#000000',
  gradientEnabled: false,
  gradientColor: '#000000',
  gradientType: 'linear',
  logo: null,
  logoSize: 60,
  logoPadding: 5,
  logoBackgroundColor: '#ffffff',
  frameStyle: 'none',
  frameColor: '#000000',
  frameText: 'Jetzt scannen!',
  errorCorrection: 'M',
}
