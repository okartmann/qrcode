'use client'

interface PhoneFormProps {
  value: string
  onChange: (value: string) => void
}

export function PhoneForm({ value, onChange }: PhoneFormProps) {
  return (
    <div>
      <label htmlFor="phone-number" className="block text-sm font-medium text-slate-700 mb-2">
        Telefonnummer
      </label>
      <input
        type="tel"
        id="phone-number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="+49 123 456789"
        className="input-field"
      />
    </div>
  )
}
