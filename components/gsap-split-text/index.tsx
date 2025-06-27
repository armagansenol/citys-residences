"use client"
import { ScrollTrigger, SplitText, gsap, useGSAP } from "@/components/gsap"
import * as React from "react"
import { useRef } from "react"

export interface GsapSplitTextProps {
  children: React.ReactNode
  stagger?: number
  ease?: gsap.EaseString
  duration?: number
  splitBy?: "chars" | "words" | "lines"
  triggerOn?: "scroll" | "hover"
}

export function GsapSplitText(props: GsapSplitTextProps) {
  const { children, stagger = 0.1, duration = 0.6, ease = "expo.out", splitBy = "lines", triggerOn = "scroll" } = props
  const animationRef = useRef<GSAPTween>()
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    gsap.set(ref.current, { opacity: 1 })

    const splitConfig = {
      type: splitBy === "lines" ? "words,lines" : splitBy,
      linesClass: "line",
      autoSplit: true,
      mask: splitBy,
      onSplit: (self: { lines: Element[]; words: Element[]; chars: Element[] }) => {
        const elements = splitBy === "lines" ? self.lines : splitBy === "words" ? self.words : self.chars

        const anim = gsap.from(elements, {
          duration,
          yPercent: 100,
          opacity: 0,
          stagger,
          ease,
          paused: true,
        })

        animationRef.current = anim
        return anim
      },
    }

    SplitText.create(ref.current, splitConfig)

    if (triggerOn === "scroll") {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "center bottom",
        onEnter: () => {
          animationRef.current?.play()
        },
        onEnterBack: () => {
          animationRef.current?.play()
        },
        onLeave: () => {
          animationRef.current?.reverse()
        },
        onLeaveBack: () => {
          animationRef.current?.reverse()
        },
      })
    } else if (triggerOn === "hover") {
      const handleMouseEnter = (): void => {
        animationRef.current?.play()
      }

      const handleMouseLeave = (): void => {
        animationRef.current?.reverse()
      }

      ref.current.addEventListener("mouseenter", handleMouseEnter)
      ref.current.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        ref.current?.removeEventListener("mouseenter", handleMouseEnter)
        ref.current?.removeEventListener("mouseleave", handleMouseLeave)
      }
    } else {
      animationRef.current?.play()
    }
  }, [splitBy, stagger, duration, triggerOn])

  return (
    <span className="split" ref={ref} style={{ opacity: 0 }}>
      {children}
    </span>
  )
}
