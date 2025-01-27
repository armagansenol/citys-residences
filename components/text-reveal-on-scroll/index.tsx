"use client"

import { ScrollTrigger, useGSAP } from "@/lib/gsap"
import { useRef } from "react"

import VerticalCutReveal, { VerticalCutRevealRef } from "@/components/vertical-cut-reveal"

interface TextRevealOnScrollProps {
  children: React.ReactNode
  staggerDuration?: number
}

export function TextRevealOnScroll({ children, staggerDuration = 0.005 }: TextRevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<VerticalCutRevealRef>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      onEnter: () => textRef.current?.startAnimation(),
      markers: false,
    })
  })

  return (
    <span ref={ref}>
      <VerticalCutReveal
        autoStart={false}
        splitBy="characters"
        staggerDuration={staggerDuration}
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
