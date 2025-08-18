"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { useRef, Children, isValidElement, cloneElement } from "react"

interface FadeInOnScrollProps {
  children: React.ReactNode
  duration?: number
  delay?: number
}

export function FadeInOnScroll({ children, duration = 0.4, delay = 0 }: FadeInOnScrollProps) {
  const ref = useRef<HTMLElement>(null)

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
    })
  })

  // Get the first valid child element
  const child = Children.toArray(children)[0]

  if (!isValidElement(child)) {
    console.warn("FadeInOnScroll: Children must be a valid React element")
    return <>{children}</>
  }

  // Clone the child and add the ref to it
  return cloneElement(child, {
    ref: ref,
    ...child.props,
  })
}
