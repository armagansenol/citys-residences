"use client"

import { breakpoints } from "@/styles/config.mjs"
import Script from "next/script"
import { useWindowSize } from "react-use"

declare global {
  interface Window {
    startWidget?: () => void
  }
}

export function AlotechWidget() {
  const { width } = useWindowSize()

  if (width < breakpoints.breakpointTablet) {
    return null
  }

  return (
    <Script
      type="text/javascript"
      src="//citysresidences.alo-tech.com/click2connects/click2connect.js?widget_key=ahRzfm11c3RlcmktaGl6bWV0bGVyaXIhCxIUQ2xpY2syQ29ubmVjdFBhY2thZ2UYgIDqqaynnAsMogEcY2l0eXNyZXNpZGVuY2VzLmFsby10ZWNoLmNvbQ"
      onLoad={() => {
        if (window.startWidget) {
          window.startWidget()
        }
      }}
      strategy="afterInteractive"
    />
  )
}
