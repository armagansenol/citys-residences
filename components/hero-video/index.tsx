import MuxPlayer from '@mux/mux-player-react'
import React from 'react'

type HeroVideoProps = {
  desktopVideoId: string
  mobileVideoId: string
  desktopPoster: string
  mobilePoster: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  preloadDistance?: number
}

const HeroVideo: React.FC<HeroVideoProps> = ({
  desktopVideoId,
  mobileVideoId,
  desktopPoster,
  mobilePoster,
}) => {
  console.log('hero-video', desktopPoster, mobilePoster)

  const minResolution = '720p'

  return (
    <>
      {/* <video
        ref={videoRef}
        className={cn(className, 'z-10 h-full w-full object-cover')}
        poster={poster}
        playsInline
        muted={muted}
        loop={loop}
        preload={shouldLoad ? 'auto' : 'none'}
        controls={false}
        onPlay={() => setIsPlaying(true)}
      >
        {shouldLoad &&
          sources.map((s, i) => <source key={i} src={s.src} type={s.type} />)}
      </video> */}
      <MuxPlayer
        className='relative hidden h-screen w-full lg:block'
        playbackId={desktopVideoId}
        preload='auto'
        autoPlay
        playsInline
        loop
        muted
        streamType='on-demand'
        thumbnailTime={0}
        minResolution={minResolution}
        style={
          {
            aspectRatio: 16 / 9,
            '--media-object-fit': 'cover',
            '--media-object-position': 'center bottom',
            '--controls': 'none',
          } as React.CSSProperties
        }
      />
      <MuxPlayer
        className='relative block h-screen w-full lg:hidden'
        playbackId={mobileVideoId}
        autoPlay
        playsInline
        loop
        muted
        streamType='on-demand'
        thumbnailTime={0}
        minResolution={minResolution}
        style={
          {
            aspectRatio: 9 / 16,
            '--media-object-fit': 'cover',
            '--media-object-position': 'center bottom',
            '--controls': 'none',
          } as React.CSSProperties
        }
      />
      {/* <Image
        src={desktopPoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        className={cn(
          'hidden lg:block',
          'absolute inset-0 z-20 h-full w-full object-cover',
          'transition-opacity duration-300 ease-in-out',
          {
            'pointer-events-none opacity-100': !isPlaying,
            'pointer-events-auto opacity-0': isPlaying,
          }
        )}
        priority
      />
      <Image
        src={mobilePoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        className={cn(
          'block lg:hidden',
          'absolute inset-0 z-20 h-full w-full object-cover',
          'transition-opacity duration-300 ease-in-out',
          {
            'pointer-events-none opacity-100': !isPlaying,
            'pointer-events-auto opacity-0': isPlaying,
          }
        )}
        priority
      /> */}
    </>
  )
}

export { HeroVideo }
