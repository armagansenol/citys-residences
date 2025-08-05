"use client"

import { cn } from "@/lib/utils"
import { ReactNode, useRef } from "react"

import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { MaskedPanImage } from "@/components/masked-pan-image"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { EmblaCarousel } from "@/components/utility/embla-carousel"
import { breakpoints } from "@/styles/config.mjs"

interface MembersClubItemProps {
  sectionId?: string
  className?: string
  item: {
    title: ReactNode
    subtitle?: ReactNode
    description: ReactNode
    url: string[]
  }
  align?: "ltr" | "rtl"
}

export function MembersClubItem({ item, sectionId, align = "ltr", className = "" }: MembersClubItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className={cn(className)} ref={ref} id={sectionId}>
      <FadeInOnScroll>
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
          <div className="flex flex-col items-start justify-center w-4/12 pr-6 py-24">
            <h3
              className={cn(
                "font-primary font-bold text-bricky-brick text-2xl lg:text-2xl xl:text-4xl 2xl:text-4xl mb-6"
              )}
            >
              {item.title}
            </h3>
            {item.subtitle && (
              <div
                className={cn(
                  "font-primary font-semibold text-base lg:text-lg xl:text-2xl 2xl:text-2xl 3xl:text-2xl text-bricky-brick mb-4"
                )}
              >
                {item.subtitle}
              </div>
            )}
            <div
              className={cn(
                "font-primary font-normal text-black",
                "prose prose-ul:list-disc prose-ul:pl-6 prose-li:text-black prose-li:mb-2",
                "[&_p]:mb-4 [&_p]:text-2xl",
                "[&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-2xl [&_li]:text-black [&_li]:mb-2",
                "[&_ul]:list-none [&_li]:before:content-['•'] [&_li]:before:mr-2 [&_li]:before:black"
              )}
            >
              {item.description}
            </div>
          </div>
          <AnimatedLine direction="vertical" />
          <div className="w-8/12 relative">
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
              <div className="relative w-full h-full min-h-[40vw]">
                {/* <MaskedParallaxImage
                imgSrc={item.url[0]}
                sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
              /> */}
                <MaskedPanImage
                  imgSrc={item.url[0]}
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
                />
              </div>
            )}
          </div>
        </div>
      </FadeInOnScroll>
      <AnimatedLine direction="horizontal" />
    </div>
  )
}
