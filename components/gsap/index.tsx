"use client"

import gsap from "gsap"
import { useLayoutEffect } from "react"
import Tempus from "tempus"
import { ScrollTriggerConfig } from "./scroll-trigger"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { CustomEase } from "gsap/all"
import { SplitText } from "gsap/SplitText"

function GSAP({ scrollTrigger = false }) {
  useLayoutEffect(() => {
    gsap.defaults({ ease: "none" })

    // Register plugins
    gsap.registerPlugin(SplitText)

    gsap.ticker.lagSmoothing(0)
    gsap.ticker.remove(gsap.updateRoot)
    Tempus?.add((time: number) => {
      gsap.updateRoot(time / 1000)
    })
  }, [])

  return scrollTrigger ? <ScrollTriggerConfig /> : null
}

export { ScrollTrigger, gsap, useGSAP, CustomEase, SplitText, GSAP }
