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
  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (!width) return

      const isBelowTablet = width < breakpoints.breakpointTablet

      const distance = isBelowTablet ? 20 : 100

      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        ".gsap-parallax-img-c",
        {
          y: `-${isBelowTablet ? 0 : 100}px`,
        },
        {
          y: `${isBelowTablet ? 0 : 100}px`,
        },
        "s"
      ).fromTo(
        ".gsap-parallax-img",
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
    <div className="w-full h-full" ref={ref}>
      <div className="gsap-parallax-img-c rounded-sm lg:rounded-lg w-full h-full flex items-center justify-center overflow-hidden">
        <div className="gsap-parallax-img relative w-full h-[120%]">
          <Img src={imgSrc} alt="Parallax Image" className="object-cover z-40" fill sizes={sizes} />
        </div>
      </div>
    </div>
  )
}
