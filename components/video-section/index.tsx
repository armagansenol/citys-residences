"use client"

import { cn } from "@/lib/utils"

import { Logo } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { colors } from "@/styles/config.mjs"
import { PlayIcon } from "lucide-react"
import { useRef, useState } from "react"

interface VideoSectionProps {
  primaryVideoUrl: string
  primaryVideoType?: string
  thumbnail: string
  title: string
  className?: string
  spot?: string
}

export function VideoSection({
  primaryVideoUrl,
  primaryVideoType = "video/mp4",
  thumbnail,
  title,
  className,
  spot,
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play()
    setIsPlaying(true)
  }

  return (
    <div
      className={cn(
        "w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black rounded-sm overflow-hidden",
        className
      )}
    >
      <div className="group relative w-full h-full flex items-center justify-center">
        <Video
          className="w-full h-auto lg:h-full"
          primaryVideoUrl={primaryVideoUrl}
          primaryVideoType={primaryVideoType}
          ref={videoRef}
          controls={isPlaying}
        />
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full transition-all duration-500 cursor-pointer",
            "before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-t before:from-neutral-900/70 before:to-neutral-900/40 before:z-20",
            "before:transition-opacity before:duration-700 before:ease-in-out",
            "group-hover:before:opacity-50",
            {
              "opacity-0 pointer-events-none invisible": isPlaying,
            }
          )}
          onClick={handlePlay}
        >
          {thumbnail && (
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <Img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" fill sizes="100vw" />
            </div>
          )}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 xl:h-48 xl:w-48 2xl:h-60 2xl:w-60 z-50">
            <Logo fill={colors.white} />
          </div>
          <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50")}>
            {spot && (
              <article
                className={cn(
                  "font-primary font-bold text-white text-lg xl:text-4xl 2xl:text-5xl lg:whitespace-nowrap min-w-52 text-center flex-shrink-0 mb-20 mt-24"
                )}
              >
                {spot}
              </article>
            )}
            <div className="flex flex-col items-center justify-center gap-5 z-30">
              {title && (
                <article className="text-white font-primary text-lg xl:text-4xl 2xl:text-5xl font-medium lg:whitespace-nowrap min-w-52 text-center flex-shrink-0">
                  {title}
                </article>
              )}
              <button
                type="button"
                className={cn(
                  "w-48 h-48 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 border border-white rounded-full flex items-center justify-center xl:p-12 2xl:p-16",
                  "transition-transform duration-700 ease-in-out group-hover:scale-90"
                )}
              >
                <PlayIcon className="w-full h-full fill-white stroke-white transition-transform duration-500 ease-in-out group-hover:scale-150" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
