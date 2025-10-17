"use client"

import { cn } from "@/lib/utils"

import { ReactNode } from "react"
import { GsapSplitText } from "../gsap-split-text"
import { WistiaPlayerWrapper } from "../wistia-player"

interface VideoWithTextProps {
  primaryVideoUrl: string
  primaryVideoType?: string
  thumbnail?: string
  thumbnailMobile?: string
  title: ReactNode
  description: ReactNode
  className?: string
  spot?: string
}

export function VideoWithText(props: VideoWithTextProps) {
  const { title, description, className } = props
  // const { primaryVideoUrl, primaryVideoType = "video/mp4", title, className, description } = props
  // const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      className={cn(
        "relative h-[60vw] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/2 after:bg-gradient-to-t after:from-current after:to-transparent after:z-10",
        className
      )}
    >
      {/* <Video
        className='w-full h-full object-cover'
        primaryVideoUrl={primaryVideoUrl}
        primaryVideoType={primaryVideoType}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
      /> */}
      <div className='w-full h-screen relative'>
        <WistiaPlayerWrapper aspect={16 / 9} mediaId='e2tew1zhxj' autoplay muted controlsVisibleOnLoad={false} />
      </div>
      <div className={cn("absolute bottom-[15%] left-1/2 -translate-x-1/2 z-50")}>
        {title && (
          <article
            className={cn(
              "text-white font-primary font-semibold text-center",
              "flex-shrink-0 flex flex-col items-center justify-center gap-4 lg:gap-6"
            )}
          >
            <h3
              className={cn(
                "text-white font-primary font-[200] whitespace-nowrap text-center",
                "text-6xl xl:text-6xl 2xl:text-6xl",
                "w-full min-w-[90vw] lg:min-w-52",
                "flex-shrink-0 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0"
              )}
            >
              <GsapSplitText splitBy='chars' stagger={0.02} duration={1}>
                {title}
              </GsapSplitText>
            </h3>
            <p
              className={cn(
                "text-white font-primary font-[300] text-center",
                "text-2xl xl:text-2xl 2xl:text-2xl",
                "leading-relaxed xl:leading-relaxed 2xl:leading-relaxed",
                "flex-shrink-0 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0",
                "max-w-5xl"
              )}
            >
              <GsapSplitText splitBy='lines' stagger={0.02} duration={1}>
                {description}
              </GsapSplitText>
            </p>
          </article>
        )}
      </div>
    </div>
  )
}
