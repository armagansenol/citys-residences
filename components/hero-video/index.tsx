'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Image } from '@/components/image'
import { cn } from '@/lib/utils'

type HeroVideoProps = {
  desktopVideoId?: string
  mobileVideoId?: string
  desktopPoster: string
  mobilePoster: string
}

const HeroVideo: React.FC<HeroVideoProps> = ({
  desktopPoster,
  mobilePoster,
  desktopVideoId,
  mobileVideoId,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  // Explicitly play video when ready and track play state
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Listen for play event to update state (most reliable - catches all play events)
    const handlePlay = () => {
      setHasPlayed(true)
    }

    // Set up play event listener first to catch any play events
    video.addEventListener('play', handlePlay)

    // Check if video is already playing (from autoplay that happened before listener was attached)
    if (!video.paused) {
      setHasPlayed(true)
    }

    const playVideo = async () => {
      try {
        if (video.paused) {
          await video.play()
          // play() will trigger the 'play' event, which will set hasPlayed via handlePlay
        } else {
          // Video is already playing, but play event might have fired before listener was attached
          setHasPlayed(true)
        }
      } catch (error) {
        // Autoplay was prevented, but that's okay
        // The video will play when user interacts with the page
        console.debug('Video autoplay prevented:', error)
      }
    }

    // Listen for when video has enough data to play
    const handleCanPlay = () => {
      playVideo()
    }

    // Also try when loadeddata fires (more reliable than canplay)
    const handleLoadedData = () => {
      playVideo()
    }

    video.addEventListener('canplay', handleCanPlay, { once: true })
    video.addEventListener('loadeddata', handleLoadedData, { once: true })

    // Try to play immediately if video is already ready
    if (video.readyState >= 2) {
      // HAVE_CURRENT_DATA or higher - video has enough data to play
      playVideo()
    }

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  const commonVideoProps = {
    preload: 'auto',
    autoPlay: true,
    playsInline: true,
    loop: true,
    muted: true,
  }

  return (
    <div className='relative h-screen w-full'>
      <video
        ref={videoRef}
        {...commonVideoProps}
        className='relative h-screen w-full object-cover object-bottom'
      >
        {mobileVideoId && (
          <source
            src={`https://stream.mux.com/${mobileVideoId}/highest.mp4`}
            media='(max-width: 799px)'
            type='video/mp4'
          />
        )}
        {desktopVideoId && (
          <source
            src={`https://stream.mux.com/${desktopVideoId}/highest.mp4`}
            media='(min-width: 800px)'
            type='video/mp4'
          />
        )}
      </video>
      <Image
        className={cn(
          'absolute inset-0 z-20 h-full w-full object-cover object-bottom transition-opacity duration-300 ease-in-out xl:hidden',
          hasPlayed && 'pointer-events-none opacity-0'
        )}
        src={mobilePoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        priority
        quality={100}
      />
      <Image
        className={cn(
          'absolute inset-0 z-20 hidden h-full w-full object-cover object-bottom transition-opacity duration-300 ease-in-out xl:block',
          hasPlayed && 'pointer-events-none opacity-0'
        )}
        src={desktopPoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        priority
        quality={100}
      />
    </div>
  )
}

export { HeroVideo }
