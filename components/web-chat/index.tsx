'use client'

import { useUiStore } from '@/lib/store/ui'
import Script from 'next/script'
import { useEffect, useState } from 'react'

interface WebChatProps {
  locale: string
}

export function WebChat({ locale }: WebChatProps) {
  const { setIsInquiryVisible } = useUiStore()

  const [scriptLoaded, setScriptLoaded] = useState(false)

  const handleScriptLoad = () => {
    setScriptLoaded(true)
  }

  useEffect(() => {
    if (scriptLoaded && typeof window !== 'undefined' && window.WebChat) {
      // Initialize WebChat widget
      new window.WebChat({
        position: 'bottom-right',
        lang: locale,
      })
    }
  }, [scriptLoaded, locale])

  // Track webchat window open/close state
  useEffect(() => {
    if (!scriptLoaded) return

    // Wait a bit for the webchat DOM to be ready
    const timeout = setTimeout(() => {
      const cwWindow = document.querySelector('.cw-window')

      if (!cwWindow) {
        console.warn('WebChat window element not found')
        return
      }

      // Create a MutationObserver to watch for class changes
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
          ) {
            const target = mutation.target as HTMLElement
            const isOpen = target.classList.contains('open')

            // When webchat opens, close the inquiry modal
            if (isOpen) {
              setIsInquiryVisible(false)
            } else if (!isOpen) {
              setIsInquiryVisible(true)
            }
          }
        })
      })

      // Start observing class changes
      observer.observe(cwWindow, {
        attributes: true,
        attributeFilter: ['class'],
      })

      // Cleanup function
      return () => {
        observer.disconnect()
      }
    }, 1000) // Wait 1 second for webchat to initialize

    return () => {
      clearTimeout(timeout)
    }
  }, [scriptLoaded, setIsInquiryVisible])

  return (
    <>
      <Script
        key={`webchat-script-${locale}`}
        id={`webchat-script-${locale}`}
        src='https://webchat.citysresidences.com/WebChatWidgets/web-chat.js'
        strategy='lazyOnload'
        onLoad={handleScriptLoad}
      />
    </>
  )
}

declare global {
  interface Window {
    WebChat: new (config: { position: string; lang?: string }) => void
  }
}
