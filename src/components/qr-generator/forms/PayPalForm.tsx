'use client'

import type { PayPalData } from '@/types/qr'

interface PayPalFormProps {
  data: PayPalData
  onChange: (data: PayPalData) => void
}

const currencies = [
  { code: 'EUR', name: 'Euro (€)' },
  { code: 'USD', name: 'US Dollar ($)' },
  { code: 'GBP', name: 'Britisches Pfund (£)' },
  { code: 'CHF', name: 'Schweizer Franken' },
]

export function PayPalForm({ data, onChange }: PayPalFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="paypal-email" className="block text-sm font-medium text-slate-700 mb-2">
          PayPal E-Mail
        </label>
        <input
          type="email"
          id="paypal-email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          placeholder="ihre@email.de"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="paypal-item" className="block text-sm font-medium text-slate-700 mb-2">
          Artikelname (optional)
        </label>
        <input
          type="text"
          id="paypal-item"
          value={data.itemName}
          onChange={(e) => onChange({ ...data, itemName: e.target.value })}
          placeholder="Spende, Produkt, Dienstleistung..."
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="paypal-price" className="block text-sm font-medium text-slate-700 mb-2">
            Betrag (optional)
          </label>
          <input
            type="text"
            id="paypal-price"
            value={data.price}
            onChange={(e) => onChange({ ...data, price: e.target.value })}
            placeholder="10.00"
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="paypal-currency" className="block text-sm font-medium text-slate-700 mb-2">
            Währung
          </label>
          <select
            id="paypal-currency"
            value={data.currency}
            onChange={(e) => onChange({ ...data, currency: e.target.value })}
            className="input-field"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
