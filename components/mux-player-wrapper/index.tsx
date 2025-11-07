'use client'

import React, { useRef, useEffect } from 'react'
// import MuxPlayer from '@mux/mux-player-react'
import MuxPlayer from '@mux/mux-player-react/lazy'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import type { MuxPlayerWrapperProps } from './types'

/**
 * MuxPlayerWrapper - A React component for autoplay muted background videos using Mux
 *
 * This component is optimized for background video use cases with:
 * - Autoplay with muted audio
 * - Looping playback
 * - No controls displayed
 * - Responsive sizing
 *
 * @example
 * ```tsx
 * <MuxPlayerWrapper
 *   playbackId="your-playback-id"
 *   metadata={{
 *     video_title: "Background Video",
 *     video_id: "bg-video-1"
 *   }}
 *   className="w-full h-screen"
 * />
 * ```
 */
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
      style,
      maxResolution,
      minResolution,
      onCanPlay,
      onPlay,
      onEnded,
      onError,
      objectFit = 'cover',
      objectPosition = 'center',
      preload = 'auto',
      startTime = 0,
      streamType = 'on-demand',
      loading,
    },
    ref
  ) => {
    const internalRef = useRef<MuxPlayerRefAttributes>(null)
    const playerRef =
      (ref as React.RefObject<MuxPlayerRefAttributes>) || internalRef

    useEffect(() => {
      // Ensure autoplay starts when component mounts
      const player = playerRef.current
      if (player) {
        // Try to play the video
        player.play().catch(error => {
          console.warn('Autoplay was prevented:', error)
        })
      }
    }, [playbackId, playerRef])

    return (
      <MuxPlayer
        ref={playerRef}
        playbackId={playbackId}
        metadata={metadata}
        poster={poster}
        placeholder={placeholder}
        className={className}
        style={
          {
            width: '100%',
            height: '100%',
            '--media-object-fit': objectFit,
            '--media-object-position': objectPosition,
            '--controls': 'none', // Hide all controls for background video
            ...style,
          } as React.CSSProperties
        }
        // Autoplay settings optimized for background videos
        autoPlay='muted' // Use "muted" to ensure autoplay works across browsers
        muted
        loop
        playsInline // Required for iOS autoplay
        // Performance and loading settings
        {...(loading && { loading })}
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
      />
    )
  }
)

MuxPlayerWrapper.displayName = 'MuxPlayerWrapper'

// Export types
export type {
  MuxPlayerWrapperProps,
  MuxPlayerMetadata,
  MuxResolution,
  MuxMaxResolution,
  MuxObjectFit,
  MuxPreload,
  MuxStreamType,
  MuxLoading,
} from './types'

export default MuxPlayerWrapper
