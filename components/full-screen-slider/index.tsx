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
    <div className={s.container} ref={ref}>
      <EmblaCarousel slides={items} options={{ duration: 35, loop: true }} />
      <div
        className={cn(
          s.title,
          "gsap-title-c",
          "font-lexend-giga text-white font-bold text-5xl bt:text-8xl bd:text-6xl leading-none text-center overflow-hidden py-2"
        )}
      >
        <div className={cn("hidden bd:block", "gsap-title")}>
          <h2 className="text-white font-bold text-5xl bt:text-8xl bd:text-7xl leading-none overflow-hidden py-2 text-left">
            {title}
          </h2>
        </div>
        <div className={cn("block bd:hidden", "gsap-title")}>{title}</div>
      </div>
      <div className={cn(s.descriptionC, "gsap-description-c")}>
        <div
          className={cn(
            s.description,
            "gsap-description",
            "w-full h-full rounded-lg overflow-hidden p-4 bd:p-8 text-white flex isolate blur-bg-bricky-brick-light"
          )}
        >
          <p
            className={cn(
              s.infoText,
              "font-halenoir text-base bt:text-2xl bd:text-base text-white font-normal leading-relaxed text-center bd:text-left"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
