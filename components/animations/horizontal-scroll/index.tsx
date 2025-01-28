"use client"

import s from "./horizontal-scroll.module.css"

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import cn from "clsx"
import Image from "next/image"
import { useRef } from "react"

export function HorizontalScroll({ title, description }: { title: string; description: string }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const sections = gsap.utils.toArray(`.panel`)

      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none", // <-- IMPORTANT!
        scrollTrigger: {
          trigger: `.${s.container}`,
          pin: true,
          scrub: 0.5,
          end: "+=5000",
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 2,
            ease: "power3.inOut",
          },
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
            xPercent: isFirst ? 0 : -30,
            ease: "none",
          },
          {
            xPercent: isLast ? 0 : 30,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrappers[index],
              containerAnimation: scrollTween,
              scrub: true,
            },
          }
        )
      })

      const textTL = gsap.timeline({ paused: true })

      textTL.from(".gsap-text", {
        yPercent: -100,
        ease: "power3.inOut",
        duration: 1,
      })

      ScrollTrigger.create({
        animation: textTL,
        trigger: ".gsap-text-container",
        start: "center center",
        toggleActions: "play none none reverse",
      })

      const cardTL = gsap.timeline({ paused: true })

      cardTL.from(".gsap-info-card", {
        yPercent: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
      })

      ScrollTrigger.create({
        animation: cardTL,
        trigger: ".gsap-info-card-c",
        start: "center center",
        toggleActions: "play none none reverse",
      })

      // green section
      // ScrollTrigger.create({
      //   trigger: `.${s.green}`,
      //   containerAnimation: scrollTween,
      //   start: "center 65%",
      //   end: "center 51%",
      //   onEnter: () => console.log("enter"),
      //   onLeave: () => console.log("leave"),
      //   onEnterBack: () => console.log("enterBack"),
      //   onLeaveBack: () => console.log("leaveBack"),
      //   onToggle: (self) => console.log("active", self.isActive),
      //   id: "4",
      // })

      // only show the relevant section's markers at any given time
      // gsap.set(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end", {
      //   autoAlpha: 0,
      // })

      // Array.from(["blue", "red", "gray", "purple"]).forEach((triggerClass, i) => {
      //   ScrollTrigger.create({
      //     trigger: `.${triggerClass}`,
      //     containerAnimation: scrollTween,
      //     start: "left 30%",
      //     end: i === 3 ? "right right" : "right 30%",
      //     markers: false,
      //     onToggle: (self) => gsap.to(`.marker-${i + 1}`, { duration: 0.25, autoAlpha: self.isActive ? 1 : 0 }),
      //   })
      // })
    },
    {
      scope: ref,
    }
  )

  return (
    <div ref={ref}>
      <div className={s.container}>
        <div className={cn(s.frame)}>
          <div className={cn(s.text, "gsap-text-container overflow-hidden")}>
            <div className="gsap-text">{title}</div>
          </div>
          <div className={cn(s.infoCardC, "gsap-info-card-c")}>
            <div className={cn(s.infoCard, "gsap-info-card")}>
              <div className={s.backdrop}></div>
              <p className={s.infoText}>{description}</p>
            </div>
          </div>
        </div>
        <section className={cn(s.panel, s.blue, "panel blue")}>
          <div className={cn(s.bgImage, "bg-image")}>
            <Image
              src="/img/horizontal-scroll/1.jpg"
              // src="https://images.unsplash.com/photo-1470075801209-17f9ec0cada6"
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
              src="/img/horizontal-scroll/2.jpg"
              // src="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
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
              src="/img/horizontal-scroll/3.jpg"
              // src="https://images.unsplash.com/photo-1486325212027-8081e485255e"
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
              src="/img/horizontal-scroll/4.jpg"
              // src="https://images.unsplash.com/photo-1478860409698-8707f313ee8b"
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
  )
}
