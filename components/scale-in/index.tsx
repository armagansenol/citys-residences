"use client"

import React, { useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { useWindowSize } from "@darkroom.engineering/hamo"

interface ScaleInProps {
  children: React.ReactNode
}

export function ScaleIn({ children }: ScaleInProps) {
  const windowSize = useWindowSize(0.5)
  const scaleInRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      if (ScrollTrigger.isTouch || !scaleInRef.current) {
        return
      }

      const scaleIn = scaleInRef.current

      const tl = gsap.timeline({
        paused: true,
      })

      tl.from(scaleIn, {
        scale: 0.9,
        marginTop: -20,
      })

      ScrollTrigger.create({
        animation: tl,
        id: `scale-in`,
        trigger: scaleIn,
        start: "top bottom",
        end: "top top",
        scrub: true,
      })
    },
    {
      dependencies: [windowSize],
      revertOnUpdate: true,
    }
  )

  return (
    <div ref={scaleInRef} className="scale-in">
      {children}
    </div>
  )
}
