'use client'

/**
 * MuxPlayerWrapper - Viewport-controlled video player with scroll optimization
 *
 * Features:
 * - Always uses viewport-based play/pause control via GSAP ScrollTrigger
 * - Automatic scroll optimization with time-based delay
 * - Plays video after being in viewport for scrollDelay duration (default: 500ms)
 * - Mobile-optimized: works perfectly with scroll inertia
 * - Animated placeholder transition (shown only on initial load before first play)
 * - Video resumes from last position when returning to viewport (no placeholder re-display)
 * - Zero preload strategy: videos only load when entering viewport
 *
 * Scroll Optimization:
 * - Timer starts immediately when video enters viewport
 * - Plays video after scrollDelay milliseconds if still in viewport
 * - Timer cancels if video leaves viewport before delay completes
 * - Once played, video starts immediately on re-entry (no delay)
 * - No velocity checking - just simple time-based logic
 * - Works reliably on all devices
 *
 * Performance:
 * - preload='none' prevents network congestion with multiple videos
 * - Memoized callbacks prevent unnecessary re-renders
 * - Component wrapped with React.memo for optimal performance
 * - Perfect for pages with 50+ videos
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

import React, { useCallback, useRef, useState } from 'react'
// import MuxPlayer from '@mux/mux-player-react'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import MuxPlayer from '@mux/mux-player-react/lazy'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'

import { Image } from '@/components/image'

// Register GSAP plugins (required even when using useGSAP)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

interface MuxPlayerWrapperProps extends React.ComponentProps<typeof MuxPlayer> {
  viewportThreshold?: number
  scrollDelay?: number // Time in milliseconds video must be in viewport before playing
}

const MuxPlayerWrapperComponent = ({
  playbackId,
  metadata,
  placeholder,
  className,
  onCanPlay,
  onPlay,
  onEnded,
  onError,
  streamType = 'on-demand',
  viewportThreshold = 0,
  scrollDelay = 500, // Default 500ms
  ...muxPlayerProps
}: MuxPlayerWrapperProps) => {
  const playerRef = useRef<MuxPlayerRefAttributes | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePlayerRef = useCallback(
    (instance: MuxPlayerRefAttributes | null) => {
      playerRef.current = instance
    },
    []
  )

  // Scroll optimization state
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false) // Track if video has played at least once
  const isInViewportRef = useRef(false)
  const isPlayerReadyRef = useRef(false)
  const hasPendingPlayRef = useRef(false)
  const hasPlayedOnceRef = useRef(false)
  const viewportTimerRef = useRef<NodeJS.Timeout | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  // Memoize viewport callbacks to prevent ScrollTrigger recreations
  const handleViewportEnter = useCallback(() => {
    isInViewportRef.current = true
  }, [])

  const handleViewportLeave = useCallback(() => {
    isInViewportRef.current = false
  }, [])

  const clearViewportTimer = useCallback(() => {
    if (viewportTimerRef.current) {
      clearTimeout(viewportTimerRef.current)
      viewportTimerRef.current = null
    }
  }, [])

  const attemptPlay = useCallback(() => {
    const player = playerRef.current

    if (!player) {
      return
    }

    if (!isPlayerReadyRef.current || !isInViewportRef.current) {
      hasPendingPlayRef.current = true
      return
    }

    hasPendingPlayRef.current = false
    player.play().catch(() => {
      setTimeout(() => {
        player.play().catch(() => {
          // Silent fail after retry
        })
      }, 100)
    })
  }, [])

  const scheduleViewportPlay = useCallback(() => {
    clearViewportTimer()

    if (!isInViewportRef.current) {
      return
    }

    if (hasPlayedOnceRef.current) {
      hasPendingPlayRef.current = true
      attemptPlay()
      return
    }

    viewportTimerRef.current = setTimeout(() => {
      hasPendingPlayRef.current = true
      attemptPlay()
    }, scrollDelay)
  }, [attemptPlay, clearViewportTimer, scrollDelay])

  const pausePlayback = useCallback(() => {
    const player = playerRef.current
    if (!player) {
      return
    }
    if (player.paused === false) {
      player.pause()
    }
  }, [])

  const handleEnterWithPlayback = useCallback(() => {
    handleViewportEnter()
    scheduleViewportPlay()
  }, [handleViewportEnter, scheduleViewportPlay])

  const handleLeaveWithPlayback = useCallback(() => {
    handleViewportLeave()
    clearViewportTimer()
    hasPendingPlayRef.current = false
    pausePlayback()
  }, [clearViewportTimer, handleViewportLeave, pausePlayback])

  // GSAP ScrollTrigger for viewport detection using useGSAP hook
  useGSAP(
    () => {
      // Create ScrollTrigger instance
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top ${100 - viewportThreshold * 100}%`,
        end: `bottom ${viewportThreshold * 100}%`,
        onEnter: handleEnterWithPlayback,
        onLeave: handleLeaveWithPlayback,
        onEnterBack: handleEnterWithPlayback,
        onLeaveBack: handleLeaveWithPlayback,
        markers: false,
      })

      // Check immediately if element is in viewport (check specific instance, not global refresh)
      if (scrollTriggerRef.current.isActive) {
        handleEnterWithPlayback()
      }

      return () => {
        clearViewportTimer()
        scrollTriggerRef.current?.kill()
        scrollTriggerRef.current = null
        isInViewportRef.current = false
        hasPendingPlayRef.current = false
      }
    },
    {
      scope: containerRef,
      dependencies: [
        viewportThreshold,
        handleEnterWithPlayback,
        handleLeaveWithPlayback,
        clearViewportTimer,
      ],
    }
  )

  // Handle when player is ready - memoized to prevent recreating on every render
  const handleCanPlay = useCallback(
    (e: CustomEvent) => {
      isPlayerReadyRef.current = true
      if (hasPendingPlayRef.current && isInViewportRef.current) {
        attemptPlay()
      }
      if (onCanPlay) {
        onCanPlay(e)
      }
    },
    [attemptPlay, onCanPlay]
  )

  // Handle when video metadata is loaded (iOS-friendly alternative)
  const handleLoadedMetadata = useCallback(() => {
    // On iOS, metadata loaded is often more reliable than canplay
    isPlayerReadyRef.current = true
    if (hasPendingPlayRef.current && isInViewportRef.current) {
      attemptPlay()
    }
  }, [attemptPlay])

  // Handle when video data is loaded
  const handleLoadedData = useCallback(() => {
    isPlayerReadyRef.current = true
    if (hasPendingPlayRef.current && isInViewportRef.current) {
      attemptPlay()
    }
  }, [attemptPlay])

  // Handle when video starts playing - this triggers placeholder fadeout
  const handlePlay = useCallback(
    (e: CustomEvent) => {
      hasPlayedOnceRef.current = true
      setHasPlayedOnce(true) // Mark that video has played at least once
      clearViewportTimer()
      if (onPlay) {
        onPlay(e)
      }
    },
    [clearViewportTimer, onPlay]
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
          ref={handlePlayerRef}
          playbackId={playbackId}
          metadata={metadata}
          placeholder={placeholder}
          className={cn(className)}
          // No native autoplay - we control playback via viewport detection
          muted
          loop
          playsInline // Required for iOS autoplay
          streamType={streamType}
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
          {!hasPlayedOnce && placeholder && (
            <motion.div
              key='placeholder'
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className='absolute inset-0 z-10 outline-dashed -outline-offset-8 outline-red-500'
            >
              <Image
                src={placeholder as string}
                alt='Video placeholder'
                fill
                className='object-cover object-center'
                loading='lazy'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

MuxPlayerWrapperComponent.displayName = 'MuxPlayerWrapper'

// Memoize the component to prevent unnecessary re-renders when props haven't changed
export const MuxPlayerWrapper = React.memo(MuxPlayerWrapperComponent)

export default MuxPlayerWrapper
