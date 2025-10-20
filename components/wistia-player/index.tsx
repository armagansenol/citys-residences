'use client'

import { cn } from '@/lib/utils'
import { WistiaPlayer, WistiaPlayerProps } from '@wistia/wistia-player-react'
import { useEffect, useRef, useState } from 'react'

import { Image } from '@/components/image'

interface WistiaPlayerWrapperProps extends WistiaPlayerProps {
  className?: string
  customPoster?: string
  posterPriority?: boolean
}

export function WistiaPlayerWrapper(props: WistiaPlayerWrapperProps) {
  const {
    className,
    customPoster,
    posterPriority = false,
    ...wistiaProps
  } = props

  const [isPlaying, setIsPlaying] = useState(false)
  const [videoAspect, setVideoAspect] = useState<number | null>(null)
  const playerRef = useRef<React.ComponentRef<typeof WistiaPlayer>>(null)
  const playStateTimeoutRef = useRef<NodeJS.Timeout>()
  const [isPageVisible, setIsPageVisible] = useState(true)
  const resizeCheckTimeoutRef = useRef<NodeJS.Timeout>()

  // Handle video play event
  const handlePlay = () => {
    // Clear any existing timeout
    if (playStateTimeoutRef.current) {
      clearTimeout(playStateTimeoutRef.current)
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Wistia video with id',
        wistiaProps.mediaId,
        'started playing',
        playerRef.current?.aspect
      )
    }

    // Use a small timeout to ensure the play state is properly set
    // This helps with race conditions in production
    playStateTimeoutRef.current = setTimeout(() => {
      setIsPlaying(true)
    }, 50)

    // Get video aspect ratio
    if (playerRef.current?.aspect) {
      setVideoAspect(playerRef.current.aspect)
    }
  }

  // Handle video pause event (fallback to show poster again if needed)
  const handlePause = () => {
    if (playStateTimeoutRef.current) {
      clearTimeout(playStateTimeoutRef.current)
    }
    setIsPlaying(false)
  }

  // Try to get aspect ratio on mount
  useEffect(() => {
    const checkAspect = setInterval(() => {
      if (playerRef.current?.aspect) {
        setVideoAspect(playerRef.current.aspect)
        clearInterval(checkAspect)
      }
    }, 100)

    return () => clearInterval(checkAspect)
  }, [])

  // Fallback check to ensure poster disappears even if onPlay event timing is off
  useEffect(() => {
    if (!customPoster || !wistiaProps.autoplay || !isPageVisible) return

    // Additional fallback for autoplay videos - check after a delay
    const fallbackTimer = setTimeout(() => {
      if (playerRef.current && !isPlaying && isPageVisible) {
        // Try to detect if video is actually playing by checking player state
        try {
          const player = playerRef.current
          // This is a fallback - if we're still not playing but video should be,
          // we can assume it started and hide the poster
          if (player && 'currentTime' in player) {
            const currentTime = (player as { currentTime: number }).currentTime
            if (currentTime > 0) {
              setIsPlaying(true)
            }
          }
        } catch (error) {
          // Ignore errors accessing player methods
          if (process.env.NODE_ENV === 'development') {
            console.warn('Could not access Wistia player methods:', error)
          }
        }
      }
    }, 1000) // Check after 1 second for autoplay videos

    return () => clearTimeout(fallbackTimer)
  }, [customPoster, wistiaProps.autoplay, isPlaying, isPageVisible])

  // Handle page visibility changes (when Mac screen is closed/reopened)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden
      setIsPageVisible(isVisible)

      // If page becomes visible again and we should be autoplaying
      if (isVisible && wistiaProps.autoplay) {
        // Reset the playing state and try to restart autoplay
        setTimeout(() => {
          if (playerRef.current) {
            try {
              const player = playerRef.current as {
                currentTime: number
                duration: number
              }

              // Try to detect if video is actually playing
              if (player && 'duration' in player) {
                const duration = player.duration

                // If video has a duration, it means it's loaded and should be playing
                if (duration > 0) {
                  setIsPlaying(true)
                }
              } else {
                // Fallback: just hide the poster after visibility change
                // The video should resume automatically due to Wistia's built-in behavior
                setTimeout(() => {
                  setIsPlaying(true)
                }, 1000)
              }
            } catch (error) {
              if (process.env.NODE_ENV === 'development') {
                console.warn(
                  'Could not restart video after visibility change:',
                  error
                )
              }
              // Fallback: hide poster anyway
              setIsPlaying(true)
            }
          }
        }, 300)
      } else if (!isVisible) {
        // Page is hidden, but keep current playing state
        // Don't reset isPlaying here as it might cause flickering
      }
    }

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Also listen for window focus/blur events as additional fallback
    const handleFocus = () => {
      if (wistiaProps.autoplay && !isPlaying) {
        setTimeout(() => {
          setIsPlaying(true)
        }, 300)
      }
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [wistiaProps.autoplay, isPlaying])

  // Handle window resize to fix state sync issues
  useEffect(() => {
    const handleResize = () => {
      // Clear any existing resize timeout
      if (resizeCheckTimeoutRef.current) {
        clearTimeout(resizeCheckTimeoutRef.current)
      }

      // Debounce resize handling
      resizeCheckTimeoutRef.current = setTimeout(() => {
        if (playerRef.current && customPoster) {
          try {
            const player = playerRef.current as {
              currentTime: number
              duration: number
              paused?: boolean
            }

            // Check if video should be playing based on player state
            if (player && wistiaProps.autoplay) {
              if ('duration' in player && player.duration > 0) {
                // Video is loaded, check if it should be playing
                if ('paused' in player && !player.paused) {
                  // Video is actually playing, ensure poster is hidden
                  setIsPlaying(true)
                } else if ('currentTime' in player && player.currentTime > 0) {
                  // Video has played, likely should be playing
                  setIsPlaying(true)
                }
              }
            }
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Could not check player state on resize:', error)
            }
          }
        }
      }, 300) // Wait 300ms after resize ends
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeCheckTimeoutRef.current) {
        clearTimeout(resizeCheckTimeoutRef.current)
      }
    }
  }, [customPoster, wistiaProps.autoplay])

  // Additional effect to ensure state consistency after window operations
  useEffect(() => {
    // This effect runs when isPlaying changes or component mounts
    // It ensures the state is properly reflected in the DOM
    if (customPoster && wistiaProps.autoplay && isPlaying) {
      // Force a re-render check to ensure the poster actually disappears
      const forceUpdate = setTimeout(() => {
        // This is a safety check - if the poster should be hidden but isn't,
        // we force the state to be consistent
        if (playerRef.current) {
          try {
            const player = playerRef.current as {
              currentTime: number
              duration: number
            }

            // If we think it should be playing but the player might not be ready
            if (player && 'duration' in player && player.duration === 0) {
              // Player not fully loaded yet, keep checking
              return
            }
          } catch {
            // Ignore errors, just keep the current state
          }
        }
      }, 100)

      return () => clearTimeout(forceUpdate)
    }
  }, [isPlaying, customPoster, wistiaProps.autoplay])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (playStateTimeoutRef.current) {
        clearTimeout(playStateTimeoutRef.current)
      }
      if (resizeCheckTimeoutRef.current) {
        clearTimeout(resizeCheckTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-black',
        className
      )}
      aria-label='Video player'
    >
      <div
        style={{
          minWidth: videoAspect ? `${videoAspect * 100}vh` : '177.78vh',
          minHeight: videoAspect ? `${(1 / videoAspect) * 100}vw` : '56.25vw',
        }}
        className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
      >
        <WistiaPlayer
          className='h-full w-full'
          ref={playerRef}
          onPlay={handlePlay}
          onPause={handlePause}
          {...wistiaProps}
        />
      </div>
      {customPoster && (
        <Image
          src={customPoster}
          alt='Video poster'
          fill
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full overflow-hidden object-cover object-center transition-opacity duration-300 ease-out',
            isPlaying && 'opacity-0'
          )}
          style={{
            opacity: isPlaying ? 0 : 1,
          }}
          sizes='100vw'
          mobileSize='100vw'
          priority={posterPriority}
        />
      )}
    </div>
  )
}
