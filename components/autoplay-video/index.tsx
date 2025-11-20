'use client'

import s from './styles.module.css'

import { cn } from '@/lib/utils'
import { breakpoints } from '@/styles/config.mjs'
import { PlayCircleIcon } from '@phosphor-icons/react'
import { useIntersectionObserver, useWindowSize } from 'hamo'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef } from 'react'

const FullScreenVideoDialog = dynamic(() =>
  import('@/components/dialogs/full-screen-video-dialog').then(
    module => module.FullScreenVideoDialog
  )
)

interface AutoplayVideoProps {
  playbackId?: string
  mobilePlaybackId?: string
  aspectRatio?: number
  enableFullscreen?: boolean
}

export function AutoplayVideo({
  playbackId,
  mobilePlaybackId,
  aspectRatio,
  enableFullscreen = false,
}: AutoplayVideoProps) {
  const { width: windowWidth } = useWindowSize(100)
  const isMobile =
    typeof windowWidth === 'number' &&
    windowWidth < breakpoints.breakpointMobile
  const activePlaybackId = isMobile
    ? mobilePlaybackId || playbackId
    : playbackId
  const poster = `https://image.mux.com/${activePlaybackId}/thumbnail.webp?width=${isMobile ? 560 : 1920}&time=0`

  const playerRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasLoadedRef = useRef(false)
  const wasPlayingBeforeDialogRef = useRef(false)

  const [setIntersectionRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '1500px 0px 1500px 0px',
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
    const el = playerRef.current
    if (!el || (!playbackId && !mobilePlaybackId)) return

    // Lazy load video sources when intersecting
    if (entry?.isIntersecting && !hasLoadedRef.current) {
      hasLoadedRef.current = true
      // The browser will automatically select the appropriate source based on media queries
      el.load()
    }

    // auto play / pause behavior
    if (entry && !entry.isIntersecting) {
      el.pause()
    } else if (entry?.isIntersecting && el.paused) {
      el.play().catch(() => {})
    }
  }, [entry, playbackId, mobilePlaybackId])

  const videoContent = (
    <video
      ref={playerRef}
      poster={poster}
      className={cn(
        s.video,
        'absolute inset-0 h-full w-full object-cover object-center',
        enableFullscreen && 'cursor-pointer'
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
    >
      {(mobilePlaybackId || playbackId) && (
        <source
          src={`https://stream.mux.com/${mobilePlaybackId || playbackId}/highest.mp4`}
          media='(max-width: 799px)'
          type='video/mp4'
        />
      )}
      {playbackId && (
        <source
          src={`https://stream.mux.com/${playbackId}/highest.mp4`}
          media='(min-width: 800px)'
          type='video/mp4'
        />
      )}
    </video>
  )

  const handleDialogOpenChange = useCallback(
    (isOpen: boolean) => {
      const el = playerRef.current
      if (!el) return

      if (isOpen) {
        // Dialog is opening - pause the main video and remember if it was playing
        wasPlayingBeforeDialogRef.current = !el.paused
        el.pause()
      } else {
        // Dialog is closing - resume if it was playing and still intersecting
        if (wasPlayingBeforeDialogRef.current && entry?.isIntersecting) {
          el.play().catch(() => {})
        }
      }
    },
    [entry]
  )

  const container = (
    <div
      className={cn(
        'group',
        'relative h-full w-full',
        enableFullscreen && 'cursor-pointer'
      )}
      ref={setContainerRef}
    >
      {videoContent}
      {enableFullscreen && (
        <span
          className={cn(
            'pointer-events-none absolute inset-0 z-50 bg-black/50 transition-all duration-300 ease-in-out group-hover:bg-black/30'
          )}
        >
          <PlayCircleIcon
            className='pointer-events-none absolute left-1/2 top-1/2 z-50 size-16 -translate-x-1/2 -translate-y-1/2 text-white transition-transform duration-300 ease-in-out group-hover:scale-125 xl:size-24'
            weight='fill'
          />
        </span>
      )}
    </div>
  )

  if (enableFullscreen && activePlaybackId) {
    return (
      <FullScreenVideoDialog
        dialogTrigger={container}
        mediaId={playbackId ?? ''}
        aspectRatio={aspectRatio}
        onOpenChange={handleDialogOpenChange}
      />
    )
  }

  return container
}
