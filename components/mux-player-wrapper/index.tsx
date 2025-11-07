'use client'

import './styles.css'

import React, { useRef, useEffect, useState } from 'react'
// import MuxPlayer from '@mux/mux-player-react'
import MuxPlayer from '@mux/mux-player-react/lazy'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface MuxPlayerWrapperProps extends React.ComponentProps<typeof MuxPlayer> {
  playOnViewport?: boolean
  viewportThreshold?: number
  scrollDelay?: number // Delay in milliseconds before loading video after scroll stops
  enableScrollOptimization?: boolean // Enable scroll-aware lazy loading
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
      viewportThreshold = 0,
      scrollDelay = 1500, // Default 1.5 seconds
      enableScrollOptimization = false,
      ...muxPlayerProps
    },
    ref
  ) => {
    const internalRef = useRef<MuxPlayerRefAttributes>(null)
    const playerRef =
      (ref as React.RefObject<MuxPlayerRefAttributes>) || internalRef
    const containerRef = useRef<HTMLDivElement>(null)
    const [isInViewport, setIsInViewport] = useState(false)
    const [isPlayerReady, setIsPlayerReady] = useState(false)

    // Scroll optimization state
    const [isScrolling, setIsScrolling] = useState(false)
    const [shouldLoadVideo, setShouldLoadVideo] = useState(
      !enableScrollOptimization
    )
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const loadDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Scroll detection for optimization
    useEffect(() => {
      if (!enableScrollOptimization) return

      const handleScroll = () => {
        setIsScrolling(true)

        // Clear existing scroll timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        // Set new timeout to detect when scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, 150) // Consider scrolling stopped after 150ms of no scroll events
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
      }
    }, [enableScrollOptimization])

    // Handle delayed video loading when in viewport and not scrolling
    useEffect(() => {
      if (!enableScrollOptimization) return

      // Clear any existing load delay timeout
      if (loadDelayTimeoutRef.current) {
        clearTimeout(loadDelayTimeoutRef.current)
      }

      // If video is in viewport and not scrolling, start delay timer
      if (isInViewport && !isScrolling && !shouldLoadVideo) {
        console.log(`⏱️ Starting ${scrollDelay}ms delay before loading video`)
        loadDelayTimeoutRef.current = setTimeout(() => {
          console.log('✅ Delay complete - loading video')
          setShouldLoadVideo(true)
        }, scrollDelay)
      }

      // If scrolling started again or left viewport, cancel the timer
      if ((isScrolling || !isInViewport) && loadDelayTimeoutRef.current) {
        console.log('❌ Canceling video load (scrolling or out of viewport)')
        clearTimeout(loadDelayTimeoutRef.current)
        loadDelayTimeoutRef.current = null
      }

      return () => {
        if (loadDelayTimeoutRef.current) {
          clearTimeout(loadDelayTimeoutRef.current)
        }
      }
    }, [
      isInViewport,
      isScrolling,
      shouldLoadVideo,
      scrollDelay,
      enableScrollOptimization,
    ])

    // Intersection Observer for viewport-based play/pause
    useEffect(() => {
      if (!containerRef.current) {
        return
      }

      // Only observe if we need viewport detection (either for playback or scroll optimization)
      if (!playOnViewport && !enableScrollOptimization) {
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
          // Check immediately on mount
          rootMargin: '0px',
        }
      )

      observer.observe(containerRef.current)

      return () => {
        observer.disconnect()
      }
    }, [playOnViewport, viewportThreshold, enableScrollOptimization])

    // Handle play/pause based on viewport visibility
    useEffect(() => {
      if (!playOnViewport || !isPlayerReady) {
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
    }, [isInViewport, playOnViewport, isPlayerReady])

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

    // Handle when player is ready
    const handleCanPlay = (e: CustomEvent) => {
      console.log('✅ Player ready (canplay event)')
      setIsPlayerReady(true)
      if (onCanPlay) {
        onCanPlay(e)
      }
    }

    return (
      <div ref={containerRef} className='relative h-full w-full'>
        {/* Video player loads in background when ready */}
        {shouldLoadVideo && (
          <MuxPlayer
            ref={playerRef}
            playbackId={playbackId}
            metadata={metadata}
            poster={poster}
            placeholder={placeholder}
            className={cn(className)}
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
            onCanPlay={handleCanPlay}
            onPlay={onPlay}
            onEnded={onEnded}
            onError={onError}
            {...muxPlayerProps}
          />
        )}

        {/* Placeholder overlays video and fades out when video is ready */}
        <AnimatePresence>
          {enableScrollOptimization && !shouldLoadVideo && (
            <motion.div
              key='placeholder'
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className='absolute inset-0 bg-black'
              style={{
                backgroundImage: poster
                  ? `url(${poster})`
                  : placeholder
                    ? `url(${placeholder})`
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
        </AnimatePresence>
      </div>
    )
  }
)

MuxPlayerWrapper.displayName = 'MuxPlayerWrapper'

export default MuxPlayerWrapper
