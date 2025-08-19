"use client"

import { useGSAP, gsap } from "@/components/gsap"
import { useLenis } from "lenis/react"
import { useEffect } from "react"

export function PreloaderClient() {
  const lenis = useLenis()
  const preloaderId = "#server-preloader"
  const isProduction = process.env.NODE_ENV === "production"

  // Stop Lenis immediately when component mounts
  useEffect(() => {
    if (!isProduction) return
    lenis?.stop()
  }, [lenis, isProduction])

  useGSAP(() => {
    if (!isProduction) return

    gsap.to(preloaderId, {
      opacity: 0,
      duration: 0.5,
      delay: 5,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(preloaderId, { display: "none" })
        lenis?.start()
      },
    })
  }, [lenis])

  return null
}
