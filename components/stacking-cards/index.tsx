"use client"

import { ScrollTrigger, gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useRef } from "react"
import { useWindowSize } from "react-use"

import { Img } from "@/components/utility/img"
import { useImageGalleryStore } from "@/lib/store/image-gallery"
import InnerImageZoom from "react-inner-image-zoom"
import styles from "./stacking-cards.module.css"
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

  useGSAP(
    () => {
      if (!width || width < breakpoints.breakpointMobile) return

      const tl = gsap.timeline()
      const cards: HTMLElement[] = gsap.utils.toArray(".gsap-stacking-card")

      cards.forEach((card, i) => {
        if (i === 0) return

        gsap.set(card, { yPercent: 150, scale: 1.25 })

        tl.to(card, { yPercent: 0, scale: 1 })
      })

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        start: "top top+=2%",
        pin: true,
        scrub: true,
        end: "+=1500px",
      })
    },
    {
      scope: ref,
      dependencies: [items, width],
    }
  )

  const handleImageClick = (itemImages: { url: string }[], index: number) => {
    const slides = itemImages.map((image) => (
      <div key={image.url} className="h-[90vh] w-[100vw] relative">
        {/* <Img src={image.url} fill sizes="100vw" alt="Residence" className="object-contain" /> */}
        <InnerImageZoom src={image.url} zoomSrc={image.url} zoomScale={1.5} />
      </div>
    ))
    openModal(slides, index)
  }

  return (
    <div className="relative w-full h-auto bt:h-[100vw] bd:h-[43vw]" ref={ref}>
      {items.map((item, i) => {
        return (
          <div
            className={cn(
              "gsap-stacking-card",
              styles.stackingCard,
              "relative bt:absolute left-1/2 -translate-x-1/2 w-full h-full overflow-hidden",
              "border border-s-neutral-300 bg-white px-4 bt:px-8 bd:px-4 rounded-xl"
            )}
            key={i}
            style={
              {
                "--card-margin": `${i * 80}px`,
              } as React.CSSProperties
            }
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
                      "relative rounded-md overflow-hidden cursor-pointer h-[64vw] bt:h-[32vw] flex-shrink-0 bt:flex-1",
                      "hover:opacity-90 transition-opacity"
                    )}
                    onClick={() => handleImageClick(item.images, i)}
                  >
                    <Img
                      src={image.url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 800px) 100vw, 50vw"
                      className={cn(i === 0 ? "object-contain" : "object-cover")}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
