'use client'

import { useState } from 'react'
import type { VCardData } from '@/types/qr'

interface VCardFormProps {
  data: VCardData
  onChange: (data: VCardData) => void
}

export function VCardForm({ data, onChange }: VCardFormProps) {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="space-y-4">
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="vcard-firstname" className="block text-sm font-medium text-slate-700 mb-2">
            Vorname
          </label>
          <input
            type="text"
            id="vcard-firstname"
            value={data.firstName}
            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
            placeholder="Max"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="vcard-lastname" className="block text-sm font-medium text-slate-700 mb-2">
            Nachname
          </label>
          <input
            type="text"
            id="vcard-lastname"
            value={data.lastName}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
            placeholder="Mustermann"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="vcard-mobile" className="block text-sm font-medium text-slate-700 mb-2">
            Mobil
          </label>
          <input
            type="tel"
            id="vcard-mobile"
            value={data.mobile}
            onChange={(e) => onChange({ ...data, mobile: e.target.value })}
            placeholder="+49 170 1234567"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="vcard-phone" className="block text-sm font-medium text-slate-700 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            id="vcard-phone"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="+49 69 1234567"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="vcard-email" className="block text-sm font-medium text-slate-700 mb-2">
          E-Mail
        </label>
        <input
          type="email"
          id="vcard-email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          placeholder="max@beispiel.de"
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="vcard-company" className="block text-sm font-medium text-slate-700 mb-2">
            Firma
          </label>
          <input
            type="text"
            id="vcard-company"
            value={data.company}
            onChange={(e) => onChange({ ...data, company: e.target.value })}
            placeholder="Meine Firma GmbH"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="vcard-jobtitle" className="block text-sm font-medium text-slate-700 mb-2">
            Position
          </label>
          <input
            type="text"
            id="vcard-jobtitle"
            value={data.jobTitle}
            onChange={(e) => onChange({ ...data, jobTitle: e.target.value })}
            placeholder="Geschäftsführer"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="vcard-website" className="block text-sm font-medium text-slate-700 mb-2">
          Website
        </label>
        <input
          type="url"
          id="vcard-website"
          value={data.website}
          onChange={(e) => onChange({ ...data, website: e.target.value })}
          placeholder="https://beispiel.de"
          className="input-field"
        />
      </div>

      {/* Toggle for more fields */}
      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        className="text-sm text-primary hover:text-primary-dark font-medium"
      >
        {showMore ? '− Weniger Felder' : '+ Adresse & weitere Felder'}
      </button>

      {showMore && (
        <>
          <div>
            <label htmlFor="vcard-address" className="block text-sm font-medium text-slate-700 mb-2">
              Straße & Hausnummer
            </label>
            <input
              type="text"
              id="vcard-address"
              value={data.address}
              onChange={(e) => onChange({ ...data, address: e.target.value })}
              placeholder="Musterstraße 123"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="vcard-zip" className="block text-sm font-medium text-slate-700 mb-2">
                PLZ
              </label>
              <input
                type="text"
                id="vcard-zip"
                value={data.zip}
                onChange={(e) => onChange({ ...data, zip: e.target.value })}
                placeholder="12345"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="vcard-city" className="block text-sm font-medium text-slate-700 mb-2">
                Stadt
              </label>
              <input
                type="text"
                id="vcard-city"
                value={data.city}
                onChange={(e) => onChange({ ...data, city: e.target.value })}
                placeholder="Berlin"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label htmlFor="vcard-country" className="block text-sm font-medium text-slate-700 mb-2">
              Land
            </label>
            <input
              type="text"
              id="vcard-country"
              value={data.country}
              onChange={(e) => onChange({ ...data, country: e.target.value })}
              placeholder="Deutschland"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="vcard-note" className="block text-sm font-medium text-slate-700 mb-2">
              Notiz
            </label>
            <textarea
              id="vcard-note"
              value={data.note}
              onChange={(e) => onChange({ ...data, note: e.target.value })}
              placeholder="Weitere Informationen..."
              className="input-field min-h-[80px] resize-y"
            />
          </div>
        </>
      )}
    </div>
  )
}
