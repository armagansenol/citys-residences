"use client"

import VerticalCutReveal, { TextProps, VerticalCutRevealRef } from "@/components/animations/vertical-cut-reveal"
import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { useRef } from "react"

interface TextRevealOnScrollProps extends TextProps {
  children: React.ReactNode
  staggerDuration?: number
  splitBy?: "words" | "characters" | "lines" | string
  className?: string
  containerLevelClassName?: string
  elementLevelClassName?: string
}

export function TextRevealOnScroll({
  children,
  staggerDuration = 0.005,
  className,
  containerLevelClassName,
  elementLevelClassName,
  ...props
}: TextRevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<VerticalCutRevealRef>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.create({
      trigger: ref.current,
      onEnter: () => textRef.current?.startAnimation(),
      markers: false,
    })
  })

  return (
    <span className={className} ref={ref}>
      <VerticalCutReveal
        autoStart={false}
        staggerDuration={staggerDuration}
        transition={{
          type: "spring",
          stiffness: 190,
          damping: 42,
        }}
        containerClassName={containerLevelClassName}
        elementLevelClassName={elementLevelClassName}
        {...props}
        ref={textRef}
      >
        {children}
      </VerticalCutReveal>
    </span>
  )
}
