"use client"

import s from "./parallax-images-section.module.css"

import { gsap, ScrollTrigger } from "@/components/gsap"
import { useGSAP } from "@gsap/react"
import cn from "clsx"
import { useTranslations } from "next-intl"
import { useRef } from "react"

import { AnimatedButton } from "@/components/animated-button"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { Link } from "@/components/utility/link"
import { breakpoints } from "@/styles/config.mjs"

export interface MaskedParallaxImageSectionProps {
  horizontalAlignment?: "rtl" | "ltr"
  title?: string
  text: string
  imgSrc: string
  link?: {
    url: string
    text: string
  }
}

export function MaskedParallaxImageSection({
  horizontalAlignment = "ltr",
  title,
  text,
  imgSrc,
  link,
}: MaskedParallaxImageSectionProps) {
  return (
    <div className="px-4 bt:px-10">
      <div className="flex flex-col-reverse bt:grid bt:grid-cols-24 bt:items-center gap-6 bt:gap-0">
        <div
          className={cn(
            "col-span-7 flex flex-col gap-12",
            horizontalAlignment === "ltr" ? "col-start-1 order-2 bt:order-1" : "col-start-[18] order-1 bt:order-2"
          )}
        >
          {title && (
            <>
              <div className={cn(s.title, "font-lexend-giga font-normal leading-none text-bricky-brick")}>
                <h3 className="hidden bt:block">
                  <TextRevealOnScroll splitBy="lines" textAlign="left" staggerDuration={0.0025}>
                    {title}
                  </TextRevealOnScroll>
                </h3>
                <h3 className="block bt:hidden max-w-xs mx-auto">
                  <TextRevealOnScroll splitBy="lines" textAlign="center" staggerDuration={0.0025}>
                    {title}
                  </TextRevealOnScroll>
                </h3>
              </div>
            </>
          )}
          <div className={s.text}>
            <p className="hidden bt:block">
              <TextRevealOnScroll splitBy="lines" textAlign="left" staggerDuration={0.0025}>
                {text}
              </TextRevealOnScroll>
            </p>
            <p className="block bt:hidden max-w-xs mx-auto">
              <TextRevealOnScroll splitBy="lines" textAlign="center" staggerDuration={0.0025}>
                {text}
              </TextRevealOnScroll>
            </p>
          </div>
          {link && (
            <Link className="w-56" href={link.url}>
              <AnimatedButton text={link.text} size="lg" theme="tertiary" />
            </Link>
          )}
        </div>
        <div
          className={cn(
            "aspect-h-11 aspect-w-9 relative col-span-16 gsap-parallax-img-c",
            horizontalAlignment === "ltr" ? "col-start-9 order-2" : "col-start-1 order-1"
          )}
        >
          <MaskedParallaxImage
            imgSrc={imgSrc}
            sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
          />
        </div>
      </div>
    </div>
  )
}

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
        <div className={cn(s["title-c"], "gsap-title-c", "overflow-hidden py-2 hidden bt:block")}>
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
        <h2
          className={cn(
            "font-lexend-giga text-4xl text-bricky-brick font-bold leading-snug py-2 text-center block bt:hidden"
          )}
        >
          {t("title")}
        </h2>
      </div>
      <div className="flex flex-col gap-12 bt:gap-32 bd:gap-48 py-12 bt:py-16 bd:py-32">
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
