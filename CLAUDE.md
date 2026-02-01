# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured yet.

## Architecture

**Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS

**QR Code Libraries:**
- `qr-code-styling` - Main library for styled QR codes with dot/corner patterns
- `html2canvas` - Used for downloading QR codes with frames as PNG

### Core Component Flow

```
QRGenerator (src/components/qr-generator/QRGenerator.tsx)
├── Manages all state: activeType, qrData, options, form data
├── Auto-generates QR code via useEffect when inputs change
│
├── TypeSelector - Switches between 12 QR types
├── Form Components (forms/*.tsx) - One per QR type
├── QRCustomization - Colors, patterns, logos, frames
└── QRPreview - Renders QR using qr-code-styling
    └── QRCodeFrame - Wraps QR with decorative frames
```

### Key Files

- **`src/types/qr.ts`** - All TypeScript types, color palettes, frame templates, social logo SVG data
- **`src/lib/qr-utils.ts`** - QR data format generators (WiFi, vCard, iCal, etc.)
- **`src/components/qr-generator/QRPreview.tsx`** - QR rendering with race-condition handling via `renderIdRef`

### QR Data Formats

Each QR type has a generator function in `qr-utils.ts`:
- WiFi: `WIFI:T:WPA;S:ssid;P:password;;`
- vCard: `BEGIN:VCARD\nVERSION:3.0\n...`
- Event: `BEGIN:VEVENT\n...` (iCalendar)
- Email: `mailto:` with URL-encoded subject/body
- Location: `geo:lat,lng` or Google Maps URL

### Style System

Dot styles map to qr-code-styling types in `QRPreview.tsx`:
- square, rounded, dots, classy, classy-rounded, extra-rounded

Frame templates defined in `qr.ts` are rendered by `QRCodeFrame.tsx` using CSS/SVG.

## Development Notes

- All QR generation is client-side (`'use client'` components)
- Path alias: `@/*` maps to `./src/*`
- Language: German (de_DE) - UI text, legal pages, metadata
- Mobile: Sticky preview bar at top, responsive grid layout
