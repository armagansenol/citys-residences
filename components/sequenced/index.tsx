"use client"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { Img } from "@/components/utility/img"
import { useIntersectionObserver } from "hamo"

const Sequenced = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shouldLoadImages, setShouldLoadImages] = useState(false)

  // Use hamo's useIntersectionObserver hook
  const [setElement, entry] = useIntersectionObserver({
    rootMargin: "100%",
    threshold: 0,
    once: true, // Only trigger once when images should load
  })

  // Update shouldLoadImages when entry changes
  if (entry?.isIntersecting && !shouldLoadImages) {
    setShouldLoadImages(true)
  }

  useGSAP(
    () => {
      const items = document.querySelectorAll(".gsap-sequence-item")
      if (items.length === 0) return

      items.forEach((item, index) => {
        gsap.set(item, { opacity: index === 0 ? 1 : 0 })
      })

      function setImgRecursively(progress: number) {
        const part = 1 / items.length
        let activeIndex = -1

        for (let i = 0; i < items.length; i++) {
          if (progress < part * (i + 1)) {
            activeIndex = i
            break
          }
        }

        if (progress >= 1 - 1e-9) {
          activeIndex = items.length - 1
        }

        items.forEach((item, index) => {
          gsap.set(item, { opacity: index === activeIndex ? 1 : 0 })
        })
      }

      ScrollTrigger.create({
        end: `+=1500px`,
        pin: true,
        scrub: true,
        start: "center center",
        trigger: ref.current,
        onUpdate: (self) => {
          setImgRecursively(self.progress)
        },
      })
    },
    {
      scope: ref,
      revertOnUpdate: true,
    }
  )

  return (
    <div className="relative overflow-hidden pointer-events-none">
      <div
        className="w-full h-[80vw] lg:h-screen flex items-center justify-center overflow-hidden"
        ref={(el) => {
          ref.current = el
          setElement(el)
        }}
      >
        <div className="relative w-[70vw] h-[75%]">
          {Array.from({ length: 31 }).map((_, i) => {
            return (
              <div className={cn("gsap-sequence-item", "absolute top-0 left-0 botom-0 right-0 h-full w-full")} key={i}>
                {shouldLoadImages && (
                  <Img
                    className="w-full h-full object-contain"
                    src={`/img/residences/3d/${i}.png`}
                    alt="Residence 3D View"
                    fill
                    loading="lazy"
                    priority={false}
                    sizes="80vw"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { Sequenced }
