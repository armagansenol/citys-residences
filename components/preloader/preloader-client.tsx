"use client"

import { useGSAP, gsap } from "@/components/gsap"
import { useLenis } from "lenis/react"
import { useEffect } from "react"

export function PreloaderClient() {
  const lenis = useLenis()
  const preloaderId = "#server-preloader"

  // Stop Lenis immediately when component mounts
  useEffect(() => {
    lenis?.stop()
  }, [lenis])

  useGSAP(() => {
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

  if (process.env.NODE_ENV !== "production") {
    return null
  }

  return null
}
