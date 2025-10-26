'use client'

import { useEffect, useRef } from 'react'

interface VimeoPlayerProps {
  src: string
  className?: string
  poster?: string
  onLoadedData?: () => void
}

export function VimeoPlayer({
  src,
  className = '',
  poster,
  onLoadedData,
}: VimeoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Force play on mount (some browsers need this)
    const attemptPlay = async () => {
      try {
        await video.play()
      } catch (error) {
        console.log('Autoplay prevented:', error)
        // Autoplay was prevented, user interaction needed
      }
    }

    // Attempt to play when loaded
    if (video.readyState >= 3) {
      attemptPlay()
    }

    const handleLoadedData = () => {
      attemptPlay()
      onLoadedData?.()
    }

    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [onLoadedData])

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload='auto'
      disablePictureInPicture
      controlsList='nodownload nofullscreen noremoteplayback'
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  )
}
