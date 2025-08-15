"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { useWindowSize } from "hamo"
import { useRef } from "react"

import { Img } from "@/components/utility/img"
import { breakpoints } from "@/styles/config.mjs"

export interface MaskedParallaxImageProps {
  imgSrc: string
  sizes: string
}

export function MaskedParallaxImage({ imgSrc, sizes = "100vw" }: MaskedParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (!width) return

      const isBelowTablet = width < breakpoints.breakpointTablet

      const distance = isBelowTablet ? 20 : 50

      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        imgRef.current,
        {
          y: `-${distance * 1.5}px`,
        },
        {
          y: `${distance * 1.5}px`,
        },
        "s"
      )

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        start: `top-=${distance}px bottom`,
        end: `bottom+=${distance}px top`,
        scrub: true,
        // markers: true,
      })
    },
    {
      scope: ref,
      dependencies: [width],
    }
  )

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden" ref={ref}>
      <div className="relative w-full h-full scale-110" ref={imgRef}>
        <Img src={imgSrc} alt="Parallax Image" className="object-cover z-40" fill sizes={sizes} loading="lazy" />
      </div>
    </div>
  )
}
