import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* QR-Code Icon */}
        <svg
          viewBox="0 0 40 40"
          className="w-10 h-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          {/* Rounded square background */}
          <rect
            x="0"
            y="0"
            width="40"
            height="40"
            rx="10"
            fill="url(#logoGradient)"
          />

          {/* QR Pattern - Top Left */}
          <rect x="6" y="6" width="10" height="10" rx="2" fill="white" />
          <rect x="8" y="8" width="6" height="6" rx="1" fill="url(#logoGradient)" />

          {/* QR Pattern - Top Right */}
          <rect x="24" y="6" width="10" height="10" rx="2" fill="white" />
          <rect x="26" y="8" width="6" height="6" rx="1" fill="url(#logoGradient)" />

          {/* QR Pattern - Bottom Left */}
          <rect x="6" y="24" width="10" height="10" rx="2" fill="white" />
          <rect x="8" y="26" width="6" height="6" rx="1" fill="url(#logoGradient)" />

          {/* QR Data Pattern - Center and Bottom Right */}
          <rect x="18" y="6" width="4" height="4" rx="1" fill="white" fillOpacity="0.9" />
          <rect x="6" y="18" width="4" height="4" rx="1" fill="white" fillOpacity="0.9" />
          <rect x="18" y="18" width="4" height="4" rx="1" fill="white" />

          {/* Bottom right data dots */}
          <rect x="24" y="18" width="3" height="3" rx="0.5" fill="white" fillOpacity="0.8" />
          <rect x="29" y="18" width="3" height="3" rx="0.5" fill="white" fillOpacity="0.8" />
          <rect x="18" y="24" width="3" height="3" rx="0.5" fill="white" fillOpacity="0.8" />
          <rect x="18" y="29" width="3" height="3" rx="0.5" fill="white" fillOpacity="0.8" />
          <rect x="24" y="24" width="3" height="3" rx="0.5" fill="white" fillOpacity="0.7" />
          <rect x="29" y="29" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
          <rect x="24" y="29" width="3" height="3" rx="0.5" fill="white" fillOpacity="0.7" />
          <rect x="29" y="24" width="3" height="3" rx="0.5" fill="white" fillOpacity="0.7" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-900 leading-tight">
            QR-Code<span className="text-primary">.de</span>
          </span>
          <span className="text-xs text-slate-500 font-medium -mt-0.5">
            Generator
          </span>
        </div>
      )}
    </Link>
  )
}
