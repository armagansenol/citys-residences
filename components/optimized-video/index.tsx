'use client'

import { useEffect, useRef, useState } from 'react'
import { Image } from '@/components/image'

interface Props {
  playbackId: string
  placeholder?: string
  scrollDelay?: number // <--- you keep this!
  aspectRatio?: number // e.g. 16/9, 4/3, 1/1
}

export function OptimizedVideo({
  playbackId,
  placeholder,
  scrollDelay = 0,
  aspectRatio,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const attach = () => {
      video.dataset.scrollDelay = String(scrollDelay)
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
  }, [scrollDelay])

  return (
    <div
      className='relative h-full w-full'
      style={aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined}
    >
      {!ready && placeholder && (
        <Image
          src={placeholder}
          alt='Video Thumbnail'
          fill
          mobileSize='100vw'
          desktopSize='100vw'
          className='object-cover opacity-100 transition-opacity duration-500'
        />
      )}

      <video
        ref={ref}
        muted
        loop
        playsInline
        preload='metadata'
        onLoadedData={() => {
          console.log('VIDEO LOADED', playbackId)
          setReady(true)
        }}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source
          src={`https://stream.mux.com/${playbackId}/highest.mp4`}
          type='video/mp4'
          media='(max-width: 767px)'
        />
        <source
          src={`https://stream.mux.com/${playbackId}/highest.mp4`}
          type='video/mp4'
          media='(min-width: 768px)'
        />
      </video>
    </div>
  )
}
