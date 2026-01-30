'use client'

import type { QROptions } from '@/types/qr'

interface QRCustomizationProps {
  options: QROptions
  onChange: (options: QROptions) => void
}

export function QRCustomization({ options, onChange }: QRCustomizationProps) {
  return (
    <div className="mt-8 pt-6 border-t border-slate-200">
      <h3 className="text-lg font-semibold mb-4">Anpassen</h3>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            QR-Code Farbe
          </label>
          <input
            type="color"
            value={options.color}
            onChange={(e) => onChange({ ...options, color: e.target.value })}
            className="w-16 h-10 p-1 border-2 border-slate-200 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Hintergrund
          </label>
          <input
            type="color"
            value={options.bgColor}
            onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
            className="w-16 h-10 p-1 border-2 border-slate-200 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Größe: <span className="text-primary font-semibold">{options.size}px</span>
        </label>
        <input
          type="range"
          min="128"
          max="512"
          value={options.size}
          onChange={(e) => onChange({ ...options, size: parseInt(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>
    </div>
  )
}
