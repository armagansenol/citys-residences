"use client"

import { gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useRef } from "react"

export interface AnimatedLineProps {
  direction: "horizontal" | "vertical"
  barClassName?: string
}

export function AnimatedLine({ direction, barClassName }: AnimatedLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const bar = barRef.current
      if (!bar) return

      const isHorizontal = direction === "horizontal"

      gsap.to(bar, {
        opacity: 1,
        duration: () => (isHorizontal ? 2.5 : 3),
        ease: "expo.out",
        ...(isHorizontal ? { scaleX: 1 } : { scaleY: 1 }),
        scrollTrigger: {
          trigger: ref.current,
          start: () => (isHorizontal ? "center center+=35%" : "center center+=40%"),
        },
      })
    },
    {
      scope: ref,
      dependencies: [direction],
    }
  )

  return (
    <div className={cn("relative z-50 hidden lg:block", direction === "horizontal" ? "h-px" : "w-px")} ref={ref}>
      <div
        className={cn(
          "bar h-full w-full opacity-0",
          direction === "horizontal" ? "scale-x-0" : "scale-y-0",
          barClassName
        )}
        style={{ transformOrigin: direction === "horizontal" ? "left center" : "top center" }}
        ref={barRef}
      ></div>
    </div>
  )
}
