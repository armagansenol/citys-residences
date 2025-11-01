'use client'

import { cn } from '@/lib/utils'
import {
  WistiaPlayer,
  WistiaPlayerElement,
  WistiaPlayerProps,
} from '@wistia/wistia-player-react'
import { useRef, useState } from 'react'

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
  const playerRef = useRef<typeof WistiaPlayer | null>(null)
  // Handle video play event - fade out poster
  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div
      className={cn('absolute inset-0 z-50 h-full w-full', className)}
      aria-label='Video player'
    >
      <WistiaPlayer
        ref={playerRef as React.RefObject<WistiaPlayerElement>}
        className='!pointer-events-none absolute inset-0 h-full w-full'
        onPlay={handlePlay}
        muted
        autoplay
        preload='metadata'
        swatch={false}
        bigPlayButton={false}
        silentAutoplay='allow'
        endVideoBehavior='loop'
        controlsVisibleOnLoad={false}
        playBarControl={false}
        volumeControl={false}
        settingsControl={false}
        transparentLetterbox={true}
        roundedPlayer={0}
        fullscreenControl={false}
        playbackRateControl={false}
        playPauseControl={false}
        {...wistiaProps}
      />
      {customPoster && (
        <Image
          src={customPoster}
          alt='Video poster'
          fill
          className={cn(
            'absolute inset-0 h-full w-full',
            'object-cover object-center',
            'transition-opacity duration-300',
            !isPlaying && 'pointer-events-auto opacity-100',
            isPlaying && 'pointer-events-none opacity-0'
          )}
          quality={75}
          priority={posterPriority}
        />
      )}
    </div>
  )
}
