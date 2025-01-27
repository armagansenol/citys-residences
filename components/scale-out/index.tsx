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

      tl.fromTo(
        scaleOut,
        {
          marginBottom: "0px",
        },
        {
          marginBottom: -"100px",
        }
      )

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
