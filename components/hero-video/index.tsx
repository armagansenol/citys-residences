'use client'

import { Image } from '@/components/image'
import { useVideoAutoplay } from '@/hooks/useVideoAutoplay'
import { cn } from '@/lib/utils'
import React, { useRef } from 'react'

type HeroVideoProps = {
  desktopVideoId?: string
  mobileVideoId?: string
  desktopPoster: string
  mobilePoster: string
}

const HeroVideo: React.FC<HeroVideoProps> = ({
  desktopVideoId,
  mobileVideoId,
  desktopPoster,
  mobilePoster,
}) => {
  // const desktopPoster =
  //   'https://image.mux.com/xFW02Bl3KwJGCzmUUbAwE5NC5WJW01hIqmm7heGEYx2NM/thumbnail.webp?width=1920&time=0'
  // const mobilePoster =
  //   'https://image.mux.com/Hg9dD402dgbmsAX3VwXFX3EW49jlP02cYMUZGOkL69aAY/thumbnail.webp?width=560&time=0'

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
        className={cn(
          'relative z-30 h-screen w-full object-cover object-bottom opacity-0',
          'transition-opacity duration-300 ease-in-out',
          hasPlayed && 'opacity-100'
        )}
      >
        {mobileVideoId && (
          <source
            src={`https://stream.mux.com/${mobileVideoId}/highest.mp4`}
            media='(max-width: 1279px)'
            type='video/mp4'
          />
        )}
        {desktopVideoId && (
          <source
            src={`https://stream.mux.com/${desktopVideoId}/highest.mp4`}
            media='(min-width: 1280px)'
            type='video/mp4'
          />
        )}
      </video>
      <Image
        className={cn(
          'absolute inset-0 z-20 h-full w-full object-cover object-bottom',
          'block xl:hidden'
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
          'absolute inset-0 z-20 h-full w-full object-cover object-bottom',
          'hidden xl:block'
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
