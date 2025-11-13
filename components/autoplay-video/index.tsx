'use client'

import { useIntersectionObserver } from 'hamo'
import {
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
} from 'react'

interface AutoplayVideoProps
  extends Omit<ComponentPropsWithoutRef<'video'>, 'src' | 'poster' | 'style'> {
  intersectionThreshold?: number
  className?: string
  playbackId?: string
  src?: string
  poster?: string
  placeholder?: string // Alias for poster (MuxPlayer compatibility)
  style?: React.CSSProperties & {
    '--media-object-fit'?: string
    '--media-object-position'?: string
    '--controls'?: string
  }
  // MuxPlayer-specific props that we ignore
  minResolution?: string
  maxResolution?: string
  startTime?: number
  streamType?: string
}

export function AutoplayVideo({
  intersectionThreshold = 0,
  className,
  playbackId,
  src,
  poster,
  placeholder,
  style,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  minResolution: _,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  maxResolution: __,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startTime: ___,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  streamType: ____,
  ...props
}: AutoplayVideoProps) {
  const playerRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [setIntersectionRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '200px 0px 200px 0px',
    threshold: intersectionThreshold,
  })

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      setIntersectionRef(node ?? undefined)
    },
    [setIntersectionRef]
  )

  // Convert playbackId to highest.mp4 URL if provided
  const videoSrc =
    src ||
    (playbackId
      ? `https://stream.mux.com/${playbackId}/highest.mp4`
      : undefined)

  // Use placeholder as fallback for poster (MuxPlayer compatibility)
  const videoPoster = poster || placeholder

  useEffect(() => {
    const playerEl = playerRef.current
    if (!playerEl) {
      return
    }

    // Only pause if we explicitly know the element is NOT intersecting
    // Don't pause if entry is null/undefined (initial state)
    if (entry && !entry.isIntersecting) {
      playerEl.pause()
      return
    }

    // Play if intersecting (or if entry is null initially, let autoplay handle it)
    if (entry?.isIntersecting && playerEl.paused) {
      playerEl.play().catch(() => undefined)
    }
  }, [entry])

  // Convert CSS custom properties to standard CSS
  const customObjectFit = style?.['--media-object-fit'] as
    | React.CSSProperties['objectFit']
    | undefined
  const customObjectPosition = style?.['--media-object-position'] as
    | React.CSSProperties['objectPosition']
    | undefined

  const videoStyle: React.CSSProperties = {
    objectFit: customObjectFit || 'cover',
    objectPosition: customObjectPosition || 'center',
    ...style,
  }
  // Remove custom properties from style
  const styleObj = videoStyle as Record<string, unknown>
  delete styleObj['--media-object-fit']
  delete styleObj['--media-object-position']
  delete styleObj['--controls']

  return (
    <div ref={setContainerRef} className={className}>
      <video
        ref={playerRef}
        src={videoSrc}
        poster={videoPoster}
        className='h-full w-full'
        muted
        loop
        playsInline
        autoPlay
        preload='auto'
        style={videoStyle}
        {...props}
      />
    </div>
  )
}
