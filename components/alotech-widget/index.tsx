"use client"

import Script from "next/script"
import { useEffect } from "react"

declare global {
  interface Window {
    startWidget?: (config?: { user_data?: Record<string, string> }) => void
  }
}

export function AlotechWidget() {
  useEffect(() => {
    const aloTech = document.querySelector("#Click2ConnectPackageFrame") as HTMLIFrameElement

    if (!aloTech) return
  }, [])

  return (
    <Script
      type='text/javascript'
      src='//citysresidences.alo-tech.com/click2connects/click2connect.js?widget_key=ahRzfm11c3RlcmktaGl6bWV0bGVyaXIhCxIUQ2xpY2syQ29ubmVjdFBhY2thZ2UYgIDqqaynnAsMogEcY2l0eXNyZXNpZGVuY2VzLmFsby10ZWNoLmNvbQ'
      onLoad={() => {
        if (window.startWidget) {
          window.startWidget({
            user_data: {
              UTM: "campaign-test",
            },
          })
        }
      }}
      strategy='afterInteractive'
    />
  )
}
