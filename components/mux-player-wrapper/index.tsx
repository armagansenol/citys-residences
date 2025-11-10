'use client'

/**
 * MuxPlayerWrapper - Enhanced video player with viewport detection and scroll optimization
 *
 * Features:
 * - Viewport-based play/pause control using GSAP ScrollTrigger
 * - Velocity-aware scroll optimization using Lenis
 * - Plays video after being in viewport for scrollDelay duration (no waiting for scroll stop)
 * - Mobile-optimized: works with scroll inertia, no excessive delays
 * - Animated placeholder transition (shown only on initial load before first play)
 * - Video resumes from last position when returning to viewport (no placeholder re-display)
 *
 * Scroll Optimization:
 * - Timer starts immediately when video enters viewport
 * - Checks Lenis velocity to detect active scrolling (threshold: 0.5)
 * - Timer resets only if user is actively scrolling (high velocity)
 * - Plays video after scrollDelay if velocity stays low/zero
 * - No waiting for complete scroll stop (fixes mobile inertia delays)
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

import React, { useRef, useEffect, useState } from 'react'
// import MuxPlayer from '@mux/mux-player-react'
import MuxPlayer from '@mux/mux-player-react/lazy'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'

// Register GSAP plugins (required even when using useGSAP)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

interface MuxPlayerWrapperProps extends React.ComponentProps<typeof MuxPlayer> {
  playOnViewport?: boolean
  viewportThreshold?: number
  scrollDelay?: number // Delay in milliseconds video must be in viewport before playing (checks velocity, not scroll stop)
  enableScrollOptimization?: boolean // Enable velocity-aware scroll optimization
  debug?: boolean // Enable debug console logging
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
      scrollDelay = 500, // Default 1.5 seconds
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
    const viewportTimerRef = useRef<NodeJS.Timeout | null>(null)
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
    const lenisRef = useRef<{ velocity: number } | null>(null)

    // Debug refs (no re-renders)
    const debugVelocityRef = useRef<HTMLDivElement>(null)
    const debugStatusRef = useRef<HTMLDivElement>(null)

    // Velocity threshold to consider as "active scrolling"
    const velocityThreshold = 1.5

    // GSAP ScrollTrigger for viewport detection using useGSAP hook
    useGSAP(
      () => {
        if (!playOnViewport && !enableScrollOptimization) return

        // Create ScrollTrigger instance
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start: `top ${100 - viewportThreshold * 100}%`,
          end: `bottom ${viewportThreshold * 100}%`,
          onEnter: () => {
            if (debug) console.log('👁️ ScrollTrigger: Entering viewport')
            setIsInViewport(true)
          },
          onLeave: () => {
            if (debug)
              console.log('👁️ ScrollTrigger: Leaving viewport (bottom)')
            setIsInViewport(false)
          },
          onEnterBack: () => {
            if (debug)
              console.log(
                '👁️ ScrollTrigger: Entering viewport (scrolling back)'
              )
            setIsInViewport(true)
          },
          onLeaveBack: () => {
            if (debug) console.log('👁️ ScrollTrigger: Leaving viewport (top)')
            setIsInViewport(false)
          },
          markers: true,
        })

        // Check immediately if element is in viewport (check specific instance, not global refresh)
        if (scrollTriggerRef.current.isActive) {
          if (debug)
            console.log('👁️ ScrollTrigger: Already in viewport on mount')
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
        ],
      }
    )

    // Track Lenis scroll velocity for detecting active scrolling
    useLenis(
      lenis => {
        if (!enableScrollOptimization) return
        lenisRef.current = lenis

        // Update debug display directly without re-rendering
        if (debug && debugVelocityRef.current && debugStatusRef.current) {
          const velocity = Math.abs(lenis.velocity || 0)
          debugVelocityRef.current.textContent = velocity.toFixed(3)

          const isActiveScrolling = velocity > velocityThreshold
          debugStatusRef.current.textContent = isActiveScrolling
            ? '🔄 Active Scrolling'
            : '✅ Low/Stopped'
          debugStatusRef.current.style.color = isActiveScrolling
            ? '#ff4444'
            : '#44ff44'
        }
      },
      [enableScrollOptimization, debug, velocityThreshold]
    )

    // Handle delayed video play when in viewport
    useEffect(() => {
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
        if (debug)
          console.log(
            '✅ Video played before - playing immediately on viewport entry'
          )
        setShouldAttemptPlay(true)
        return
      }

      // If video hasn't played yet and just entered viewport, start timer
      if (isInViewport && !hasPlayedOnce) {
        if (debug) {
          console.log(
            `⏱️ Video entered viewport - will play after ${scrollDelay}ms if still visible`
          )
        }

        // Check scroll velocity periodically to cancel if actively scrolling
        const startTime = Date.now()

        const checkAndPlay = () => {
          const elapsed = Date.now() - startTime

          // Check if we're actively scrolling (high velocity)
          const currentVelocity = Math.abs(lenisRef.current?.velocity || 0)
          const isActivelyScrolling = currentVelocity > velocityThreshold

          if (debug) {
            console.log('📊 Scroll check:', {
              elapsed,
              velocity: currentVelocity,
              isActivelyScrolling,
              threshold: velocityThreshold,
            })
          }

          // If actively scrolling, restart the timer
          if (isActivelyScrolling) {
            if (debug)
              console.log('🔄 Active scrolling detected - resetting timer')
            viewportTimerRef.current = setTimeout(checkAndPlay, 100)
            return
          }

          // If delay time has elapsed and not actively scrolling, play the video
          if (elapsed >= scrollDelay) {
            if (debug)
              console.log('✅ Timer complete - attempting to play video')
            setShouldAttemptPlay(true)
          } else {
            // Keep checking until delay is complete
            viewportTimerRef.current = setTimeout(checkAndPlay, 100)
          }
        }

        viewportTimerRef.current = setTimeout(checkAndPlay, 100)
      } else if (!isInViewport) {
        // Video left viewport, reset play state
        if (debug)
          console.log('❌ Video left viewport - canceling play attempt')
        setShouldAttemptPlay(false)
      }

      return () => {
        if (viewportTimerRef.current) {
          clearTimeout(viewportTimerRef.current)
          viewportTimerRef.current = null
        }
      }
    }, [
      isInViewport,
      hasPlayedOnce,
      scrollDelay,
      enableScrollOptimization,
      debug,
    ])

    // Handle play/pause based on shouldAttemptPlay
    useEffect(() => {
      if (!playOnViewport) {
        return
      }

      const player = playerRef.current

      if (!player) {
        if (debug) console.log('⚠️ Player ref not available yet')
        return
      }

      if (shouldAttemptPlay && isInViewport) {
        // Attempt to play the video
        if (debug) console.log('🎬 Attempting to play video')
        player.play().catch(error => {
          if (debug) console.warn('Play was prevented:', error)
        })
      } else if (!isInViewport) {
        // Video left viewport, pause it
        if (debug) console.log('⏸️ Video leaving viewport - pausing')
        player.pause()
        setShouldAttemptPlay(false) // Reset play attempt
      }
      // playerRef is a ref object and is stable across renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldAttemptPlay, isInViewport, playOnViewport])

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
          if (debug) console.warn('Autoplay was prevented:', error)
        })
      }
      // playerRef is a ref object and is stable across renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playbackId, playOnViewport])

    // Handle when player is ready
    const handleCanPlay = (e: CustomEvent) => {
      if (debug) console.log('✅ Player ready (canplay event)')
      if (onCanPlay) {
        onCanPlay(e)
      }
    }

    // Handle when video starts playing - this triggers placeholder fadeout
    const handlePlay = (e: CustomEvent) => {
      if (debug)
        console.log('▶️ Video started playing - fading out placeholder')
      setHasPlayedOnce(true) // Mark that video has played at least once
      if (onPlay) {
        onPlay(e)
      }
    }

    // Handle when video is paused
    const handlePause = () => {
      if (debug) console.log('⏸️ Video paused')
    }

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
            // Performance and loading settings
            preload={playOnViewport ? 'metadata' : preload} // Use metadata for manual control
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
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={onEnded}
            onError={onError}
            onLoadStart={() => debug && console.log('📹 Video load started')}
            onLoadedMetadata={() =>
              debug && console.log('📊 Video metadata loaded')
            }
            onLoadedData={() => debug && console.log('📦 Video data loaded')}
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

        {/* Debug velocity display - fixed bottom left */}
        {debug && enableScrollOptimization && (
          <div
            style={
              {
                position: 'fixed',
                bottom: '0%',
                left: '0%',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                padding: '20px 30px',
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                zIndex: 99999,
                pointerEvents: 'none',
                border: '3px solid #00ff00',
              } as React.CSSProperties
            }
          >
            <div
              style={{ marginBottom: '8px', fontSize: '14px', opacity: 0.8 }}
            >
              Scroll Velocity
            </div>
            <div
              ref={debugVelocityRef}
              style={{ fontSize: '32px', color: '#00ff00' }}
            >
              0.000
            </div>
            <div style={{ marginTop: '8px', fontSize: '14px', opacity: 0.8 }}>
              Threshold: {velocityThreshold.toFixed(3)}
            </div>
            <div
              ref={debugStatusRef}
              style={{
                marginTop: '8px',
                fontSize: '14px',
                color: '#44ff44',
              }}
            >
              ✅ Low/Stopped
            </div>
          </div>
        )}
      </>
    )
  }
)

MuxPlayerWrapper.displayName = 'MuxPlayerWrapper'

export default MuxPlayerWrapper
