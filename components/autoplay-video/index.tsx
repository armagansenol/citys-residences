'use client'

import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import MuxPlayer from '@mux/mux-player-react/lazy'

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react'

type MuxPlayerLazyProps = ComponentPropsWithoutRef<typeof MuxPlayer>

interface AutoplayVideoProps extends MuxPlayerLazyProps {
  viewportOptimization?: boolean
  intersectionThreshold?: number
}

export function AutoplayVideo({
  viewportOptimization = true,
  intersectionThreshold = 0.25,
  ...props
}: AutoplayVideoProps) {
  const playerRef = useRef<MuxPlayerRefAttributes>(null)

  useEffect(() => {
    if (!viewportOptimization) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const playerEl = playerRef.current
        if (!playerEl) return

        const isAboveThreshold =
          (entry?.intersectionRatio ?? 0) >= intersectionThreshold

        if (isAboveThreshold) {
          playerEl.play() // if you want auto-resume
          return
        }

        // pause when out of viewport or below threshold
        playerEl.pause()
      },
      {
        root: null,
        threshold: intersectionThreshold, // trigger when 25% visible
      }
    )

    const target = playerRef.current

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
      observer.disconnect()
    }
  }, [intersectionThreshold, viewportOptimization])

  return (
    <MuxPlayer
      ref={playerRef}
      autoPlay
      muted
      loop
      playsInline
      streamType='on-demand'
      {...props}
    />
  )
}
