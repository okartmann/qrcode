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
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline'
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
  const [showMobilePreview, setShowMobilePreview] = useState(false)
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
    // Show preview on mobile after generating
    if (data && window.innerWidth < 1024) {
      setShowMobilePreview(true)
    }
  }, [activeType, urlValue, textValue, wifiData, vcardData, emailData, phoneValue, smsData, whatsappData, locationData, eventData, paypalData, bitcoinData])

  const handleTypeChange = (type: QRCodeType) => {
    setActiveType(type)
    setQrData(null)
  }

  return (
    <>
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

        {/* Right Column - Preview (Desktop) */}
        <div className="hidden lg:block lg:sticky lg:top-24">
          <QRPreview data={qrData} options={options} type={activeType} />
        </div>
      </div>

      {/* Mobile Preview Button - Fixed at bottom */}
      <div className="fixed bottom-4 right-4 lg:hidden z-40">
        <button
          onClick={() => setShowMobilePreview(true)}
          className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        >
          <EyeIcon className="w-5 h-5" />
          <span className="font-medium">Vorschau</span>
          {qrData && (
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
        </button>
      </div>

      {/* Mobile Preview Modal */}
      {showMobilePreview && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden flex items-end">
          <div
            className="absolute inset-0"
            onClick={() => setShowMobilePreview(false)}
          />
          <div className="relative w-full bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto animate-slideUp">
            {/* Handle bar */}
            <div className="sticky top-0 bg-white pt-3 pb-2 border-b border-slate-100 z-10">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-2" />
              <div className="flex items-center justify-between px-4">
                <h3 className="font-semibold text-slate-800">QR-Code Vorschau</h3>
                <button
                  onClick={() => setShowMobilePreview(false)}
                  className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <QRPreview data={qrData} options={options} type={activeType} />
            </div>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
