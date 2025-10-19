"use client"

import { Suspense, lazy, ComponentType, ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SuspenseLazySectionProps<T = Record<string, unknown>> {
  /** The component to lazy load */
  component: () => Promise<{ default: ComponentType<T> }>
  /** Props to pass to the lazy-loaded component */
  componentProps?: T
  /** Root margin for intersection observer (default: "200px") */
  rootMargin?: string
  /** Threshold for intersection observer (default: 0.1) */
  threshold?: number
  /** Fallback component to show while loading */
  fallback?: ReactNode
  /** Container className */
  className?: string
  /** Whether to enable lazy loading (default: true) */
  lazy?: boolean
  /** Minimum height for the container while loading */
  minHeight?: string | number
}

export function SuspenseLazySection<T = Record<string, unknown>>({
  component,
  componentProps,
  rootMargin = "200px",
  threshold = 0.1,
  fallback,
  className,
  lazy: enableLazy = true,
  minHeight = "200px",
}: SuspenseLazySectionProps<T>) {
  const [shouldRender, setShouldRender] = useState(!enableLazy)
  const containerRef = useRef<HTMLDivElement>(null)

  // Create the lazy component
  const LazyComponent = lazy(component)

  useEffect(() => {
    if (!enableLazy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldRender) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold, enableLazy, shouldRender])

  const containerStyle: React.CSSProperties = {
    minHeight: shouldRender ? undefined : typeof minHeight === "number" ? `${minHeight}px` : minHeight,
  }

  const defaultFallback = (
    <div className='flex items-center justify-center w-full h-full min-h-[200px] bg-gray-100 animate-pulse rounded'>
      <div className='flex flex-col items-center gap-2'>
        <div className='w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin' />
        <span className='text-sm text-gray-500'>Loading...</span>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className={cn("w-full", className)} style={containerStyle}>
      {shouldRender ? (
        <Suspense fallback={fallback ?? defaultFallback}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <LazyComponent {...(componentProps as any)} />
        </Suspense>
      ) : (
        fallback ?? defaultFallback
      )}
    </div>
  )
}
