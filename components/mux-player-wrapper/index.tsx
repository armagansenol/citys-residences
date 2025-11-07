'use client'

import './styles.css'

import React, { useRef, useEffect, useState } from 'react'
// import MuxPlayer from '@mux/mux-player-react'
import MuxPlayer from '@mux/mux-player-react/lazy'
import type {
  MuxPlayerProps,
  MuxPlayerRefAttributes,
} from '@mux/mux-player-react'
import { cn } from '@/lib/utils'

interface MuxPlayerWrapperProps extends MuxPlayerProps {
  playOnViewport?: boolean
  viewportThreshold?: number
}

export const MuxPlayerWrapper = React.forwardRef<
  MuxPlayerRefAttributes,
  MuxPlayerWrapperProps
>(
  (
    {
      playbackId,
      metadata,
      poster,
      placeholder,
      className,
      maxResolution,
      minResolution,
      onCanPlay,
      onPlay,
      onEnded,
      onError,
      preload = 'auto',
      startTime = 0,
      streamType = 'on-demand',
      playOnViewport = false,
      viewportThreshold = 0.5,
      ...muxPlayerProps
    },
    ref
  ) => {
    const internalRef = useRef<MuxPlayerRefAttributes>(null)
    const playerRef =
      (ref as React.RefObject<MuxPlayerRefAttributes>) || internalRef
    const containerRef = useRef<HTMLDivElement>(null)
    const [isInViewport, setIsInViewport] = useState(false)

    // Intersection Observer for viewport-based play/pause
    useEffect(() => {
      if (!playOnViewport || !containerRef.current) {
        return
      }

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            console.log('👁️ Intersection Observer:', {
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              threshold: viewportThreshold,
            })
            setIsInViewport(entry.isIntersecting)
          })
        },
        {
          threshold: viewportThreshold,
        }
      )

      observer.observe(containerRef.current)

      return () => {
        observer.disconnect()
      }
    }, [playOnViewport, viewportThreshold])

    // Handle play/pause based on viewport visibility
    useEffect(() => {
      if (!playOnViewport) {
        return
      }

      const player = playerRef.current
      if (!player) {
        return
      }

      if (isInViewport) {
        console.log('🎬 Video entering viewport - playing')
        player.play().catch(error => {
          console.warn('Play was prevented:', error)
        })
      } else {
        console.log('⏸️ Video leaving viewport - pausing')
        player.pause()
      }
      // playerRef is a ref object and is stable across renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInViewport, playOnViewport])

    // Initial autoplay for non-viewport mode
    useEffect(() => {
      if (playOnViewport) {
        return
      }

      // Ensure autoplay starts when component mounts
      const player = playerRef.current
      if (player) {
        // Try to play the video
        player.play().catch(error => {
          console.warn('Autoplay was prevented:', error)
        })
      }
      // playerRef is a ref object and is stable across renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playbackId, playOnViewport])

    return (
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
        <MuxPlayer
          ref={playerRef}
          playbackId={playbackId}
          metadata={metadata}
          poster={poster}
          placeholder={placeholder}
          className={cn('absolute inset-0 h-full w-full', className)}
          // Autoplay settings - only enable native autoplay when NOT using viewport control
          {...(!playOnViewport && { autoPlay: 'muted' as const })}
          muted
          loop
          playsInline // Required for iOS autoplay
          // Performance and loading settings
          preload={preload}
          streamType={streamType}
          startTime={startTime}
          // Resolution settings
          maxResolution={maxResolution}
          minResolution={minResolution}
          // Disable user interactions for background video
          nohotkeys
          // Event handlers
          onCanPlay={onCanPlay}
          onPlay={onPlay}
          onEnded={onEnded}
          onError={onError}
          {...muxPlayerProps}
        />
      </div>
    )
  }
)

MuxPlayerWrapper.displayName = 'MuxPlayerWrapper'

export default MuxPlayerWrapper
