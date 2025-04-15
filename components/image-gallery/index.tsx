"use client"

import { ReactNode } from "react"

import { EmblaCarousel } from "@/components/utility/embla-carousel"

type Props = {
  currentSlide?: number | null
  slides: ReactNode[]
  className?: string
}

export function ImageGallery(props: Props) {
  return (
    <EmblaCarousel
      autoplay={false}
      options={{
        startIndex: props.currentSlide ?? 0,
        loop: true,
      }}
      slides={props.slides}
    />
  )
}
