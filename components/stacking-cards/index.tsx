"use client"

import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

import { ScrollTrigger, gsap } from "@/components/gsap"
import { Img } from "@/components/utility/img"
import { breakpoints } from "@/styles/config.mjs"
import { useWindowSize } from "react-use"

export interface StackingCardsProps {
  items: {
    title: string
    description: string
    images: {
      url: string
    }[]
    bg: string
  }[]
}

export function StackingCards({ items }: StackingCardsProps) {
  const ref = useRef(null)
  // const { openModal } = useImageGalleryStore()
  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (width < breakpoints.breakpointTablet) return

      const tl = gsap.timeline()
      const cards: HTMLElement[] = gsap.utils.toArray(".gsap-stacking-card")

      cards.forEach((card, i) => {
        if (i === 0) return

        gsap.set(card, { yPercent: 150 })
      })

      tl.to(
        cards[0],
        {
          scale: 0.95,
          yPercent: -40,
        },
        "a"
      )
        // .to(
        //   cards[0].querySelector(".gsap-card-content"),
        //   {
        //     opacity: 0.25,
        //   },
        //   "a"
        // )
        .to(cards[1], { yPercent: -20 }, "a")
        .to(
          cards[1],
          {
            scale: 0.975,
          },
          "b"
        )
        // .to(
        //   cards[1].querySelector(".gsap-card-content"),
        //   {
        //     opacity: 0.5,
        //   },
        //   "b"
        // )
        .to(cards[2], { yPercent: 0 }, "b")

      ScrollTrigger.create({
        animation: tl,
        trigger: ".gsap-stacking-cards-container",
        start: "top top+=30%",
        pin: true,
        scrub: true,
        end: "+=1500px",
        refreshPriority: 200,
      })
    },
    {
      scope: ref,
      dependencies: [width],
    }
  )

  // const handleImageClick = (itemImages: { url: string }[], index: number) => {
  //   const slides = itemImages.map((image) => (
  //     <div key={image.url} className="h-[60vh] w-[100vw] relative">
  //       <Img src={image.url} fill sizes="100vw" alt="Residence Interior" className="object-contain" />
  //     </div>
  //   ))
  //   openModal(slides, index)
  // }

  return (
    <div className="container" ref={ref}>
      <div className="gsap-stacking-cards-container relative w-full bd:h-[60vh]">
        {items.map((item, i) => (
          <div
            className={cn(
              "gsap-stacking-card",
              "relative bd:absolute left-1/2 -translate-x-1/2 w-full h-full overflow-hidden border-t bg-white"
            )}
            key={i}
          >
            <div className="gsap-card-content flex flex-col bd:grid bd:grid-cols-12 py-4 bt:py-8 bd:py-12 h-full">
              <div className="col-span-3 bd:-mt-2">
                <h2 className="font-montserrat text-3xl bt:text-4xl bd:text-5xl font-medium text-bricky-brick mb-2 bt:mb-4">
                  {item.title}
                </h2>
                <small className="font-montserrat text-sm bt:text-base bd:text-xl font-normal">
                  {item.description}
                </small>
              </div>
              <div className="col-span-9 flex flex-col bt:grid bt:grid-cols-2 gap-4 pl-0 bd:pl-10 pt-8 bt:pt-14 h-[85vh] bt:h-[27vh] bd:h-auto">
                {item.images.map((image, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative rounded-md overflow-hidden cursor-pointer flex-1",
                      "hover:opacity-90 transition-opacity"
                    )}
                    // onClick={() => handleImageClick(item.images, i)}
                  >
                    <Img
                      src={image.url}
                      alt={item.title}
                      fill
                      sizes="50vw"
                      className={i % 2 === 0 ? "object-cover" : "object-cover"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
