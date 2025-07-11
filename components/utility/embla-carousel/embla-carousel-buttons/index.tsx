import s from "./embla-carousel-buttons.module.css"

import { cn } from "@/lib/utils"
import { EmblaCarouselType } from "embla-carousel"
import { ArrowLeft, ArrowRight } from "lucide-react"
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from "react"

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type PropType = ComponentPropsWithRef<"button">

export const PrevButton: React.FC<PropType> = (props) => {
  const { className, children, ...restProps } = props

  return (
    <button className={cn(s["embla-button"], "cursor-pointer", className)} type="button" {...restProps}>
      <ArrowLeft />
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { className, children, ...restProps } = props

  return (
    <button className={cn(s["embla-button"], "cursor-pointer", className)} type="button" {...restProps}>
      <ArrowRight />
      {children}
    </button>
  )
}
