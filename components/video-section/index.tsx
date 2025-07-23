import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { cn } from "@/lib/utils"
import { colors } from "@/styles/config.mjs"
import { Logo } from "../icons"

interface VideoSectionProps {
  primaryVideoUrl: string
  thumbnail: string
  title: string
  className?: string
}

export function VideoSection({ primaryVideoUrl, thumbnail, title, className }: VideoSectionProps) {
  return (
    <div
      className={cn(
        "w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black rounded-sm overflow-hidden",
        className
      )}
    >
      <div className="absolute top-8 left-1/2 -translate-x-1/2 h-60 w-60 z-50">
        <Logo fill={colors.white} />
      </div>
      <VideoWithPlayButton primaryVideoUrl={primaryVideoUrl} thumbnail={thumbnail} title={title} />
    </div>
  )
}
