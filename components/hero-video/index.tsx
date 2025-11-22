'use client'

import React, { useRef } from 'react'
import { Image } from '@/components/image'
import { useVideoAutoplay } from '@/hooks/useVideoAutoplay'
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
  const { hasPlayed } = useVideoAutoplay({
    videoRef,
    dependencies: [desktopVideoId, mobileVideoId],
  })

  return (
    <div className='relative h-screen w-full' aria-hidden='true'>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
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
