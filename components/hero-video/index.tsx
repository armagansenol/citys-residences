'use client'

import { breakpoints } from '@/styles/config.mjs'
import { useIntersectionObserver, useWindowSize } from 'hamo'
import React, { useCallback, useEffect, useRef } from 'react'

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
  const { width: windowWidth } = useWindowSize(100)
  const isMobile = windowWidth && windowWidth < breakpoints.breakpointMobile
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null)
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [setIntersectionRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '200px 0px 200px 0px',
    threshold: 0,
  })

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      setIntersectionRef(node ?? undefined)
    },
    [setIntersectionRef]
  )

  useEffect(() => {
    // Get the currently active video based on screen size
    const activeVideo = isMobile
      ? mobileVideoRef.current
      : desktopVideoRef.current

    if (!activeVideo) {
      return
    }

    // Only pause if we explicitly know the element is NOT intersecting
    // Don't pause if entry is null/undefined (initial state)
    if (entry && !entry.isIntersecting) {
      activeVideo.pause()
      return
    }

    // Play if intersecting (or if entry is null initially, let autoplay handle it)
    if (entry?.isIntersecting && activeVideo.paused) {
      activeVideo.play().catch(() => undefined)
    }
  }, [entry, isMobile])

  useEffect(() => {
    if (isMobile) {
      mobileVideoRef.current?.play().catch(() => undefined)
    } else {
      desktopVideoRef.current?.play().catch(() => undefined)
    }
  }, [isMobile])

  const commonVideoProps = {
    preload: 'auto' as const,
    autoPlay: true,
    playsInline: true,
    loop: true,
    muted: true,
    style: {
      objectFit: 'cover',
      objectPosition: 'center bottom',
    } as React.CSSProperties,
  }

  return (
    <div ref={setContainerRef} className='relative h-screen w-full'>
      <video
        ref={mobileVideoRef}
        {...commonVideoProps}
        src={`https://stream.mux.com/${mobileVideoId}/highest.mp4`}
        className='relative block h-screen w-full lg:hidden'
        poster={mobilePoster}
        style={{
          ...commonVideoProps.style,
          aspectRatio: 560 / 966,
        }}
      />
      <video
        ref={desktopVideoRef}
        {...commonVideoProps}
        src={`https://stream.mux.com/${desktopVideoId}/highest.mp4`}
        className='relative hidden h-screen w-full lg:block'
        poster={desktopPoster}
        style={{
          ...commonVideoProps.style,
          aspectRatio: 1920 / 1080,
        }}
      />
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
    </div>
  )
}

export { HeroVideo }
