import { gsap } from "@/components/gsap"
import { Img } from "@/components/utility/img"
import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export interface MaskedPanImageProps {
  imgSrc: string
  sizes: string
}

export function MaskedPanImage({ imgSrc, sizes = "100vw" }: MaskedPanImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const distance = 75

      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        imgRef.current,
        {
          x: `-${distance * 1.5}px`,
          ease: "none",
        },
        {
          x: `${distance * 1.5}px`,
          ease: "none",
        }
      ).fromTo(
        imgRef.current,
        {
          x: `${distance * 1.5}px`,
          ease: "none",
        },
        {
          x: `-${distance * 1.5}px`,
          ease: "none",
        }
      )

      tl.timeScale(distance * 0.0025).repeat(-1)

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        markers: false,
        onEnter: () => {
          tl.play()
        },
        onLeave: () => {
          tl.pause()
        },
        onEnterBack: () => {
          tl.play()
        },
        onLeaveBack: () => {
          tl.pause()
        },
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center overflow-hidden"
        // ,"border border-red-500"
      )}
      ref={ref}
    >
      <div
        className={cn(
          "relative h-full w-[200%] flex-shrink-0"
          // , "border border-blue-500"
        )}
        ref={imgRef}
      >
        <Img
          src={imgSrc}
          alt="Parallax Image"
          className={cn(
            "object-contain z-40"
            // , "border border-green-500"
          )}
          fill
          sizes={sizes}
          loading="lazy"
        />
      </div>
    </div>
  )
}
