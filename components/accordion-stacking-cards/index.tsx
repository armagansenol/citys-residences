"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useRef } from "react"

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
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const prevIndices = useRef({ text: 0, image: 0 })
  const textItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const contentItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const imageItemsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      // Initialize text items
      textItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, {
            opacity: index === 0 ? 1 : 0.5,
            fontWeight: index === 0 ? 700 : 400,
            x: index === 0 ? 5 : 0,
          })
        }
      })

      // Initialize content items
      contentItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, {
            opacity: index === 0 ? 1 : 0,
            y: index === 0 ? 0 : 10,
            zIndex: index === 0 ? 1 : 0,
          })
        }
      })

      // Initialize image items
      imageItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, {
            opacity: index === 0 ? 1 : 0,
            zIndex: index === 0 ? 1 : 0,
          })
        }
      })

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: ref.current,
        pin: true,
        scrub: true,
        end: `+=${images.length * 500}px`,
        start: "center center",
        onUpdate: ({ progress }) => {
          const imageProgress = progress * images.length
          const newImageIndex = Math.min(Math.floor(imageProgress), images.length - 1)

          if (newImageIndex !== prevIndices.current.image) {
            prevIndices.current.image = newImageIndex

            // Animate images
            imageItemsRef.current.forEach((item, index) => {
              if (item) {
                gsap.to(item, {
                  opacity: index === newImageIndex ? 1 : 0,
                  zIndex: index === newImageIndex ? 1 : 0,
                  duration: 0.5,
                  ease: "power2.inOut",
                  delay: index === newImageIndex ? 0.2 : 0,
                  overwrite: true,
                })
              }
            })
          }

          if (items.length > 0) {
            const textProgress = progress * items.length
            const newTextIndex = Math.min(Math.floor(textProgress), items.length - 1)

            if (newTextIndex !== prevIndices.current.text) {
              prevIndices.current.text = newTextIndex

              // Animate text items
              textItemsRef.current.forEach((item, index) => {
                if (item) {
                  gsap.to(item, {
                    opacity: index === newTextIndex ? 1 : 0.5,
                    fontWeight: index === newTextIndex ? 700 : 400,
                    x: index === newTextIndex ? 5 : 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    overwrite: true,
                  })
                }
              })

              // Animate content items
              contentItemsRef.current.forEach((item, index) => {
                if (item) {
                  gsap.to(item, {
                    opacity: index === newTextIndex ? 1 : 0,
                    y: index === newTextIndex ? 0 : 10,
                    zIndex: index === newTextIndex ? 1 : 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                    delay: index === newTextIndex ? 0.3 : 0,
                    overwrite: true,
                  })
                }
              })
            }
          }
        },
      })
    },
    {
      scope: ref,
      dependencies: [],
      revertOnUpdate: true,
    }
  )

  const handleItemClick = (index: number) => {
    if (scrollTriggerRef.current) {
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
                <div
                  key={itemIndex}
                  ref={(el) => {
                    textItemsRef.current[itemIndex] = el
                  }}
                  className={cn(
                    "whitespace-nowrap relative font-montserrat text-base lg:text-lg xl:text-sm 2xl:text-base text-black cursor-pointer"
                  )}
                  onClick={() => handleItemClick(itemIndex)}
                >
                  {item.title}
                </div>
              ))}
            </div>
            <div className="relative mt-20">
              {items.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    contentItemsRef.current[index] = el
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
                </div>
              ))}
            </div>
          </div>
          <div className={cn("relative overflow-hidden basis-8/12")}>
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  imageItemsRef.current[index] = el
                }}
                className="absolute left-0 top-0 w-full h-full overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full">
                  <Img src={image.url} alt="Members Club" fill sizes="100vw" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
