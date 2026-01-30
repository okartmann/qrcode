'use client'

import type { EmailData } from '@/types/qr'

interface EmailFormProps {
  data: EmailData
  onChange: (data: EmailData) => void
}

export function EmailForm({ data, onChange }: EmailFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-2">
          E-Mail-Adresse
        </label>
        <input
          type="email"
          id="email-address"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          placeholder="empfaenger@beispiel.de"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="email-subject" className="block text-sm font-medium text-slate-700 mb-2">
          Betreff
        </label>
        <input
          type="text"
          id="email-subject"
          value={data.subject}
          onChange={(e) => onChange({ ...data, subject: e.target.value })}
          placeholder="Betreff eingeben"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="email-body" className="block text-sm font-medium text-slate-700 mb-2">
          Nachricht
        </label>
        <textarea
          id="email-body"
          value={data.body}
          onChange={(e) => onChange({ ...data, body: e.target.value })}
          placeholder="Ihre Nachricht..."
          className="input-field min-h-[100px] resize-y"
        />
      </div>
    </div>
  )
}
