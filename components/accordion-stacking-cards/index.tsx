"use client"

import { ScrollTrigger, gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useRef } from "react"

import { Img } from "@/components/utility/img"
import { useImageGalleryStore } from "@/lib/store/image-gallery"

export interface AccordionStackingCardsProps {
  items: {
    title: string
    description: string
    images: {
      url: string
    }[]
    bg: string
  }[]
}

export function AccordionStackingCards({ items }: AccordionStackingCardsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { openModal } = useImageGalleryStore()

  useGSAP(
    () => {
      const tl = gsap.timeline()

      const cards: HTMLElement[] = gsap.utils.toArray(ref.current?.querySelectorAll(`.gsap-stacking-card`) ?? [])

      cards.forEach((card, cardIndex) => {
        const images: HTMLElement[] = gsap.utils.toArray(card.querySelectorAll(`.gsap-stacking-card-image`))

        console.log(`Card ${cardIndex} images:`, images)

        images.forEach((image, imageIndex) => {
          if (imageIndex === 0) return

          gsap.set(image, {
            yPercent: imageIndex === 0 ? 0 : 150,
          })
        })

        // Set initial positions
        gsap.set(card, { yPercent: cardIndex === 0 ? 0 : 150 })

        // First animate the card
        tl.to(card, {
          yPercent: 12.5 * cardIndex,
          duration: 1,
          ease: "power2.inOut",
        })

        // Then animate each image in sequence
        images.forEach((image, imageIndex) => {
          if (imageIndex === 0) return
          tl.to(image, {
            yPercent: 0,
            ease: "power2.inOut",
          }) // Add a small delay after card animation
        })

        // tl.to(card, {
        //   yPercent: 5 * cardIndex,
        //   duration: 1,
        //   delay: -1,
        //   ease: "power2.inOut",
        // })
      })

      ScrollTrigger.create({
        animation: tl,
        trigger: ".gsap-stacking-cards-container",
        start: "top top+=12%",
        pin: true,
        scrub: 1,
        end: "+=6000px",
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
    <div className="container mb-48" ref={ref}>
      <div className="gsap-stacking-cards-container relative w-full h-[65vh] bt:h-[40vh] bd:h-[80vh]">
        {items.map((item, cardIndex) => (
          <div
            className={cn(
              "gsap-stacking-card",
              `gsap-stacking-card-${cardIndex}`,
              "absolute left-1/2 -translate-x-1/2 w-full h-full border-t bg-white"
            )}
            key={cardIndex}
          >
            <div className="gsap-card-content grid grid-rows-12 py-6 h-full">
              <div className="row-span-1 flex items-center justify-start">
                <h2 className="font-montserrat text-3xl bt:text-4xl bd:text-5xl font-medium text-bricky-brick mb-4">
                  {item.title}
                </h2>
              </div>
              <div className="row-span-11 relative h-full overflow-hidden pt-10">
                {item.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className={cn(
                      "gsap-stacking-card-image",
                      `gsap-stacking-card-image-${cardIndex}`,
                      "absolute left-1/2 -translate-x-1/2 w-full h-full"
                    )}
                    onClick={() => handleImageClick(item.images, imageIndex)}
                  >
                    <Img
                      src={image.url}
                      alt={item.title}
                      fill
                      sizes="100vw"
                      className={imageIndex % 2 === 0 ? "object-cover" : "object-cover"}
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
