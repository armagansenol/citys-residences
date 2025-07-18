import { gsap } from "@/components/gsap"
import { Img } from "@/components/utility/img"
import { breakpoints } from "@/styles/config.mjs"
import { useGSAP } from "@gsap/react"
import { useWindowSize } from "hamo"
import { useRef } from "react"

export interface MaskedPanImageProps {
  imgSrc: string
  sizes: string
}

export function MaskedPanImage({ imgSrc, sizes = "100vw" }: MaskedPanImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (!width) return

      const isBelowTablet = width < breakpoints.breakpointTablet

      const distance = isBelowTablet ? 50 : 50

      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        imgRef.current,
        {
          x: `-${distance * 1.5}px`,
        },
        {
          x: `${distance * 1.5}px`,
        }
      ).fromTo(
        imgRef.current,
        {
          x: `${distance * 1.5}px`,
        },
        {
          x: `-${distance * 1.5}px`,
        }
      )

      tl.play().timeScale(0.1).repeat(-1)
    },
    {
      scope: ref,
      dependencies: [width],
    }
  )
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden" ref={ref}>
      <div className="relative h-full w-[73vw] flex-shrink-0" ref={imgRef}>
        <Img src={imgSrc} alt="Parallax Image" className="object-cover z-40" fill sizes={sizes} loading="lazy" />
      </div>
    </div>
  )
}
