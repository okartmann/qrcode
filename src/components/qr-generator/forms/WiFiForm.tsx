'use client'

import type { WiFiData } from '@/types/qr'

interface WiFiFormProps {
  data: WiFiData
  onChange: (data: WiFiData) => void
}

export function WiFiForm({ data, onChange }: WiFiFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="wifi-ssid" className="block text-sm font-medium text-slate-700 mb-2">
          Netzwerkname (SSID)
        </label>
        <input
          type="text"
          id="wifi-ssid"
          value={data.ssid}
          onChange={(e) => onChange({ ...data, ssid: e.target.value })}
          placeholder="Mein WLAN"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="wifi-password" className="block text-sm font-medium text-slate-700 mb-2">
          Passwort
        </label>
        <input
          type="text"
          id="wifi-password"
          value={data.password}
          onChange={(e) => onChange({ ...data, password: e.target.value })}
          placeholder="Passwort eingeben"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="wifi-encryption" className="block text-sm font-medium text-slate-700 mb-2">
          Verschlüsselung
        </label>
        <select
          id="wifi-encryption"
          value={data.encryption}
          onChange={(e) => onChange({ ...data, encryption: e.target.value as WiFiData['encryption'] })}
          className="input-field cursor-pointer"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Keine</option>
        </select>
      </div>
    </div>
  )
}
