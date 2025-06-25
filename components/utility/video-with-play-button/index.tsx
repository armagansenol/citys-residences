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
    <div className="group relative w-full h-full flex items-center justify-center">
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
          <div className="absolute top-0 left-0 w-full h-full z-10">
            <Img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" fill sizes="100vw" />
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-neutral-900/70 to-neutral-900/40 z-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-8 z-30">
          {title && (
            <article className="text-white font-suisse-intl text-lg bt:text-4xl font-medium lg:whitespace-nowrap min-w-52 text-center flex-shrink-0">
              {title}
            </article>
          )}
          <button
            type="button"
            className={cn(
              "w-10 h-10 border-2 border-white rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out p-2.5",
              "group-hover:scale-125"
            )}
          >
            <PlayIcon className="w-full h-full fill-white stroke-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
