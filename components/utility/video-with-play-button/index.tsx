"use client"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

import { IconPlay } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"

export interface IVideoWithPlayButtonProps {
  primaryVideoUrl: string
  primaryVideoType?: string
  thumbnail?: string
  title?: string
}

export function VideoWithPlayButton({
  primaryVideoUrl,
  primaryVideoType = "video/mp4",
  thumbnail,
  title = "Lorem ipsum dolor sit.",
}: IVideoWithPlayButtonProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play()
    setIsPlaying(true)
  }

  return (
    <div className="group relative w-full h-full flex items-center justify-center mb-8 bt:mb-0 bd:mt-8">
      <Video
        className="w-full h-auto bt:h-full"
        primaryVideoUrl={primaryVideoUrl}
        primaryVideoType={primaryVideoType}
        ref={videoRef}
        controls={isPlaying}
      />
      <div
        className={cn("absolute top-0 left-0 w-full h-full transition-all duration-500 cursor-pointer", {
          "opacity-0 pointer-events-none invisible": isPlaying,
        })}
        onClick={handlePlay}
      >
        {thumbnail && (
          <div className="absolute top-0 left-0 w-full h-full">
            <Img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" fill sizes="100vw" />
          </div>
        )}
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full bg-neutral-900/50 transition-all duration-500",
            "group-hover:bg-neutral-900/70"
          )}
        />
        <button
          type="button"
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center transition-transform duration-300",
            "group-hover:scale-125"
          )}
        >
          <IconPlay fill="var(--white)" />
        </button>
      </div>
      {title && (
        <div className="absolute bottom-0 bd:bottom-auto bd:top-0 translate-y-full bd:-translate-y-full left-1/2 -translate-x-1/2 w-full flex bg-white">
          <article className="text-black font-montserrat italic text-md bt:text-2xl font-normal mx-auto py-3 bt:py-4">
            {title}
          </article>
        </div>
      )}
    </div>
  )
}
