'use client'

import Script from 'next/script'

interface WebChatProps {
  locale: string
}

export function WebChat({ locale }: WebChatProps) {
  return (
    <>
      <Script
        id='webchat-script'
        src='https://webchat.citysresidences.com/WebChatWidgets/web-chat.js'
        strategy='afterInteractive'
        onLoad={() => {
          if (typeof window !== 'undefined' && window.WebChat) {
            new window.WebChat({
              position: 'bottom-right',
              lang: locale,
            })
          }
        }}
      />
    </>
  )
}

declare global {
  interface Window {
    WebChat: new (config: { position: string; lang?: string }) => void
  }
}
