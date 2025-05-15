"use client"

import { cn } from "@/lib/utils"
import { useRef } from "react"

import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { ScrollTrigger, useGSAP, gsap } from "@/components/gsap"
import { Img } from "@/components/utility/img"

const Sequenced = () => {
  const ref = useRef(null)

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
        trigger: ref.current,
        onUpdate: (self) => {
          setImgRecursively(self.progress)
        },
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div className="relative h-[60vh] bt:h-[60vh] bd:h-[100vh] w-full overflow-hidden pointer-events-none" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center max-w-xl mx-auto">
        <h2 className="font-montserrat font-normal text-bricky-brick text-4xl bt:text-7xl bd:text-6xl mb-5 bt:mb-10 text-center">
          <TextRevealOnScroll
            elementLevelClassName="text-center"
            splitBy="lines"
            textAlign="left"
            staggerDuration={0.005}
          >
            YAŞAMA ALAN AÇAN DETAYLAR
          </TextRevealOnScroll>
        </h2>
        <p className="font-halenoir text-md bt:text-4xl bd:text-2xl font-bold mb-4">
          <TextRevealOnScroll
            elementLevelClassName="leading-relaxed"
            splitBy="lines"
            textAlign="left"
            staggerDuration={0.005}
          >
            Her metrekaresi ince tasarlanmış, ferah bir hayata açılan çizgiler
          </TextRevealOnScroll>
        </p>
        <p className="font-halenoir text-md bt:text-4xl bd:text-xl font-normal">
          <TextRevealOnScroll
            elementLevelClassName="leading-relaxed"
            splitBy="lines"
            textAlign="left"
            staggerDuration={0.005}
          >
            Günlük alışkanlıklardan uzun vadeli konfora kadar her detay, yaşamın doğal akışına uyum sağlayacak şekilde
            tasarlandı.
          </TextRevealOnScroll>
        </p>
      </div>
      {Array.from({ length: 24 }).map((_, i) => {
        return (
          <div
            className={cn(
              "gsap-sequence-item",
              "absolute top-1/2 right-0 translate-x-20 -translate-y-1/2 h-screen w-9/12 scale-125 bt:scale-100"
            )}
            key={i}
          >
            <Img
              className="w-full h-full object-contain"
              src={`/img/residences/3d/${String(i + 1).padStart(2, "0")}.png`}
              alt="Residence 3D View"
              fill
              priority={true}
              sizes="80vw"
            />
          </div>
        )
      })}
    </div>
  )
}

export { Sequenced }
