import { MuxPlayerWrapper } from '@/components/mux-player-wrapper'

export interface FullWidthSingleVideoProps {
  mediaId: string
  thumbnail?: string
  videoAspectRatio?: number
}

export function FullWidthSingleVideo(props: FullWidthSingleVideoProps) {
  const { mediaId, thumbnail, videoAspectRatio } = props

  return (
    <section className='relative aspect-[16/14] overflow-hidden lg:aspect-[16/7]'>
      {/* <div className='absolute left-0 top-0'>FullWidthSingleVideo</div> */}
      <MuxPlayerWrapper
        playbackId={mediaId}
        style={
          {
            aspectRatio: videoAspectRatio as number,
            '--media-object-fit': 'cover',
            '--media-object-position': 'center',
            '--controls': 'none',
          } as React.CSSProperties
        }
        // placeholder={thumbnail}
        customPlaceholder={thumbnail}
      />
    </section>
  )
}
