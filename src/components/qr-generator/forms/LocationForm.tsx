'use client'

import type { LocationData } from '@/types/qr'

interface LocationFormProps {
  data: LocationData
  onChange: (data: LocationData) => void
}

export function LocationForm({ data, onChange }: LocationFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="loc-query" className="block text-sm font-medium text-slate-700 mb-2">
          Adresse oder Ort
        </label>
        <input
          type="text"
          id="loc-query"
          value={data.query}
          onChange={(e) => onChange({ ...data, query: e.target.value })}
          placeholder="Musterstraße 1, 12345 Berlin"
          className="input-field"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-500">oder Koordinaten</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="loc-lat" className="block text-sm font-medium text-slate-700 mb-2">
            Breitengrad
          </label>
          <input
            type="text"
            id="loc-lat"
            value={data.latitude}
            onChange={(e) => onChange({ ...data, latitude: e.target.value })}
            placeholder="52.520008"
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="loc-lng" className="block text-sm font-medium text-slate-700 mb-2">
            Längengrad
          </label>
          <input
            type="text"
            id="loc-lng"
            value={data.longitude}
            onChange={(e) => onChange({ ...data, longitude: e.target.value })}
            placeholder="13.404954"
            className="input-field"
          />
        </div>
      </div>
    </div>
  )
}
