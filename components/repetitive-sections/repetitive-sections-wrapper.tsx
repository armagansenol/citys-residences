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

export function RepetitiveSectionsWrapper({
  componentType,
  title,
  subtitle,
  description,
  mediaId,
  thumbnail,
  videoAspectRatio,
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
          thumbnail={thumbnail}
          videoAspectRatio={videoAspectRatio}
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
          thumbnail={thumbnail}
          videoAspectRatio={videoAspectRatio}
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
          thumbnail={thumbnail}
          videoAspectRatio={videoAspectRatio}
        />
      )

    case 'FullWidthSingleVideo':
      return (
        <FullWidthSingleVideo
          mediaId={mediaId}
          thumbnail={thumbnail}
          videoAspectRatio={videoAspectRatio}
        />
      )

    default:
      return null
  }
}
