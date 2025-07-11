"use client"

import s from "./full-screen-slider.module.css"

import { cn } from "@/lib/utils"

import { EmblaCarousel } from "@/components/utility/embla-carousel"

export interface FullScreenSliderProps {
  title: string
  description: string
  items: React.ReactNode[]
}

export function FullScreenSlider({ title, description, items }: FullScreenSliderProps) {
  return (
    <div className="relative flex flex-col bt:flex-row bt:overflow-hidden gap-6 z-[100]">
      <div className="w-screen relative">
        <EmblaCarousel autoplay={true} autoplayDelay={5000} slides={items} options={{ duration: 35, loop: true }} />
      </div>
      <h2
        className={cn(
          s.title,
          "text-bricky-brick lg:text-white text-3xl lg:text-7xl xl:text-7xl font-primary font-bold leading-tight lg:leading-none text-left lg:text-center z-50 section-container whitespace-nowrap"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          s.description,
          "font-primary text-black lg:text-white text-base font-normal leading-relaxed",
          "w-full lg:w-6/12 xl:w-[27vw] px-6 lg:px-4 lg:py-4 rounded-xl"
        )}
      >
        {description}
      </p>
    </div>
  )
}
