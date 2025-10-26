import { cn } from '@/lib/utils'
import { LazyWistiaPlayer } from '../lazy-wistia-player'

export interface FullWidthSingleVideoProps {
  mediaId: string
  thumbnail?: string
}

export function FullWidthSingleVideo(props: FullWidthSingleVideoProps) {
  const { mediaId, thumbnail } = props

  return (
    <section className={cn('relative aspect-[16/14] lg:aspect-[16/9]')}>
      <div className='absolute inset-0'>
        <LazyWistiaPlayer
          muted
          autoplay
          preload='none'
          swatch={false}
          bigPlayButton={false}
          silentAutoplay='allow'
          endVideoBehavior='loop'
          controlsVisibleOnLoad={false}
          playBarControl={false}
          volumeControl={false}
          settingsControl={false}
          transparentLetterbox={true}
          mediaId={mediaId}
          customPoster={thumbnail}
        />
      </div>
    </section>
  )
}
