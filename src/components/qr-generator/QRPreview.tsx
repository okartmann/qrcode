'use client'

import { useEffect, useRef, useState } from 'react'
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

  useEffect(() => {
    if (!data || !canvasRef.current) {
      setError(null)
      return
    }

    const qrOptions = {
      width: options.size,
      margin: 2,
      color: {
        dark: options.color,
        light: options.bgColor,
      },
      errorCorrectionLevel: 'M' as const,
    }

    QRCode.toCanvas(canvasRef.current, data, qrOptions, (err) => {
      if (err) {
        console.error(err)
        setError('Fehler beim Generieren des QR-Codes.')
      } else {
        setError(null)
      }
    })
  }, [data, options])

  const downloadPNG = () => {
    if (!canvasRef.current) return

    const link = document.createElement('a')
    link.download = `qrcode-${type}-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  const downloadSVG = async () => {
    if (!data) return

    const qrOptions = {
      width: options.size,
      margin: 2,
      color: {
        dark: options.color,
        light: options.bgColor,
      },
      errorCorrectionLevel: 'M' as const,
      type: 'svg' as const,
    }

    try {
      const svg = await QRCode.toString(data, qrOptions)
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
