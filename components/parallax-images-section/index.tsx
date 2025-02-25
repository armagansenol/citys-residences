"use client"

import s from "./parallax-images-section.module.css"

import { useGSAP } from "@gsap/react"
import cn from "clsx"
import { useRef } from "react"

import { gsap, ScrollTrigger } from "@/components/gsap"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { ResponsiveLetterSpacing } from "@/components/responsive-letter-spacing"

export function ParallaxImagesSection() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return

      gsap.registerPlugin(ScrollTrigger)

      const textTL = gsap.timeline({ paused: true })

      textTL.from(".gsap-title", {
        yPercent: -150,
        ease: "expo.out",
        duration: 1.5,
      })

      ScrollTrigger.create({
        animation: textTL,
        trigger: ".gsap-title-c",
        start: "center center",
        toggleActions: "play none none reverse",
      })

      ScrollTrigger.create({
        trigger: ".frame",
        pin: true,
        pinSpacing: false,
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div className="relative" ref={ref}>
      <div className={cn(s.frame, "frame")}>
        <div
          className={cn(
            s.title,
            "gsap-title-c",
            "font-lexend-giga text-bricky-brick font-bold text-5xl bt:text-7xl bd:text-6xl leading-tight text-center overflow-hidden py-2"
          )}
        >
          <div className="gsap-title hidden bd:block">
            <ResponsiveLetterSpacing text="DAHA HUZURLU YAŞA" />
          </div>
          <div className="gsap-title block bd:hidden">DAHA HUZURLU YAŞA</div>
        </div>
      </div>
      <div className="flex flex-col gap-8 bt:gap-0">
        <MaskedParallaxImage />
        <MaskedParallaxImage horizontalAlignment="rtl" />
        <MaskedParallaxImage />
        <MaskedParallaxImage horizontalAlignment="rtl" />
      </div>
    </div>
  )
}
