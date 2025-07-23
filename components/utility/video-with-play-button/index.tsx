"use client"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { PlayIcon } from "lucide-react"

export interface IVideoWithPlayButtonProps {
  primaryVideoUrl: string
  primaryVideoType?: string
  thumbnail?: string
  title?: string
  spot?: string
}

export function VideoWithPlayButton({
  primaryVideoUrl,
  primaryVideoType = "video/mp4",
  thumbnail,
  spot,
  title,
}: IVideoWithPlayButtonProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play()
    setIsPlaying(true)
  }

  return (
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
          "before:transition-opacity before:duration-500 before:ease-in-out",
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
        {spot && (
          <article
            className={cn(
              "font-primary font-bold text-white  text-lg xl:text-5xl 2xl:text-7xl lg:whitespace-nowrap min-w-52 text-center flex-shrink-0",
              "absolute top-1/3 left-1/2 -translate-x-1/2 z-30"
            )}
          >
            {spot}
          </article>
        )}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/3 flex flex-col items-center justify-center gap-10 z-30">
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
  )
}
