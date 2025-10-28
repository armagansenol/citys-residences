'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { WistiaPlayerProps } from '@wistia/wistia-player-react'
import { Image } from '@/components/image'

// Lazy load the WistiaPlayerWrapper component
const WistiaPlayerWrapper = lazy(() =>
  import('@/components/wistia-player/index').then(module => ({
    default: module.WistiaPlayerWrapper,
  }))
)

interface LazyWistiaPlayerProps extends WistiaPlayerProps {
  className?: string
  customPoster?: string
  posterPriority?: boolean
  loadingFallback?: React.ReactNode
  intersectionThreshold?: number
  intersectionRootMargin?: string
}

// Loading fallback component
function DefaultLoadingFallback({
  className,
  customPoster,
}: {
  className?: string
  customPoster?: string
}) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-black',
        className
      )}
      aria-label='Loading video player'
    >
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent'></div>
      </div>
      {customPoster && (
        <Image
          src={customPoster}
          alt='Video poster'
          fill
          className='absolute inset-0 h-full w-full overflow-hidden object-cover object-center'
          sizes='90vw'
          mobileSize='90vw'
          quality={75}
          priority={false}
        />
      )}
    </div>
  )
}

export function LazyWistiaPlayer(props: LazyWistiaPlayerProps) {
  const {
    className,
    customPoster,
    posterPriority = false,
    loadingFallback,
    intersectionThreshold = 0,
    intersectionRootMargin = '800px',
    ...wistiaProps
  } = props

  const [isClient, setIsClient] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Set up IntersectionObserver
  useEffect(() => {
    if (!isClient || !containerRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        const isIntersecting = entry.isIntersecting

        setIsInViewport(isIntersecting)

        // Load the player when it enters the viewport
        if (isIntersecting && !shouldLoadPlayer) {
          setShouldLoadPlayer(true)
          // Disconnect after loading to save resources
          observer.disconnect()
        }
      },
      {
        threshold: intersectionThreshold,
        rootMargin: intersectionRootMargin,
      }
    )

    const element = containerRef.current
    observer.observe(element)

    return () => observer.disconnect()
  }, [
    isClient,
    intersectionThreshold,
    intersectionRootMargin,
    shouldLoadPlayer,
  ])

  const fallback = loadingFallback || (
    <DefaultLoadingFallback className={className} customPoster={customPoster} />
  )

  if (!isClient) {
    return (
      <div
        ref={containerRef}
        className={cn('relative h-full w-full', className)}
      >
        {fallback}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none relative h-full w-full', className)}
    >
      {shouldLoadPlayer ? (
        <Suspense fallback={fallback}>
          <WistiaPlayerWrapper
            className='h-full w-full'
            customPoster={customPoster}
            posterPriority={posterPriority}
            autoplay={isInViewport && wistiaProps.autoplay}
            {...wistiaProps}
          />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}
