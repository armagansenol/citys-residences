import { cn } from "@/lib/utils"

import { GsapSplitText } from "@/components/gsap-split-text"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { breakpoints } from "@/styles/config.mjs"
import { ReactNode } from "react"
export interface MaskedParallaxImageSectionProps {
  horizontalAlignment?: "rtl" | "ltr"
  title?: string
  spot?: ReactNode
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
  spot,
  text,
  imgSrc,
}: MaskedParallaxImageSectionProps) {
  return (
    <div className="flex flex-col-reverse bt:grid bt:grid-cols-24 bt:items-center gap-6 bt:gap-0">
      <div
        className={cn(
          "bt:col-span-9 bd:col-span-7 flex flex-col gap-2 lg:gap-6 xl:gap-8",
          horizontalAlignment === "ltr"
            ? "col-start-1 order-2 bt:order-1"
            : "bt:col-start-[16] bd:col-start-[18] order-1 bt:order-2"
        )}
      >
        {title && (
          <h3 className="font-suisse-intl font-medium text-bricky-brick text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl">
            <GsapSplitText stagger={0.1} splitBy="lines" duration={0.5}>
              {title}
            </GsapSplitText>
          </h3>
        )}

        {text && (
          <p className="font-suisse-intl font-normal text-base lg:text-lg xl:text-base 2xl:text-lg text-black">
            {spot && (
              <strong>
                <GsapSplitText stagger={0.1} splitBy="lines" duration={0.5}>
                  {spot}
                </GsapSplitText>
              </strong>
            )}
            <GsapSplitText stagger={0.1} splitBy="lines" duration={0.5}>
              {text}
            </GsapSplitText>
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
