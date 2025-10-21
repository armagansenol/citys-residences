'use client'

import { BackgroundVideoText } from './background-video-text'
import { CenterVideoText } from './center-video-text'
import { FullWidthSingleVideo } from './full-width-single-video'
import { FullWidthVideoText } from './full-width-video-text'

enum ComponentType {
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
}

export function RepetitiveSectionsWrapper({
  componentType,
  title,
  subtitle,
  description,
  mediaId,
}: RepetitiveSectionsWrapperProps) {
  if (!componentType || !mediaId) {
    return null
  }

  switch (componentType) {
    case 'BackgroundVideoText':
      if (!title || !subtitle || !description) return null
      return (
        <BackgroundVideoText
          title={title}
          subtitle={subtitle}
          description={description}
          mediaId={mediaId}
        />
      )

    case 'CenterVideoText':
      if (!title || !subtitle || !description) return null
      return (
        <CenterVideoText
          title={title}
          subtitle={subtitle}
          description={description}
          mediaId={mediaId}
        />
      )

    case 'FullWidthVideoText':
      if (!title || !subtitle || !description) return null
      return (
        <FullWidthVideoText
          title={title}
          subtitle={subtitle}
          description={description}
          mediaId={mediaId}
        />
      )

    case 'FullWidthSingleVideo':
      return <FullWidthSingleVideo mediaId={mediaId} />

    default:
      return null
  }
}
