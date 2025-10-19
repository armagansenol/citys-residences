'use client'

import { cn } from '@/lib/utils'
import { WistiaPlayer, WistiaPlayerProps } from '@wistia/wistia-player-react'
import { useRef, useState } from 'react'

import { Image } from '@/components/image'

interface WistiaPlayerWrapperProps extends WistiaPlayerProps {
  className?: string
  aspectRatio?: string | number
  containerHeight?: string | number
  customPoster?: string
  posterPriority?: boolean
}

export function WistiaPlayerWrapper(props: WistiaPlayerWrapperProps) {
  const {
    className,
    aspectRatio,
    containerHeight,
    customPoster,
    posterPriority = false,
    ...wistiaProps
  } = props

  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<React.ComponentRef<typeof WistiaPlayer>>(null)

  // Handle video play event
  const handlePlay = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Wistia video with id',
        wistiaProps.mediaId,
        'started playing'
      )
    }
    setIsPlaying(true)
  }

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-black',
        className
      )}
      aria-label='Video player'
    >
      {/* Wistia Player */}
      <div className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'>
        <WistiaPlayer ref={playerRef} onPlay={handlePlay} {...wistiaProps} />
      </div>

      {/* Poster image that fades out when video starts playing */}
      {customPoster && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-300 ease-out',
            isPlaying && 'opacity-0'
          )}
          aria-hidden='true'
        >
          <Image
            src={customPoster}
            alt='Video poster'
            fill
            className='object-cover'
            sizes='100vw'
            priority={posterPriority}
          />
        </div>
      )}
    </div>
  )
}
