'use client'

import { useRef, useState } from 'react'
import type { QROptions, DotStyle, CornerFrameStyle, CornerDotStyle, FrameStyle, SocialLogo } from '@/types/qr'
import { colorPalettes, frameTemplates, socialLogos } from '@/types/qr'
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface QRCustomizationProps {
  options: QROptions
  onChange: (options: QROptions) => void
}

interface CollapsibleSectionProps {
  title: string
  description?: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function CollapsibleSection({ title, description, defaultOpen = false, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="text-left">
          <h4 className="font-semibold text-slate-800">{title}</h4>
          {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
        </div>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-slate-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-slate-500" />
        )}
      </button>
      {isOpen && <div className="p-4 border-t border-slate-200">{children}</div>}
    </div>
  )
}

export function QRCustomization({ options, onChange }: QRCustomizationProps) {
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

  const selectSocialLogo = (logoId: SocialLogo) => {
    const logo = socialLogos.find(l => l.id === logoId)
    if (logo) {
      // Create an SVG data URL from the logo path
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${logo.color}"><path d="${logo.svgPath}"/></svg>`
      const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`
      onChange({ ...options, logo: dataUrl, errorCorrection: 'H' })
    }
  }

  const applyColorPalette = (paletteId: string) => {
    const palette = colorPalettes.find(p => p.id === paletteId)
    if (palette) {
      onChange({
        ...options,
        color: palette.primary,
        bgColor: palette.secondary,
        cornerColor: palette.accent || palette.primary,
        cornerDotColor: palette.accent || palette.primary,
      })
    }
  }

  const dotStyles: { id: DotStyle; name: string; preview: string }[] = [
    { id: 'square', name: 'Quadrat', preview: '■' },
    { id: 'rounded', name: 'Abgerundet', preview: '▢' },
    { id: 'dots', name: 'Punkte', preview: '●' },
    { id: 'classy', name: 'Klassisch', preview: '◆' },
    { id: 'classy-rounded', name: 'Klassisch Rund', preview: '◇' },
    { id: 'diamond', name: 'Diamant', preview: '◈' },
    { id: 'star', name: 'Stern', preview: '★' },
  ]

  const cornerFrameStyles: { id: CornerFrameStyle; name: string }[] = [
    { id: 'square', name: 'Quadrat' },
    { id: 'rounded', name: 'Abgerundet' },
    { id: 'circle', name: 'Kreis' },
    { id: 'rounded-sm', name: 'Leicht Rund' },
  ]

  const cornerDotStyles: { id: CornerDotStyle; name: string }[] = [
    { id: 'square', name: 'Quadrat' },
    { id: 'dot', name: 'Punkt' },
    { id: 'rounded', name: 'Abgerundet' },
  ]

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
      <h3 className="text-lg font-semibold mb-4">Design & Anpassung</h3>

      {/* Color Palettes Section */}
      <CollapsibleSection
        title="Farbschema"
        description="Wähle ein fertiges Farbschema oder passe die Farben an"
        defaultOpen={true}
      >
        {/* Preset Color Palettes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Fertige Farbpaletten
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {colorPalettes.slice(0, 18).map((palette) => (
              <button
                key={palette.id}
                type="button"
                onClick={() => applyColorPalette(palette.id)}
                className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all hover:scale-105 ${
                  options.color === palette.primary && options.bgColor === palette.secondary
                    ? 'border-primary shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                title={palette.name}
              >
                <div className="flex rounded overflow-hidden shadow-sm">
                  <div className="w-5 h-8" style={{ backgroundColor: palette.primary }} />
                  <div className="w-5 h-8" style={{ backgroundColor: palette.secondary }} />
                </div>
                <span className="text-xs text-slate-600 mt-1 truncate max-w-full">{palette.name}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const section = document.getElementById('more-palettes')
              if (section) section.classList.toggle('hidden')
            }}
            className="text-sm text-primary hover:text-primary-dark font-medium mt-2"
          >
            + Mehr Farbpaletten anzeigen
          </button>
          <div id="more-palettes" className="hidden mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
            {colorPalettes.slice(18).map((palette) => (
              <button
                key={palette.id}
                type="button"
                onClick={() => applyColorPalette(palette.id)}
                className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all hover:scale-105 ${
                  options.color === palette.primary && options.bgColor === palette.secondary
                    ? 'border-primary shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                title={palette.name}
              >
                <div className="flex rounded overflow-hidden shadow-sm">
                  <div className="w-5 h-8" style={{ backgroundColor: palette.primary }} />
                  <div className="w-5 h-8" style={{ backgroundColor: palette.secondary }} />
                </div>
                <span className="text-xs text-slate-600 mt-1 truncate max-w-full">{palette.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="grid grid-cols-2 gap-4">
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
      </CollapsibleSection>

      {/* Dot/Pattern Style Section */}
      <CollapsibleSection
        title="QR-Code Muster"
        description="Wähle einen Stil für die QR-Code Module"
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Musterstil
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {dotStyles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange({ ...options, dotStyle: style.id })}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                  options.dotStyle === style.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl mb-1" style={{ color: options.color }}>{style.preview}</span>
                <span className="text-xs text-slate-600">{style.name}</span>
              </button>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Corner/Eye Styles Section */}
      <CollapsibleSection
        title="Ecken"
        description="Passe die Eckmarker des QR-Codes an"
      >
        {/* Corner Frame Style */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Eckrahmen-Stil
          </label>
          <div className="grid grid-cols-4 gap-2">
            {cornerFrameStyles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange({ ...options, cornerFrameStyle: style.id })}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                  options.cornerFrameStyle === style.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-8 h-8 border-4 ${
                    style.id === 'square' ? 'rounded-none' :
                    style.id === 'rounded' ? 'rounded-lg' :
                    style.id === 'circle' ? 'rounded-full' :
                    'rounded-sm'
                  }`}
                  style={{ borderColor: options.cornerColor }}
                />
                <span className="text-xs text-slate-600 mt-2">{style.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Corner Dot Style */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Eckpunkt-Stil
          </label>
          <div className="grid grid-cols-3 gap-2">
            {cornerDotStyles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange({ ...options, cornerDotStyle: style.id })}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                  options.cornerDotStyle === style.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 ${
                    style.id === 'square' ? 'rounded-none' :
                    style.id === 'dot' ? 'rounded-full' :
                    'rounded-sm'
                  }`}
                  style={{ backgroundColor: options.cornerDotColor }}
                />
                <span className="text-xs text-slate-600 mt-2">{style.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Corner Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Eckrahmen-Farbe
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={options.cornerColor}
                onChange={(e) => onChange({ ...options, cornerColor: e.target.value })}
                className="w-10 h-8 p-1 border-2 border-slate-200 rounded cursor-pointer"
              />
              <input
                type="text"
                value={options.cornerColor}
                onChange={(e) => onChange({ ...options, cornerColor: e.target.value })}
                className="flex-1 input-field !py-1.5 font-mono text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Eckpunkte-Farbe
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={options.cornerDotColor}
                onChange={(e) => onChange({ ...options, cornerDotColor: e.target.value })}
                className="w-10 h-8 p-1 border-2 border-slate-200 rounded cursor-pointer"
              />
              <input
                type="text"
                value={options.cornerDotColor}
                onChange={(e) => onChange({ ...options, cornerDotColor: e.target.value })}
                className="flex-1 input-field !py-1.5 font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Logo Section */}
      <CollapsibleSection
        title="Logo hinzufügen"
        description="Personalisiere deinen QR-Code mit einem Logo"
      >
        {/* Social Media Logo Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Logo auswählen
          </label>
          <div className="flex flex-wrap gap-2">
            {socialLogos.slice(0, 12).map((logo) => (
              <button
                key={logo.id}
                type="button"
                onClick={() => selectSocialLogo(logo.id)}
                className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-slate-200 hover:border-slate-300 hover:scale-105 transition-all"
                title={logo.name}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill={logo.color}>
                  <path d={logo.svgPath} />
                </svg>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const section = document.getElementById('more-logos')
              if (section) section.classList.toggle('hidden')
            }}
            className="text-sm text-primary hover:text-primary-dark font-medium mt-2"
          >
            + Mehr Logos anzeigen
          </button>
          <div id="more-logos" className="hidden mt-3 flex flex-wrap gap-2">
            {socialLogos.slice(12).map((logo) => (
              <button
                key={logo.id}
                type="button"
                onClick={() => selectSocialLogo(logo.id)}
                className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-slate-200 hover:border-slate-300 hover:scale-105 transition-all"
                title={logo.name}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill={logo.color}>
                  <path d={logo.svgPath} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Logo Upload */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Eigenes Logo hochladen
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-700">Lade ein Bild hoch (jpg, png, svg)</p>
                <p className="text-sm text-slate-500">Maximale Dateigröße: 5 MB</p>
              </div>
            </div>
          </div>

          {/* Current Logo Preview */}
          {options.logo && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <img src={options.logo} alt="Logo" className="w-12 h-12 object-contain rounded" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Logo aktiv</p>
                <p className="text-xs text-slate-500">Fehlerkorrektur wurde auf Hoch gesetzt</p>
              </div>
              <button
                type="button"
                onClick={removeLogo}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Logo entfernen"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Logo Size Slider */}
          {options.logo && (
            <div className="mt-4">
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
      </CollapsibleSection>

      {/* Frame Section */}
      <CollapsibleSection
        title="QR-Code Rahmen"
        description="Rahmen verbessern die Sichtbarkeit und führen zu mehr Scans"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Rahmen-Stil
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {frameTemplates.map((frame) => (
              <button
                key={frame.id}
                type="button"
                onClick={() => {
                  onChange({
                    ...options,
                    frameStyle: frame.id,
                    frameText: frame.defaultText || options.frameText
                  })
                }}
                className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                  options.frameStyle === frame.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                title={frame.description}
              >
                {/* Frame Preview */}
                <div className="w-12 h-14 flex items-center justify-center relative">
                  {frame.id === 'none' ? (
                    <div className="w-8 h-8 border-2 border-slate-300 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className={`w-10 h-10 border-2 ${
                        frame.category === 'simple' ? 'border-slate-800' :
                        frame.category === 'decorative' ? 'border-primary' :
                        'border-slate-700'
                      } ${
                        frame.id.includes('rounded') || frame.id === 'circle' ? 'rounded-lg' : 'rounded'
                      } flex items-center justify-center bg-white relative`}
                    >
                      <div className="w-5 h-5 grid grid-cols-3 gap-px">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="bg-slate-800 rounded-sm" />
                        ))}
                      </div>
                      {frame.hasText && (
                        <div className={`absolute ${
                          frame.id.includes('top') ? '-top-1' : '-bottom-1'
                        } left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[4px] px-1 rounded-sm whitespace-nowrap`}>
                          Text
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-600 text-center leading-tight mt-1">{frame.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Frame Text (if frame has text) */}
        {frameTemplates.find(f => f.id === options.frameStyle)?.hasText && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rahmen-Text
            </label>
            <input
              type="text"
              value={options.frameText}
              onChange={(e) => onChange({ ...options, frameText: e.target.value })}
              placeholder="z.B. Jetzt scannen!"
              className="input-field"
              maxLength={30}
            />
          </div>
        )}

        {/* Frame Color */}
        {options.frameStyle !== 'none' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rahmen-Farbe
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={options.frameColor}
                onChange={(e) => onChange({ ...options, frameColor: e.target.value })}
                className="w-12 h-10 p-1 border-2 border-slate-200 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={options.frameColor}
                onChange={(e) => onChange({ ...options, frameColor: e.target.value })}
                className="flex-1 input-field !py-2 font-mono text-sm"
              />
            </div>
          </div>
        )}
      </CollapsibleSection>

      {/* Size & Quality Section */}
      <CollapsibleSection
        title="Größe & Qualität"
        description="Passe Größe und Fehlerkorrektur an"
      >
        {/* Size */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Größe: <span className="text-primary font-semibold">{options.size}px</span>
          </label>
          <input
            type="range"
            min="128"
            max="4096"
            step="32"
            value={options.size}
            onChange={(e) => onChange({ ...options, size: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
                       [&::-webkit-slider-thumb]:hover:scale-110"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>Klein (128px)</span>
            <span>Mittel (1024px)</span>
            <span>Groß (4096px)</span>
          </div>
          {options.size > 1024 && (
            <p className="text-xs text-amber-600 mt-2">
              Hinweis: Größere QR-Codes benötigen mehr Speicherplatz und Ladezeit.
            </p>
          )}
        </div>

        {/* Error Correction */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fehlerkorrektur
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { value: 'L', label: 'Niedrig', desc: '7%' },
              { value: 'M', label: 'Mittel', desc: '15%' },
              { value: 'Q', label: 'Quartil', desc: '25%' },
              { value: 'H', label: 'Hoch', desc: '30%' },
            ].map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => onChange({ ...options, errorCorrection: level.value as QROptions['errorCorrection'] })}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  options.errorCorrection === level.value
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="block font-semibold text-slate-800">{level.label}</span>
                <span className="text-xs text-slate-500">{level.desc}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Höhere Fehlerkorrektur = größerer QR-Code, aber bessere Scanbarkeit bei Beschädigungen oder mit Logo.
          </p>
        </div>
      </CollapsibleSection>
    </div>
  )
}
