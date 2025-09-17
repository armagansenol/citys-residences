"use client"

import s from "./infinite-scrolling-cards.module.css"

import React, { useRef } from "react"
import { cn } from "@/lib/utils"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { LogoSlim } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { colors } from "@/styles/config.mjs"

interface InfiniteScrollingCardsProps {
  items?: {
    src: string
    text: string
  }[]
}

export const InfiniteScrollingCards: React.FC<InfiniteScrollingCardsProps> = ({ items }) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLUListElement>(null)
  const iterationRef = useRef(0)
  const seamlessLoopRef = useRef<gsap.core.Timeline | null>(null)
  const scrubRef = useRef<gsap.core.Tween | null>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  const buildSeamlessLoop = (items: HTMLElement[], spacing: number) => {
    const overlap = Math.ceil(1 / spacing)
    const startTime = items.length * spacing + 0.5
    const loopTime = (items.length + overlap) * spacing + 1
    const rawSequence = gsap.timeline({ paused: true })
    const seamlessLoop = gsap.timeline({
      paused: true,
      repeat: -1,
      onRepeat() {
        // GSAP internal workaround for edge case bug
      },
    })
    const l = items.length + overlap * 2
    let time = 0

    // Set initial state of items
    gsap.set(items, { yPercent: 250, opacity: 0, scale: 0 })

    // Create animations
    for (let i = 0; i < l; i++) {
      const index = i % items.length
      const item = items[index]
      time = i * spacing
      rawSequence
        .fromTo(
          item,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false,
          },
          time
        )
        .fromTo(
          item,
          { yPercent: 250 },
          {
            yPercent: -250,
            duration: 1,
            ease: "none",
            immediateRender: false,
          },
          time
        )

      if (i <= items.length) {
        seamlessLoop.add("label" + i, time)
      }
    }

    // Set up scrubbing
    rawSequence.time(startTime)
    seamlessLoop
      .to(rawSequence, {
        time: loopTime,
        duration: loopTime - startTime,
        ease: "none",
      })
      .fromTo(
        rawSequence,
        { time: overlap * spacing + 1 },
        {
          time: startTime,
          duration: startTime - (overlap * spacing + 1),
          immediateRender: false,
          ease: "none",
        }
      )

    return seamlessLoop
  }

  const wrapForward = (trigger: ScrollTrigger) => {
    iterationRef.current++
    // @ts-expect-error - Custom property added to ScrollTrigger
    trigger.wrapping = true
    trigger.scroll(trigger.start + 1)
  }

  const wrapBackward = (trigger: ScrollTrigger) => {
    iterationRef.current--
    if (iterationRef.current < 0) {
      iterationRef.current = 9
      seamlessLoopRef.current?.totalTime(seamlessLoopRef.current.totalTime() + seamlessLoopRef.current.duration() * 10)
      scrubRef.current?.pause()
    }
    // @ts-expect-error - Custom property added to ScrollTrigger
    trigger.wrapping = true
    trigger.scroll(trigger.end - 1)
  }

  useGSAP(
    () => {
      if (!galleryRef.current || !cardsRef.current) return

      gsap.registerPlugin(ScrollTrigger)

      const spacing = 0.02
      const snap = gsap.utils.snap(spacing)
      const cards = gsap.utils.toArray(cardsRef.current.children) as HTMLElement[]

      seamlessLoopRef.current = buildSeamlessLoop(cards, spacing)

      scrubRef.current = gsap.to(seamlessLoopRef.current, {
        totalTime: 0,
        duration: 0.5,
        ease: "power3",
        paused: true,
      })

      triggerRef.current = ScrollTrigger.create({
        start: 0,
        onUpdate(self) {
          // @ts-expect-error - Custom property added to ScrollTrigger
          if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
            wrapForward(self)
            // @ts-expect-error - Custom property added to ScrollTrigger
          } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
            wrapBackward(self)
          } else {
            if (scrubRef.current && seamlessLoopRef.current) {
              scrubRef.current.vars.totalTime = snap(
                (iterationRef.current + self.progress) * seamlessLoopRef.current.duration()
              )
              scrubRef.current.invalidate().restart()
            }
            // @ts-expect-error - Custom property added to ScrollTrigger
            self.wrapping = false
          }
        },
        end: "+=3000",
        pin: galleryRef.current,
      })

      return () => {
        triggerRef.current?.kill()
        scrubRef.current?.kill()
        seamlessLoopRef.current?.kill()
      }
    },
    { scope: galleryRef }
  )

  return (
    <div className='relative w-full h-full'>
      <div className='fixed top-0 left-0 w-full h-20 bg-white z-50 py-4'>
        <LogoSlim fill={colors["bricky-brick"]} />
      </div>
      <div className={cn(s.gallery, "absolute top-20 left-0 w-full h-full overflow-hidden")} ref={galleryRef}>
        {/* <div className={s.topGradient} />
        <div className={s.bottomGradient} /> */}
        <ul className={s.cards} ref={cardsRef}>
          {items?.map((item, index) => (
            <li key={index} className="after:content-[''] after:absolute after:inset-0 after:bg-black/20">
              <Img src={item.src} alt='Test' fill className='gsap-img w-full h-full object-cover' sizes='90vw' />
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-medium z-50 font-primary whitespace-nowrap'>
                {item.text}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
