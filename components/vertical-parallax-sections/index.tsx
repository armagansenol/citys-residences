"use client"

import s from "./vertical-parallax-sections.module.css"

import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap"
import cn from "clsx"
import Image from "next/image"
import { useRef } from "react"

export function VerticalParallaxSections({ title, description }: { title: string; description: string }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const sections = gsap.utils.toArray(`.panel`)

      const tl = gsap.timeline({ paused: true })

      const tl1 = gsap.timeline().to(sections, {
        yPercent: -100 * (sections.length - 1),
        ease: "none", // <-- IMPORTANT!
      })

      const imageWrappers = gsap.utils.toArray(`.bg-image`) as HTMLElement[]
      const images = gsap.utils.toArray(`.img`) as HTMLElement[]

      const imagesTl = gsap.timeline()

      images.forEach((image, index) => {
        const isFirst = index === 0
        const isLast = index === images.length - 1

        imagesTl.fromTo(
          image,
          {
            yPercent: isFirst ? 0 : -30,
            ease: "none",
          },
          {
            yPercent: isLast ? 0 : 30,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrappers[index],
              scrub: true,
              //   markers: true,
              end: "+=3500",
            },
          }
        )
      })

      tl.add(tl1)

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        pin: true,
        scrub: 1,
        end: "+=3500",
      })

      const maskTL = gsap.timeline({ paused: true })

      maskTL
        .fromTo(
          ".gsap-mask",
          {
            clipPath: "inset(0% 10% 5% 10%)",
          },
          {
            clipPath: "inset(2.5% 0% 0% 0%)",
            ease: "none",
          }
        )
        .fromTo(
          ".gsap-mask",
          {
            clipPath: "inset(2.5% 0% 0% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
          }
        )

      ScrollTrigger.create({
        animation: maskTL,
        trigger: ref.current,
        start: "top bottom",
        markers: true,
        scrub: true,
      })

      const textTL = gsap.timeline({ paused: true })

      textTL.from(".text", {
        yPercent: 0,
        autoAlpha: 0,
        duration: 2,
        ease: "expo.out",
      })

      ScrollTrigger.create({
        animation: textTL,
        trigger: ref.current,
        start: "center center",
        toggleActions: "play pause reverse pause",
        // markers: true,
      })

      const cardTL = gsap.timeline({ paused: true })

      cardTL.from(".gsap-info-card", {
        yPercent: 0,
        autoAlpha: 0,
        duration: 2,
        ease: "expo.out",
      })

      ScrollTrigger.create({
        animation: cardTL,
        trigger: ref.current,
        start: "center center",
        toggleActions: "play pause reverse pause",
        // markers: true,
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div className="relative" ref={ref}>
      <div className={cn(s.wrppr, "wrppr relative")}>
        <div className={cn(s.mask, "gsap-mask overflow-hidden")}>
          <div className={cn(s.frame)}>
            <div className={cn(s.text, s.text1, "text text-1 overflow-hidden gsap-title")}>{title}</div>
            <div className={cn(s.infoCardC, "gsap-info-card-c")}>
              <div className={cn(s.infoCard, "gsap-info-card")}>
                <p className={s.infoText}>{description}</p>
              </div>
            </div>
          </div>
          <section className={cn(s.panel, s.blue, "panel blue")}>
            <div className={cn(s.bgImage, "bg-image")}>
              <Image
                // src="/img/horizontal-scroll/1.jpg"
                src="https://images.unsplash.com/photo-1470075801209-17f9ec0cada6"
                alt="Aerial view of City's Residences"
                fill
                className={cn(s.img, "img object-cover")}
                priority
                sizes="100vw"
              />
            </div>
          </section>
          <section className={cn(s.panel, s.red, "panel red")}>
            <div className={cn(s.bgImage, "bg-image")}>
              <Image
                // src="/img/horizontal-scroll/2.jpg"
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
                alt="Aerial view of City's Residences"
                fill
                className={cn(s.img, "img object-cover")}
                priority
                sizes="100vw"
              />
            </div>
          </section>
          <section className={cn(s.panel, s.gray, "panel gray")}>
            <div className={cn(s.bgImage, "bg-image")}>
              <Image
                // src="/img/horizontal-scroll/3.jpg"
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e"
                alt="Aerial view of City's Residences"
                fill
                className={cn(s.img, "img object-cover")}
                priority
                sizes="100vw"
              />
            </div>
          </section>
          <section className={cn(s.panel, s.purple, "panel purple")}>
            <div className={cn(s.bgImage, "bg-image")}>
              <Image
                // src="/img/horizontal-scroll/4.jpg"
                src="https://images.unsplash.com/photo-1478860409698-8707f313ee8b"
                alt="Aerial view of City's Residences"
                fill
                className={cn(s.img, "img object-cover")}
                priority
                sizes="100vw"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
