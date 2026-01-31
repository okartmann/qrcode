import type {
  WiFiData,
  VCardData,
  EmailData,
  SMSData,
  WhatsAppData,
  LocationData,
  EventData,
  PayPalData,
  BitcoinData,
  SocialData,
} from '@/types/qr'

/**
 * Escape special characters for WiFi QR code
 */
function escapeWiFiString(str: string): string {
  return str.replace(/([\\;,:"'])/g, '\\$1')
}

/**
 * Format date for vCalendar (YYYYMMDD or YYYYMMDDTHHmmss)
 */
function formatVCalDate(date: string, time?: string, allDay?: boolean): string {
  const d = date.replace(/-/g, '')
  if (allDay || !time) {
    return d
  }
  const t = time.replace(/:/g, '') + '00'
  return `${d}T${t}`
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
  const { ssid, password, encryption, hidden } = data

  if (!ssid.trim()) return null

  const escapedSsid = escapeWiFiString(ssid.trim())
  const escapedPassword = escapeWiFiString(password)

  let wifi = `WIFI:T:${encryption};S:${escapedSsid};`

  if (encryption !== 'nopass' && password) {
    wifi += `P:${escapedPassword};`
  }

  if (hidden) {
    wifi += 'H:true;'
  }

  wifi += ';'
  return wifi
}

/**
 * Generate vCard data (version 3.0)
 */
export function generateVCardData(data: VCardData): string | null {
  const { firstName, lastName, name, phone, mobile, email, company, jobTitle, website, address, city, zip, country, note } = data

  // Use name field or combine first/last name
  const fullName = name?.trim() || `${firstName?.trim() || ''} ${lastName?.trim() || ''}`.trim()
  if (!fullName) return null

  // Parse name parts
  const fName = firstName?.trim() || fullName.split(' ').slice(0, -1).join(' ') || ''
  const lName = lastName?.trim() || fullName.split(' ').slice(-1)[0] || ''

  let vcard = 'BEGIN:VCARD\n'
  vcard += 'VERSION:3.0\n'
  vcard += `N:${lName};${fName};;;\n`
  vcard += `FN:${fullName}\n`

  if (company?.trim()) {
    vcard += `ORG:${company.trim()}\n`
  }
  if (jobTitle?.trim()) {
    vcard += `TITLE:${jobTitle.trim()}\n`
  }
  if (phone?.trim()) {
    vcard += `TEL;TYPE=WORK,VOICE:${phone.trim()}\n`
  }
  if (mobile?.trim()) {
    vcard += `TEL;TYPE=CELL:${mobile.trim()}\n`
  }
  if (email?.trim()) {
    vcard += `EMAIL:${email.trim()}\n`
  }
  if (website?.trim()) {
    vcard += `URL:${website.trim()}\n`
  }
  if (address?.trim() || city?.trim() || zip?.trim() || country?.trim()) {
    vcard += `ADR;TYPE=WORK:;;${address?.trim() || ''};${city?.trim() || ''};;${zip?.trim() || ''};${country?.trim() || ''}\n`
  }
  if (note?.trim()) {
    vcard += `NOTE:${note.trim()}\n`
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

  const cleanPhone = trimmed.replace(/[^\d+]/g, '')
  return `tel:${cleanPhone}`
}

/**
 * Generate SMS data (sms: format)
 */
export function generateSMSData(data: SMSData): string | null {
  const { phone, message } = data

  if (!phone.trim()) return null

  const cleanPhone = phone.trim().replace(/[^\d+]/g, '')
  let sms = `sms:${cleanPhone}`

  if (message.trim()) {
    sms += `?body=${encodeURIComponent(message.trim())}`
  }

  return sms
}

/**
 * Generate WhatsApp data
 */
export function generateWhatsAppData(data: WhatsAppData): string | null {
  const { phone, message } = data

  if (!phone.trim()) return null

  // Remove all non-numeric characters except +
  const cleanPhone = phone.trim().replace(/[^\d]/g, '')
  let url = `https://wa.me/${cleanPhone}`

  if (message.trim()) {
    url += `?text=${encodeURIComponent(message.trim())}`
  }

  return url
}

/**
 * Generate Location/Maps data (geo: format)
 */
export function generateLocationData(data: LocationData): string | null {
  const { latitude, longitude, query } = data

  // If coordinates are provided
  if (latitude?.trim() && longitude?.trim()) {
    const lat = parseFloat(latitude.trim())
    const lng = parseFloat(longitude.trim())

    if (!isNaN(lat) && !isNaN(lng)) {
      let geo = `geo:${lat},${lng}`
      if (query?.trim()) {
        geo += `?q=${encodeURIComponent(query.trim())}`
      }
      return geo
    }
  }

  // If only query/address is provided, use Google Maps URL
  if (query?.trim()) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(query.trim())}`
  }

  return null
}

/**
 * Generate Event/Calendar data (vCalendar format)
 */
export function generateEventData(data: EventData): string | null {
  const { title, location, startDate, startTime, endDate, endTime, description, allDay } = data

  if (!title.trim() || !startDate) return null

  const dtStart = formatVCalDate(startDate, startTime, allDay)
  const dtEnd = endDate ? formatVCalDate(endDate, endTime, allDay) : formatVCalDate(startDate, endTime, allDay)

  let vevent = 'BEGIN:VEVENT\n'
  vevent += `SUMMARY:${title.trim()}\n`

  if (allDay) {
    vevent += `DTSTART;VALUE=DATE:${dtStart}\n`
    vevent += `DTEND;VALUE=DATE:${dtEnd}\n`
  } else {
    vevent += `DTSTART:${dtStart}\n`
    vevent += `DTEND:${dtEnd}\n`
  }

  if (location?.trim()) {
    vevent += `LOCATION:${location.trim()}\n`
  }
  if (description?.trim()) {
    vevent += `DESCRIPTION:${description.trim()}\n`
  }

  vevent += 'END:VEVENT'

  return `BEGIN:VCALENDAR\nVERSION:2.0\n${vevent}\nEND:VCALENDAR`
}

/**
 * Generate PayPal payment link
 */
export function generatePayPalData(data: PayPalData): string | null {
  const { email, itemName, price, currency } = data

  if (!email.trim()) return null

  let url = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(email.trim())}`

  if (itemName?.trim()) {
    url += `&item_name=${encodeURIComponent(itemName.trim())}`
  }
  if (price?.trim()) {
    url += `&amount=${price.trim()}`
  }
  if (currency?.trim()) {
    url += `&currency_code=${currency.trim().toUpperCase()}`
  }

  return url
}

/**
 * Generate Bitcoin payment URI
 */
export function generateBitcoinData(data: BitcoinData): string | null {
  const { address, amount, label, message } = data

  if (!address.trim()) return null

  let btc = `bitcoin:${address.trim()}`
  const params: string[] = []

  if (amount?.trim()) {
    params.push(`amount=${amount.trim()}`)
  }
  if (label?.trim()) {
    params.push(`label=${encodeURIComponent(label.trim())}`)
  }
  if (message?.trim()) {
    params.push(`message=${encodeURIComponent(message.trim())}`)
  }

  if (params.length > 0) {
    btc += '?' + params.join('&')
  }

  return btc
}

/**
 * Generate Social Media Links page
 */
export function generateSocialData(data: SocialData): string | null {
  const links: string[] = []

  if (data.facebook?.trim()) {
    links.push(`Facebook: ${data.facebook.trim()}`)
  }
  if (data.instagram?.trim()) {
    links.push(`Instagram: ${data.instagram.trim()}`)
  }
  if (data.twitter?.trim()) {
    links.push(`Twitter/X: ${data.twitter.trim()}`)
  }
  if (data.linkedin?.trim()) {
    links.push(`LinkedIn: ${data.linkedin.trim()}`)
  }
  if (data.youtube?.trim()) {
    links.push(`YouTube: ${data.youtube.trim()}`)
  }
  if (data.tiktok?.trim()) {
    links.push(`TikTok: ${data.tiktok.trim()}`)
  }
  if (data.github?.trim()) {
    links.push(`GitHub: ${data.github.trim()}`)
  }
  if (data.website?.trim()) {
    links.push(`Website: ${data.website.trim()}`)
  }

  if (links.length === 0) return null

  // If only one link, return it directly
  if (links.length === 1) {
    const link = Object.values(data).find(v => v?.trim())
    if (link) {
      // Make sure it's a valid URL
      if (!link.match(/^https?:\/\//i)) {
        return 'https://' + link
      }
      return link
    }
  }

  // Multiple links - return as text
  return links.join('\n')
}
