'use client'

import { useRef, useState } from 'react'
import type { QROptions } from '@/types/qr'

interface QRCustomizationProps {
  options: QROptions
  onChange: (options: QROptions) => void
}

export function QRCustomization({ options, onChange }: QRCustomizationProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onChange({ ...options, logo: event.target?.result as string, errorCorrection: 'H' })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    onChange({ ...options, logo: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="mt-8 pt-6 border-t border-slate-200">
      <h3 className="text-lg font-semibold mb-4">Anpassen</h3>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            QR-Code Farbe
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={options.color}
              onChange={(e) => onChange({ ...options, color: e.target.value })}
              className="w-12 h-10 p-1 border-2 border-slate-200 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={options.color}
              onChange={(e) => onChange({ ...options, color: e.target.value })}
              className="flex-1 input-field !py-2 font-mono text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Hintergrund
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={options.bgColor}
              onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
              className="w-12 h-10 p-1 border-2 border-slate-200 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={options.bgColor}
              onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
              className="flex-1 input-field !py-2 font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Größe: <span className="text-primary font-semibold">{options.size}px</span>
        </label>
        <input
          type="range"
          min="128"
          max="512"
          step="8"
          value={options.size}
          onChange={(e) => onChange({ ...options, size: parseInt(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>

      {/* Logo Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Logo (optional)
        </label>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-sm font-medium text-primary border-2 border-primary rounded-lg
                       hover:bg-primary hover:text-white transition-colors"
          >
            Logo hochladen
          </button>
          {options.logo && (
            <>
              <img src={options.logo} alt="Logo" className="w-10 h-10 object-contain rounded" />
              <button
                type="button"
                onClick={removeLogo}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Entfernen
              </button>
            </>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1">
          PNG, JPG oder SVG empfohlen. Das Logo wird zentriert eingefügt.
        </p>
      </div>

      {/* Advanced Options Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-primary hover:text-primary-dark font-medium mb-4"
      >
        {showAdvanced ? '− Erweiterte Optionen ausblenden' : '+ Erweiterte Optionen'}
      </button>

      {showAdvanced && (
        <div className="space-y-6 pt-4 border-t border-slate-100">
          {/* Error Correction */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fehlerkorrektur
            </label>
            <select
              value={options.errorCorrection}
              onChange={(e) => onChange({ ...options, errorCorrection: e.target.value as QROptions['errorCorrection'] })}
              className="input-field cursor-pointer"
            >
              <option value="L">Niedrig (7%) - Kleinster QR-Code</option>
              <option value="M">Mittel (15%) - Standard</option>
              <option value="Q">Quartil (25%) - Bessere Lesbarkeit</option>
              <option value="H">Hoch (30%) - Beste Qualität, ideal mit Logo</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">
              Höhere Fehlerkorrektur = größerer QR-Code, aber bessere Scanbarkeit bei Beschädigungen oder mit Logo.
            </p>
          </div>

          {/* Logo Size (if logo is set) */}
          {options.logo && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Logo-Größe: <span className="text-primary font-semibold">{options.logoSize}px</span>
              </label>
              <input
                type="range"
                min="30"
                max="100"
                value={options.logoSize}
                onChange={(e) => onChange({ ...options, logoSize: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                           [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
