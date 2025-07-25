"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"

export function GSAPGlobalAnimationInitializer() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const gsapGlobalFadeIn: HTMLElement[] = gsap.utils.toArray(".gsap-global-fade-in")

    gsapGlobalFadeIn.forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        duration: 0.4,
        scrollTrigger: {
          trigger: element,
          start: "center-=25% center+=25%",
        },
      })
    })
  })

  return null
}
