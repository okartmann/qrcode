'use client'

import type { WhatsAppData } from '@/types/qr'

interface WhatsAppFormProps {
  data: WhatsAppData
  onChange: (data: WhatsAppData) => void
}

export function WhatsAppForm({ data, onChange }: WhatsAppFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="wa-phone" className="block text-sm font-medium text-slate-700 mb-2">
          Telefonnummer (mit Ländervorwahl)
        </label>
        <input
          type="tel"
          id="wa-phone"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          placeholder="+49 123 456789"
          className="input-field"
        />
        <p className="text-xs text-slate-500 mt-1">
          Ländervorwahl ohne + oder 00 (z.B. 49 für Deutschland)
        </p>
      </div>

      <div>
        <label htmlFor="wa-message" className="block text-sm font-medium text-slate-700 mb-2">
          Nachricht (optional)
        </label>
        <textarea
          id="wa-message"
          value={data.message}
          onChange={(e) => onChange({ ...data, message: e.target.value })}
          placeholder="Ihre WhatsApp-Nachricht..."
          className="input-field min-h-[100px] resize-y"
        />
      </div>
    </div>
  )
}
