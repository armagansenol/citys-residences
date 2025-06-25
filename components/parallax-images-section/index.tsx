import { cn } from "@/lib/utils"
import { ReactNode } from "react"

import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { breakpoints } from "@/styles/config.mjs"
export interface MaskedParallaxImageSectionProps {
  horizontalAlignment?: "rtl" | "ltr"
  title?: string
  text: ReactNode
  imgSrc: string
  link?: {
    url: string
    text: string
  }
}

export function MaskedParallaxImageSection({
  horizontalAlignment = "ltr",
  title,
  text,
  imgSrc,
}: MaskedParallaxImageSectionProps) {
  return (
    <div className="flex flex-col-reverse bt:grid bt:grid-cols-24 bt:items-center gap-4 bt:gap-0">
      <div
        className={cn(
          "bt:col-span-9 bd:col-span-7 flex flex-col gap-4 bt:gap-6 bd:gap-12",
          horizontalAlignment === "ltr"
            ? "col-start-1 order-2 bt:order-1"
            : "bt:col-start-[16] bd:col-start-[18] order-1 bt:order-2"
        )}
      >
        {title && (
          <h3 className="font-suisse-intl font-normal leading-none text-bricky-brick text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl">
            <TextRevealOnScroll splitBy="lines" staggerDuration={0.025}>
              {title}
            </TextRevealOnScroll>
          </h3>
        )}
        {text && (
          <p className="font-suisse-intl font-normal text-base lg:text-lg xl:text-base 2xl:text-lg text-black">
            <TextRevealOnScroll splitBy="lines" staggerDuration={0.025}>
              {text}
            </TextRevealOnScroll>
          </p>
        )}
      </div>
      <div
        className={cn(
          "aspect-h-6 aspect-w-9 relative bt:col-span-14 bd:col-span-16 gsap-parallax-img-c",
          horizontalAlignment === "ltr" ? "bt:col-start-11 bd:col-start-9 order-2" : "col-start-1 order-1"
        )}
      >
        <MaskedParallaxImage
          imgSrc={imgSrc}
          sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
        />
      </div>
    </div>
  )
}
