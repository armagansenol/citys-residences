"use client"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import React, { useRef } from "react"
import { useWindowSize } from "@darkroom.engineering/hamo"

interface ScaleOutProps {
  children: React.ReactNode
}

export function ScaleOut({ children }: ScaleOutProps) {
  const windowSize = useWindowSize(0.5)
  const scaleOutRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      if (ScrollTrigger.isTouch || !scaleOutRef.current) {
        return
      }

      const scaleOut = scaleOutRef.current

      const tl = gsap.timeline({
        paused: true,
      })

      tl.to(scaleOut, {
        scale: 0.8,
        opacity: 0.5,
        marginBottom: -20,
      })

      ScrollTrigger.create({
        animation: tl,
        id: `scale-out`,
        trigger: scaleOut,
        start: () => `bottom top+=${scaleOut.getBoundingClientRect().height + scaleOut.getBoundingClientRect().top}px`,
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      })
    },
    {
      dependencies: [windowSize],
      revertOnUpdate: true,
    }
  )

  return (
    <div ref={scaleOutRef} className="scale-out">
      {children}
    </div>
  )
}
