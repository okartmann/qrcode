'use client'

import type { QRCodeType } from '@/types/qr'
import {
  LinkIcon,
  DocumentTextIcon,
  WifiIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'

interface TypeSelectorProps {
  activeType: QRCodeType
  onTypeChange: (type: QRCodeType) => void
}

const types: { type: QRCodeType; label: string; icon: typeof LinkIcon }[] = [
  { type: 'url', label: 'URL', icon: LinkIcon },
  { type: 'text', label: 'Text', icon: DocumentTextIcon },
  { type: 'wifi', label: 'WiFi', icon: WifiIcon },
  { type: 'vcard', label: 'vCard', icon: UserIcon },
  { type: 'email', label: 'E-Mail', icon: EnvelopeIcon },
  { type: 'phone', label: 'Telefon', icon: PhoneIcon },
  { type: 'sms', label: 'SMS', icon: ChatBubbleLeftIcon },
  { type: 'whatsapp', label: 'WhatsApp', icon: ChatBubbleLeftIcon },
  { type: 'location', label: 'Standort', icon: MapPinIcon },
  { type: 'event', label: 'Event', icon: CalendarDaysIcon },
  { type: 'paypal', label: 'PayPal', icon: CurrencyEuroIcon },
  { type: 'bitcoin', label: 'Bitcoin', icon: CurrencyDollarIcon },
]

export function TypeSelector({ activeType, onTypeChange }: TypeSelectorProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {types.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all duration-200 ${
            activeType === type
              ? 'bg-primary border-primary text-white'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-primary-light hover:text-primary'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  )
}
