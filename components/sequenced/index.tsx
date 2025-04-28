"use client"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

import { ScrollTrigger, useGSAP } from "@/components/gsap"
import { Img } from "@/components/utility/img"

const Sequenced = () => {
  const ref = useRef(null)
  const [phase, setPhase] = useState(0)

  useGSAP(
    () => {
      function setImgRecursively(progress: number, items: NodeListOf<Element>, currentIndex: number) {
        const part = 1 / items.length

        if (currentIndex === items.length) {
          return
        }

        if (progress < part * (currentIndex + 1)) {
          setPhase(currentIndex)
        } else {
          setImgRecursively(progress, items, currentIndex + 1)
        }
      }

      ScrollTrigger.create({
        scrub: true,
        start: "center center",
        end: "bottom+=4000px bottom",
        pin: true,
        trigger: ".gsap-sequence",
        onUpdate: ({ progress }) => {
          setImgRecursively(progress, document.querySelectorAll(".gsap-sequence-item"), phase)
        },
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div ref={ref}>
      <div className={cn("gsap-sequence", "relative h-screen w-screen overflow-hidden pointer-events-none")}>
        {Array.from({ length: 24 }).map((_, i) => {
          return (
            <div
              className={cn("gsap-sequence-item", "absolute top-0 left-0 bottom-0 right-0 opacity-0", {
                "opacity-100": phase === i,
              })}
              key={i}
            >
              <Img
                src={`/img/residences/3d/${String(i + 1).padStart(2, "0")}.png`}
                alt="Residence 3D View"
                style={{ objectFit: "contain" }}
                fill
                priority={true}
                sizes="70vw"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { Sequenced }
