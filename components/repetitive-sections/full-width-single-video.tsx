import { LazyWistiaPlayer } from '../lazy-wistia-player'

export interface FullWidthSingleVideoProps {
  mediaId: string
  thumbnail?: string
}

export function FullWidthSingleVideo(props: FullWidthSingleVideoProps) {
  const { mediaId, thumbnail } = props

  return (
    <section className='relative aspect-[16/14] overflow-hidden lg:aspect-[16/7]'>
      <div className='absolute left-0 top-0'>FullWidthSingleVideo</div>
      <div className='!pointer-events-none absolute inset-0'>
        <LazyWistiaPlayer
          muted
          autoplay
          preload='metadata'
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
          roundedPlayer={0}
          fullscreenControl={false}
          playbackRateControl={false}
          playPauseControl={false}
        />
      </div>
    </section>
  )
}
