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
      placeholder:
        'https://citys-residences.vercel.app/_next/image?url=%2Fimg%2Fdesktop-hero-poster.jpg&w=1920&q=90',
    },
    {
      playbackId: livePeacefully.muxSrc,
      aspect: livePeacefully.aspect,
      placeholder:
        'https://citys-residences.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthumbnail-live-peacefully.f167ac8d.jpg&w=1920&q=75',
    },
    {
      playbackId: liveMore.muxSrc,
      aspect: liveMore.aspect,
      placeholder:
        'https://citys-residences.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthumbnail-live-more.5b55945c.jpg&w=1920&q=75',
    },
    {
      playbackId: projectBanner.muxSrc,
      aspect: projectBanner.aspect,
      placeholder:
        'https://citys-residences.vercel.app/_next/image?url=%2Fimg%2Fthumbnail-murat-kader.jpg&w=1920&q=90',
    },
    {
      playbackId: residencesBanner.muxSrc,
      aspect: residencesBanner.aspect,
      placeholder:
        'https://citys-residences.vercel.app/_next/image?url=https%3A%2F%2Fpanel.citysresidences.com%2Fassets%2Fimages%2Fresidences%2F03112025102126.jpg&w=1920&q=90',
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
    <Wrapper>
      <div className='flex min-h-screen flex-col gap-96 bg-green-400'>
        {/* 84 videos */}
        {[
          ...videos,
          ...videos,
          ...videos,
          ...videos,
          ...videos,
          ...videos,
          ...videos,
          ...videos,
          ...videos,
          ...videos,
          ...videos,
          ...videos,
        ].map((video, index) => (
          <div
            key={index}
            className='relative h-screen w-full flex-shrink-0 overflow-hidden bg-blue-600'
          >
            <MuxPlayerWrapper
              playbackId={video.playbackId as string}
              style={{ aspectRatio: video.aspect() as number }}
              placeholder={video.placeholder}
              poster={video.placeholder}
              loading='viewport'
              enableScrollOptimization={true}
              scrollDelay={300} // 0.5 seconds
              playOnViewport={true}
              viewportThreshold={0.75} // 75% visible
            />
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
