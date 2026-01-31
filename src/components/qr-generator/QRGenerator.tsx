'use client'

import { useState, useCallback } from 'react'
import { TypeSelector } from './TypeSelector'
import { URLForm } from './forms/URLForm'
import { TextForm } from './forms/TextForm'
import { WiFiForm } from './forms/WiFiForm'
import { VCardForm } from './forms/VCardForm'
import { EmailForm } from './forms/EmailForm'
import { PhoneForm } from './forms/PhoneForm'
import { SMSForm } from './forms/SMSForm'
import { WhatsAppForm } from './forms/WhatsAppForm'
import { LocationForm } from './forms/LocationForm'
import { EventForm } from './forms/EventForm'
import { PayPalForm } from './forms/PayPalForm'
import { BitcoinForm } from './forms/BitcoinForm'
import { QRPreview } from './QRPreview'
import { QRCustomization } from './QRCustomization'
import type {
  QRCodeType,
  QROptions,
  WiFiData,
  VCardData,
  EmailData,
  SMSData,
  WhatsAppData,
  LocationData,
  EventData,
  PayPalData,
  BitcoinData,
} from '@/types/qr'
import {
  generateURLData,
  generateTextData,
  generateWiFiData,
  generateVCardData,
  generateEmailData,
  generatePhoneData,
  generateSMSData,
  generateWhatsAppData,
  generateLocationData,
  generateEventData,
  generatePayPalData,
  generateBitcoinData,
} from '@/lib/qr-utils'

export function QRGenerator() {
  const [activeType, setActiveType] = useState<QRCodeType>('url')
  const [qrData, setQrData] = useState<string | null>(null)
  const [options, setOptions] = useState<QROptions>({
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
  })

  // Form states
  const [urlValue, setUrlValue] = useState('')
  const [textValue, setTextValue] = useState('')
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  })
  const [vcardData, setVcardData] = useState<VCardData>({
    name: '',
    firstName: '',
    lastName: '',
    phone: '',
    mobile: '',
    email: '',
    company: '',
    jobTitle: '',
    website: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    note: '',
  })
  const [emailData, setEmailData] = useState<EmailData>({
    address: '',
    subject: '',
    body: '',
  })
  const [phoneValue, setPhoneValue] = useState('')
  const [smsData, setSmsData] = useState<SMSData>({
    phone: '',
    message: '',
  })
  const [whatsappData, setWhatsappData] = useState<WhatsAppData>({
    phone: '',
    message: '',
  })
  const [locationData, setLocationData] = useState<LocationData>({
    latitude: '',
    longitude: '',
    query: '',
  })
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    description: '',
    allDay: false,
  })
  const [paypalData, setPaypalData] = useState<PayPalData>({
    email: '',
    itemName: '',
    price: '',
    currency: 'EUR',
  })
  const [bitcoinData, setBitcoinData] = useState<BitcoinData>({
    address: '',
    amount: '',
    label: '',
    message: '',
  })

  const generateQRCode = useCallback(() => {
    let data: string | null = null

    switch (activeType) {
      case 'url':
        data = generateURLData(urlValue)
        break
      case 'text':
        data = generateTextData(textValue)
        break
      case 'wifi':
        data = generateWiFiData(wifiData)
        break
      case 'vcard':
        data = generateVCardData(vcardData)
        break
      case 'email':
        data = generateEmailData(emailData)
        break
      case 'phone':
        data = generatePhoneData(phoneValue)
        break
      case 'sms':
        data = generateSMSData(smsData)
        break
      case 'whatsapp':
        data = generateWhatsAppData(whatsappData)
        break
      case 'location':
        data = generateLocationData(locationData)
        break
      case 'event':
        data = generateEventData(eventData)
        break
      case 'paypal':
        data = generatePayPalData(paypalData)
        break
      case 'bitcoin':
        data = generateBitcoinData(bitcoinData)
        break
    }

    setQrData(data)
  }, [activeType, urlValue, textValue, wifiData, vcardData, emailData, phoneValue, smsData, whatsappData, locationData, eventData, paypalData, bitcoinData])

  const handleTypeChange = (type: QRCodeType) => {
    setActiveType(type)
    setQrData(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
      {/* Left Column - Options */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">QR-Code erstellen</h2>

        <TypeSelector activeType={activeType} onTypeChange={handleTypeChange} />

        <div className="mt-6">
          {activeType === 'url' && (
            <URLForm value={urlValue} onChange={setUrlValue} />
          )}
          {activeType === 'text' && (
            <TextForm value={textValue} onChange={setTextValue} />
          )}
          {activeType === 'wifi' && (
            <WiFiForm data={wifiData} onChange={setWifiData} />
          )}
          {activeType === 'vcard' && (
            <VCardForm data={vcardData} onChange={setVcardData} />
          )}
          {activeType === 'email' && (
            <EmailForm data={emailData} onChange={setEmailData} />
          )}
          {activeType === 'phone' && (
            <PhoneForm value={phoneValue} onChange={setPhoneValue} />
          )}
          {activeType === 'sms' && (
            <SMSForm data={smsData} onChange={setSmsData} />
          )}
          {activeType === 'whatsapp' && (
            <WhatsAppForm data={whatsappData} onChange={setWhatsappData} />
          )}
          {activeType === 'location' && (
            <LocationForm data={locationData} onChange={setLocationData} />
          )}
          {activeType === 'event' && (
            <EventForm data={eventData} onChange={setEventData} />
          )}
          {activeType === 'paypal' && (
            <PayPalForm data={paypalData} onChange={setPaypalData} />
          )}
          {activeType === 'bitcoin' && (
            <BitcoinForm data={bitcoinData} onChange={setBitcoinData} />
          )}
        </div>

        <QRCustomization options={options} onChange={setOptions} />

        <button onClick={generateQRCode} className="btn-primary w-full mt-6">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          QR-Code generieren
        </button>
      </div>

      {/* Right Column - Preview */}
      <div className="lg:sticky lg:top-24">
        <QRPreview data={qrData} options={options} type={activeType} />
      </div>
    </div>
  )
}
