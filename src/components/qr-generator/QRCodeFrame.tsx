'use client'

import type { FrameStyle } from '@/types/qr'

interface QRCodeFrameProps {
  children: React.ReactNode
  frameStyle: FrameStyle
  frameColor: string
  frameText: string
  size: number
  bgColor: string
}

export function QRCodeFrame({ children, frameStyle, frameColor, frameText, size, bgColor }: QRCodeFrameProps) {
  if (frameStyle === 'none') {
    return <>{children}</>
  }

  const padding = 16
  const textHeight = 32
  const borderWidth = 4
  const borderRadius = frameStyle === 'rounded' || frameStyle.includes('rounded') ? 16 :
                       frameStyle === 'circle' ? size / 2 : 0

  // Calculate total dimensions
  const hasBottomText = frameStyle.includes('bottom') || frameStyle === 'balloon' ||
                        frameStyle === 'speech-bubble' || frameStyle === 'gift' ||
                        frameStyle === 'shopping' || frameStyle === 'restaurant' ||
                        frameStyle === 'wifi-frame' || frameStyle === 'contact' ||
                        frameStyle === 'social-frame' || frameStyle === 'event-frame' ||
                        frameStyle === 'business' || frameStyle === 'ticket-bottom'
  const hasTopText = frameStyle.includes('top')
  const hasText = hasBottomText || hasTopText

  const renderSimpleFrame = () => (
    <div
      className="relative inline-block"
      style={{
        padding: padding,
        backgroundColor: bgColor,
        border: `${borderWidth}px solid ${frameColor}`,
        borderRadius: borderRadius,
      }}
    >
      {children}
    </div>
  )

  const renderCircleFrame = () => (
    <div
      className="relative inline-flex items-center justify-center"
      style={{
        width: size + padding * 2 + borderWidth * 2,
        height: size + padding * 2 + borderWidth * 2,
        backgroundColor: bgColor,
        border: `${borderWidth}px solid ${frameColor}`,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )

  const renderBannerBottom = () => (
    <div className="relative inline-block">
      <div
        style={{
          padding: padding,
          paddingBottom: padding + textHeight + 8,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${frameColor}`,
          borderRadius: 12,
        }}
      >
        {children}
      </div>
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          bottom: 8,
          height: textHeight,
          marginLeft: borderWidth,
          marginRight: borderWidth,
        }}
      >
        <span
          className="font-bold text-sm px-4 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: frameColor, color: bgColor }}
        >
          {frameText}
        </span>
      </div>
    </div>
  )

  const renderBadgeBottom = () => (
    <div className="relative inline-block">
      <div
        style={{
          padding: padding,
          paddingBottom: padding + textHeight + 8,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${frameColor}`,
          borderRadius: 16,
        }}
      >
        {children}
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
        style={{
          bottom: 4,
          minWidth: 100,
        }}
      >
        <div
          className="px-4 py-2 font-bold text-sm whitespace-nowrap"
          style={{
            backgroundColor: frameColor,
            color: bgColor,
            borderRadius: 20,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {frameText}
        </div>
      </div>
    </div>
  )

  const renderRibbonBottom = () => (
    <div className="relative inline-block">
      <div
        style={{
          padding: padding,
          paddingBottom: padding + textHeight + 12,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${frameColor}`,
          borderRadius: 8,
        }}
      >
        {children}
      </div>
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          bottom: 8,
        }}
      >
        <div className="relative">
          <div
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: '12px solid transparent',
              borderBottom: '12px solid transparent',
              borderRight: `12px solid ${frameColor}`,
            }}
          />
          <div
            className="px-6 py-2 font-bold text-sm whitespace-nowrap"
            style={{
              backgroundColor: frameColor,
              color: bgColor,
            }}
          >
            {frameText}
          </div>
          <div
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: '12px solid transparent',
              borderBottom: '12px solid transparent',
              borderLeft: `12px solid ${frameColor}`,
            }}
          />
        </div>
      </div>
    </div>
  )

  const renderTicketBottom = () => (
    <div className="relative inline-block">
      <div
        className="relative"
        style={{
          padding: padding,
          paddingBottom: padding + textHeight + 8,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${frameColor}`,
          borderRadius: 12,
        }}
      >
        {/* Ticket notches */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
          style={{ backgroundColor: 'white', border: `${borderWidth}px solid ${frameColor}` }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full"
          style={{ backgroundColor: 'white', border: `${borderWidth}px solid ${frameColor}` }}
        />
        {children}
      </div>
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          bottom: 8,
          marginLeft: borderWidth,
          marginRight: borderWidth,
        }}
      >
        <span
          className="font-bold text-sm px-4 py-1"
          style={{ color: frameColor }}
        >
          {frameText}
        </span>
      </div>
    </div>
  )

  const renderBannerTop = () => (
    <div className="relative inline-block">
      <div
        style={{
          padding: padding,
          paddingTop: padding + textHeight + 8,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${frameColor}`,
          borderRadius: 12,
        }}
      >
        {children}
      </div>
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          top: 8,
          height: textHeight,
          marginLeft: borderWidth,
          marginRight: borderWidth,
        }}
      >
        <span
          className="font-bold text-sm px-4 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: frameColor, color: bgColor }}
        >
          {frameText}
        </span>
      </div>
    </div>
  )

  const renderBadgeTop = () => (
    <div className="relative inline-block">
      <div
        style={{
          padding: padding,
          paddingTop: padding + textHeight + 8,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${frameColor}`,
          borderRadius: 16,
        }}
      >
        {children}
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
        style={{
          top: 4,
          minWidth: 80,
        }}
      >
        <div
          className="px-4 py-2 font-bold text-sm whitespace-nowrap"
          style={{
            backgroundColor: frameColor,
            color: bgColor,
            borderRadius: 20,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {frameText}
        </div>
      </div>
    </div>
  )

  const renderBalloon = () => (
    <div className="relative inline-block">
      <div
        style={{
          padding: padding,
          paddingBottom: padding + textHeight + 16,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${frameColor}`,
          borderRadius: 24,
        }}
      >
        {children}
      </div>
      {/* Speech bubble pointer */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: textHeight + 8,
          width: 0,
          height: 0,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: `12px solid ${frameColor}`,
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: textHeight + 12,
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `10px solid ${bgColor}`,
        }}
      />
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          bottom: 4,
        }}
      >
        <span className="font-bold text-sm" style={{ color: frameColor }}>
          {frameText}
        </span>
      </div>
    </div>
  )

  const renderSpeechBubble = () => (
    <div className="relative inline-block">
      <div
        className="relative"
        style={{
          padding: padding,
          paddingBottom: padding + textHeight + 8,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${frameColor}`,
          borderRadius: 20,
        }}
      >
        {children}
        {/* Thought bubble dots */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{ backgroundColor: frameColor }}
        />
        <div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: frameColor }}
        />
      </div>
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          bottom: 4,
        }}
      >
        <span className="font-bold text-sm" style={{ color: frameColor }}>
          {frameText}
        </span>
      </div>
    </div>
  )

  const renderHeart = () => (
    <div className="relative inline-flex items-center justify-center p-4">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.1))` }}
      >
        <path
          d="M50 88 C20 60, 5 40, 15 25 C25 10, 40 10, 50 25 C60 10, 75 10, 85 25 C95 40, 80 60, 50 88"
          fill={bgColor}
          stroke={frameColor}
          strokeWidth="3"
        />
      </svg>
      <div className="relative z-10" style={{ transform: 'scale(0.7)' }}>
        {children}
      </div>
    </div>
  )

  const renderStarFrame = () => (
    <div className="relative inline-flex items-center justify-center p-6">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.1))` }}
      >
        <path
          d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z"
          fill={bgColor}
          stroke={frameColor}
          strokeWidth="3"
        />
      </svg>
      <div className="relative z-10" style={{ transform: 'scale(0.55)' }}>
        {children}
      </div>
    </div>
  )

  const renderIconFrame = (icon: React.ReactNode, label: string) => (
    <div className="relative inline-block">
      <div
        style={{
          padding: padding,
          paddingTop: padding + 8,
          paddingBottom: padding + textHeight + 8,
          backgroundColor: bgColor,
          border: `${borderWidth}px solid ${frameColor}`,
          borderRadius: 16,
        }}
      >
        {/* Icon at top */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: frameColor }}
        >
          {icon}
        </div>
        {children}
      </div>
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          bottom: 8,
          marginLeft: borderWidth,
          marginRight: borderWidth,
        }}
      >
        <span
          className="font-bold text-sm px-4 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: frameColor, color: bgColor }}
        >
          {frameText || label}
        </span>
      </div>
    </div>
  )

  // Icon components
  const GiftIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={bgColor} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  )

  const ShoppingIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={bgColor} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )

  const RestaurantIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={bgColor} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  )

  const WifiIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={bgColor} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  )

  const ContactIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={bgColor} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )

  const SocialIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={bgColor} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  )

  const EventIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={bgColor} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  )

  const BusinessIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={bgColor} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  )

  // Render based on frame style
  switch (frameStyle) {
    case 'simple':
    case 'rounded':
      return renderSimpleFrame()
    case 'circle':
      return renderCircleFrame()
    case 'banner-bottom':
      return renderBannerBottom()
    case 'badge-bottom':
      return renderBadgeBottom()
    case 'ribbon-bottom':
      return renderRibbonBottom()
    case 'ticket-bottom':
      return renderTicketBottom()
    case 'banner-top':
      return renderBannerTop()
    case 'badge-top':
      return renderBadgeTop()
    case 'balloon':
      return renderBalloon()
    case 'speech-bubble':
      return renderSpeechBubble()
    case 'heart':
      return renderHeart()
    case 'star-frame':
      return renderStarFrame()
    case 'gift':
      return renderIconFrame(<GiftIcon />, 'Überraschung!')
    case 'shopping':
      return renderIconFrame(<ShoppingIcon />, 'Jetzt kaufen!')
    case 'restaurant':
      return renderIconFrame(<RestaurantIcon />, 'Zur Speisekarte')
    case 'wifi-frame':
      return renderIconFrame(<WifiIcon />, 'WLAN verbinden')
    case 'contact':
      return renderIconFrame(<ContactIcon />, 'Kontakt speichern')
    case 'social-frame':
      return renderIconFrame(<SocialIcon />, 'Folge mir!')
    case 'event-frame':
      return renderIconFrame(<EventIcon />, 'Zum Event')
    case 'business':
      return renderIconFrame(<BusinessIcon />, 'Mehr erfahren')
    default:
      return <>{children}</>
  }
}
