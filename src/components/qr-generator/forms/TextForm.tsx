'use client'

interface TextFormProps {
  value: string
  onChange: (value: string) => void
}

export function TextForm({ value, onChange }: TextFormProps) {
  return (
    <div>
      <label htmlFor="text-input" className="block text-sm font-medium text-slate-700 mb-2">
        Text eingeben
      </label>
      <textarea
        id="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ihr Text hier..."
        className="input-field min-h-[120px] resize-y"
      />
    </div>
  )
}
