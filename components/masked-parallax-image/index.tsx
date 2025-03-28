"use client"

import { useGSAP } from "@gsap/react"
import { useWindowSize } from "hamo"
import { useRef } from "react"

import { gsap, ScrollTrigger } from "@/components/gsap"
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

      const distance = width < breakpoints.breakpointMobile ? 50 : 100

      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        ".gsap-parallax-img-c",
        {
          y: `-${width < breakpoints.breakpointMobile ? 0 : 100}px`,
        },
        {
          y: `${width < breakpoints.breakpointMobile ? 0 : 100}px`,
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
      <div className="gsap-parallax-img-c rounded-lg w-full h-full flex items-center justify-center overflow-hidden">
        <div className="gsap-parallax-img relative w-full h-[120%]">
          {/* <div className="absolute top-0 left-0 right-0 bottom-0 z-50 isolate gsap-parallax-img-overlay hidden bt:block">
            <div className="bg-bengala-red absolute w-full h-full z-10 opacity-70"></div>
            <Img src={imgSrc} alt="Parallax Image" className="object-cover mix-blend-overlay z-20" fill sizes={sizes} />
          </div> */}
          <Img src={imgSrc} alt="Parallax Image" className="object-cover z-40" fill sizes={sizes} />
        </div>
      </div>
    </div>
  )
}
