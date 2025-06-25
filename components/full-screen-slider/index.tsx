"use client"

import s from "./full-screen-slider.module.css"

import { cn } from "@/lib/utils"
import { useRef } from "react"

import { EmblaCarousel } from "@/components/utility/embla-carousel"

export interface FullScreenSliderProps {
  title: string
  description: string
  items: React.ReactNode[]
}

export function FullScreenSlider({ title, description, items }: FullScreenSliderProps) {
  const ref = useRef(null)

  // useGSAP(
  //   () => {
  //     gsap.registerPlugin(ScrollTrigger)

  //     // text timeline
  //     const textTL = gsap.timeline({ paused: true })

  //     textTL.from(".gsap-title", {
  //       yPercent: -150,
  //       ease: "expo.out",
  //       duration: 1.5,
  //     })

  //     ScrollTrigger.create({
  //       animation: textTL,
  //       trigger: ".gsap-title-c",
  //       start: "center center",
  //       toggleActions: "play none none pause",
  //     })

  //     // card timeline
  //     const cardTL = gsap.timeline({ paused: true })

  //     cardTL.from(".gsap-description", {
  //       yPercent: 30,
  //       opacity: 0,
  //       ease: "expo.out",
  //       duration: 1.5,
  //     })

  //     ScrollTrigger.create({
  //       animation: cardTL,
  //       trigger: ".gsap-description-c",
  //       toggleActions: "play none none pause",
  //     })
  //   },
  //   {
  //     scope: ref,
  //   }
  // )

  return (
    <div className="relative flex flex-col bt:flex-row bt:overflow-hidden gap-5 w-screen z-[100]" ref={ref}>
      <div className={cn(s["title-c"], "gsap-title-c", "z-[150]")}>
        <h2
          className={cn(
            s.title,
            "gsap-title",
            "text-bricky-brick bt:text-white font-suisse-intl font-medium leading-tight bt:leading-none text-center"
          )}
        >
          {title}
        </h2>
      </div>
      <div className="w-screen relative">
        <EmblaCarousel autoplay={true} autoplayDelay={5000} slides={items} options={{ duration: 35, loop: true }} />
      </div>
      <div className={cn(s.descriptionC, "gsap-description-c")}>
        <div className={cn(s.description, "gsap-description", "w-full h-full rounded-lg overflow-hidden")}>
          <p
            className={cn(
              s.infoText,
              "font-suisse-intl text-black bt:text-white font-normal leading-relaxed text-center bd:text-left z-[150]"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
