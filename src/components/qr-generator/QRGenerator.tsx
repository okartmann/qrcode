'use client'

import { useState, useCallback } from 'react'
import { TypeSelector } from './TypeSelector'
import { URLForm } from './forms/URLForm'
import { TextForm } from './forms/TextForm'
import { WiFiForm } from './forms/WiFiForm'
import { VCardForm } from './forms/VCardForm'
import { EmailForm } from './forms/EmailForm'
import { PhoneForm } from './forms/PhoneForm'
import { QRPreview } from './QRPreview'
import { QRCustomization } from './QRCustomization'
import type { QRCodeType, QROptions, WiFiData, VCardData, EmailData } from '@/types/qr'
import {
  generateURLData,
  generateTextData,
  generateWiFiData,
  generateVCardData,
  generateEmailData,
  generatePhoneData,
} from '@/lib/qr-utils'

export function QRGenerator() {
  const [activeType, setActiveType] = useState<QRCodeType>('url')
  const [qrData, setQrData] = useState<string | null>(null)
  const [options, setOptions] = useState<QROptions>({
    size: 256,
    color: '#000000',
    bgColor: '#ffffff',
  })

  // Form states
  const [urlValue, setUrlValue] = useState('')
  const [textValue, setTextValue] = useState('')
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
  })
  const [vcardData, setVcardData] = useState<VCardData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    website: '',
  })
  const [emailData, setEmailData] = useState<EmailData>({
    address: '',
    subject: '',
    body: '',
  })
  const [phoneValue, setPhoneValue] = useState('')

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
    }

    setQrData(data)
  }, [activeType, urlValue, textValue, wifiData, vcardData, emailData, phoneValue])

  const handleTypeChange = (type: QRCodeType) => {
    setActiveType(type)
    setQrData(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
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
