import { MuxPlayerWrapper } from '@/components/mux-player-wrapper'
import { Wrapper } from '@/components/wrapper'
import {
  heroVideo,
  liveMore,
  livePeacefully,
  projectBanner,
  residencesBanner,
} from '@/lib/constants'

export default function MuxPlayerTestPage() {
  const videos = [
    {
      playbackId: heroVideo.muxSrc,
      aspect: heroVideo.aspect,
      placeholder: '/img/desktop-hero-poster.jpg',
    },
    {
      playbackId: livePeacefully.muxSrc,
      aspect: livePeacefully.aspect,
      placeholder: '/img/thumbnail-live-peacefully.jpg',
    },
    {
      playbackId: liveMore.muxSrc,
      aspect: liveMore.aspect,
      placeholder: '/img/thumbnail-live-more.jpg',
    },
    {
      playbackId: projectBanner.muxSrc,
      aspect: projectBanner.aspect,
      placeholder: '/img/thumbnail-murat-kader.jpg',
    },
    {
      playbackId: residencesBanner.muxSrc,
      aspect: residencesBanner.aspect,
      placeholder:
        'https://panel.citysresidences.com/assets/images/residences/03112025102126.jpg',
    },
    // {
    //   playbackId: citysIstanbulAvmBanner.muxSrc,
    //   aspect: citysIstanbulAvmBanner.aspect,
    // },
    // {
    //   playbackId: citysTimesBanner.muxSrc,
    //   aspect: citysTimesBanner.aspect,
    // },
  ]
  return (
    <Wrapper stickySidebar={false}>
      <div className='flex h-[120vh] w-full items-center justify-center bg-blue-800'>
        <h1 className='text-4xl font-bold text-white'>HERO</h1>
      </div>
      <div className='flex min-h-[100vh] flex-col gap-96 bg-green-400'>
        {/* 84 videos */}
        {[
          ...videos,
          ...videos,
          ...videos,
          // ...videos,
          // ...videos,
          // ...videos,
          // ...videos,
          // ...videos,
          // ...videos,
          // ...videos,
          // ...videos,
          // ...videos,
        ].map((video, index) => (
          <div
            key={index}
            className='relative h-[120vh] w-full flex-shrink-0 overflow-hidden bg-blue-600'
          >
            <MuxPlayerWrapper
              playbackId={video.playbackId as string}
              style={{ aspectRatio: video.aspect() as number }}
              placeholder={video.placeholder}
              poster={video.placeholder}
              loading='viewport'
              scrollDelay={200}
              viewportThreshold={0}
            />
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
