'use client'

import {
  BackgroundVideoText,
  BackgroundVideoTextProps,
} from './background-video-text'
import { CenterVideoText, CenterVideoTextProps } from './center-video-text'
import {
  FullWidthVideoText,
  FullWidthVideoTextProps,
} from './full-width-video-text'
import {
  FullWidthSingleVideo,
  FullWidthSingleVideoProps,
} from './full-width-single-video'

/* ---------------------------------------------
   Types & Enums kept inside this component file
--------------------------------------------- */

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
  videoAspectRatio?: number
}

/* ---------------------------------------------
   Internal helpers
--------------------------------------------- */

const COMPONENT_MAP = {
  [ComponentType.BackgroundVideoText]: BackgroundVideoText,
  [ComponentType.CenterVideoText]: CenterVideoText,
  [ComponentType.FullWidthVideoText]: FullWidthVideoText,
  [ComponentType.FullWidthSingleVideo]: FullWidthSingleVideo,
}

const TEXT_COMPONENTS = new Set<ComponentType>([
  ComponentType.BackgroundVideoText,
  ComponentType.CenterVideoText,
  ComponentType.FullWidthVideoText,
])

function getThumbnailUrl(mediaId: string) {
  return `https://image.mux.com/${mediaId}/thumbnail.webp?width=1920&time=0`
}

type AllComponentProps =
  | BackgroundVideoTextProps
  | CenterVideoTextProps
  | FullWidthVideoTextProps
  | FullWidthSingleVideoProps

/* ---------------------------------------------
   Component
--------------------------------------------- */

export function RepetitiveSectionsWrapper({
  componentType,
  title,
  subtitle,
  description,
  mediaId,
  videoAspectRatio,
}: RepetitiveSectionsWrapperProps) {
  if (!componentType || !mediaId) return null

  const Selected = COMPONENT_MAP[componentType]
  if (!Selected) return null

  const requiresText = TEXT_COMPONENTS.has(componentType)

  // Guard missing text content
  if (requiresText && (!title || !subtitle || !description)) {
    return null
  }

  const baseProps = {
    mediaId,
    thumbnail: getThumbnailUrl(mediaId),
    videoAspectRatio,
  }

  if (requiresText) {
    const TextComponent = Selected as React.ComponentType<AllComponentProps>
    return (
      <TextComponent
        {...baseProps}
        title={title as string}
        subtitle={subtitle as string}
        description={description as string}
      />
    )
  }

  const VideoComponent = Selected as React.ComponentType<AllComponentProps>
  return <VideoComponent {...baseProps} />
}
