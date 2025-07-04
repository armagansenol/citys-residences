"use client"

import { cn } from "@/lib/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useRef, useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Img } from "@/components/utility/img"
import { ScrollableBox } from "@/components/utility/scrollable-box"
import { AnimatedLine } from "../animated-line"
import { MaskedParallaxImage } from "../masked-parallax-image"
import EmblaCarousel from "../utility/embla-carousel"

export interface ListCarouselProps {
  title: string
  items: {
    title?: string
    subtitle?: string
    description?: string
    logos?: {
      url: string
    }[]
  }[]
  images: {
    url: string
  }[]

  withMoveDown?: boolean
  variant?: "default" | "v2"
}

export function ListCarousel({
  title,
  items,
  images,
  // withMoveDown = false,
  variant = "default",
}: ListCarouselProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const actualItemsLength = items?.length || 0
  const actualImagesLength = images?.length || 0

  const loopLength = actualItemsLength === 1 && actualImagesLength > 0 ? actualImagesLength : actualItemsLength

  const itemIndexForDisplay = actualItemsLength === 1 ? 0 : activeIndex

  const goToIndex = (targetIndex: number) => {
    let newIndex = targetIndex

    if (loopLength > 0) {
      if (newIndex < 0) {
        newIndex = loopLength - 1
      } else if (newIndex >= loopLength) {
        newIndex = 0
      }
    } else {
      newIndex = 0
    }

    setActiveIndex(newIndex)
  }

  return (
    <div className="relative w-full" ref={ref}>
      <div className="h-full relative">
        <div className="w-full h-full flex flex-col gap-10 xl:gap-10 2xl:gap-10">
          <AnimatedLine direction="horizontal" />
          <div className="flex flex-col gap-2 lg:gap-4 section-container">
            <h2 className="font-primary text-3xl lg:text-4xl xl:text-5xl font-normal text-bricky-brick">{title}</h2>
            {variant === "default" && items.length > 0 && (
              <div className="w-full">
                <ScrollableBox scrollTo={activeIndex ? `#item${activeIndex}Button` : null} orientation="horizontal">
                  <div className="flex flex-row pt-4">
                    {items.map((item, itemIndex) => (
                      <motion.div
                        id={`item${itemIndex}Button`}
                        key={itemIndex}
                        className={cn(
                          "whitespace-nowrap font-primary text-sm 2xl:text-base text-black cursor-pointer pr-4 transition-opacity duration-300",
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
                </ScrollableBox>
              </div>
            )}
            {variant === "v2" && items.length > 0 && (
              <div className="pt-4 w-full lg:w-96">
                <Select value={activeIndex.toString()} onValueChange={(value) => goToIndex(parseInt(value))}>
                  <SelectTrigger className="border border-bricky-brick rounded-lg bg-transparent font-primary text-sm 2xl:text-lg text-bricky-brick p-3">
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((item, itemIndex) => (
                      <SelectItem key={itemIndex} value={itemIndex.toString()}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex flex-col-reverse lg:flex-col items-center lg:items-start gap-8 lg:gap-4 w-full">
              <div
                className={cn(
                  "w-full space-y-12",
                  // variant === "default" && "pt-0 lg:pt-32 xl:pt-64",
                  variant === "v2" && "pt-0"
                )}
              >
                <AnimatePresence mode="wait">
                  {items[itemIndexForDisplay] && (
                    <motion.div
                      key={`text-${itemIndexForDisplay}`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* <h3 className="font-primary text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium text-bricky-brick mb-3 xl:mb-6">
                        {items[itemIndexForDisplay].title}
                      </h3> */}
                      <div className="xl:pr-8 2xl:pr-16">
                        <p className="font-primary text-base lg:text-sm xl:text-base 2xl:text-lg font-bold text-black">
                          {items[itemIndexForDisplay].subtitle}
                        </p>
                        <p className="font-primary text-base lg:text-sm xl:text-base 2xl:text-lg font-normal text-black">
                          {items[itemIndexForDisplay].description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {items[itemIndexForDisplay] && (
                  <AnimatePresence mode="wait">
                    {items[itemIndexForDisplay] && (
                      <motion.div
                        className="flex flex-row flex-wrap gap-12"
                        key={`text-${itemIndexForDisplay}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {items[itemIndexForDisplay].logos?.map((logo, logoIndex) => (
                          <div key={logoIndex} className="w-16 h-16 relative">
                            <Img src={logo.url} alt="Members Club" fill sizes="10vw" className="object-contain" />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
          <AnimatedLine direction="horizontal" />
          <div className="relative overflow-hidden w-full">
            {variant === "v2" && (
              <EmblaCarousel
                slides={[...images, ...images, ...images].map((image, imageIndex) => (
                  <div key={imageIndex} className="relative h-[80vh] w-[70vw]">
                    <MaskedParallaxImage imgSrc={image.url} sizes="100vw" />
                  </div>
                ))}
                options={{ duration: 35, loop: true, align: "start" }}
                slideWidth="60vw"
                slideSpacing="24px"
                parallax={true}
              />
            )}
            {variant === "default" && (
              <>
                {images.map((image, imageIndex) => (
                  <motion.div
                    key={imageIndex}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: imageIndex === activeIndex ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    className="absolute left-0 top-0 w-full h-full overflow-hidden"
                    style={{ zIndex: imageIndex === activeIndex ? 2 : 1 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full">
                      <Img src={image.url} alt="Members Club" fill sizes="100vw" className="object-cover" />
                    </div>
                  </motion.div>
                ))}
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-1.5 lg:left-4 cursor-pointer blur-bg-white p-2 lg:p-4 rounded-full border border-black z-10"
                  onClick={() => goToIndex(activeIndex - 1)}
                >
                  <ArrowLeftIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 right-1.5 lg:right-4 cursor-pointer blur-bg-white p-2 lg:p-4 rounded-full border border-black z-10"
                  onClick={() => goToIndex(activeIndex + 1)}
                >
                  <ArrowRightIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* {withMoveDown && (
        <div className={cn("hidden lg:block absolute bottom-0 left-0 p-5 rounded-full border border-black opacity-70")}>
          <MoveDownIcon className="w-8 h-8" />
        </div>
      )} */}
    </div>
  )
}
