import s from "./embla.module.css"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import React, { useCallback, useEffect, useRef } from "react"

import { useAutoplay } from "./autoplay"
import { NextButton, PrevButton, usePrevNextButtons } from "./embla-carousel-buttons"

import { EmblaOptionsType } from "embla-carousel"

const TWEEN_FACTOR_BASE = 0.2

type PropType = {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
  autoplay?: boolean
  autoplayDelay?: number
  slideWidth?: string
  slideSpacing?: string
  align?: "center" | "start" | "end"
  parallax?: boolean
  hasButtons?: boolean
}

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const {
    slides,
    options,
    autoplay = false,
    autoplayDelay = 5000,
    slideWidth = "100%",
    slideSpacing = "0px",
    parallax = false,
    hasButtons = true,
  } = props

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options as any,
    autoplay ? ([Autoplay({ playOnInit: true, delay: autoplayDelay })] as any) : []
  )

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi as any)
  const { onAutoplayButtonClick } = useAutoplay(emblaApi as any)

  // Parallax-related refs and state
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const setTweenNodes = useCallback((emblaApi: any): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode: any) => {
      return slideNode.querySelector(`.${s["embla-parallax-layer"]}`) as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: any) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback((emblaApi: any, eventName?: string) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === "scroll"

    emblaApi.scrollSnapList().forEach((scrollSnap: any, snapIndex: any) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex: any) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem: any) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100
        const tweenNode = tweenNodes.current[slideIndex]
        if (tweenNode) {
          tweenNode.style.transform = `translateX(${translate}%)`
        }
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi || !parallax) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax)

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenParallax)
        .off("scroll", tweenParallax)
        .off("slideFocus", tweenParallax)
    }
  }, [emblaApi, parallax, tweenParallax, setTweenNodes, setTweenFactor])
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <div
      className={s["embla"]}
      style={{ "--slide-size": slideWidth, "--slide-spacing": slideSpacing } as React.CSSProperties}
    >
      <div className={s["embla-viewport"]} ref={emblaRef}>
        <div className={s["embla-container"]}>
          {slides.map((item, index) => (
            <div className={s["embla-slide"]} key={index}>
              {parallax ? (
                <div className={s["embla-parallax"]}>
                  <div className={s["embla-parallax-layer"]}>{item}</div>
                </div>
              ) : (
                item
              )}
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && hasButtons && (
        <div className={s["embla-buttons"]}>
          <PrevButton
            className="blur-bg-white"
            onClick={autoplay ? () => onAutoplayButtonClick(onPrevButtonClick) : onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            className="blur-bg-white"
            onClick={autoplay ? () => onAutoplayButtonClick(onNextButtonClick) : onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>
      )}
    </div>
  )
}

export default EmblaCarousel
