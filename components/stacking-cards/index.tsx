"use client"

import { ScrollTrigger, gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { ReactNode, useEffect, useRef } from "react"
import { useWindowSize } from "react-use"

import { Img } from "@/components/utility/img"
import { useStackingCardsStore } from "@/lib/store/scroll"
import { breakpoints } from "@/styles/config.mjs"

export interface StackingCardsProps {
  items: {
    title: ReactNode
    description: ReactNode
    images: {
      url: string
    }[]
    bg: string
    sectionId: string
  }[]
}

export function StackingCards({ items }: StackingCardsProps) {
  const ref = useRef(null)
  const { width } = useWindowSize()
  const lenis = useLenis()

  const { setScrollTrigger, setItemsLength, setLenis, updateCurrentCardFromProgress } = useStackingCardsStore()

  // Set Lenis instance in store
  useEffect(() => {
    if (lenis) {
      setLenis(lenis)
    }
  }, [lenis, setLenis])

  // Set items length for both desktop and mobile
  useEffect(() => {
    setItemsLength(items.length)
  }, [items.length, setItemsLength])

  useGSAP(
    () => {
      if (!width || width < breakpoints.breakpointMobile) return

      const tl = gsap.timeline()
      const cards: HTMLElement[] = gsap.utils.toArray(".gsap-stacking-card")

      cards.forEach((card, i) => {
        if (i === 0) return

        gsap.set(card, { xPercent: 150, scale: 1.25 })

        tl.to(card, { xPercent: 0, scale: 1 })
      })

      const trigger = ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        start: "center center",
        pin: true,
        scrub: true,
        end: `+=${items.length * window.innerHeight}px`,
        onUpdate: (self) => {
          updateCurrentCardFromProgress(self.progress)
        },
      })

      setScrollTrigger(trigger)
    },
    {
      scope: ref,
      dependencies: [items, width],
    }
  )

  return (
    <div className="relative w-full h-auto lg:h-[100vw] xl:h-[42vw] 2xl:h-[45vw] 3xl:h-[35vw]" ref={ref}>
      {items.map((item, i) => {
        return (
          <div
            className={cn(
              "gsap-stacking-card",
              "relative lg:absolute w-full h-full overflow-hidden",
              "lg:border lg:border-s-neutral-300 bg-white px-0 lg:px-8 lg:rounded-xl",
              "flex flex-col gap-0 lg:gap-3 py-4 lg:py-8 xl:py-4 flex-1"
            )}
            key={i}
            id={item.sectionId}
          >
            <div className="flex flex-col gap-2 lg:gap-2 py-4 px-4 lg:px-0">
              <h3 className="font-montserrat text-3xl lg:text-4xl xl:text-4xl font-bold text-bricky-brick">
                {item.title}
              </h3>
              <small className="font-primary text-lg lg:text-base xl:text-xl font-bold text-bricky-brick max-w-72 lg:max-w-none">
                {item.description}
              </small>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 mt-auto flex-1">
              <div className="relative lg:rounded-md overflow-hidden w-full h-[72vw] lg:h-auto">
                <Img
                  src={item.images[0].url}
                  alt="Residence"
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                  className="object-fill"
                  loading="lazy"
                />
              </div>
              <div className="relative lg:rounded-md overflow-hidden w-full h-[60vw] lg:h-[80%] mt-auto">
                <Img
                  src={item.images[1].url}
                  alt="Residence"
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
