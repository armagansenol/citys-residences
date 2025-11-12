import MuxPlayerWrapper from '../mux-player-wrapper'

export interface FullWidthSingleVideoProps {
  mediaId: string
  thumbnail?: string
  videoAspectRatio?: number
}

export function FullWidthSingleVideo(props: FullWidthSingleVideoProps) {
  const { mediaId, thumbnail, videoAspectRatio } = props

  console.log('FullWidthSingleVideo', videoAspectRatio, mediaId, thumbnail)

  return (
    <section className='relative aspect-[16/14] overflow-hidden lg:aspect-[16/7]'>
      {/* <div className='absolute left-0 top-0'>FullWidthSingleVideo</div> */}
      {/* <AspectCover ratio={videoAspectRatio || 16 / 9}>
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
      </AspectCover> */}
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
        // poster={thumbnail}
        scrollDelay={200}
        viewportThreshold={0}
      />
      {/* <MuxPlayer
        className='h-full w-full object-cover'
        playbackId={mediaId}
        preload='auto'
        autoPlay
        muted
        loop
        playsInline
        streamType='on-demand'
        thumbnailTime={0}
        style={
          {
            aspectRatio: videoAspectRatio as number,
            '--media-object-fit': 'cover',
            '--controls': 'none',
          } as React.CSSProperties
        }
      /> */}
    </section>
  )
}
