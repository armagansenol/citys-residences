"use client"

import { cn } from "@/lib/utils"
import { useRef } from "react"

import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { ScrollTrigger, useGSAP, gsap } from "@/components/gsap"
import { Img } from "@/components/utility/img"

const Sequenced = () => {
  const mobileRef = useRef(null)
  const desktopRef = useRef(null)

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
        trigger: desktopRef.current,
        onUpdate: (self) => {
          setImgRecursively(self.progress)
        },
      })

      ScrollTrigger.create({
        end: `+=1500px`,
        start: "center center",
        pin: true,
        scrub: true,
        trigger: mobileRef.current,
        onUpdate: (self) => {
          setImgRecursively(self.progress)
        },
      })
    },
    {
      scope: desktopRef,
    }
  )

  return (
    <>
      <div
        className="hidden xl:flex flex-col xl:flex-row relative h-auto xl:h-[100vh] w-full overflow-hidden pointer-events-none"
        ref={desktopRef}
      >
        <div className="relative w-full xl:w-5/12 h-full flex flex-col items-start justify-center">
          <h2 className="font-montserrat font-normal text-bricky-brick text-4xl lg:text-7xl xl:text-6xl mb-5 lg:mb-10 text-center xl:text-left">
            <TextRevealOnScroll splitBy="lines" staggerDuration={0.005}>
              YAŞAMA ALAN AÇAN DETAYLAR
            </TextRevealOnScroll>
          </h2>
          <p className="font-halenoir text-md lg:text-4xl xl:text-2xl font-bold mb-4 text-center xl:text-left">
            <TextRevealOnScroll elementLevelClassName="leading-relaxed" splitBy="lines" staggerDuration={0.005}>
              Her metrekaresi ince tasarlanmış, ferah bir hayata açılan çizgiler
            </TextRevealOnScroll>
          </p>
          <p className="font-halenoir text-md lg:text-4xl xl:text-xl font-normal text-center xl:text-left">
            <TextRevealOnScroll elementLevelClassName="leading-relaxed" splitBy="lines" staggerDuration={0.005}>
              Günlük alışkanlıklardan uzun vadeli konfora kadar her detay, yaşamın doğal akışına uyum sağlayacak şekilde
              tasarlandı.
            </TextRevealOnScroll>
          </p>
        </div>
        <div className="w-full xl:w-7/12">
          <div className="relative w-full h-[80vw] lg:h-[90vw] xl:h-full">
            {Array.from({ length: 24 }).map((_, i) => {
              return (
                <div
                  className={cn("gsap-sequence-item", "absolute top-0 left-0  botom-0 right-0 h-full w-full scale-125")}
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
        </div>
      </div>
      <div className="flex xl:hidden flex-col xl:flex-row relative h-auto xl:h-[100vh] w-full overflow-hidden pointer-events-none">
        <div className="relative w-full xl:w-1/2 h-full flex flex-col items-start justify-center">
          <h2 className="font-montserrat font-normal text-bricky-brick text-4xl lg:text-7xl xl:text-6xl mb-5 lg:mb-10 text-center xl:text-left">
            <TextRevealOnScroll splitBy="lines" staggerDuration={0.005}>
              YAŞAMA ALAN AÇAN DETAYLAR
            </TextRevealOnScroll>
          </h2>
          <p className="font-halenoir text-md lg:text-4xl xl:text-2xl font-bold mb-4 text-center xl:text-left">
            <TextRevealOnScroll elementLevelClassName="leading-relaxed" splitBy="lines" staggerDuration={0.005}>
              Her metrekaresi ince tasarlanmış, ferah bir hayata açılan çizgiler
            </TextRevealOnScroll>
          </p>
          <p className="font-halenoir text-md lg:text-4xl xl:text-xl font-normal text-center xl:text-left">
            <TextRevealOnScroll elementLevelClassName="leading-relaxed" splitBy="lines" staggerDuration={0.005}>
              Günlük alışkanlıklardan uzun vadeli konfora kadar her detay, yaşamın doğal akışına uyum sağlayacak şekilde
              tasarlandı.
            </TextRevealOnScroll>
          </p>
        </div>
        <div className="w-full xl:w-1/2">
          <div className="relative w-full h-[80vw] lg:h-[90vw] xl:h-full" ref={mobileRef}>
            {Array.from({ length: 24 }).map((_, i) => {
              return (
                <div
                  className={cn(
                    "gsap-sequence-item",
                    "absolute top-0 left-0  botom-0 right-0 h-full w-full scale-125 xl:scale-100"
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
        </div>
      </div>
    </>
  )
}

export { Sequenced }
