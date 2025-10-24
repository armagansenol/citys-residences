'use client'

import s from './embla.module.css'

import { cn } from '@/lib/utils'
import { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import React, { ReactNode, useEffect } from 'react'

type PropType = {
  children: ReactNode | ReactNode[]
  options?: EmblaOptionsType
  emblaClassname?: string
  emblaViewportClassname?: string
  emblaContainerClassname?: string
  emblaSlideClassname?: string
  slideSpacing?: string
}

export function AutoScrollCarousel({
  children,
  options,
  emblaClassname,
  emblaViewportClassname,
  emblaContainerClassname,
  emblaSlideClassname,
  slideSpacing = '1rem',
}: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true, speed: 2, stopOnInteraction: false }),
  ])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return
  }, [emblaApi])

  const slides = React.Children.toArray(children)

  return (
    <div
      className={cn(s.embla, emblaClassname)}
      style={{ '--slide-spacing': slideSpacing } as React.CSSProperties}
    >
      <div
        className={cn(s.emblaViewport, emblaViewportClassname)}
        ref={emblaRef}
      >
        <div className={cn(s.emblaContainer, emblaContainerClassname)}>
          {slides.map((slide, index) => (
            <div
              className={cn(
                s.emblaSlide,
                'flex items-center justify-center',
                emblaSlideClassname
              )}
              key={index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
