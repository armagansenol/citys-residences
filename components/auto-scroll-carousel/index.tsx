"use client"

import s from "./embla.module.css"

import { EmblaOptionsType } from "embla-carousel"
import AutoScroll from "embla-carousel-auto-scroll"
import useEmblaCarousel from "embla-carousel-react"
import React, { ReactNode, useEffect } from "react"

type PropType = {
  children: ReactNode | ReactNode[]
  options?: EmblaOptionsType
}

export function AutoScrollCarousel({ children, options }: PropType) {
  // @ts-expect-error -- Type compatibility workaround between embla-carousel packages
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoScroll({ playOnInit: true, speed: 1.25 })])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return
  }, [emblaApi])

  const slides = React.Children.toArray(children)

  return (
    <div className={s.embla}>
      <div className={s.emblaViewport} ref={emblaRef}>
        <div className={s.emblaContainer}>
          {slides.map((slide, index) => (
            <div className={s.emblaSlide} key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
