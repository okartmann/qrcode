export type QRCodeType = 'url' | 'text' | 'wifi' | 'vcard' | 'email' | 'phone'

export interface QROptions {
  size: number
  color: string
  bgColor: string
}

export interface WiFiData {
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'nopass'
}

export interface VCardData {
  name: string
  phone: string
  email: string
  company: string
  website: string
}

export interface EmailData {
  address: string
  subject: string
  body: string
}
