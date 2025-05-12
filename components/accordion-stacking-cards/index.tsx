"use client"

import { ScrollTrigger, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useRef, useState } from "react"

import { Img } from "@/components/utility/img"

export interface AccordionStackingCardsProps {
  title: string
  items: {
    title: string
    subtitle: string
    description: string
  }[]
  images: {
    url: string
  }[]
  reverse?: boolean
}

export function AccordionStackingCards({ title, items, images, reverse = false }: AccordionStackingCardsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [currentText, setCurrentText] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useGSAP(
    () => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: ref.current,
        pin: true,
        scrub: 0.1,
        end: `+=${images.length * 1000}px`,
        start: "center center",
        // snap: {
        //   snapTo: Array.from({ length: images.length }, (_, i) => i / (images.length - 1)),
        //   duration: { min: 0.1, max: 0.15 },
        //   delay: 0,
        //   ease: "power2.inOut",
        //   inertia: false,
        // },
        onUpdate: ({ progress }) => {
          // Calculate image progress
          const imageProgress = progress * images.length
          const newImageIndex = Math.min(Math.floor(imageProgress), images.length - 1)
          setCurrentImage(newImageIndex)

          // Calculate text progress (only if we have text items)
          if (items.length > 0) {
            const textProgress = progress * items.length
            const newTextIndex = Math.min(Math.floor(textProgress), items.length - 1)
            setCurrentText(newTextIndex)
          }
        },
      })
    },
    {
      scope: ref,
    }
  )

  const handleItemClick = (index: number) => {
    setCurrentText(index)
    if (scrollTriggerRef.current) {
      // Calculate progress based on image index since that's what controls the scroll
      const progress = index / (images.length - 1)
      const startPosition = scrollTriggerRef.current.start
      const scrollAmount = startPosition + progress * (scrollTriggerRef.current.end - startPosition)
      scrollTriggerRef.current.scroll(scrollAmount)
    }
  }

  return (
    <div className="w-full h-[80vh]" ref={ref}>
      <div className="gsap-stacking-cards-container h-full relative">
        <div className={cn("absolute top-0 left-0 w-full h-full flex gap-10 xl:gap-10 2xl:gap-10")}>
          <div className={cn("relative basis-4/12", reverse && "order-last")}>
            <h2 className="font-montserrat text-3xl lg:text-4xl xl:text-5xl font-medium text-bricky-brick">{title}</h2>
            <div className="flex flex-col items-start justify-start gap-2 pt-6">
              {items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  className={cn(
                    "whitespace-nowrap relative font-montserrat text-base lg:text-lg xl:text-sm 2xl:text-base font-normal text-black cursor-pointer",
                    {
                      "opacity-100": currentText === itemIndex,
                      "opacity-50": currentText !== itemIndex,
                      "font-bold": currentText === itemIndex,
                    }
                  )}
                  onClick={() => handleItemClick(itemIndex)}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {item.title}
                </motion.div>
              ))}
            </div>
            <div className="relative mt-20">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: currentText === index ? 1 : 0,
                    y: currentText === index ? 0 : 10,
                    zIndex: currentText === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: currentText === index ? 0.3 : 0,
                  }}
                  className="absolute left-0 top-0 w-full"
                >
                  <h3 className="font-montserrat text-3xl lg:text-4xl xl:text-3xl 2xl:text-4xl font-medium text-bricky-brick mb-8">
                    {item.title}
                  </h3>
                  <div className="xl:pr-8 2xl:pr-16">
                    <p className="font-montserrat text-base lg:text-lg xl:text-lg 2xl:text-lg font-bold text-black">
                      {item.subtitle}
                    </p>
                    <p className="font-montserrat text-base lg:text-lg xl:text-lg 2xl:text-lg font-normal text-black">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className={cn("relative overflow-hidden basis-8/12")}>
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentImage === index ? 1 : 0,
                  zIndex: currentImage === index ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: currentImage === index ? 0.2 : 0, // Add delay only when fading in
                }}
                className="absolute left-0 top-0 w-full h-full overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full">
                  <Img src={image.url} alt="Members Club" fill sizes="100vw" className="object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
