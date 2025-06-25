"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { useRef } from "react"

interface FadeInOnScrollProps {
  children: React.ReactNode
  duration?: number
  delay?: number
}

export function FadeInOnScroll({ children, duration = 0.5, delay = 0.2 }: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({ paused: true })

    tl.from(ref.current, {
      autoAlpha: 0,
      duration: duration,
      delay: delay,
    })

    ScrollTrigger.create({
      animation: tl,
      trigger: ref.current,
      onEnter: () => tl.play(),
      markers: false,
    })
  })

  return (
    <div className="flex w-full h-full" ref={ref}>
      {children}
    </div>
  )
}
