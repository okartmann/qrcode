'use client'

import type { BitcoinData } from '@/types/qr'

interface BitcoinFormProps {
  data: BitcoinData
  onChange: (data: BitcoinData) => void
}

export function BitcoinForm({ data, onChange }: BitcoinFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="btc-address" className="block text-sm font-medium text-slate-700 mb-2">
          Bitcoin-Adresse
        </label>
        <input
          type="text"
          id="btc-address"
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
          className="input-field font-mono text-sm"
        />
      </div>

      <div>
        <label htmlFor="btc-amount" className="block text-sm font-medium text-slate-700 mb-2">
          Betrag in BTC (optional)
        </label>
        <input
          type="text"
          id="btc-amount"
          value={data.amount}
          onChange={(e) => onChange({ ...data, amount: e.target.value })}
          placeholder="0.001"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="btc-label" className="block text-sm font-medium text-slate-700 mb-2">
          Label (optional)
        </label>
        <input
          type="text"
          id="btc-label"
          value={data.label}
          onChange={(e) => onChange({ ...data, label: e.target.value })}
          placeholder="Spende für..."
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="btc-message" className="block text-sm font-medium text-slate-700 mb-2">
          Nachricht (optional)
        </label>
        <input
          type="text"
          id="btc-message"
          value={data.message}
          onChange={(e) => onChange({ ...data, message: e.target.value })}
          placeholder="Vielen Dank für Ihre Unterstützung"
          className="input-field"
        />
      </div>
    </div>
  )
}
