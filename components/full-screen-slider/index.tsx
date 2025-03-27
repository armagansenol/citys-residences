"use client"

import s from "./full-screen-slider.module.css"

import { gsap, ScrollTrigger } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

import { EmblaCarousel } from "@/components/utility/embla-carousel"

export interface FullScreenSliderProps {
  title: string
  description: string
  items: React.ReactNode[]
}

export function FullScreenSlider({ title, description, items }: FullScreenSliderProps) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      // text timeline
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
        toggleActions: "play none none pause",
      })

      // card timeline
      const cardTL = gsap.timeline({ paused: true })

      cardTL.from(".gsap-description", {
        yPercent: 30,
        opacity: 0,
        duration: 0.5,
      })

      ScrollTrigger.create({
        animation: cardTL,
        trigger: ".gsap-description-c",
        toggleActions: "play none none pause",
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div className="relative w-screen overflow-hidden z-[100]" ref={ref}>
      <EmblaCarousel slides={items} options={{ duration: 35, loop: true }} />
      <div className={cn(s["title-c"], "gsap-title-c", "overflow-hidden py-5 z-[150]")}>
        <h2
          className={cn(
            s.title,
            "gsap-title",
            "text-white font-lexend-giga font-bold leading-tight bt:leading-none text-center bd:text-left"
          )}
        >
          {title}
        </h2>
      </div>
      <div className={cn(s.descriptionC, "gsap-description-c")}>
        <div
          className={cn(
            s.description,
            "gsap-description",
            "w-full h-full rounded-lg overflow-hidden blur-bg-bricky-brick-lighter"
          )}
        >
          <p
            className={cn(
              s.infoText,
              "font-halenoir text-white font-normal leading-relaxed text-center bd:text-left z-[150]"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
