"use client"

import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { useWindowSize } from "react-use"

import { ScrollTrigger, gsap } from "@/components/gsap"
import { Img } from "@/components/utility/img"
import { useImageGalleryStore } from "@/lib/store/image-gallery"
import { breakpoints } from "@/styles/config.mjs"

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
  const { openModal } = useImageGalleryStore()
  const { width } = useWindowSize()
  const isMobile = width < breakpoints.breakpointMobile

  useGSAP(
    () => {
      if (isMobile) return
      const tl = gsap.timeline()
      const cards: HTMLElement[] = gsap.utils.toArray(".gsap-stacking-card")

      cards.forEach((card, i) => {
        if (i === 0) return

        gsap.set(card, { yPercent: 150 })

        tl.to(card, { yPercent: 0 })
      })

      ScrollTrigger.create({
        animation: tl,
        trigger: ".gsap-stacking-cards-container",
        start: "top top+=12%",
        pin: true,
        scrub: true,
        end: "+=1500px",
        refreshPriority: 100,
      })
    },
    {
      scope: ref,
      dependencies: [width, items],
      revertOnUpdate: true,
    }
  )

  const handleImageClick = (itemImages: { url: string }[], index: number) => {
    const slides = itemImages.map((image) => (
      <div key={image.url} className="h-[90vh] w-[100vw] relative">
        <Img src={image.url} fill sizes="100vw" alt="Residence" className="object-contain" />
      </div>
    ))
    openModal(slides, index)
  }

  return (
    <div className="bd:mb-64" ref={ref}>
      <div className="gsap-stacking-cards-container relative w-full h-auto bt:h-[100vw] bd:h-[43vw]">
        {items.map((item, i) => (
          <div
            className={cn(
              "gsap-stacking-card",
              "relative bt:absolute left-1/2 -translate-x-1/2 w-full h-full overflow-hidden border-t bg-white"
            )}
            key={i}
            style={{
              marginTop: `${i * (isMobile ? 0 : 80)}px`,
            }}
          >
            <div className="gsap-card-content flex flex-col gap-3 py-4 bt:py-8 bd:py-4">
              <h2 className="font-montserrat text-4xl bt:text-4xl bd:text-5xl font-medium text-bricky-brick">
                {item.title}
              </h2>
              <small className="font-montserrat text-sm bt:text-base bd:text-xl font-normal mb-4">
                {item.description}
              </small>
              <div className="flex flex-col bt:flex-row gap-4 flex-1 flex-shrink-0">
                {item.images.map((image, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative rounded-md overflow-hidden cursor-pointer h-[64vw] bt:h-[33.5vw] flex-shrink-0 bt:flex-1",
                      "hover:opacity-90 transition-opacity"
                    )}
                    onClick={() => handleImageClick(item.images, i)}
                  >
                    <Img
                      src={image.url}
                      alt={item.title}
                      fill
                      sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, 50vw`}
                      className="object-cover"
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
