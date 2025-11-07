/**
 * Type definitions for MuxPlayerWrapper component
 */

export interface MuxPlayerMetadata {
  video_id?: string
  video_title?: string
  viewer_user_id?: string
  [key: string]: string | undefined
}

export type MuxResolution =
  | '480p'
  | '540p'
  | '720p'
  | '1080p'
  | '1440p'
  | '2160p'
export type MuxMaxResolution = '720p' | '1080p' | '1440p' | '2160p'
export type MuxObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type MuxPreload = 'none' | 'metadata' | 'auto'
export type MuxStreamType =
  | 'on-demand'
  | 'live'
  | 'll-live'
  | 'live:dvr'
  | 'll-live:dvr'

export type MuxLoading = 'page' | 'viewport'

export interface MuxPlayerWrapperProps {
  playbackId: string
  metadata?: MuxPlayerMetadata
  poster?: string
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  maxResolution?: MuxMaxResolution
  minResolution?: MuxResolution
  onCanPlay?: () => void
  onPlay?: () => void
  onEnded?: () => void
  onError?: (error: Error | Event) => void
  objectFit?: MuxObjectFit
  objectPosition?: string
  preload?: MuxPreload
  startTime?: number
  streamType?: MuxStreamType
  loading?: MuxLoading
}
