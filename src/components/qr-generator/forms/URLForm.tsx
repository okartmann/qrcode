'use client'

interface URLFormProps {
  value: string
  onChange: (value: string) => void
}

export function URLForm({ value, onChange }: URLFormProps) {
  return (
    <div>
      <label htmlFor="url-input" className="block text-sm font-medium text-slate-700 mb-2">
        URL eingeben
      </label>
      <input
        type="url"
        id="url-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://beispiel.de"
        className="input-field"
      />
    </div>
  )
}
