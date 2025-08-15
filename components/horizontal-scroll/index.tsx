"use client"

import s from "./horizontal-scroll.module.css"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { GsapSplitText } from "@/components/gsap-split-text"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ReactNode, useRef } from "react"

export function HorizontalScroll({
  className,
  title,
  description,
  items,
}: {
  className?: string
  title: string
  description: ReactNode
  items: string[]
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const sections = gsap.utils.toArray(`.gsap-panel`)

      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none", // <-- IMPORTANT!
        scrollTrigger: {
          trigger: `.${s.container}`,
          pin: true,
          scrub: true,
          end: "+=5000",
          // snap: {
          //   snapTo: 1 / (sections.length - 1),
          //   duration: 2,
          //   ease: "power3.inOut",
          // },
        },
      })

      // ScrollTrigger.defaults({ markers: { startColor: "white", endColor: "white" } })

      // const textWrappers = gsap.utils.toArray(`.text`) as HTMLElement[]
      // const texts = gsap.utils.toArray(`.t`) as HTMLElement[]

      const imageWrappers = gsap.utils.toArray(`.bg-image`) as HTMLElement[]
      const images = gsap.utils.toArray(`.img`) as HTMLElement[]

      // Create parallax effect for all images
      images.forEach((image, index) => {
        const isFirst = index === 0
        const isLast = index === images.length - 1

        gsap.fromTo(
          image,
          {
            xPercent: isFirst ? 0 : 0,
            ease: "none",
          },
          {
            xPercent: isLast ? 0 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrappers[index],
              containerAnimation: scrollTween,
              scrub: true,
            },
          }
        )
      })
    },
    {
      dependencies: [items],
      scope: ref,
    }
  )

  return (
    <div className={cn("overflow-hidden", className)} ref={ref}>
      <div className={cn(s.container)}>
        <div className={cn(s.frame)}>
          <h2 className="title-shadow absolute top-28 left-1/2 -translate-x-1/2 font-montserrat font-bold text-white text-3xl lg:text-7xl xl:text-7xl 2xl:text-7xl leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight text-left lg:text-center z-50 gsap-title-c whitespace-nowrap">
            <GsapSplitText splitBy="lines" stagger={0.005} duration={1}>
              {title}
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              "absolute bottom-14 left-14",
              "font-primary font-normal text-white",
              "text-base lg:text-4xl xl:text-2xl",
              "leading-relaxed lg:leading-relaxed xl:leading-relaxed",
              "lg:max-w-2xl xl:max-w-lg",
              "description-bg z-50 py-4 px-8 rounded-md"
            )}
          >
            <span className="gsap-description">{description}</span>
          </p>
        </div>
        {items.map((src, index) => (
          <section key={index} className={cn(s.panel, "gsap-panel", "flex items-center justify-center flex-shrink-0")}>
            <div className={cn(s.bgImage, "bg-image")}>
              <Image
                src={src}
                alt="Aerial view of City's Residences"
                fill
                className={cn(s.img, "img object-cover object-bottom")}
                priority
                sizes="100vw"
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
