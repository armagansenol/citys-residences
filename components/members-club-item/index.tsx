"use client"

import { cn } from "@/lib/utils"
import { useRef } from "react"

import { AnimatedLine } from "@/components/animated-line"
import { GsapSplitText } from "@/components/gsap-split-text"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { EmblaCarousel } from "@/components/utility/embla-carousel"
import { breakpoints } from "@/styles/config.mjs"

interface MembersClubItemProps {
  className?: string
  item: {
    title: string
    subtitle?: string
    description: string
    url: string[]
  }
  align?: "ltr" | "rtl"
}

export function MembersClubItem({ item, align = "ltr", className = "" }: MembersClubItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className={cn("gsap-global-fade-in py-8", className)} ref={ref}>
      <div
        className={cn(
          "flex items-stretch gap-8 py-8",
          align === "ltr" ? "flex-row" : "flex-row-reverse",
          item.url.length > 1
            ? align === "rtl"
              ? "section-container-full-left"
              : "section-container-full-right"
            : "section-container"
        )}
      >
        <div className="flex flex-col items-start justify-center w-3/12 pr-6">
          <h3 className="font-primary font-medium text-bricky-brick text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-4">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              {item.title}
            </GsapSplitText>
          </h3>
          <p className="font-primary font-bold text-base lg:text-lg xl:text-lg 2xl:text-xl text-black">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              {item.subtitle}
            </GsapSplitText>
          </p>
          <p className="font-primary font-normal text-base lg:text-lg xl:text-lg 2xl:text-xl text-black">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              {item.description}
            </GsapSplitText>
          </p>
        </div>
        <AnimatedLine direction="vertical" />
        <div className="flex flex-col w-9/12 relative flex-1 overflow-hidden">
          {item.url.length > 1 ? (
            <EmblaCarousel
              autoplay={true}
              autoplayDelay={5000}
              slides={item.url.map((image, imageIndex) => (
                <div key={imageIndex} className="relative w-full h-[45vw]">
                  <MaskedParallaxImage
                    imgSrc={image}
                    sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
                  />
                </div>
              ))}
              options={{ duration: 35, loop: true, align: align === "rtl" ? "end" : "start" }}
              slideWidth="60vw"
              slideSpacing="1vw"
              parallax={true}
            />
          ) : (
            <div className="relative w-full h-[45vw]">
              <MaskedParallaxImage
                imgSrc={item.url[0]}
                sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
              />
            </div>
          )}
        </div>
      </div>
      <AnimatedLine direction="horizontal" />
    </div>
  )
}
