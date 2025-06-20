"use client"

import { gsap, useGSAP } from "@/components/gsap"
import { useVisibilityStore } from "@/lib/store/visibility"
import scrollDownAnimation from "@/public/lottie/scroll-down.json"
import Lottie from "lottie-react"
import { useRef } from "react"

export function ScrollDownLottie() {
  const ref = useRef<HTMLDivElement>(null)

  const { isAloTechVisible } = useVisibilityStore()

  useGSAP(
    () => {
      if (isAloTechVisible) {
        gsap.to(ref.current, {
          autoAlpha: 1,
        })
      } else {
        gsap.to(ref.current, {
          autoAlpha: 0,
        })
      }
    },
    {
      dependencies: [isAloTechVisible],
    }
  )

  return (
    <div className="flex flex-col items-center" ref={ref}>
      <div className="w-14 h-14">
        <Lottie animationData={scrollDownAnimation} loop={true} />
      </div>
      <span className="text-sm text-bricky-brick font-suisse-intl font-medium">AŞAĞI SCROLL EDİN</span>
    </div>
  )
}
