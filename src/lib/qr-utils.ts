import type { WiFiData, VCardData, EmailData } from '@/types/qr'

/**
 * Escape special characters for WiFi QR code
 */
function escapeWiFiString(str: string): string {
  return str.replace(/([\\;,:"'])/g, '\\$1')
}

/**
 * Generate URL data - adds https:// if no protocol specified
 */
export function generateURLData(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null

  if (!trimmed.match(/^https?:\/\//i)) {
    return 'https://' + trimmed
  }
  return trimmed
}

/**
 * Generate text data
 */
export function generateTextData(text: string): string | null {
  return text.trim() || null
}

/**
 * Generate WiFi data in standard format
 */
export function generateWiFiData(data: WiFiData): string | null {
  const { ssid, password, encryption } = data

  if (!ssid.trim()) return null

  const escapedSsid = escapeWiFiString(ssid.trim())
  const escapedPassword = escapeWiFiString(password)

  if (encryption === 'nopass') {
    return `WIFI:T:nopass;S:${escapedSsid};;`
  }

  return `WIFI:T:${encryption};S:${escapedSsid};P:${escapedPassword};;`
}

/**
 * Generate vCard data
 */
export function generateVCardData(data: VCardData): string | null {
  const { name, phone, email, company, website } = data

  if (!name.trim()) return null

  // Parse name into first and last name
  const nameParts = name.trim().split(' ')
  const lastName = nameParts.length > 1 ? nameParts.pop() : ''
  const firstName = nameParts.join(' ')

  let vcard = 'BEGIN:VCARD\n'
  vcard += 'VERSION:3.0\n'
  vcard += `N:${lastName};${firstName};;;\n`
  vcard += `FN:${name.trim()}\n`

  if (company.trim()) {
    vcard += `ORG:${company.trim()}\n`
  }
  if (phone.trim()) {
    vcard += `TEL;TYPE=CELL:${phone.trim()}\n`
  }
  if (email.trim()) {
    vcard += `EMAIL:${email.trim()}\n`
  }
  if (website.trim()) {
    vcard += `URL:${website.trim()}\n`
  }

  vcard += 'END:VCARD'

  return vcard
}

/**
 * Generate email data (mailto: format)
 */
export function generateEmailData(data: EmailData): string | null {
  const { address, subject, body } = data

  if (!address.trim()) return null

  let mailto = `mailto:${address.trim()}`
  const params: string[] = []

  if (subject.trim()) {
    params.push(`subject=${encodeURIComponent(subject.trim())}`)
  }
  if (body.trim()) {
    params.push(`body=${encodeURIComponent(body.trim())}`)
  }

  if (params.length > 0) {
    mailto += '?' + params.join('&')
  }

  return mailto
}

/**
 * Generate phone data (tel: format)
 */
export function generatePhoneData(phone: string): string | null {
  const trimmed = phone.trim()
  if (!trimmed) return null

  // Remove spaces and special characters except + and numbers
  const cleanPhone = trimmed.replace(/[^\d+]/g, '')
  return `tel:${cleanPhone}`
}
