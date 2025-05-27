"use client"

import { ScrollTrigger, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Img } from "@/components/utility/img"

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
  reverse?: boolean
}

export function ListCarousel({ title, items, images, reverse = false }: ListCarouselProps) {
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
      }, 3000)
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
    <div className="w-full h-[80vh]" ref={ref}>
      <div className="gsap-stacking-cards-container h-full relative">
        <div className={cn("absolute top-0 left-0 w-full h-full flex gap-10 xl:gap-10 2xl:gap-10")}>
          <div className={cn("relative basis-4/12", reverse && "order-last")}>
            <h2 className="font-montserrat text-3xl lg:text-4xl xl:text-5xl font-medium text-bricky-brick">{title}</h2>
            {items.length > 0 && items[0].title && (
              <div className="flex flex-col items-start justify-start gap-2 pt-6">
                {items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className={cn(
                      "whitespace-nowrap relative font-montserrat text-base lg:text-lg xl:text-sm 2xl:text-base text-black cursor-pointer"
                    )}
                    onClick={() => goToIndex(itemIndex)}
                    animate={{
                      opacity: itemIndex === itemIndexForDisplay ? 1 : 0.5,
                      fontWeight: itemIndex === itemIndexForDisplay ? 700 : 400,
                      x: itemIndex === itemIndexForDisplay ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="absolute top-1/2 -translate-y-1/2 -left-4 bg-bricky-brick w-1.5 h-1.5 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: itemIndex === itemIndexForDisplay ? 1 : 0,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    {item.title}
                  </motion.div>
                ))}
              </div>
            )}
            <div className="relative mt-20">
              <AnimatePresence mode="wait">
                {items[itemIndexForDisplay] && (
                  <motion.div
                    key={`text-${itemIndexForDisplay}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0 w-full"
                  >
                    <h3 className="font-montserrat text-3xl lg:text-4xl xl:text-3xl 2xl:text-4xl font-medium text-bricky-brick mb-6">
                      {items[itemIndexForDisplay].title}
                    </h3>
                    <div className="xl:pr-8 2xl:pr-16">
                      <p className="font-montserrat text-base lg:text-lg xl:text-base 2xl:text-lg font-bold text-black">
                        {items[itemIndexForDisplay].subtitle}
                      </p>
                      <p className="font-montserrat text-base lg:text-lg xl:text-base 2xl:text-lg font-normal text-black">
                        {items[itemIndexForDisplay].description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className={cn("relative overflow-hidden basis-8/12")}>
            {images[activeIndex] && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 top-0 w-full h-full overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full">
                  <Img src={images[activeIndex].url} alt="Members Club" fill sizes="100vw" className="object-cover" />
                </div>
              </motion.div>
            )}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer blur-bg-white p-4 rounded-full border-2 border-black"
              onClick={() => goToIndex(activeIndex - 1)}
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer blur-bg-white p-4 rounded-full border-2 border-black"
              onClick={() => goToIndex(activeIndex + 1)}
            >
              <ArrowRightIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
