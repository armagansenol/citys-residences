"use client"

import { ScrollTrigger, gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { ReactNode, useRef } from "react"
import { useWindowSize } from "react-use"

import { Img } from "@/components/utility/img"
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

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        start: "center center",
        pin: true,
        scrub: true,
        end: `+=${items.length * window.innerHeight}px`,
      })
    },
    {
      scope: ref,
      dependencies: [items, width],
    }
  )

  // const handleImageClick = (itemImages: { url: string }[], index: number) => {
  //   const slides = itemImages.map((image) => (
  //     <div key={image.url} className="h-[90vh] w-[100vw] relative">
  //       <Img src={image.url} fill sizes="100vw" alt="Residence" className="object-contain" />
  //     </div>
  //   ))
  //   openModal(slides, index)
  // }

  return (
    <div className="relative w-full h-auto lg:h-[100vw] xl:h-[42vw] 2xl:h-[45vw] 3xl:h-[40vw]" ref={ref}>
      {items.map((item, i) => {
        return (
          <div
            className={cn(
              "gsap-stacking-card",
              "relative lg:absolute w-full h-full overflow-hidden",
              "border border-s-neutral-300 bg-white px-4 lg:px-8 rounded-xl",
              "flex flex-col gap-3 py-4 lg:py-8 xl:py-4 flex-1"
            )}
            key={i}
            id={item.sectionId}
          >
            <div className="flex flex-col gap-5 py-8">
              <h2 className="font-primary text-4xl lg:text-4xl xl:text-5xl font-bold text-bricky-brick">
                {item.title}
              </h2>
              <small className="font-primary text-sm lg:text-base xl:text-2xl font-bold text-bricky-brick">
                {item.description}
              </small>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-auto flex-1">
              <div className={cn("relative rounded-md overflow-hidden")}>
                <Img
                  src={item.images[0].url}
                  alt="Residence"
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                  className={cn("object-contain")}
                />
              </div>
              <div className={cn("relative rounded-md overflow-hidden")}>
                <Img
                  src={item.images[1].url}
                  alt="Residence"
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* <MaskedPanImage imgSrc={item.images[1].url} sizes="100vw" /> */}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
