"use client"

import { ScrollTrigger, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon, ArrowRightIcon, MoveDownIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Img } from "@/components/utility/img"
import { ScrollableBox } from "../utility/scrollable-box"

export interface ListCarouselProps {
  title: string
  items: {
    title?: string
    subtitle: string
    description: string
  }[]
  images: {
    url: string
  }[]
  withMoveDown?: boolean
}

export function ListCarousel({ title, items, images, withMoveDown = false }: ListCarouselProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplaying, setIsAutoplaying] = useState(false) // Initialized to false

  const actualItemsLength = items?.length || 0
  const actualImagesLength = images?.length || 0

  // Determine the length for looping/iteration.
  // If there's only one item, loop through images if available. Otherwise, loop through items.
  const loopLength = actualItemsLength === 1 && actualImagesLength > 0 ? actualImagesLength : actualItemsLength

  // Determine which item's text content to display.
  // If there's only one item, always display its content. Otherwise, display content of the activeIndex.
  const itemIndexForDisplay = actualItemsLength === 1 ? 0 : activeIndex

  useEffect(() => {
    // Animations based on activeIndex (handled by framer-motion)
  }, [activeIndex, items, images])

  // Autoplay interval useEffect
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    // Autoplay only if there's more than one slide in the effective loop
    if (isAutoplaying && loopLength > 1) {
      intervalId = setInterval(() => {
        setActiveIndex((prevActiveIndex) => {
          let nextIndex = prevActiveIndex + 1
          if (nextIndex >= loopLength) {
            nextIndex = 0 // Loop to the first slide
          }
          return nextIndex
        })
      }, 4000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isAutoplaying, loopLength, setActiveIndex]) // loopLength captures dependency on items & images

  // ScrollTrigger for viewport-based autoplay control
  useGSAP(
    () => {
      if (!items || items.length === 0) return

      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => setIsAutoplaying(true),
        onLeave: () => setIsAutoplaying(false),
        onEnterBack: () => setIsAutoplaying(true),
        onLeaveBack: () => setIsAutoplaying(false),
        // markers: true, // For debugging
      })

      return () => {
        st.kill() // Kill the specific ScrollTrigger instance
      }
    },
    { scope: ref, dependencies: [items, setIsAutoplaying] }
  )

  const goToIndex = (targetIndex: number) => {
    setIsAutoplaying(false)
    let newIndex = targetIndex

    if (loopLength > 0) {
      // Ensure loopLength is positive before modulo
      if (newIndex < 0) {
        newIndex = loopLength - 1 // Loop to the last item
      } else if (newIndex >= loopLength) {
        newIndex = 0 // Loop to the first item
      }
    } else {
      newIndex = 0 // Default to 0 if no items/images to loop
    }

    setActiveIndex(newIndex)
  }

  return (
    <div className="relative w-full" ref={ref}>
      <div className="h-full relative">
        <div className={"w-full h-full flex flex-col lg:flex-row gap-10 xl:gap-10 2xl:gap-10"}>
          <div className={"flex flex-col gap-4 w-full"}>
            <h2 className="font-suisse-intl text-3xl lg:text-4xl xl:text-5xl font-normal text-bricky-brick">{title}</h2>
            <div className="w-full">
              <ScrollableBox scrollTo={activeIndex ? `#item${activeIndex}Button` : null} orientation="horizontal">
                {items.length > 0 && items[0].title && (
                  <div className="flex flex-row pt-4">
                    {items.map((item, itemIndex) => (
                      <motion.div
                        id={`item${itemIndex}Button`}
                        key={itemIndex}
                        className={cn(
                          "whitespace-nowrap font-suisse-intl text-sm 2xl:text-base text-black cursor-pointer pr-4 transition-opacity duration-300",
                          itemIndex === items.length - 1 && "pr-0",
                          itemIndex === activeIndex && "underline",
                          itemIndex === activeIndex ? "opacity-100" : "opacity-50",
                          "hover:opacity-100"
                        )}
                        onClick={() => goToIndex(itemIndex)}
                      >
                        {item.title}
                      </motion.div>
                    ))}
                  </div>
                )}
              </ScrollableBox>
            </div>
            <div className="relative mt-5 lg:mt-8 flex flex-row items-center gap-4 w-full">
              <div className="relative w-4/12">
                <AnimatePresence mode="wait">
                  {items[itemIndexForDisplay] && (
                    <motion.div
                      key={`text-${itemIndexForDisplay}`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-suisse-intl text-2xl lg:text-4xl xl:text-3xl 2xl:text-4xl font-normal text-bricky-brick mb-2 lg:mb-6">
                        {items[itemIndexForDisplay].title}
                      </h3>
                      <div className="xl:pr-8 2xl:pr-16">
                        <p className="font-suisse-intl text-base lg:text-lg xl:text-base 2xl:text-lg font-bold text-black">
                          {items[itemIndexForDisplay].subtitle}
                        </p>
                        <p className="font-suisse-intl text-base lg:text-lg xl:text-base 2xl:text-lg font-normal text-black">
                          {items[itemIndexForDisplay].description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={cn("relative overflow-hidden h-[40vw] w-8/12")}>
                {images[activeIndex] && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 top-0 w-full h-full overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-full">
                      <Img
                        src={images[activeIndex].url}
                        alt="Members Club"
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                )}
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-1.5 lg:left-4 cursor-pointer blur-bg-white p-2 lg:p-4 rounded-full border-2 border-black"
                  onClick={() => goToIndex(activeIndex - 1)}
                >
                  <ArrowLeftIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 right-1.5 lg:right-4 cursor-pointer blur-bg-white p-2 lg:p-4 rounded-full border-2 border-black"
                  onClick={() => goToIndex(activeIndex + 1)}
                >
                  <ArrowRightIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {withMoveDown && (
        <div className={cn("hidden lg:block absolute bottom-0 left-0 p-5 rounded-full border border-black opacity-70")}>
          <MoveDownIcon className="w-8 h-8" />
        </div>
      )}
    </div>
  )
}
