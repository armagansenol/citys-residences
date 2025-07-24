"use client"

import { cn } from "@/lib/utils"
import { useRef } from "react"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import { GsapSplitText } from "@/components/gsap-split-text"
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
    <div className="flex flex-col relative overflow-hidden pointer-events-none">
      <div className="relative flex flex-col items-center justify-center max-w-4xl mx-auto py-32">
        <h2 className="font-primary font-bold text-bricky-brick text-4xl lg:text-7xl xl:text-4xl 3xl:text-4xl mb-5 lg:mb-10 text-center xl:text-center">
          <GsapSplitText splitBy="lines" stagger={0.05} duration={1}>
            Yaşama Alan Açan Detaylar
          </GsapSplitText>
        </h2>
        <p className="font-primary font-semibold text-md lg:text-4xl xl:text-2xl 3xl:text-2xl xl:leading-normal 3xl:leading-normal mb-4 text-center xl:text-center">
          <GsapSplitText splitBy="lines" stagger={0.05} duration={1}>
            Her metrekaresi ince tasarlanmış, ferah bir hayata açılan çizgiler
          </GsapSplitText>
        </p>
        <p className="font-primary font-normal text-md lg:text-4xl xl:text-2xl 3xl:text-2xl xl:leading-normal 3xl:leading-normal text-center xl:text-center">
          <GsapSplitText splitBy="lines" stagger={0.05} duration={1}>
            Günlük alışkanlıklardan uzun vadeli konfora kadar her detay, yaşamın doğal akışına uyum sağlayacak şekilde
            tasarlandı.
          </GsapSplitText>
        </p>
      </div>
      <div>
        <div className="w-full h-screen flex items-center justify-center" ref={ref}>
          <div className="relative w-[70vw] h-[75%]">
            {Array.from({ length: 31 }).map((_, i) => {
              return (
                <div
                  className={cn("gsap-sequence-item", "absolute top-0 left-0 botom-0 right-0 h-full w-full")}
                  key={i}
                >
                  <Img
                    className="w-full h-full object-contain"
                    // src={`/img/residences/3d/${String(i + 1).padStart(2, "0")}.png`}
                    src={`/img/residences/3d/${i}.png`}
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
    </div>
  )
}

export { Sequenced }
