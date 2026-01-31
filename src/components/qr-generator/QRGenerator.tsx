'use client'

import { useState, useCallback, useEffect } from 'react'
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
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
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

  // Auto-generate QR code when form values change
  useEffect(() => {
    generateQRCode()
  }, [generateQRCode])

  const handleTypeChange = (type: QRCodeType) => {
    setActiveType(type)
    setQrData(null)
  }

  const handleReset = () => {
    // Reset all form values
    setUrlValue('')
    setTextValue('')
    setWifiData({ ssid: '', password: '', encryption: 'WPA', hidden: false })
    setVcardData({
      name: '', firstName: '', lastName: '', phone: '', mobile: '',
      email: '', company: '', jobTitle: '', website: '',
      address: '', city: '', zip: '', country: '', note: '',
    })
    setEmailData({ address: '', subject: '', body: '' })
    setPhoneValue('')
    setSmsData({ phone: '', message: '' })
    setWhatsappData({ phone: '', message: '' })
    setLocationData({ latitude: '', longitude: '', query: '' })
    setEventData({
      title: '', location: '', startDate: '', startTime: '',
      endDate: '', endTime: '', description: '', allDay: false,
    })
    setPaypalData({ email: '', itemName: '', price: '', currency: 'EUR' })
    setBitcoinData({ address: '', amount: '', label: '', message: '' })
    setQrData(null)
  }

  return (
    <>
      {/* Mobile Sticky Preview Bar - Always visible at top */}
      <div className="lg:hidden sticky top-16 z-30 -mx-4 px-4 py-3 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <QRPreview data={qrData} options={options} type={activeType} compact />
          {qrData && (
            <button
              onClick={() => {
                // Scroll to download section or trigger download
                const preview = document.getElementById('full-preview')
                if (preview) preview.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start mt-4 lg:mt-0">
        {/* Left Column - Options */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">QR-Code erstellen</h2>
            {qrData && (
              <button
                onClick={handleReset}
                className="text-sm text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Zurücksetzen
              </button>
            )}
          </div>

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
        </div>

        {/* Right Column - Preview (Desktop) */}
        <div id="full-preview" className="lg:sticky lg:top-24">
          {/* Show full preview on mobile too, below the form */}
          <div className="lg:block">
            <QRPreview data={qrData} options={options} type={activeType} />
          </div>
        </div>
      </div>
    </>
  )
}
