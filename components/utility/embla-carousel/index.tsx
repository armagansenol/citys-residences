import s from "./embla.module.css"

import { EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import React from "react"

import { useAutoplay } from "./autoplay"
import { NextButton, PrevButton, usePrevNextButtons } from "./embla-carousel-buttons"

type PropType = {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
}

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ playOnInit: true, delay: 5000 })])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  const { onAutoplayButtonClick } = useAutoplay(emblaApi)

  return (
    <div className={s["embla"]}>
      <div className={s["embla-viewport"]} ref={emblaRef}>
        <div className={s["embla-container"]}>
          {slides.map((item, index) => (
            <div className={s["embla-slide"]} key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={s["embla-buttons"]}>
        <PrevButton
          className="blur-bg-white"
          onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
          disabled={prevBtnDisabled}
        />
        <NextButton
          className="blur-bg-white"
          onClick={() => onAutoplayButtonClick(onNextButtonClick)}
          disabled={nextBtnDisabled}
        />
      </div>
    </div>
  )
}

export default EmblaCarousel
