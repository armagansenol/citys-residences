'use client'

import { cn } from '@/lib/utils'
import { WistiaPlayer, WistiaPlayerProps } from '@wistia/wistia-player-react'
import { useState } from 'react'

import { Image } from '@/components/image'

interface WistiaPlayerWrapperProps extends WistiaPlayerProps {
  className?: string
  customPoster?: string
  posterPriority?: boolean
}

export function WistiaPlayerWrapper(props: WistiaPlayerWrapperProps) {
  const {
    className,
    customPoster,
    posterPriority = false,
    ...wistiaProps
  } = props

  const [isPlaying, setIsPlaying] = useState(false)

  // Handle video play event - fade out poster
  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div
      className={cn('relative h-full w-full overflow-hidden', className)}
      aria-label='Video player'
    >
      {/* Wrapper to create object-cover effect for video */}
      <div
        className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
        style={{
          minWidth: '177.78vh', // 16:9 aspect ratio width (16/9 * 100vh)
          minHeight: '56.25vw', // 16:9 aspect ratio height (9/16 * 100vw)
        }}
      >
        <WistiaPlayer
          className='h-full w-full'
          onPlay={handlePlay}
          {...wistiaProps}
        />
      </div>
      {customPoster && (
        <Image
          src={customPoster}
          alt='Video poster'
          fill
          className={cn(
            'pointer-events-auto absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300',
            isPlaying && 'pointer-events-none opacity-0'
          )}
          sizes='100vw'
          mobileSize='100vw'
          priority={posterPriority}
        />
      )}
    </div>
  )
}
