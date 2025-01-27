"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { useRef } from "react"

export default function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })

    tl.from(ref.current, {
      autoAlpha: 0,
      delay: 0.5,
    })

    ScrollTrigger.create({
      animation: tl,
      trigger: ref.current,
      onEnter: () => tl.play(),
      markers: false,
    })
  })

  return <div ref={ref}>{children}</div>
}
