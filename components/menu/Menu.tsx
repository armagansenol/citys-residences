"use client"

import s from "./menu.module.css"

import cn from "clsx"

import { Img } from "@/components/utility/img"
import { gsap } from "@/lib/gsap"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import VerticalCutReveal, { VerticalCutRevealRef } from "../vertical-cut-reveal"

const navigationItems = [
  "Konutlar",
  "City's Park",
  "City's Club House",
  "Konum",
  "Yeme İçme",
  "Alışveriş",
  "Justwork Campus",
  "Performans Sanatları Merkezi",
  "City's Club Ayrıcalıkları",
]

interface MenuProps {
  open: boolean
}

export default function Menu({ open }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const tl = useRef<GSAPTimeline>()

  const [animateText, setAnimateText] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        paused: true,
        onComplete: () => {
          setAnimateText(true)
        },
        onReverseComplete: () => {
          setAnimateText(false)
        },
      })

      tl.current
        .fromTo(
          ref.current,
          { clipPath: "inset(0% 10% 100%)" },
          { clipPath: "inset(0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }
        )
        .fromTo(
          ".mask",
          { clipPath: "inset(100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0%)",
            duration: 1,
            ease: "expo.inOut",
          },
          "-=0.5"
        )
    }, ref)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (open) {
      tl.current?.play()
    } else {
      tl.current?.reverse()
    }
  }, [open])

  return (
    <>
      <div className={s.frame} ref={ref}>
        <div className={cn(s.wrapper, "wrapper")}>
          <div className={cn(s.menu, "menu")}>
            <div className={s.backdrop}></div>
            <div className={cn(s.content, "w-full h-full")}>
              <div className="col-span-8">
                <div className={cn(s.imgC, "img-c relative overflow-hidden")}>
                  <div className={cn(s.mask, "w-full h-full mask overflow-hidden")}>
                    <Img
                      src="/img/menu.jpg"
                      alt="Aerial view of City's Residences"
                      fill
                      className={cn(s.img, "object-cover absolute bottom-0 left-0 right-0")}
                      priority
                    />
                  </div>
                </div>
              </div>
              <nav className={cn(s.nav, "col-start-10 col-span-10")}>
                <ul className="flex flex-col gap-3 lg:gap-4 font-halenoir font-light">
                  {navigationItems.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-xl font-light text-foreground transition-opacity hover:opacity-70 lg:text-2xl xl:text-3xl"
                      >
                        <AnimatedLink animate={animateText}>{item}</AnimatedLink>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const AnimatedLink = ({ children, animate }: { children: React.ReactNode; animate: boolean }) => {
  const textRef = useRef<VerticalCutRevealRef>(null)

  useEffect(() => {
    if (animate) {
      textRef.current?.startAnimation()
    } else {
      textRef.current?.reset()
    }
  }, [animate])

  return (
    <VerticalCutReveal
      autoStart={false}
      splitBy="characters"
      staggerDuration={0.001}
      transition={{
        type: "spring",
        stiffness: 190,
        damping: 42,
      }}
      ref={textRef}
    >
      {children}
    </VerticalCutReveal>
  )
}
