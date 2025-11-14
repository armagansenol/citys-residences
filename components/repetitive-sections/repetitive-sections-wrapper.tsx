'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

import { breakpoints } from '@/styles/config.mjs'
import { useWindowSize } from 'hamo'

import { BackgroundVideoText } from './background-video-text'
import { CenterVideoText } from './center-video-text'
import { FullWidthSingleVideo } from './full-width-single-video'
import { FullWidthVideoText } from './full-width-video-text'

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

// FullWidthSingleVideo uses these aspect ratios:
// Mobile: aspect-[16/14] = 1.142857...
// Desktop (lg): aspect-[16/7] = 2.285714...
const FULL_WIDTH_SINGLE_VIDEO_MOBILE_ASPECT = 16 / 14
const FULL_WIDTH_SINGLE_VIDEO_DESKTOP_ASPECT = 16 / 7

const getNormalizedAspectRatio = (ratio?: number) => {
  const parsed = Number(ratio)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return FALLBACK_ASPECT_RATIO
  }

  return parsed
}

const getFallbackMinHeight = (componentType?: ComponentType) => {
  switch (componentType) {
    case ComponentType.BackgroundVideoText:
      return BACKGROUND_SECTION_MIN_HEIGHT
    case ComponentType.FullWidthVideoText:
      return FULL_WIDTH_SECTION_MIN_HEIGHT
    case ComponentType.CenterVideoText:
      return DEFAULT_MIN_HEIGHT
    case ComponentType.FullWidthSingleVideo:
      // Use CSS aspect-ratio for better browser optimization
      // The aspect ratio calculation is handled in the component logic
      // to account for responsive breakpoints and window width
      return undefined
    default:
      return DEFAULT_MIN_HEIGHT
  }
}

const getThumbnailUrl = (mediaId: string, isMobile: boolean): string => {
  const width = isMobile ? 768 : 1920
  return `https://image.mux.com/${mediaId}/thumbnail.webp?width=${width}&time=0`
}

export function RepetitiveSectionsWrapper({
  componentType,
  title,
  subtitle,
  description,
  mediaId,
  videoAspectRatio,
}: RepetitiveSectionsWrapperProps) {
  const [placeholderHeight, setPlaceholderHeight] = useState<number | null>(
    null
  )
  const contentRef = useRef<HTMLDivElement | null>(null)

  const { width: windowWidth } = useWindowSize(100)
  const isMobile =
    typeof windowWidth === 'number' &&
    windowWidth < breakpoints.breakpointMobile

  useEffect(() => {
    if (!contentRef.current) {
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
    })

    observer.observe(contentRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  const fallbackMinHeight = useMemo(
    () => getFallbackMinHeight(componentType),
    [componentType]
  )

  // For FullWidthSingleVideo, calculate responsive aspect ratio
  const placeholderAspectRatio = useMemo(() => {
    if (componentType !== ComponentType.FullWidthSingleVideo) {
      return undefined
    }

    // If we have a measured height, don't use aspect ratio
    if (placeholderHeight) {
      return undefined
    }

    const normalizedRatio = getNormalizedAspectRatio(videoAspectRatio)
    const componentAspectRatio = isMobile
      ? FULL_WIDTH_SINGLE_VIDEO_MOBILE_ASPECT
      : FULL_WIDTH_SINGLE_VIDEO_DESKTOP_ASPECT

    // Use the provided ratio if it's close to the component's default,
    // otherwise fall back to component's aspect ratio
    const ratioDifference = Math.abs(normalizedRatio - componentAspectRatio)
    return ratioDifference < 0.1 ? normalizedRatio : componentAspectRatio
  }, [componentType, videoAspectRatio, placeholderHeight, isMobile])

  const resolvedPlaceholderMinHeight = placeholderHeight
    ? `${Math.max(1, placeholderHeight)}px`
    : (fallbackMinHeight ?? DEFAULT_MIN_HEIGHT)

  const containerStyle = useMemo<CSSProperties>(() => {
    const style: CSSProperties = {
      width: '100%',
    }

    // For FullWidthSingleVideo, prefer aspect-ratio over minHeight for better accuracy
    if (
      componentType === ComponentType.FullWidthSingleVideo &&
      placeholderAspectRatio
    ) {
      style.aspectRatio = String(placeholderAspectRatio)
      // Still set minHeight as fallback for older browsers
      style.minHeight = resolvedPlaceholderMinHeight
    } else {
      style.minHeight = resolvedPlaceholderMinHeight
    }

    return style
  }, [resolvedPlaceholderMinHeight, placeholderAspectRatio, componentType])

  if (!componentType || !mediaId) {
    return null
  }

  const thumbnail = getThumbnailUrl(mediaId, isMobile)
  const commonProps = {
    mediaId,
    thumbnail,
    videoAspectRatio,
  }

  // Components that require title, subtitle, and description
  const requiresTextContent =
    componentType === ComponentType.BackgroundVideoText ||
    componentType === ComponentType.CenterVideoText ||
    componentType === ComponentType.FullWidthVideoText

  if (requiresTextContent && (!title || !subtitle || !description)) {
    return null
  }

  let renderedSection: JSX.Element | null = null

  switch (componentType) {
    case ComponentType.BackgroundVideoText:
      renderedSection = (
        <BackgroundVideoText
          {...commonProps}
          title={title!}
          subtitle={subtitle!}
          description={description!}
        />
      )
      break

    case ComponentType.CenterVideoText:
      renderedSection = (
        <CenterVideoText
          {...commonProps}
          title={title!}
          subtitle={subtitle!}
          description={description!}
        />
      )
      break

    case ComponentType.FullWidthVideoText:
      renderedSection = (
        <FullWidthVideoText
          {...commonProps}
          title={title!}
          subtitle={subtitle!}
          description={description!}
        />
      )
      break

    case ComponentType.FullWidthSingleVideo:
      renderedSection = <FullWidthSingleVideo {...commonProps} />
      break
  }

  if (!renderedSection) {
    return null
  }

  return (
    <div style={containerStyle}>
      <div ref={contentRef}>{renderedSection}</div>
    </div>
  )
}
