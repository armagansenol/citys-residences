'use client'

import './styles.css'

import React, { useCallback, useRef, useState } from 'react'
import { Image } from '@/components/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'
// Removed unused imports

// Register GSAP plugins (required even when using useGSAP)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

interface MuxPlayerWrapperProps
  extends Omit<
    React.ComponentProps<'video'>,
    'src' | 'poster' | 'style' | 'onCanPlay' | 'onPlay'
  > {
  playbackId?: string
  src?: string
  viewportThreshold?: number
  scrollDelay?: number // Time in milliseconds video must be in viewport before playing
  customPlaceholder?: string
  style?: React.CSSProperties & {
    '--media-object-fit'?: string
    '--media-object-position'?: string
    '--controls'?: string
  }
  // Event handlers that accept CustomEvent for backward compatibility
  onCanPlay?: (e: CustomEvent) => void
  onPlay?: (e: CustomEvent) => void
  // MuxPlayer-specific props that we ignore
  minResolution?: string
  maxResolution?: string
  streamType?: string
}

const MuxPlayerWrapperComponent = ({
  playbackId,
  src,
  onCanPlay,
  onPlay,
  onEnded,
  onError,
  viewportThreshold = 0,
  scrollDelay = 2000,
  customPlaceholder,
  style,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  minResolution: _minResolution,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  maxResolution: _maxResolution,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  streamType: _streamType,
  ...videoProps
}: MuxPlayerWrapperProps) => {
  // Convert playbackId to highest.mp4 URL if provided
  const videoSrc =
    src ||
    (playbackId
      ? `https://stream.mux.com/${playbackId}/highest.mp4`
      : undefined)

  const playerRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePlayerRef = useCallback((instance: HTMLVideoElement | null) => {
    playerRef.current = instance
  }, [])

  // Scroll optimization state
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
      // Render player after scrollDelay and fade out placeholder
      setShowPlayer(true)
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

  // State to control when to show the player (after scrollDelay)
  const [showPlayer, setShowPlayer] = useState(!customPlaceholder)
  // State to control when player is ready and placeholder can fade out
  const [isPlayerReadyForDisplay, setIsPlayerReadyForDisplay] = useState(false)

  // Handle when player is ready - memoized to prevent recreating on every render
  const handleCanPlay = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      isPlayerReadyRef.current = true
      // Mark player as ready for display, which will trigger placeholder fade out
      setIsPlayerReadyForDisplay(true)
      if (hasPendingPlayRef.current && isInViewportRef.current) {
        attemptPlay()
      }
      if (onCanPlay) {
        // Convert React event to CustomEvent-like object for backward compatibility
        const customEvent = new CustomEvent('canplay', { detail: e })
        onCanPlay(customEvent)
      }
    },
    [attemptPlay, onCanPlay]
  )

  // Handle when video metadata is loaded (iOS-friendly alternative)
  const handleLoadedMetadata = useCallback(() => {
    // On iOS, metadata loaded is often more reliable than canplay
    isPlayerReadyRef.current = true
    // Mark player as ready for display
    if (!isPlayerReadyForDisplay) {
      setIsPlayerReadyForDisplay(true)
    }
    if (hasPendingPlayRef.current && isInViewportRef.current) {
      attemptPlay()
    }
  }, [attemptPlay, isPlayerReadyForDisplay])

  // Handle when video data is loaded
  const handleLoadedData = useCallback(() => {
    isPlayerReadyRef.current = true
    // Mark player as ready for display
    if (!isPlayerReadyForDisplay) {
      setIsPlayerReadyForDisplay(true)
    }
    if (hasPendingPlayRef.current && isInViewportRef.current) {
      attemptPlay()
    }
  }, [attemptPlay, isPlayerReadyForDisplay])

  // Handle when video starts playing
  const handlePlay = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      hasPlayedOnceRef.current = true
      clearViewportTimer()
      if (onPlay) {
        // Convert React event to CustomEvent-like object for backward compatibility
        const customEvent = new CustomEvent('play', { detail: e })
        onPlay(customEvent)
      }
    },
    [clearViewportTimer, onPlay]
  )

  // Handle when video is paused - memoized to prevent recreating
  const handlePause = useCallback(() => {
    // Silent
  }, [])

  // Determine if placeholder should be shown
  const shouldShowPlaceholder =
    customPlaceholder && (!showPlayer || !isPlayerReadyForDisplay)

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
    <>
      <div ref={containerRef} className='relative h-full w-full'>
        {/* Player - conditionally rendered after scrollDelay */}
        {showPlayer && (
          <motion.div
            key='player'
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlayerReadyForDisplay ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='absolute inset-0 z-0'
          >
            <video
              ref={handlePlayerRef}
              src={videoSrc}
              // No native autoplay - we control playback via viewport detection
              muted
              loop
              playsInline // Required for iOS autoplay
              // Event handlers
              onCanPlay={handleCanPlay}
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={handleLoadedData}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={onEnded}
              onError={onError}
              style={videoStyle}
              className='h-full w-full'
              {...videoProps}
            />
          </motion.div>
        )}

        {/* Placeholder - fades out only when player is ready */}
        {customPlaceholder && (
          <AnimatePresence>
            {shouldShowPlaceholder && (
              <motion.div
                key='placeholder'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='absolute inset-0 z-10'
              >
                <Image
                  src={customPlaceholder as string}
                  alt='Video placeholder'
                  fill
                  className='object-cover object-center'
                  loading='lazy'
                  style={{
                    filter: 'grayscale(20%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  )
}

MuxPlayerWrapperComponent.displayName = 'MuxPlayerWrapper'

export { MuxPlayerWrapperComponent as MuxPlayerWrapper }
