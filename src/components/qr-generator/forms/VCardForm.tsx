'use client'

import type { VCardData } from '@/types/qr'

interface VCardFormProps {
  data: VCardData
  onChange: (data: VCardData) => void
}

export function VCardForm({ data, onChange }: VCardFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="vcard-name" className="block text-sm font-medium text-slate-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="vcard-name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          placeholder="Max Mustermann"
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
          placeholder="+49 123 456789"
          className="input-field"
        />
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
    </div>
  )
}
