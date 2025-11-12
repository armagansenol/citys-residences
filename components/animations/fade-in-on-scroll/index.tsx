'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/components/gsap'
import { breakpoints } from '@/styles/config.mjs'
import { useWindowSize } from 'hamo'
import { useRef, Children, isValidElement, cloneElement } from 'react'

interface FadeInOnScrollProps {
  children: React.ReactNode
  duration?: number
  delay?: number
}

export function FadeInOnScroll({
  children,
  duration = 0.4,
  delay = 0,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLElement>(null)
  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (!width || width < breakpoints.breakpointMobile) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      const element = ref.current
      if (!element) {
        return
      }

      const tl = gsap.timeline({ paused: true })

      tl.from(element, {
        autoAlpha: 0,
        duration: duration,
        delay: delay,
      })

      const trigger = ScrollTrigger.create({
        animation: tl,
        trigger: element,
      })

      return () => {
        tl.kill()
        trigger.kill()
      }
    },
    {
      scope: ref,
      dependencies: [width, duration, delay],
    }
  )

  // Get the first valid child element
  const child = Children.toArray(children)[0]

  if (!isValidElement(child)) {
    console.warn('FadeInOnScroll: Children must be a valid React element')
    return <>{children}</>
  }

  // Clone the child and add the ref to it
  return cloneElement(child, {
    ref: ref,
    ...child.props,
  })
}
