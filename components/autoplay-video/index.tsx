'use client'

import s from './styles.module.css'

import { cn } from '@/lib/utils'
import { breakpoints } from '@/styles/config.mjs'
import { useIntersectionObserver } from 'hamo'
import { useCallback, useEffect, useRef } from 'react'

interface AutoplayVideoProps {
  playbackId?: string
  aspectRatio?: number
}

export function AutoplayVideo({ playbackId, aspectRatio }: AutoplayVideoProps) {
  const playerRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasLoadedRef = useRef(false)

  const [setIntersectionRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '1500px 0px 1500px 0px', // <-- smoother preloading
    threshold: 0,
  })

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      setIntersectionRef(node ?? undefined)
    },
    [setIntersectionRef]
  )

  // safer + no resize reflows
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width:${breakpoints.breakpointMobile}px)`).matches

  const poster = `https://image.mux.com/${playbackId}/thumbnail.webp?width=${
    isMobile ? 768 : 1920
  }&time=0`

  const videoUrl =
    playbackId && `https://stream.mux.com/${playbackId}/highest.mp4`

  useEffect(() => {
    const el = playerRef.current
    if (!el || !videoUrl) return

    // Lazy assign <video>.src ONLY once
    if (entry?.isIntersecting && !hasLoadedRef.current) {
      hasLoadedRef.current = true
      el.src = videoUrl
    }

    // auto play / pause behavior
    if (entry && !entry.isIntersecting) {
      el.pause()
    } else if (entry?.isIntersecting && el.paused) {
      el.play().catch(() => {})
    }
  }, [entry, videoUrl])

  return (
    <div className='relative h-full w-full' ref={setContainerRef}>
      <video
        ref={playerRef}
        poster={poster}
        className={cn(
          s.video,
          'absolute inset-0 h-full w-full object-cover object-center'
        )}
        style={
          {
            '--aspect-ratio': aspectRatio,
          } as React.CSSProperties
        }
        muted
        loop
        playsInline
        preload='none'
        disablePictureInPicture
        controlsList='nodownload noplaybackrate'
      />
    </div>
  )
}
