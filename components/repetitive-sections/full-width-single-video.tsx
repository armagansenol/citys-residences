import { cn } from '@/lib/utils'
import { LazyWistiaPlayer } from '../lazy-wistia-player'

export interface FullWidthSingleVideoProps {
  mediaId: string
  thumbnail?: string
}

export function FullWidthSingleVideo(props: FullWidthSingleVideoProps) {
  const { mediaId, thumbnail } = props

  return (
    <section className={cn('relative h-[40vw]')}>
      <div className='absolute inset-0 bottom-0 left-0 right-0 top-0 z-10'>
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
