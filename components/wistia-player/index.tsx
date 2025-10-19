'use client'

import { cn } from '@/lib/utils'
import { WistiaPlayer, WistiaPlayerProps } from '@wistia/wistia-player-react'
import { useRef, useState, useMemo, useEffect } from 'react'

import { Image } from '@/components/image'

interface WistiaPlayerWrapperProps extends WistiaPlayerProps {
  className?: string
  aspectRatio?: string | number
  containerHeight?: string | number
  customPoster?: string
  posterPriority?: boolean
  onError?: (error: Error) => void
}

export function WistiaPlayerWrapper(props: WistiaPlayerWrapperProps) {
  const {
    className,
    aspectRatio,
    containerHeight,
    customPoster,
    posterPriority = false,
    onError,
    ...wistiaProps
  } = props

  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [retryKey, setRetryKey] = useState(0)
  // WistiaPlayer uses its own internal ref type
  const playerRef = useRef<React.ComponentRef<typeof WistiaPlayer>>(null)

  // Handle video play event
  const handlePlay = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Wistia video with id',
        wistiaProps.mediaId,
        'started playing'
      )
    }
    setIsPlaying(true)
    setHasError(false) // Clear error state on successful play
  }

  // Handle errors
  const handleError = (error: Error) => {
    console.error('Wistia player error:', error)
    setHasError(true)
    onError?.(error)
  }

  // Retry loading the video
  const retryLoad = () => {
    setHasError(false)
    setRetryKey(prev => prev + 1)
  }

  // Auto-retry multiple times with increasing delays if there's an error
  useEffect(() => {
    if (hasError && retryKey < 5) {
      // Retry up to 5 times with increasing delays
      const delay = Math.min(1000 * (retryKey + 1), 5000) // Max 5 second delay
      const timer = setTimeout(() => {
        console.log(
          `Auto-retrying Wistia player load (attempt ${retryKey + 1})...`
        )
        retryLoad()
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [hasError, retryKey])

  // Monitor for Wistia-related errors
  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      // Check if error is related to Wistia
      if (
        event.message?.toLowerCase().includes('wistia') ||
        event.filename?.toLowerCase().includes('wistia')
      ) {
        handleError(new Error(event.message || 'Wistia loading error'))
      }
    }

    window.addEventListener('error', handleWindowError)
    return () => window.removeEventListener('error', handleWindowError)
  }, [])

  // Check if player loaded successfully after mount
  useEffect(() => {
    const checkTimer = setTimeout(() => {
      // If we don't have a valid player ref after 5 seconds and haven't played, assume error
      if (!isPlaying && !hasError && !playerRef.current) {
        console.warn('Wistia player may not have loaded properly')
        handleError(new Error('Player initialization timeout'))
      }
    }, 5000)

    return () => clearTimeout(checkTimer)
  }, [isPlaying, hasError])

  // Calculate container styles to prevent layout shift
  const containerStyles = useMemo<React.CSSProperties>(() => {
    if (aspectRatio) {
      return {
        aspectRatio:
          typeof aspectRatio === 'number'
            ? aspectRatio.toString()
            : aspectRatio,
      }
    }

    if (containerHeight) {
      return {
        height:
          typeof containerHeight === 'number'
            ? `${containerHeight}px`
            : containerHeight,
      }
    }

    // Default to 16:9 aspect ratio if no dimensions specified
    return { aspectRatio: '16/9' }
  }, [aspectRatio, containerHeight])

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={containerStyles}
      role='region'
      aria-label='Video player'
    >
      {/* Wistia Player */}
      <div className='absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2'>
        <WistiaPlayer
          key={retryKey}
          ref={playerRef}
          onPlay={handlePlay}
          {...wistiaProps}
        />
      </div>

      {/* Poster image that fades out when video starts playing */}
      {customPoster && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-500 ease-out',
            isPlaying && 'opacity-0'
          )}
          aria-hidden='true'
        >
          <Image
            src={customPoster}
            alt='Video poster'
            fill
            className='object-cover'
            sizes='100vw'
            priority={posterPriority}
          />
        </div>
      )}
    </div>
  )
}
