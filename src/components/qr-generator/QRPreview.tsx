'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import QRCode from 'qrcode'
import type { QROptions, QRCodeType } from '@/types/qr'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface QRPreviewProps {
  data: string | null
  options: QROptions
  type: QRCodeType
}

// Placeholder URL for preview when no data is entered
const PLACEHOLDER_DATA = 'https://qrcode.de'

export function QRPreview({ data, options, type }: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  // Use actual data or placeholder for preview
  const displayData = data || PLACEHOLDER_DATA
  const isPreview = !data

  const drawLogo = useCallback((canvas: HTMLCanvasElement, logoSrc: string) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvasSize = canvas.width
      const logoSize = options.logoSize
      const padding = options.logoPadding
      const totalSize = logoSize + padding * 2

      // Calculate center position
      const x = (canvasSize - totalSize) / 2
      const y = (canvasSize - totalSize) / 2

      // Draw white background for logo
      ctx.fillStyle = options.logoBackgroundColor
      ctx.beginPath()
      ctx.roundRect(x, y, totalSize, totalSize, 8)
      ctx.fill()

      // Draw logo
      const logoX = x + padding
      const logoY = y + padding
      ctx.drawImage(img, logoX, logoY, logoSize, logoSize)
    }
    img.src = logoSrc
  }, [options.logoSize, options.logoPadding, options.logoBackgroundColor])

  useEffect(() => {
    if (!canvasRef.current) {
      setError(null)
      return
    }

    // Use higher error correction when logo is present
    const errorLevel = options.logo ?
      (options.errorCorrection === 'L' ? 'M' : options.errorCorrection) :
      options.errorCorrection

    // Limit preview size to 300px for performance, actual download uses full size
    const previewSize = Math.min(options.size, 300)

    const qrOptions = {
      width: previewSize,
      margin: 2,
      color: {
        dark: options.color,
        light: options.bgColor,
      },
      errorCorrectionLevel: errorLevel,
    }

    QRCode.toCanvas(canvasRef.current, displayData, qrOptions, (err) => {
      if (err) {
        console.error(err)
        setError('Fehler beim Generieren des QR-Codes.')
      } else {
        setError(null)
        // Draw logo if present
        if (options.logo && canvasRef.current) {
          // Scale logo size for preview
          const scaleFactor = previewSize / options.size
          const scaledLogoSize = options.logoSize * scaleFactor
          const scaledPadding = options.logoPadding * scaleFactor

          const ctx = canvasRef.current.getContext('2d')
          if (ctx) {
            const canvasSize = canvasRef.current.width
            const totalSize = scaledLogoSize + scaledPadding * 2
            const x = (canvasSize - totalSize) / 2
            const y = (canvasSize - totalSize) / 2

            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => {
              ctx.fillStyle = options.logoBackgroundColor
              ctx.beginPath()
              ctx.roundRect(x, y, totalSize, totalSize, 8 * scaleFactor)
              ctx.fill()
              ctx.drawImage(img, x + scaledPadding, y + scaledPadding, scaledLogoSize, scaledLogoSize)
            }
            img.src = options.logo
          }
        }
      }
    })
  }, [displayData, options, drawLogo])

  const downloadPNG = async () => {
    if (!data) return

    // Create a new canvas for the full-size download
    const downloadCanvas = document.createElement('canvas')
    downloadCanvas.width = options.size
    downloadCanvas.height = options.size

    const errorLevel = options.logo ?
      (options.errorCorrection === 'L' ? 'M' : options.errorCorrection) :
      options.errorCorrection

    const qrOptions = {
      width: options.size,
      margin: 2,
      color: {
        dark: options.color,
        light: options.bgColor,
      },
      errorCorrectionLevel: errorLevel,
    }

    try {
      await QRCode.toCanvas(downloadCanvas, data, qrOptions)

      // Draw logo at full size if present
      if (options.logo) {
        const ctx = downloadCanvas.getContext('2d')
        if (ctx) {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          await new Promise<void>((resolve) => {
            img.onload = () => {
              const canvasSize = downloadCanvas.width
              const logoSize = options.logoSize
              const padding = options.logoPadding
              const totalSize = logoSize + padding * 2
              const x = (canvasSize - totalSize) / 2
              const y = (canvasSize - totalSize) / 2

              ctx.fillStyle = options.logoBackgroundColor
              ctx.beginPath()
              ctx.roundRect(x, y, totalSize, totalSize, 8)
              ctx.fill()
              ctx.drawImage(img, x + padding, y + padding, logoSize, logoSize)
              resolve()
            }
            img.src = options.logo!
          })
        }
      }

      const link = document.createElement('a')
      link.download = `qrcode-${type}-${options.size}px-${Date.now()}.png`
      link.href = downloadCanvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error(err)
    }
  }

  const downloadSVG = async () => {
    if (!data) return

    const errorLevel = options.logo ?
      (options.errorCorrection === 'L' ? 'M' : options.errorCorrection) :
      options.errorCorrection

    const qrOptions = {
      width: options.size,
      margin: 2,
      color: {
        dark: options.color,
        light: options.bgColor,
      },
      errorCorrectionLevel: errorLevel,
      type: 'svg' as const,
    }

    try {
      let svg = await QRCode.toString(data, qrOptions)

      // Embed logo in SVG if present
      if (options.logo) {
        const logoSize = options.logoSize
        const padding = options.logoPadding
        const totalSize = logoSize + padding * 2
        const x = (options.size - totalSize) / 2
        const y = (options.size - totalSize) / 2

        // Add logo elements before closing </svg>
        const logoElements = `
          <rect x="${x}" y="${y}" width="${totalSize}" height="${totalSize}" rx="8" fill="${options.logoBackgroundColor}"/>
          <image x="${x + padding}" y="${y + padding}" width="${logoSize}" height="${logoSize}" href="${options.logo}"/>
        `
        svg = svg.replace('</svg>', logoElements + '</svg>')
      }

      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `qrcode-${type}-${options.size}px-${Date.now()}.svg`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="card text-center relative">
      {/* Preview Badge */}
      {isPreview && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Vorschau
          </span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-slate-600 mb-4">
        {isPreview ? 'Live-Vorschau' : 'Ihr QR-Code'}
      </h3>

      {/* Preview info text */}
      {isPreview && (
        <p className="text-xs text-slate-500 mb-4 -mt-2">
          Geben Sie Daten ein, um Ihren QR-Code zu erstellen
        </p>
      )}

      <div className={`bg-slate-50 rounded-lg p-4 min-h-[200px] flex items-center justify-center mb-4 ${isPreview ? 'border-2 border-dashed border-slate-300' : ''}`}>
        {error ? (
          <div className="text-red-500 flex flex-col items-center gap-3">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth={2} />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth={2} />
            </svg>
            <p>{error}</p>
          </div>
        ) : (
          <div className="relative">
            <canvas
              ref={canvasRef}
              className={`max-w-full h-auto rounded-lg ${isPreview ? 'opacity-70' : ''}`}
            />
            {isPreview && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                  <span className="text-xs font-medium text-slate-600">qrcode.de</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Size indicator */}
      <p className="text-xs text-slate-500 mb-4">
        Download-Größe: <span className="font-medium">{options.size} × {options.size} Pixel</span>
      </p>

      {/* Download buttons - only show when data is present */}
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

      {/* Call to action when in preview mode */}
      {isPreview && (
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Füllen Sie das Formular aus und klicken Sie auf
          </p>
          <p className="text-sm font-semibold text-primary mt-1">
            &quot;QR-Code generieren&quot;
          </p>
        </div>
      )}
    </div>
  )
}
