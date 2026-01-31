'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import QRCode from 'qrcode'
import type { QROptions, QRCodeType } from '@/types/qr'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface QRPreviewProps {
  data: string | null
  options: QROptions
  type: QRCodeType
  compact?: boolean  // For mobile sticky preview
}

// Placeholder URL for preview when no data is entered
const PLACEHOLDER_DATA = 'https://qrcode.de'

export function QRPreview({ data, options, type, compact = false }: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  // Use actual data or placeholder for preview
  const displayData = data || PLACEHOLDER_DATA
  const isPreview = !data

  const drawLogo = useCallback((canvas: HTMLCanvasElement, logoSrc: string, scaleFactor: number = 1) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvasSize = canvas.width
      const logoSize = options.logoSize * scaleFactor
      const padding = options.logoPadding * scaleFactor
      const totalSize = logoSize + padding * 2

      const x = (canvasSize - totalSize) / 2
      const y = (canvasSize - totalSize) / 2

      ctx.fillStyle = options.logoBackgroundColor
      ctx.beginPath()
      ctx.roundRect(x, y, totalSize, totalSize, 8 * scaleFactor)
      ctx.fill()

      ctx.drawImage(img, x + padding, y + padding, logoSize, logoSize)
    }
    img.src = logoSrc
  }, [options.logoSize, options.logoPadding, options.logoBackgroundColor])

  useEffect(() => {
    if (!canvasRef.current) {
      setError(null)
      return
    }

    const errorLevel = options.logo ?
      (options.errorCorrection === 'L' ? 'M' : options.errorCorrection) :
      options.errorCorrection

    // Compact mode uses smaller size, normal preview limited to 300px
    const previewSize = compact ? 80 : Math.min(options.size, 300)

    const qrOptions = {
      width: previewSize,
      margin: compact ? 1 : 2,
      color: {
        dark: options.color,
        light: options.bgColor,
      },
      errorCorrectionLevel: errorLevel,
    }

    QRCode.toCanvas(canvasRef.current, displayData, qrOptions, (err) => {
      if (err) {
        console.error(err)
        setError('Fehler')
      } else {
        setError(null)
        if (options.logo && canvasRef.current) {
          const scaleFactor = previewSize / options.size
          drawLogo(canvasRef.current, options.logo, scaleFactor)
        }
      }
    })
  }, [displayData, options, compact, drawLogo])

  // Compact mode for mobile sticky preview
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className={`relative ${isPreview ? 'opacity-60' : ''}`}>
          {error ? (
            <div className="w-[80px] h-[80px] bg-slate-100 rounded flex items-center justify-center">
              <span className="text-xs text-slate-400">Fehler</span>
            </div>
          ) : (
            <canvas ref={canvasRef} className="rounded shadow-sm" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {isPreview ? (
            <p className="text-sm text-slate-500">
              Live-Vorschau
            </p>
          ) : (
            <p className="text-sm font-medium text-green-600">
              QR-Code bereit!
            </p>
          )}
          <p className="text-xs text-slate-400 truncate">
            {options.size}×{options.size}px
          </p>
        </div>
      </div>
    )
  }

  // Full preview mode
  const downloadPNG = async () => {
    if (!data) return

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

      if (options.logo) {
        const logoSize = options.logoSize
        const padding = options.logoPadding
        const totalSize = logoSize + padding * 2
        const x = (options.size - totalSize) / 2
        const y = (options.size - totalSize) / 2

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
      {/* Preview Badge - outside the QR code */}
      {isPreview && (
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Live-Vorschau mit Beispieldaten
          </span>
        </div>
      )}

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
        ) : (
          <canvas
            ref={canvasRef}
            className={`max-w-full h-auto rounded-lg ${isPreview ? 'opacity-50' : ''}`}
          />
        )}
      </div>

      {/* Info line */}
      <p className="text-xs text-slate-500 mb-4">
        {isPreview ? (
          <>Geben Sie Ihre Daten ein um einen QR-Code zu erstellen</>
        ) : (
          <>Download-Größe: <span className="font-medium">{options.size} × {options.size} Pixel</span></>
        )}
      </p>

      {/* Download buttons */}
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
