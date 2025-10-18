"use client"

import { cn } from "@/lib/utils"
import { WistiaPlayer, WistiaPlayerProps } from "@wistia/wistia-player-react"
import { useEffect, useRef, useState } from "react"

import { Img } from "@/components/utility/img"

interface WistiaPlayerWrapperProps extends WistiaPlayerProps {
  className?: string
  placeholderImage?: string
  placeholderClassName?: string
  rootMargin?: string
  threshold?: number
  aspectRatio?: number
  containerHeight?: string | number
  lazy?: boolean
}

export function WistiaPlayerWrapper(props: WistiaPlayerWrapperProps) {
  const {
    className,
    placeholderImage,
    placeholderClassName,
    rootMargin = "500px",
    threshold = 0.1,
    aspectRatio,
    containerHeight,
    lazy = true,
    ...wistiaProps
  } = props

  const [isInView, setIsInView] = useState(!lazy)
  const [isLoaded, setIsLoaded] = useState(!lazy)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lazy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold, lazy])

  function handlePlay() {
    console.log("The video was just played!")
  }

  // Set loaded state when component mounts (video is in view)
  useEffect(() => {
    if (isInView) {
      // Small delay to allow the video to initialize
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  // Calculate container styles to prevent layout shift
  const containerStyles: React.CSSProperties = {}
  if (aspectRatio) {
    containerStyles.aspectRatio = aspectRatio.toString()
  } else if (containerHeight) {
    containerStyles.height = typeof containerHeight === "number" ? `${containerHeight}px` : containerHeight
  } else {
    // Default to 16:9 aspect ratio if no dimensions specified
    containerStyles.aspectRatio = "16/9"
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)} style={containerStyles}>
      {lazy && !isInView && (
        <div
          className={cn(
            "absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center",
            placeholderClassName
          )}
        >
          {placeholderImage ? (
            <Img
              src={placeholderImage}
              alt='Video placeholder'
              fill
              className='object-cover'
              sizes='100vw'
              loading='lazy'
            />
          ) : (
            <div className='flex flex-col items-center justify-center text-gray-500'>
              <svg className='w-16 h-16 mb-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                  clipRule='evenodd'
                />
              </svg>
              <p className='text-sm'>Video will load when in view</p>
            </div>
          )}
        </div>
      )}
      {isInView && (
        <div className={cn("absolute inset-0 w-full h-full", !isLoaded && "opacity-0 transition-opacity duration-300")}>
          <WistiaPlayer className='w-full h-full object-cover' onPlay={handlePlay} {...wistiaProps} />
        </div>
      )}
    </div>
  )
}
