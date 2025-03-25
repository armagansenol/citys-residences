"use client"

import s from "./parallax-images-section.module.css"

import { useGSAP } from "@gsap/react"
import cn from "clsx"
import { useTranslations } from "next-intl"
import { useRef } from "react"

import { gsap, ScrollTrigger } from "@/components/gsap"
import { MaskedParallaxImageSection } from "@/components/masked-parallax-image-section"

export function ParallaxImagesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const t = useTranslations("home.live.p2")

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
        <div className={cn(s["title-c"], "gsap-title-c", "overflow-hidden py-2")}>
          <h2
            className={cn(
              s.title,
              "gsap-title",
              "font-lexend-giga text-bricky-brick font-bold leading-snug bt:leading-none overflow-hidden py-2 text-center"
            )}
          >
            {t("title")}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-12 bt:gap-12 bd:gap-48 py-12 bt:py-16 bd:py-32">
        {[
          { text: t("t1"), imgSrc: "/img/slides-2/3.jpg", horizontalAlignment: "ltr" as const },
          { text: t("t2"), imgSrc: "/img/slides-2/4.jpg", horizontalAlignment: "rtl" as const },
          { text: t("t3"), imgSrc: "/img/slides-2/2.jpg", horizontalAlignment: "ltr" as const },
          { text: t("t4"), imgSrc: "/img/slides-2/1.jpg", horizontalAlignment: "rtl" as const },
          // Uncomment if needed
          // { text: t("t4"), imgSrc: "/img/slides-2/4.jpg", horizontalAlignment: "rtl" as const, link: { url: "/test", text: "TEST" } },
        ].map(
          (
            item: {
              text: string
              imgSrc: string
              horizontalAlignment: "ltr" | "rtl"
              link?: { url: string; text: string }
            },
            index
          ) => (
            <MaskedParallaxImageSection
              key={index}
              text={item.text}
              imgSrc={item.imgSrc}
              horizontalAlignment={item.horizontalAlignment}
              {...(item.link && { link: item.link })}
            />
          )
        )}
      </div>
    </div>
  )
}
