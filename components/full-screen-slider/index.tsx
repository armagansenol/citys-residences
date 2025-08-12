"use client"

import { cn } from "@/lib/utils"

import { EmblaCarousel } from "@/components/utility/embla-carousel"
import { Img } from "@/components/utility/img"
import { ReactNode } from "react"

export interface FullScreenSliderProps {
  className?: string
  title: string
  description: ReactNode
  items: string[]
}

export function FullScreenSlider({ className, title, description, items }: FullScreenSliderProps) {
  const slides = items.map((item, i) => (
    <div className="w-screen h-[70vw] relative" key={i}>
      <Img className="object-cover object-bottom" src={item} alt={title} fill sizes="100vw" />
    </div>
  ))

  return (
    <div className={cn("relative flex flex-col lg:flex-row gap-6", className)}>
      <h2
        className={cn(
          "section-container",
          "font-primary font-bold text-center z-50 lg:whitespace-nowrap mb-4 lg:mb-0",
          "text-bricky-brick lg:text-white",
          "text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl",
          "leading-snug lg:leading-snug xl:leading-snug"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "font-primary text-black lg:text-white font-semibold text-center mb-8 lg:mb-0",
          "w-full lg:w-6/12 xl:w-[27vw] px-6 lg:px-4 lg:py-4",
          "text-2xl lg:text-4xl xl:text-4xl 2xl:text-4xl",
          "leading-relaxed lg:leading-relaxed xl:leading-relaxed"
        )}
      >
        {description}
      </p>
      <EmblaCarousel
        autoplay={true}
        autoplayDelay={5000}
        slides={slides}
        options={{ duration: 35, loop: true }}
        hasButtons={false}
      />
    </div>
  )
}
