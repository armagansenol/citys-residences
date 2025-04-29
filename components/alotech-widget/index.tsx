"use client"

import { useVisibilityStore } from "@/lib/store/visibility"
import { breakpoints } from "@/styles/config.mjs"
import Script from "next/script"
import { useEffect } from "react"
import { useWindowSize } from "react-use"

declare global {
  interface Window {
    startWidget?: () => void
  }
}

export function AlotechWidget() {
  const { width } = useWindowSize()
  const { isAloTechVisible } = useVisibilityStore()

  useEffect(() => {
    const aloTech = document.querySelector("#Click2ConnectPackageFrame") as HTMLIFrameElement

    if (!aloTech) return

    aloTech.style.transition = "opacity 200ms ease"

    aloTech.style.setProperty("opacity", isAloTechVisible ? "1" : "0")
    aloTech.style.setProperty("pointer-events", isAloTechVisible ? "auto" : "none")
  }, [isAloTechVisible])

  if (width < breakpoints.breakpointMobile) {
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
