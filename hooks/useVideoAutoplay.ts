import { useCallback, useEffect, useRef, useState } from 'react'

type UseVideoAutoplayProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  dependencies?: unknown[]
}

export const useVideoAutoplay = ({
  videoRef,
  dependencies = [],
}: UseVideoAutoplayProps) => {
  const [hasPlayed, setHasPlayed] = useState(false)
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearFallback = useCallback(() => {
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current)
      fallbackTimeoutRef.current = null
    }
  }, [])

  const attemptPlay = useCallback(
    (reason: string = 'manual') => {
      const video = videoRef.current
      if (!video) return

      if (!video.muted) {
        video.muted = true
      }

      const playPromise = video.play()

      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            setHasPlayed(true)
            clearFallback()
          })
          .catch(error => {
            // Only log if it's not an AbortError (common when loading)
            if (error.name !== 'AbortError') {
              console.debug(
                `[video-autoplay] autoplay blocked (${reason})`,
                error
              )
            }
          })
      } else {
        setHasPlayed(true)
        clearFallback()
      }
    },
    [videoRef, clearFallback]
  )

  const scheduleAttempt = useCallback(
    (delay = 250, reason: string = 'retry') => {
      clearFallback()
      fallbackTimeoutRef.current = setTimeout(() => {
        attemptPlay(reason)
      }, delay)
    },
    [attemptPlay, clearFallback]
  )

  // Reset whenever dependencies (sources) change
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setHasPlayed(false)
    video.currentTime = 0
    video.load()

    if (video.readyState >= 2) {
      scheduleAttempt(0, 'ready-state')
    } else {
      scheduleAttempt(150, 'source-change')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, scheduleAttempt, ...dependencies])

  // Core video event handling
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      setHasPlayed(true)
      clearFallback()
    }
    const handleLoadedData = () => attemptPlay('loadeddata')
    const handleCanPlay = () => attemptPlay('canplay')
    const handleCanPlayThrough = () => attemptPlay('canplaythrough')
    const handleLoadedMetadata = () => attemptPlay('loadedmetadata')
    const handleWaiting = () => scheduleAttempt(200, 'waiting')
    const handleStalled = () => scheduleAttempt(200, 'stalled')
    const handleSuspend = () => scheduleAttempt(200, 'suspend')

    video.addEventListener('play', handlePlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('canplaythrough', handleCanPlayThrough)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('stalled', handleStalled)
    video.addEventListener('suspend', handleSuspend)

    if (video.readyState >= 2) {
      scheduleAttempt(0, 'initial-readyState')
    }

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('stalled', handleStalled)
      video.removeEventListener('suspend', handleSuspend)
    }
  }, [videoRef, attemptPlay, scheduleAttempt, clearFallback])

  // Retry on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        scheduleAttempt(0, 'visibilitychange')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [scheduleAttempt])

  // User interaction fallback
  useEffect(() => {
    const events: Array<keyof DocumentEventMap> = [
      'pointerdown',
      'touchstart',
      'keydown',
    ]
    const handleUserInteraction = () => {
      attemptPlay('user-interaction')
    }

    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, {
        once: true,
        passive: true,
      })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [attemptPlay])

  // Cleanup fallback on unmount
  useEffect(() => clearFallback, [clearFallback])

  return { hasPlayed, attemptPlay }
}
