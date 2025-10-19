'use client'

import { cn } from '@/lib/utils'
import { WistiaPlayer, WistiaPlayerProps } from '@wistia/wistia-player-react'
import { useRef, useState, useMemo } from 'react'

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
  // WistiaPlayer uses its own internal ref type
  const playerRef = useRef<React.ComponentRef<typeof WistiaPlayer>>(null)

  // Handle video play event
  const handlePlay = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Wistia video started playing')
    }
    setIsPlaying(true)
  }

  // Calculate container styles to prevent layout shift
  const containerStyles = useMemo<React.CSSProperties>(() => {
    if (aspectRatio) {
      return {
        aspectRatio:
          typeof aspectRatio === 'number'
            ? aspectRatio.toString()
            : aspectRatio,
      }
    }

    if (containerHeight) {
      return {
        height:
          typeof containerHeight === 'number'
            ? `${containerHeight}px`
            : containerHeight,
      }
    }

    // Default to 16:9 aspect ratio if no dimensions specified
    return { aspectRatio: '16/9' }
  }, [aspectRatio, containerHeight])

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={containerStyles}
      role='region'
      aria-label='Video player'
    >
      {/* Wistia Player */}
      <div className='absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2'>
        <WistiaPlayer ref={playerRef} onPlay={handlePlay} {...wistiaProps} />
      </div>

      {/* Poster image that fades out when video starts playing */}
      {customPoster && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-500 ease-out',
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
