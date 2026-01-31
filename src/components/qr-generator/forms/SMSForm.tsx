'use client'

import type { SMSData } from '@/types/qr'

interface SMSFormProps {
  data: SMSData
  onChange: (data: SMSData) => void
}

export function SMSForm({ data, onChange }: SMSFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="sms-phone" className="block text-sm font-medium text-slate-700 mb-2">
          Telefonnummer
        </label>
        <input
          type="tel"
          id="sms-phone"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          placeholder="+49 123 456789"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="sms-message" className="block text-sm font-medium text-slate-700 mb-2">
          Nachricht (optional)
        </label>
        <textarea
          id="sms-message"
          value={data.message}
          onChange={(e) => onChange({ ...data, message: e.target.value })}
          placeholder="Ihre SMS-Nachricht..."
          className="input-field min-h-[100px] resize-y"
        />
      </div>
    </div>
  )
}
