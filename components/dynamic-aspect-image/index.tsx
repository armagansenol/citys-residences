"use client"

import { ScrollTrigger } from "@/components/gsap"
import { Img } from "@/components/utility/img"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface DynamicAspectImageProps {
  src: string
  alt: string
  sizes?: string
  className?: string
  loading?: "lazy" | "eager"
  containerClassName?: string
}

export function DynamicAspectImage({
  src,
  alt,
  sizes,
  className,
  loading = "lazy",
  containerClassName,
}: DynamicAspectImageProps) {
  const [aspectRatio, setAspectRatio] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const img = new Image()

    img.onload = () => {
      setAspectRatio(`${img.naturalWidth}/${img.naturalHeight}`)
      setIsLoading(false)
    }

    img.onerror = () => {
      // Fallback to a default aspect ratio if image fails to load
      setAspectRatio("16/9")
      setIsLoading(false)
    }

    img.src = src
  }, [src])

  useEffect(() => {
    if (!isLoading) {
      ScrollTrigger.refresh()
    }
  }, [isLoading])

  return (
    <div
      className={cn("relative w-full", isLoading ? "min-h-[200px] bg-gray-100 animate-pulse" : "", containerClassName)}
      style={!isLoading && aspectRatio ? { aspectRatio: aspectRatio.replace("/", " / ") } : undefined}
    >
      {!isLoading && (
        <Img
          alt={alt}
          src={src}
          sizes={sizes}
          fill
          className={cn("object-contain object-center", className)}
          loading={loading}
        />
      )}
    </div>
  )
}
