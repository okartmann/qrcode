'use client'

import { useEffect, useRef, useState } from 'react'
import type { QROptions, QRCodeType, DotStyle, CornerFrameStyle, CornerDotStyle } from '@/types/qr'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { QRCodeFrame } from './QRCodeFrame'

interface QRPreviewProps {
  data: string | null
  options: QROptions
  type: QRCodeType
  compact?: boolean
}

const PLACEHOLDER_DATA = 'https://qrcode.de'

// Map our dot styles to qr-code-styling types
const mapDotStyle = (style: DotStyle): string => {
  const mapping: Record<DotStyle, string> = {
    'square': 'square',
    'rounded': 'rounded',
    'dots': 'dots',
    'classy': 'classy',
    'classy-rounded': 'classy-rounded',
    'extra-rounded': 'extra-rounded',
  }
  return mapping[style] || 'square'
}

// Map corner frame styles
const mapCornerFrameStyle = (style: CornerFrameStyle): string => {
  const mapping: Record<CornerFrameStyle, string> = {
    'square': 'square',
    'rounded': 'extra-rounded',
    'circle': 'dot',
    'rounded-sm': 'extra-rounded',
  }
  return mapping[style] || 'square'
}

// Map corner dot styles
const mapCornerDotStyle = (style: CornerDotStyle): string => {
  const mapping: Record<CornerDotStyle, string> = {
    'square': 'square',
    'dot': 'dot',
    'rounded': 'dot',
  }
  return mapping[style] || 'square'
}

export function QRPreview({ data, options, type, compact = false }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameContainerRef = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<InstanceType<typeof import('qr-code-styling').default> | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const renderIdRef = useRef(0)

  const displayData = data || PLACEHOLDER_DATA
  const isPreview = !data

  // Create a unique key based on QR-relevant options (not frame options)
  const qrKey = `${displayData}-${options.color}-${options.bgColor}-${options.dotStyle}-${options.cornerFrameStyle}-${options.cornerDotStyle}-${options.cornerColor}-${options.cornerDotColor}-${options.logo || 'nologo'}-${options.errorCorrection}-${compact}`

  // Initialize on client side only
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Create and update QR code
  useEffect(() => {
    if (!isClient || !containerRef.current) return

    // Increment render ID to track this specific render
    renderIdRef.current += 1
    const currentRenderId = renderIdRef.current

    // Store ref to current container for cleanup
    const currentContainer = containerRef.current

    // Clear container immediately
    currentContainer.innerHTML = ''

    const initQR = async () => {
      try {
        const QRCodeStyling = (await import('qr-code-styling')).default

        // Don't proceed if a newer render has started
        if (currentRenderId !== renderIdRef.current) return

        const size = compact ? 80 : Math.min(options.size, 300)

        const qrOptions: ConstructorParameters<typeof QRCodeStyling>[0] = {
          width: size,
          height: size,
          data: displayData,
          margin: compact ? 2 : 8,
          dotsOptions: {
            color: options.color,
            type: mapDotStyle(options.dotStyle) as 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded',
          },
          cornersSquareOptions: {
            color: options.cornerColor,
            type: mapCornerFrameStyle(options.cornerFrameStyle) as 'square' | 'extra-rounded' | 'dot',
          },
          cornersDotOptions: {
            color: options.cornerDotColor,
            type: mapCornerDotStyle(options.cornerDotStyle) as 'square' | 'dot',
          },
          backgroundOptions: {
            color: options.bgColor,
          },
          qrOptions: {
            errorCorrectionLevel: options.logo ?
              (options.errorCorrection === 'L' ? 'M' : options.errorCorrection) :
              options.errorCorrection,
          },
        }

        // Add logo if present
        if (options.logo) {
          const scaleFactor = size / options.size
          qrOptions.image = options.logo
          qrOptions.imageOptions = {
            crossOrigin: 'anonymous',
            margin: Math.round(options.logoPadding * scaleFactor),
            imageSize: 0.4,
            hideBackgroundDots: true,
          }
        }

        // Check again before appending
        if (currentRenderId !== renderIdRef.current) return

        // Create new QR code
        const qrCode = new QRCodeStyling(qrOptions)
        qrCodeRef.current = qrCode

        // Final check and clear before append
        if (currentRenderId === renderIdRef.current && currentContainer) {
          currentContainer.innerHTML = ''
          qrCode.append(currentContainer)
        }

        setError(null)
      } catch (err) {
        console.error('QR Code generation error:', err)
        if (currentRenderId === renderIdRef.current) {
          setError('Fehler beim Generieren')
        }
      }
    }

    initQR()

    // Cleanup function
    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = ''
      }
    }
  }, [isClient, displayData, options, compact])

  // Download handlers
  const downloadPNG = async () => {
    if (!data || !isClient) return

    try {
      // If frame is enabled, use html2canvas to capture the full frame
      if (options.frameStyle !== 'none' && frameContainerRef.current) {
        const html2canvas = (await import('html2canvas')).default

        // Calculate scale factor for high-quality output
        const previewSize = Math.min(options.size, 300)
        const scale = options.size / previewSize

        const canvas = await html2canvas(frameContainerRef.current, {
          backgroundColor: null,
          scale: scale * 2, // 2x for retina quality
          logging: false,
          useCORS: true,
        })

        // Download the canvas
        const link = document.createElement('a')
        link.download = `qrcode-${type}-${options.size}px-${Date.now()}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        return
      }

      // Otherwise, use qr-code-styling native download
      const QRCodeStyling = (await import('qr-code-styling')).default

      const qrOptions: ConstructorParameters<typeof QRCodeStyling>[0] = {
        width: options.size,
        height: options.size,
        data: data,
        margin: 8,
        dotsOptions: {
          color: options.color,
          type: mapDotStyle(options.dotStyle) as 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded',
        },
        cornersSquareOptions: {
          color: options.cornerColor,
          type: mapCornerFrameStyle(options.cornerFrameStyle) as 'square' | 'extra-rounded' | 'dot',
        },
        cornersDotOptions: {
          color: options.cornerDotColor,
          type: mapCornerDotStyle(options.cornerDotStyle) as 'square' | 'dot',
        },
        backgroundOptions: {
          color: options.bgColor,
        },
        qrOptions: {
          errorCorrectionLevel: options.logo ?
            (options.errorCorrection === 'L' ? 'M' : options.errorCorrection) :
            options.errorCorrection,
        },
      }

      if (options.logo) {
        qrOptions.image = options.logo
        qrOptions.imageOptions = {
          crossOrigin: 'anonymous',
          margin: options.logoPadding,
          imageSize: 0.4,
          hideBackgroundDots: true,
        }
      }

      const downloadQR = new QRCodeStyling(qrOptions)
      await downloadQR.download({
        name: `qrcode-${type}-${options.size}px-${Date.now()}`,
        extension: 'png',
      })
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  const downloadSVG = async () => {
    if (!data || !isClient) return

    try {
      // If frame is enabled, convert html2canvas to data URL (SVG export with frames is limited)
      if (options.frameStyle !== 'none' && frameContainerRef.current) {
        const html2canvas = (await import('html2canvas')).default

        // Calculate scale factor for high-quality output
        const previewSize = Math.min(options.size, 300)
        const scale = options.size / previewSize

        const canvas = await html2canvas(frameContainerRef.current, {
          backgroundColor: null,
          scale: scale * 2,
          logging: false,
          useCORS: true,
        })

        // For framed QR codes, download as PNG since SVG with frames is complex
        const link = document.createElement('a')
        link.download = `qrcode-${type}-${options.size}px-${Date.now()}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        return
      }

      // Without frame, use native SVG export
      const QRCodeStyling = (await import('qr-code-styling')).default

      const qrOptions: ConstructorParameters<typeof QRCodeStyling>[0] = {
        width: options.size,
        height: options.size,
        data: data,
        margin: 8,
        type: 'svg',
        dotsOptions: {
          color: options.color,
          type: mapDotStyle(options.dotStyle) as 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded',
        },
        cornersSquareOptions: {
          color: options.cornerColor,
          type: mapCornerFrameStyle(options.cornerFrameStyle) as 'square' | 'extra-rounded' | 'dot',
        },
        cornersDotOptions: {
          color: options.cornerDotColor,
          type: mapCornerDotStyle(options.cornerDotStyle) as 'square' | 'dot',
        },
        backgroundOptions: {
          color: options.bgColor,
        },
        qrOptions: {
          errorCorrectionLevel: options.logo ?
            (options.errorCorrection === 'L' ? 'M' : options.errorCorrection) :
            options.errorCorrection,
        },
      }

      if (options.logo) {
        qrOptions.image = options.logo
        qrOptions.imageOptions = {
          crossOrigin: 'anonymous',
          margin: options.logoPadding,
          imageSize: 0.4,
          hideBackgroundDots: true,
        }
      }

      const downloadQR = new QRCodeStyling(qrOptions)
      await downloadQR.download({
        name: `qrcode-${type}-${options.size}px-${Date.now()}`,
        extension: 'svg',
      })
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  // Compact mode for mobile sticky preview
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className={`relative ${isPreview ? 'opacity-60' : ''}`}>
          {error ? (
            <div className="w-[80px] h-[80px] bg-slate-100 rounded flex items-center justify-center">
              <span className="text-xs text-slate-400">Fehler</span>
            </div>
          ) : !isClient ? (
            <div className="w-[80px] h-[80px] bg-slate-100 rounded animate-pulse" />
          ) : (
            <div ref={containerRef} className="rounded shadow-sm [&>canvas]:rounded [&>svg]:rounded" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {isPreview ? (
            <p className="text-sm text-slate-500">Live-Vorschau</p>
          ) : (
            <p className="text-sm font-medium text-green-600">QR-Code bereit!</p>
          )}
          <p className="text-xs text-slate-400 truncate">{options.size}×{options.size}px</p>
        </div>
      </div>
    )
  }

  // Full preview mode
  return (
    <div className="card text-center relative">
      <div className="mb-3">
        {isPreview ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Live-Vorschau mit Beispieldaten
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Live-Vorschau
          </span>
        )}
      </div>

      <div className={`bg-slate-50 rounded-xl p-6 flex items-center justify-center mb-4 ${isPreview ? 'border-2 border-dashed border-slate-200' : 'border border-slate-200'}`}>
        {error ? (
          <div className="text-red-500 flex flex-col items-center gap-3">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth={2} />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth={2} />
            </svg>
            <p>{error}</p>
          </div>
        ) : !isClient ? (
          <div className="w-[300px] h-[300px] bg-slate-100 rounded-lg animate-pulse" />
        ) : (
          <div ref={frameContainerRef} key={options.frameStyle}>
            <QRCodeFrame
              frameStyle={options.frameStyle}
              frameColor={options.frameColor}
              frameText={options.frameText}
              size={Math.min(options.size, 300)}
              bgColor={options.bgColor}
            >
              <div
                key={qrKey}
                ref={containerRef}
                className={`[&>canvas]:rounded-lg [&>svg]:rounded-lg ${isPreview ? 'opacity-50' : ''}`}
              />
            </QRCodeFrame>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 mb-4">
        {isPreview ? (
          <>Geben Sie Ihre Daten ein um einen QR-Code zu erstellen</>
        ) : (
          <>Download-Größe: <span className="font-medium">{options.size} × {options.size} Pixel</span></>
        )}
      </p>

      {data && !error && (
        <div className="flex flex-col gap-3">
          <button onClick={downloadPNG} className="btn-success w-full">
            <ArrowDownTrayIcon className="w-5 h-5" />
            PNG herunterladen ({options.size}px)
          </button>
          <button onClick={downloadSVG} className="btn-secondary w-full">
            <ArrowDownTrayIcon className="w-5 h-5" />
            SVG herunterladen (Vektor)
          </button>
        </div>
      )}

      {isPreview && (
        <button
          onClick={() => {
            const form = document.querySelector('input, textarea')
            if (form instanceof HTMLElement) form.focus()
          }}
          className="btn-primary w-full"
        >
          Jetzt QR-Code erstellen
        </button>
      )}
    </div>
  )
}
