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
    <div className='w-screen h-[70vw] relative' key={i}>
      <Img className='object-cover object-bottom' src={item} alt={title} height={1080} width={1920} />
    </div>
  ))

  return (
    <div className={cn("relative flex flex-col lg:flex-row gap-6", className)}>
      <h2
        className={cn(
          "section-container",
          "font-primary font-bold text-center z-50 lg:whitespace-nowrap mb-4 lg:mb-0",
          "text-bricky-brick xl:text-white",
          "text-3xl lg:text-6xl",
          "leading-snug lg:leading-snug"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "font-primary text-black xl:text-white font-normal text-center mb-8 mx-auto",
          "w-full lg:w-9/12 xl:w-[27vw] px-16 lg:px-4 lg:py-4",
          "text-lg lg:text-3xl",
          "leading-snug lg:leading-snug xl:leading-snug"
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
