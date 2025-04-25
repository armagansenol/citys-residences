"use client"

import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

import { ScrollTrigger, gsap } from "@/components/gsap"
import { Img } from "@/components/utility/img"
import { useImageGalleryStore } from "@/lib/store/image-gallery"

export interface StackingCardsProps {
  items: {
    title: string
    images: {
      url: string
    }[]
    bg: string
  }[]
}

export function StackingCards({ items }: StackingCardsProps) {
  const ref = useRef(null)
  const { openModal } = useImageGalleryStore()

  useGSAP(
    () => {
      const tl = gsap.timeline()
      const cards: HTMLElement[] = gsap.utils.toArray(".gsap-stacking-card")

      cards.forEach((card, i) => {
        if (i === 0) return

        gsap.set(card, { yPercent: 150 })
      })

      tl.to(
        cards[0],
        {
          scale: 0.9,
          opacity: 0,
        },
        "a"
      )
        .to(cards[1], { yPercent: 0 }, "a")
        .to(
          cards[1],
          {
            scale: 0.9,
            opacity: 0,
          },
          "b"
        )
        .to(cards[2], { yPercent: 0 }, "b")

      ScrollTrigger.create({
        animation: tl,
        trigger: ".gsap-stacking-cards-container",
        start: "center center",
        pin: true,
        scrub: true,
        end: "+=1500px",
      })
    },
    {
      scope: ref,
    }
  )

  const handleImageClick = (itemImages: { url: string }[], index: number) => {
    const slides = itemImages.map((image) => (
      <div key={image.url} className="h-[60vh] w-[100vw] relative">
        <Img src={image.url} fill sizes="100vw" alt="Residence Interior" className="object-contain" />
      </div>
    ))
    openModal(slides, index)
  }

  return (
    <div ref={ref}>
      <div className="gsap-stacking-cards-container relative w-full h-[65vh] bt:h-[40vh] bd:h-[70vh] mb-64">
        {items.map((item, i) => (
          <div
            className={cn(
              "gsap-stacking-card absolute left-0 w-full h-full overflow-hidden border-t bg-white p-3 bt:p-10 flex items-end justify-end"
            )}
            style={{ backgroundColor: item.bg }}
            key={i}
          >
            <h2 className="absolute top-0 left-0 font-montserrat text-3xl bt:text-4xl font-normal p-3 bt:p-5">
              {item.title}
            </h2>
            <div className="flex flex-col bt:flex-row gap-3 bt:gap-5 ml-auto w-8/12 bt:w-auto h-[100%] bt:h-[60%] bd:h-[85%]">
              {item.images.map((image, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bt:h-full rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleImageClick(item.images, i)}
                >
                  <Img src={image.url} alt={item.title} width={1000} height={1000} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
