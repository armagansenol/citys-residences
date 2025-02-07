"use client"

import s from "./animated-button.module.css"

import { gsap } from "@/components/gsap"
import { useGSAP } from "@gsap/react"
import cn from "clsx"
import { ArrowRight } from "lucide-react"
import { useRef, useState } from "react"

interface AnimatedButtonProps {
  text: string
  path?: string
}

function AnimatedButton({ text = "Button Text" }: AnimatedButtonProps) {
  const [hover, setHover] = useState(false)
  const buttonRef = useRef<HTMLSpanElement>(null)
  const buttonTL = useRef<gsap.core.Timeline>()

  useGSAP(
    () => {
      if (!buttonRef.current) return

      buttonTL.current = gsap.timeline({
        paused: true,
      })

      buttonTL.current
        .to(".gsap-btn-right", {
          xPercent: 200,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .from(
          ".gsap-btn-left",
          {
            xPercent: -200,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "s"
        )
        .to(
          ".gsap-bg",
          {
            y: 0,
            ease: "power2.inOut",
          },
          "s"
        )
    },
    {
      scope: buttonRef,
      revertOnUpdate: true,
    }
  )

  useGSAP(
    () => {
      if (hover) {
        buttonTL.current?.play()
      } else {
        buttonTL.current?.reverse()
      }
    },
    {
      dependencies: [hover],
    }
  )

  return (
    <span
      className={cn(s.button, "gsap-button flex items-center justify-between cursor-pointer relative overflow-hidden")}
      ref={buttonRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className={cn(s.iconC, "gsap-btn-left flex items-center justify-center flex-shrink-0 z-20")}>
        <ArrowRight className={cn(s.icon, "text-white")} />
      </span>
      <span className={cn(s.text, "block z-20")}>{text}</span>
      <span className={cn(s.iconC, "gsap-btn-right flex items-center justify-center flex-shrink-0 z-20")}>
        <ArrowRight className={cn(s.icon, "text-bricky-brick")} />
      </span>
      <span className="gsap-bg bg-bricky-brick w-full h-full absolute top-0 left-0 translate-y-full z-10"></span>
    </span>
  )
}

export default AnimatedButton
