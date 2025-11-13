'use client'

import { breakpoints } from '@/styles/config.mjs'
import MuxPlayer from '@mux/mux-player-react'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import { useIntersectionObserver, useWindowSize } from 'hamo'
import React, { useCallback, useEffect, useRef } from 'react'

type HeroVideoProps = {
  desktopVideoId: string
  mobileVideoId: string
  desktopPoster: string
  mobilePoster: string
}

const HeroVideo: React.FC<HeroVideoProps> = ({
  desktopVideoId,
  mobileVideoId,
  desktopPoster,
  mobilePoster,
}) => {
  const { width: windowWidth } = useWindowSize(100)
  const isMobile = windowWidth && windowWidth < breakpoints.breakpointMobile
  const playerRef = useRef<MuxPlayerRefAttributes | null>(null)
  const [setIntersectionRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '200px 0px 200px 0px',
    threshold: 0,
  })

  const setPlayerRef = useCallback(
    (node: MuxPlayerRefAttributes | null) => {
      playerRef.current = node
      setIntersectionRef(node ?? undefined)
    },
    [setIntersectionRef]
  )

  useEffect(() => {
    const player = playerRef.current
    if (!player) {
      return
    }

    if (entry?.isIntersecting) {
      // Only call play() if video is paused or not playing
      // This prevents resetting the video if it's already playing
      if (player.paused) {
        player.play().catch(() => undefined)
      }
      return
    }

    player.pause()
  }, [entry])

  const commonMuxProps = {
    ref: setPlayerRef,
    preload: 'auto' as const,
    autoPlay: true,
    playsInline: true,
    loop: true,
    muted: true,
    streamType: 'on-demand' as const,
    startTime: 0,
    disableCookies: true,
    disableTracking: true,
    preferPlayback: 'native' as const,
    style: {
      '--media-object-fit': 'cover',
      '--media-object-position': 'center bottom',
      '--controls': 'none',
    } as React.CSSProperties,
  }

  return (
    <>
      {isMobile && (
        <MuxPlayer
          {...commonMuxProps}
          className='relative block h-screen w-full lg:hidden'
          playbackId={mobileVideoId}
          minResolution='480p'
          maxResolution='1080p'
          placeholder={mobilePoster}
          style={{
            ...commonMuxProps.style,
            aspectRatio: 1920 / 1080,
          }}
        />
      )}
      {!isMobile && (
        <MuxPlayer
          {...commonMuxProps}
          className='relative hidden h-screen w-full lg:block'
          playbackId={desktopVideoId}
          minResolution='720p'
          maxResolution='1080p'
          placeholder={desktopPoster}
          style={{
            ...commonMuxProps.style,
            aspectRatio: 560 / 966,
          }}
        />
      )}
      {/* <Image
        src={desktopPoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        className={cn(
          'hidden lg:block',
          'absolute inset-0 z-20 h-full w-full object-cover',
          'transition-opacity duration-300 ease-in-out',
          {
            'pointer-events-none opacity-100': !isPlaying,
            'pointer-events-auto opacity-0': isPlaying,
          }
        )}
        priority
      />
      <Image
        src={mobilePoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        className={cn(
          'block lg:hidden',
          'absolute inset-0 z-20 h-full w-full object-cover',
          'transition-opacity duration-300 ease-in-out',
          {
            'pointer-events-none opacity-100': !isPlaying,
            'pointer-events-auto opacity-0': isPlaying,
          }
        )}
        priority
      /> */}
    </>
  )
}

export { HeroVideo }
