'use client'

import { Image } from '@/components/image'
import { cn } from '@/lib/utils'
import { breakpoints } from '@/styles/config.mjs'
import { useWindowSize } from 'hamo'
import { useEffect, useRef, useState } from 'react'

interface Props {
  playbackId: string
  aspectRatio?: number // e.g. 16/9, 4/3, 1/1
}

const SCROLL_DELAY = 1500

export function OptimizedVideo({ playbackId, aspectRatio }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const { width: windowWidth } = useWindowSize(100)
  const isMobile =
    typeof windowWidth === 'number' &&
    windowWidth < breakpoints.breakpointMobile

  const thumbnail = `https://image.mux.com/${playbackId}/thumbnail.webp?width=${isMobile ? 768 : 1920}&time=0`

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const attach = () => {
      video.dataset.scrollDelay = String(SCROLL_DELAY)
      window.__videoObserver?.observe(video)
    }

    attach()

    // If observer is not yet ready, retry once the event loop runs again
    const id = setInterval(() => {
      if (window.__videoObserver) {
        attach()
        clearInterval(id)
      }
    }, 16) // ~1 frame

    return () => {
      clearInterval(id)
      window.__videoObserver?.unobserve(video)
    }
  }, [])

  return (
    <div
      className='relative h-full w-full'
      style={aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined}
    >
      {thumbnail && (
        <Image
          src={thumbnail}
          alt='Video Thumbnail'
          fill
          mobileSize='100vw'
          desktopSize='100vw'
          className={cn('object-cover transition-opacity duration-500', {
            'opacity-100': !ready,
            'opacity-0': ready,
          })}
          style={{
            filter: 'grayscale(20%)',
          }}
        />
      )}
      <video
        ref={ref}
        poster={thumbnail}
        muted
        loop
        playsInline
        preload='none'
        onLoadedData={() => {
          setReady(true)
        }}
        className={cn('h-full w-full object-cover')}
      >
        <source
          src={`https://stream.mux.com/${playbackId}/highest.mp4`}
          type='video/mp4'
        />
      </video>
    </div>
  )
}
