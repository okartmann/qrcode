'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import QRCode from 'qrcode'
import type { QROptions, QRCodeType } from '@/types/qr'
import { ArrowDownTrayIcon, QrCodeIcon } from '@heroicons/react/24/outline'

interface QRPreviewProps {
  data: string | null
  options: QROptions
  type: QRCodeType
}

export function QRPreview({ data, options, type }: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

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
    if (!data || !canvasRef.current) {
      setError(null)
      return
    }

    // Use higher error correction when logo is present
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

    QRCode.toCanvas(canvasRef.current, data, qrOptions, (err) => {
      if (err) {
        console.error(err)
        setError('Fehler beim Generieren des QR-Codes.')
      } else {
        setError(null)
        // Draw logo if present
        if (options.logo && canvasRef.current) {
          drawLogo(canvasRef.current, options.logo)
        }
      }
    })
  }, [data, options, drawLogo])

  const downloadPNG = () => {
    if (!canvasRef.current) return

    const link = document.createElement('a')
    link.download = `qrcode-${type}-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
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
      link.download = `qrcode-${type}-${Date.now()}.svg`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="card text-center">
      <h3 className="text-lg font-semibold text-slate-600 mb-6">Vorschau</h3>

      <div className="bg-slate-50 rounded-lg p-6 min-h-[280px] flex items-center justify-center mb-6">
        {error ? (
          <div className="text-red-500 flex flex-col items-center gap-3">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth={2} />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth={2} />
            </svg>
            <p>{error}</p>
          </div>
        ) : data ? (
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg animate-fadeIn" />
        ) : (
          <div className="text-slate-400 flex flex-col items-center gap-3">
            <QrCodeIcon className="w-16 h-16 opacity-50" />
            <p>Ihr QR-Code erscheint hier</p>
          </div>
        )}
      </div>

      {data && !error && (
        <div className="flex flex-col gap-3">
          <button onClick={downloadPNG} className="btn-success w-full">
            <ArrowDownTrayIcon className="w-5 h-5" />
            PNG herunterladen
          </button>
          <button onClick={downloadSVG} className="btn-secondary w-full">
            <ArrowDownTrayIcon className="w-5 h-5" />
            SVG herunterladen
          </button>
        </div>
      )}
    </div>
  )
}
