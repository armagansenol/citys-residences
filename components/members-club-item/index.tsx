"use client"

import { cn } from "@/lib/utils"
import { ReactNode, useRef } from "react"

import { AnimatedLine } from "@/components/animated-line"
import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { MaskedPanImage } from "@/components/masked-pan-image"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { EmblaCarousel } from "@/components/utility/embla-carousel"
import { breakpoints } from "@/styles/config.mjs"
import { useMediaQuery } from "hamo"

interface MembersClubItemProps {
  sectionId?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
  barClassName?: string
  item: {
    title: ReactNode
    subtitle?: ReactNode
    description: ReactNode
    url: string[]
  }
  align?: "ltr" | "rtl"
}

export function MembersClubItem({
  item,
  sectionId,
  align = "ltr",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  descriptionClassName = "",
  barClassName = "",
}: MembersClubItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.breakpointTablet}px)`)

  return (
    <div className={cn(className, "pb-10 lg:pb-0")} ref={ref} id={sectionId}>
      <FadeInOnScroll>
        <div
          className={cn(
            "flex flex-col-reverse lg:flex-row items-stretch gap-8 py-0 lg:py-8",
            align === "ltr" ? "lg:flex-row" : "lg:flex-row-reverse",
            item.url.length > 1
              ? align === "rtl"
                ? "section-container-full-left"
                : "section-container-full-right"
              : "section-container"
          )}
        >
          <div className="w-full lg:w-5/12 xl:w-4/12 px-5 lg:px-0">
            <div className="flex flex-col items-start justify-center pr-0 xl:pr-6 py-0 lg:py-24">
              <h3
                className={cn(
                  "font-primary font-bold text-bricky-brick",
                  "text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl",
                  "mb-6",
                  titleClassName
                )}
              >
                {item.title}
              </h3>
              {item.subtitle && (
                <div
                  className={cn(
                    "font-primary font-semibold text-bricky-brick",
                    "text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl 3xl:text-2xl",
                    "mb-4",
                    subtitleClassName
                  )}
                >
                  {item.subtitle}
                </div>
              )}
              <div
                className={cn(
                  "font-primary font-normal text-black",
                  "prose prose-ul:list-disc prose-ul:pl-6 prose-li:text-black prose-li:mb-2",
                  "[&_p]:mb-4 [&_p]:text-xl xl:[&_p]:text-2xl",
                  "[&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-xl xl:[&_li]:text-2xl [&_li]:text-black [&_li]:mb-2",
                  "[&_ul]:list-none [&_li]:before:content-['•'] [&_li]:before:mr-2 [&_li]:before:black",
                  descriptionClassName
                )}
              >
                {item.description}
              </div>
            </div>
          </div>
          <AnimatedLine direction="vertical" barClassName={barClassName} />
          <div className="relative w-full lg:w-7/12 xl:w-8/12">
            {item.url.length > 1 ? (
              <EmblaCarousel
                autoplay={true}
                autoplayDelay={5000}
                slides={item.url.map((image, imageIndex) => (
                  <div key={imageIndex} className="relative w-full h-[70vw] lg:h-[100%] xl:h-[45vw]">
                    <MaskedParallaxImage
                      imgSrc={image}
                      sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
                    />
                  </div>
                ))}
                options={{ duration: 35, loop: true, align: align === "rtl" ? "end" : "start" }}
                slideWidth={isMobile ? "100vw" : "60vw"}
                slideSpacing={isMobile ? "0vw" : "1vw"}
                parallax={true}
              />
            ) : (
              <div className="relative w-full h-[90vw] lg:h-full xl:h-[45vw] min-h-[40vw] lg:min-h-[45vw]">
                <MaskedPanImage
                  imgSrc={item.url[0]}
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
                />
              </div>
            )}
          </div>
        </div>
      </FadeInOnScroll>
      <AnimatedLine direction="horizontal" barClassName={barClassName} />
    </div>
  )
}
