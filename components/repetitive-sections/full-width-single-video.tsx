import { AspectCover } from '../aspect-cover'
import { LazyWistiaPlayer } from '../wistia-player-lazy'

export interface FullWidthSingleVideoProps {
  mediaId: string
  thumbnail?: string
  videoAspectRatio?: number
}

export function FullWidthSingleVideo(props: FullWidthSingleVideoProps) {
  const { mediaId, thumbnail, videoAspectRatio } = props

  console.log('videoAspectRatio', videoAspectRatio)

  return (
    <section className='relative aspect-[16/14] overflow-hidden lg:aspect-[16/7]'>
      {/* <div className='absolute left-0 top-0'>FullWidthSingleVideo</div> */}
      <AspectCover ratio={videoAspectRatio || 16 / 9}>
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
          aspect={videoAspectRatio || 16 / 9}
        />
      </AspectCover>
    </section>
  )
}
