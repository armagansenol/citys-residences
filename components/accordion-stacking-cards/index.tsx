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
  const prevIndices = useRef({ text: 0, image: 0 }) // image tracks the last stable animated item
  const sectionTitlesRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionTextsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionImagesRef = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null) // For content/image animation timeline
  const scrollTimeoutRef = useRef<number | null>(null)
  const targetIndexRef = useRef({ content: 0, image: 0 }) // Tracks where the scroll is currently pointing

  const animateContentAndImage = (fromIndex: number, toIndex: number) => {
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const tl = gsap.timeline({
      defaults: {
        duration: 0.3, // Adjusted for a smooth cross-fade
        ease: "none",
      },
    })

    // Animate all content items to their final target state simultaneously
    sectionTextsRef.current.forEach((item, idx) => {
      if (!item) return
      const targetProps = idx === toIndex ? { opacity: 1, y: 0, zIndex: 1 } : { opacity: 0, y: 10, zIndex: 0 }
      tl.to(item, targetProps, 0) // Position parameter 0 ensures all start at the beginning of this timeline
    })

    // Animate all image items to their final target state simultaneously
    sectionImagesRef.current.forEach((item, idx) => {
      if (!item) return
      const targetProps = idx === toIndex ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: 0 }
      tl.to(item, targetProps, 0) // Position parameter 0 ensures all start at the beginning of this timeline
    })

    timelineRef.current = tl
    return tl
  }

  const debouncedAnimate = () => {
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      const currentStableImageIndex = prevIndices.current.image
      const newTargetImageIndex = targetIndexRef.current.image

      if (currentStableImageIndex !== newTargetImageIndex) {
        animateContentAndImage(currentStableImageIndex, newTargetImageIndex)
        prevIndices.current.image = newTargetImageIndex // Update stable index after animation starts
      }
    }, 100) // 100ms debounce
  }

  const animateSectionTitles = (currentIndex: number) => {
    sectionTitlesRef.current.forEach((item, index) => {
      if (item) {
        gsap.to(item, {
          opacity: index === currentIndex ? 1 : 0.5,
          fontWeight: index === currentIndex ? 700 : 400,
          x: index === currentIndex ? 5 : 0,
          duration: 0.3,
        })
      }
    })
  }

  useGSAP(
    () => {
      // Initialize all items to their default states, with the first one active
      sectionTitlesRef.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, {
            opacity: index === 0 ? 1 : 0.5,
            fontWeight: index === 0 ? 700 : 400,
            x: index === 0 ? 5 : 0,
          })
        }
      })

      sectionTextsRef.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, {
            opacity: index === 0 ? 1 : 0,
            y: index === 0 ? 0 : 10,
            zIndex: index === 0 ? 1 : 0,
          })
        }
      })

      sectionImagesRef.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, {
            opacity: index === 0 ? 1 : 0,
            zIndex: index === 0 ? 1 : 0,
          })
        }
      })
      // Initialize targetIndexRef to the first item
      targetIndexRef.current = { content: 0, image: 0 }

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: ref.current,
        pin: true,
        scrub: true, // Keep scrub for smooth progress calculation
        end: `+=${images.length * 150}px`, // User had changed this
        start: "center center",
        onUpdate: ({ progress }) => {
          // Text items animation - fluid and scrub-based
          if (items.length > 0) {
            const textProgress = progress * items.length
            const newTextIndex = Math.min(Math.floor(textProgress), items.length - 1)
            if (newTextIndex !== prevIndices.current.text) {
              animateSectionTitles(newTextIndex)
              prevIndices.current.text = newTextIndex
            }
          }

          // Content and Image items - update target and debounce animation
          const imageProgress = progress * images.length
          const newImageIndex = Math.min(Math.floor(imageProgress), images.length - 1)

          // Update the target indexref if it has actually changed
          if (newImageIndex !== targetIndexRef.current.image) {
            targetIndexRef.current.image = newImageIndex
            targetIndexRef.current.content = newImageIndex // Assuming content follows image index
            debouncedAnimate() // Schedule the animation
          }
        },
      })
    },
    {
      scope: ref,
      dependencies: [items.length, images.length], // Add dependencies if items/images can change
    }
  )

  const handleItemClick = (clickedIndex: number) => {
    if (scrollTriggerRef.current) {
      // Animate text items immediately on click
      animateSectionTitles(clickedIndex)
      prevIndices.current.text = clickedIndex

      // For content and images, update target and trigger debounced animation
      // This ensures click behaves like scroll-stop
      targetIndexRef.current.image = clickedIndex
      targetIndexRef.current.content = clickedIndex

      // Animate from the current stable image to the clicked index
      const currentStableImageIndex = prevIndices.current.image
      if (currentStableImageIndex !== clickedIndex) {
        if (scrollTimeoutRef.current !== null) {
          // Clear any pending scroll-based debounce
          window.clearTimeout(scrollTimeoutRef.current)
        }
        animateContentAndImage(currentStableImageIndex, clickedIndex)
        prevIndices.current.image = clickedIndex // Update stable index immediately after click initiates animation
      }

      // Scroll to the position
      const progress = clickedIndex / (images.length - 1)
      const startPosition = scrollTriggerRef.current.start
      const scrollAmount = startPosition + progress * (scrollTriggerRef.current.end - startPosition)
      // Use GSAP to smoothly scroll the ScrollTrigger instance
      gsap.to(scrollTriggerRef.current, {
        scroll: scrollAmount,
        duration: 0.1, // Adjust duration as needed
      })
    }
  }

  return (
    <div className="w-full h-[100vh] py-20" ref={ref}>
      <div className="gsap-stacking-cards-container h-full relative">
        <div className={cn("absolute top-0 left-0 w-full h-full flex gap-10 xl:gap-10 2xl:gap-10")}>
          <div className={cn("relative basis-4/12", reverse && "order-last")}>
            <h2 className="font-montserrat text-3xl lg:text-4xl xl:text-5xl font-medium text-bricky-brick">{title}</h2>
            <div className="flex flex-col items-start justify-start gap-2 pt-6">
              {items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  ref={(el) => {
                    sectionTitlesRef.current[itemIndex] = el
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
                    sectionTextsRef.current[index] = el
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
                  sectionImagesRef.current[index] = el
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
