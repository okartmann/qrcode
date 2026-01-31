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

// Design Options
export type DotStyle = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded'
export type CornerStyle = 'square' | 'rounded' | 'dot' | 'extra-rounded'
export type FrameStyle = 'none' | 'simple' | 'rounded' | 'balloon' | 'banner-bottom' | 'banner-top'

export interface QROptions {
  size: number
  color: string
  bgColor: string
  // Advanced design options
  dotStyle: DotStyle
  cornerStyle: CornerStyle
  cornerColor: string
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
  cornerStyle: 'square',
  cornerColor: '#000000',
  gradientEnabled: false,
  gradientColor: '#000000',
  gradientType: 'linear',
  logo: null,
  logoSize: 60,
  logoPadding: 5,
  logoBackgroundColor: '#ffffff',
  frameStyle: 'none',
  frameColor: '#000000',
  frameText: 'Jetzt scannen',
  errorCorrection: 'M',
}
