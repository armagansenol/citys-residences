'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'

import { breakpoints } from '@/styles/config.mjs'
import { useIntersectionObserver, useWindowSize } from 'hamo'
import dynamic from 'next/dynamic'

const BackgroundVideoText = dynamic(
  () =>
    import('./background-video-text').then(mod => ({
      default: mod.BackgroundVideoText,
    })),
  { ssr: false }
)
const CenterVideoText = dynamic(
  () =>
    import('./center-video-text').then(mod => ({
      default: mod.CenterVideoText,
    })),
  { ssr: false }
)
const FullWidthSingleVideo = dynamic(
  () =>
    import('./full-width-single-video').then(mod => ({
      default: mod.FullWidthSingleVideo,
    })),
  { ssr: false }
)
const FullWidthVideoText = dynamic(
  () =>
    import('./full-width-video-text').then(mod => ({
      default: mod.FullWidthVideoText,
    })),
  { ssr: false }
)

export enum ComponentType {
  BackgroundVideoText = 'BackgroundVideoText',
  CenterVideoText = 'CenterVideoText',
  FullWidthVideoText = 'FullWidthVideoText',
  FullWidthSingleVideo = 'FullWidthSingleVideo',
}

export interface RepetitiveSectionsWrapperProps {
  componentType?: ComponentType
  title?: string
  subtitle?: string
  description?: string
  mediaId?: string
  thumbnail?: string
  videoAspectRatio?: number
}

const DEFAULT_MIN_HEIGHT = '100vh'
const BACKGROUND_SECTION_MIN_HEIGHT = '110vh'
const FULL_WIDTH_SECTION_MIN_HEIGHT = '110vh'
const FALLBACK_ASPECT_RATIO = 16 / 9

const getNormalizedAspectRatio = (ratio?: number) => {
  const parsed = Number(ratio)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return FALLBACK_ASPECT_RATIO
  }

  return parsed
}

const getFallbackMinHeight = (
  componentType?: ComponentType,
  aspectRatio?: number
) => {
  switch (componentType) {
    case ComponentType.BackgroundVideoText:
      return BACKGROUND_SECTION_MIN_HEIGHT
    case ComponentType.FullWidthVideoText:
      return FULL_WIDTH_SECTION_MIN_HEIGHT
    case ComponentType.CenterVideoText:
      return DEFAULT_MIN_HEIGHT
    case ComponentType.FullWidthSingleVideo: {
      const normalizedRatio = getNormalizedAspectRatio(aspectRatio)
      return `calc(100vw / ${normalizedRatio})`
    }
    default:
      return DEFAULT_MIN_HEIGHT
  }
}

const getStorageKey = (
  componentType?: ComponentType,
  mediaId?: string,
  viewport?: 'mobile' | 'desktop'
) => {
  if (!componentType || !mediaId) {
    return null
  }

  return [
    'repetitive-section-height',
    componentType,
    mediaId,
    viewport ?? 'desktop',
  ].join(':')
}

export function RepetitiveSectionsWrapper({
  componentType,
  title,
  subtitle,
  description,
  mediaId,
  videoAspectRatio,
}: RepetitiveSectionsWrapperProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [placeholderHeight, setPlaceholderHeight] = useState<number | null>(
    null
  )
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [setIntersectionRef, entry] = useIntersectionObserver({
    rootMargin: '500px 0px',
    threshold: 0,
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      setShouldRender(true)
    }
  }, [entry])

  const { width: windowWidth } = useWindowSize(100)
  const isMobile =
    typeof windowWidth === 'number' &&
    windowWidth < breakpoints.breakpointMobile
  const viewportKey = isMobile ? 'mobile' : 'desktop'

  const storageKey = useMemo(
    () => getStorageKey(componentType, mediaId, viewportKey),
    [componentType, mediaId, viewportKey]
  )

  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') {
      return
    }

    const storedHeight = window.sessionStorage.getItem(storageKey)

    if (storedHeight) {
      const parsed = Number(storedHeight)

      if (!Number.isNaN(parsed) && parsed > 0) {
        setPlaceholderHeight(parsed)
      }
    }
  }, [storageKey])

  useEffect(() => {
    if (!shouldRender || !contentRef.current) {
      return
    }

    if (typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver(entries => {
      const entry = entries[0]

      if (!entry) {
        return
      }

      const nextHeight = Math.ceil(entry.contentRect.height)

      if (!nextHeight) {
        return
      }

      setPlaceholderHeight(prev => (prev === nextHeight ? prev : nextHeight))

      if (storageKey && typeof window !== 'undefined') {
        window.sessionStorage.setItem(storageKey, String(nextHeight))
      }
    })

    observer.observe(contentRef.current)

    return () => {
      observer.disconnect()
    }
  }, [shouldRender, storageKey])

  const fallbackMinHeight = useMemo(
    () => getFallbackMinHeight(componentType, videoAspectRatio),
    [componentType, videoAspectRatio]
  )

  const resolvedPlaceholderMinHeight = placeholderHeight
    ? `${Math.max(1, placeholderHeight)}px`
    : fallbackMinHeight

  const placeholderAspectRatio =
    componentType === ComponentType.FullWidthSingleVideo && !placeholderHeight
      ? getNormalizedAspectRatio(videoAspectRatio)
      : undefined

  const mergedContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      setIntersectionRef(node)
    },
    [setIntersectionRef]
  )

  const containerStyle = useMemo<CSSProperties>(() => {
    const style: CSSProperties = {
      width: '100%',
      minHeight: resolvedPlaceholderMinHeight,
    }

    if (!shouldRender) {
      style.pointerEvents = 'none'
    }

    if (placeholderAspectRatio) {
      style.aspectRatio = placeholderAspectRatio
    }

    return style
  }, [resolvedPlaceholderMinHeight, placeholderAspectRatio, shouldRender])

  if (!componentType || !mediaId) {
    return null
  }

  const thumbnail = isMobile
    ? `https://image.mux.com/${mediaId}/thumbnail.webp?width=768&time=0`
    : `https://image.mux.com/${mediaId}/thumbnail.webp?width=1920&time=0`

  let renderedSection: JSX.Element | null = null

  switch (componentType) {
    case ComponentType.BackgroundVideoText:
      if (!title || !subtitle || !description) return null
      renderedSection = (
        <BackgroundVideoText
          title={title}
          subtitle={subtitle}
          description={description}
          mediaId={mediaId}
          thumbnail={thumbnail}
          videoAspectRatio={videoAspectRatio}
        />
      )
      break

    case ComponentType.CenterVideoText:
      if (!title || !subtitle || !description) return null
      renderedSection = (
        <CenterVideoText
          title={title}
          subtitle={subtitle}
          description={description}
          mediaId={mediaId}
          thumbnail={thumbnail}
          videoAspectRatio={videoAspectRatio}
        />
      )
      break

    case ComponentType.FullWidthVideoText:
      if (!title || !subtitle || !description) return null
      renderedSection = (
        <FullWidthVideoText
          title={title}
          subtitle={subtitle}
          description={description}
          mediaId={mediaId}
          thumbnail={thumbnail}
          videoAspectRatio={videoAspectRatio}
        />
      )
      break

    case ComponentType.FullWidthSingleVideo:
      renderedSection = (
        <FullWidthSingleVideo
          mediaId={mediaId}
          thumbnail={thumbnail}
          videoAspectRatio={videoAspectRatio}
        />
      )
      break

    default:
      renderedSection = null
  }

  if (!renderedSection) {
    return null
  }

  return (
    <div
      ref={mergedContainerRef}
      style={containerStyle}
      aria-hidden={!shouldRender}
      data-lazy-placeholder={!shouldRender ? 'repetitive-sections' : undefined}
    >
      {shouldRender ? <div ref={contentRef}>{renderedSection}</div> : null}
    </div>
  )
}
