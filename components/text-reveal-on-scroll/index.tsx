"use client"

import { ScrollTrigger, useGSAP } from "@/lib/gsap"
import { useRef } from "react"

import VerticalCutReveal, { VerticalCutRevealRef } from "@/components/vertical-cut-reveal"

interface TextRevealOnScrollProps {
  children: React.ReactNode
}

export function TextRevealOnScroll({ children }: TextRevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<VerticalCutRevealRef>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: "center center",
      onEnter: () => textRef.current?.startAnimation(),
      markers: true,
    })
  })

  return (
    <span ref={ref}>
      <VerticalCutReveal
        autoStart={false}
        splitBy="characters"
        staggerDuration={0.005}
        transition={{
          type: "spring",
          stiffness: 190,
          damping: 42,
        }}
        ref={textRef}
      >
        {children}
      </VerticalCutReveal>
    </span>
  )
}
