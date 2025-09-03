"use client"

import { ScrollTrigger, gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { ReactNode, useEffect, useRef } from "react"

import { Img } from "@/components/utility/img"
import { useStackingCardsStore } from "@/lib/store/scroll"

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
      dependencies: [items],
      revertOnUpdate: true,
    }
  )

  return (
    <div className="relative w-[96vw] md:w-full h-[140vw] xl:h-[42vw] 2xl:h-[42vw] 3xl:h-[35vw]" ref={ref}>
      {items.map((item, i) => {
        return (
          <div
            className={cn(
              "gsap-stacking-card",
              "absolute w-full h-full overflow-hidden",
              "border border-s-neutral-300 bg-white px-4 rounded-xl",
              "flex flex-col gap-0 lg:gap-3 py-4 lg:py-8 xl:py-4 flex-1"
            )}
            key={i}
            id={item.sectionId}
          >
            <div className="flex flex-col gap-0 lg:gap-2 pb-2 lg:pt-6 px-0">
              <h3 className="font-montserrat text-xl lg:text-4xl xl:text-4xl font-bold text-bricky-brick">
                {item.title}
              </h3>
              <small className="font-primary text-sm lg:text-xl xl:text-xl font-normal lg:font-bold text-bricky-brick">
                {item.description}
              </small>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 mt-auto flex-1">
              <div className="relative lg:rounded-md overflow-hidden w-full h-[55vw] lg:h-[30vw] xl:h-auto">
                <Img
                  src={item.images[0].url}
                  alt="Residence"
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                  className="object-fill"
                  loading="lazy"
                />
              </div>
              <div className="relative lg:rounded-md overflow-hidden w-full h-[55vw] lg:h-[30vw] xl:h-auto">
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
