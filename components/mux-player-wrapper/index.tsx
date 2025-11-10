'use client'

/**
 * MuxPlayerWrapper - Enhanced video player with viewport detection and scroll optimization
 *
 * Features:
 * - Viewport-based play/pause control using GSAP ScrollTrigger
 * - Simple time-based scroll optimization
 * - Plays video after being in viewport for scrollDelay duration
 * - Mobile-optimized: works perfectly with scroll inertia
 * - Animated placeholder transition (shown only on initial load before first play)
 * - Video resumes from last position when returning to viewport (no placeholder re-display)
 *
 * Scroll Optimization:
 * - Timer starts immediately when video enters viewport
 * - Plays video after scrollDelay milliseconds if still in viewport
 * - Timer cancels if video leaves viewport before delay completes
 * - No velocity checking - just simple time-based logic
 * - Works reliably on all devices
 *
 * Technical Notes:
 * - Uses @gsap/react's useGSAP hook for proper React integration
 * - Plugins registered at module level: gsap.registerPlugin(useGSAP, ScrollTrigger)
 * - Automatic cleanup prevents memory leaks with multiple instances
 * - React Strict Mode compatible (no double-registration issues)
 * - Scoped ScrollTriggers don't interfere with each other
 *
 * @see README.md for complete documentation
 */

import './styles.css'

import React, { useRef, useEffect, useState, useCallback } from 'react'
// import MuxPlayer from '@mux/mux-player-react'
import MuxPlayer from '@mux/mux-player-react/lazy'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins (required even when using useGSAP)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

interface MuxPlayerWrapperProps extends React.ComponentProps<typeof MuxPlayer> {
  playOnViewport?: boolean
  viewportThreshold?: number
  scrollDelay?: number // Time in milliseconds video must be in viewport before playing
  enableScrollOptimization?: boolean // Enable time-based scroll optimization
  debug?: boolean // Enable debug console logging
}

const MuxPlayerWrapperComponent = React.forwardRef<
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
      scrollDelay = 500, // Default 500ms
      enableScrollOptimization = false,
      debug = false,
      ...muxPlayerProps
    },
    ref
  ) => {
    const internalRef = useRef<MuxPlayerRefAttributes>(null)
    const playerRef =
      (ref as React.RefObject<MuxPlayerRefAttributes>) || internalRef
    const containerRef = useRef<HTMLDivElement>(null)

    // Scroll optimization state
    const [isInViewport, setIsInViewport] = useState(false)
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false) // Track if video has played at least once
    const [shouldAttemptPlay, setShouldAttemptPlay] = useState(false)
    const [isPlayerReady, setIsPlayerReady] = useState(false)
    const viewportTimerRef = useRef<NodeJS.Timeout | null>(null)
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

    // Memoize viewport callbacks to prevent ScrollTrigger recreations
    const handleViewportEnter = useCallback(() => {
      setIsInViewport(true)
    }, [])

    const handleViewportLeave = useCallback(() => {
      setIsInViewport(false)
    }, [])

    // GSAP ScrollTrigger for viewport detection using useGSAP hook
    useGSAP(
      () => {
        if (!playOnViewport && !enableScrollOptimization) return

        // Create ScrollTrigger instance
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start: `top ${100 - viewportThreshold * 100}%`,
          end: `bottom ${viewportThreshold * 100}%`,
          onEnter: handleViewportEnter,
          onLeave: handleViewportLeave,
          onEnterBack: handleViewportEnter,
          onLeaveBack: handleViewportLeave,
          markers: false,
        })

        // Check immediately if element is in viewport (check specific instance, not global refresh)
        if (scrollTriggerRef.current.isActive) {
          setIsInViewport(true)
        }
      },
      {
        scope: containerRef,
        dependencies: [
          playOnViewport,
          viewportThreshold,
          enableScrollOptimization,
          debug,
          handleViewportEnter,
          handleViewportLeave,
        ],
      }
    )

    // Handle delayed video play when in viewport
    useEffect(() => {
      // Only run if playOnViewport is enabled
      if (!playOnViewport) {
        return
      }

      if (!enableScrollOptimization) {
        // If optimization disabled, attempt play immediately when in viewport
        setShouldAttemptPlay(isInViewport)
        return
      }

      // Clear any existing timer when viewport state changes
      if (viewportTimerRef.current) {
        clearTimeout(viewportTimerRef.current)
        viewportTimerRef.current = null
      }

      // If video has already played once, play immediately when entering viewport (no scroll delay)
      if (isInViewport && hasPlayedOnce) {
        setShouldAttemptPlay(true)
        return
      }

      // If not in viewport, reset play state if needed
      if (!isInViewport) {
        if (shouldAttemptPlay) {
          setShouldAttemptPlay(false)
        }
        return
      }

      // If video hasn't played yet and is in viewport, start simple timer
      if (!hasPlayedOnce) {
        viewportTimerRef.current = setTimeout(() => {
          setShouldAttemptPlay(true)
        }, scrollDelay)
      }

      return () => {
        if (viewportTimerRef.current) {
          clearTimeout(viewportTimerRef.current)
          viewportTimerRef.current = null
        }
      }
      // shouldAttemptPlay is intentionally excluded to avoid infinite loops
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      isInViewport,
      hasPlayedOnce,
      scrollDelay,
      enableScrollOptimization,
      playOnViewport,
      debug,
    ])

    // Handle play/pause based on shouldAttemptPlay
    useEffect(() => {
      if (!playOnViewport) {
        return
      }

      if (!shouldAttemptPlay || !isInViewport || !isPlayerReady) {
        return
      }

      const player = playerRef.current

      if (!player) {
        return
      }

      // Attempt to play the video with iOS-specific handling
      const attemptPlay = () => {
        player.play().catch(() => {
          // iOS sometimes needs a slight delay or retry
          setTimeout(() => {
            player.play().catch(() => {
              // Silent fail after retry
            })
          }, 100)
        })
      }

      attemptPlay()
      // playerRef is a ref object and is stable across renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldAttemptPlay, isInViewport, isPlayerReady, playOnViewport])

    // Handle pause when leaving viewport
    useEffect(() => {
      if (!playOnViewport || isInViewport) {
        return
      }

      const player = playerRef.current
      if (player && player.paused === false) {
        player.pause()
        setShouldAttemptPlay(false)
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
        player.play().catch(() => {
          // Silent fail
        })
      }
      // playerRef is a ref object and is stable across renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playbackId, playOnViewport])

    // Handle when player is ready - memoized to prevent recreating on every render
    const handleCanPlay = useCallback(
      (e: CustomEvent) => {
        setIsPlayerReady(true)
        if (onCanPlay) {
          onCanPlay(e)
        }
      },
      [onCanPlay]
    )

    // Handle when video metadata is loaded (iOS-friendly alternative)
    const handleLoadedMetadata = useCallback(() => {
      // On iOS, metadata loaded is often more reliable than canplay
      setIsPlayerReady(true)
    }, [])

    // Handle when video data is loaded
    const handleLoadedData = useCallback(() => {
      setIsPlayerReady(true)
    }, [])

    // Handle when video starts playing - this triggers placeholder fadeout
    const handlePlay = useCallback(
      (e: CustomEvent) => {
        setHasPlayedOnce(true) // Mark that video has played at least once
        if (onPlay) {
          onPlay(e)
        }
      },
      [onPlay]
    )

    // Handle when video is paused - memoized to prevent recreating
    const handlePause = useCallback(() => {
      // Silent
    }, [])

    return (
      <>
        <div ref={containerRef} className='relative h-full w-full'>
          {/* Video player - always rendered (has lazy loading built-in) */}
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
            // iOS-specific attributes
            webkit-playsinline='true'
            // Performance and loading settings
            preload={playOnViewport ? 'auto' : preload} // iOS needs 'auto' for reliable playback
            streamType={streamType}
            startTime={startTime}
            // Resolution settings
            maxResolution={maxResolution}
            minResolution={minResolution}
            // Disable user interactions for background video
            nohotkeys
            // Mobile-specific attributes
            disableTracking={false}
            // Event handlers
            onCanPlay={handleCanPlay}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={handleLoadedData}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={onEnded}
            onError={onError}
            {...muxPlayerProps}
          />

          {/* Placeholder overlays video and fades out when video starts playing for the first time */}
          <AnimatePresence>
            {enableScrollOptimization && !hasPlayedOnce && (
              <motion.div
                key='placeholder'
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='absolute inset-0 z-10 bg-black'
                style={{
                  backgroundImage: poster
                    ? `url(${poster})`
                    : placeholder
                      ? `url(${placeholder})`
                      : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  pointerEvents: 'none', // Allow clicks to pass through to video
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </>
    )
  }
)

MuxPlayerWrapperComponent.displayName = 'MuxPlayerWrapper'

// Memoize the component to prevent unnecessary re-renders when props haven't changed
export const MuxPlayerWrapper = React.memo(MuxPlayerWrapperComponent)

export default MuxPlayerWrapper
