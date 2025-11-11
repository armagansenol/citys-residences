import { MuxPlayerWrapper } from '@/components/mux-player-wrapper'
import { Wrapper } from '@/components/wrapper'
import {
  heroVideo,
  liveMore,
  livePeacefully,
  projectBanner,
  residencesBanner,
} from '@/lib/constants'

// Server-Side
import { createBlurUp } from '@mux/blurup'

const getPlaceholder = async (
  muxPlaybackId: string,
  options?: Parameters<typeof createBlurUp>[1]
) => {
  const { blurDataURL, aspectRatio } = await createBlurUp(
    muxPlaybackId,
    options
  )

  return { blurDataURL, aspectRatio }
}

export default async function MuxPlayerTestPage() {
  const [
    heroPlaceholder,
    livePeacefullyPlaceholder,
    liveMorePlaceholder,
    projectBannerPlaceholder,
    residencesPlaceholder,
  ] = await Promise.all([
    getPlaceholder(heroVideo.muxSrc as string),
    getPlaceholder(livePeacefully.muxSrc as string),
    getPlaceholder(liveMore.muxSrc as string),
    getPlaceholder(projectBanner.muxSrc as string),
    getPlaceholder(residencesBanner.muxSrc as string),
  ])

  const videos = [
    {
      playbackId: heroVideo.muxSrc,
      aspect: heroVideo.aspect,
      placeholder: '/img/desktop-hero-poster.jpg',
      blurDataURL: heroPlaceholder.blurDataURL,
    },
    {
      playbackId: livePeacefully.muxSrc,
      aspect: livePeacefully.aspect,
      placeholder: '/img/thumbnail-live-peacefully.jpg',
      blurDataURL: livePeacefullyPlaceholder.blurDataURL,
    },
    {
      playbackId: liveMore.muxSrc,
      aspect: liveMore.aspect,
      placeholder: '/img/thumbnail-live-more.jpg',
      blurDataURL: liveMorePlaceholder.blurDataURL,
    },
    {
      playbackId: projectBanner.muxSrc,
      aspect: projectBanner.aspect,
      placeholder: '/img/thumbnail-murat-kader.jpg',
      blurDataURL: projectBannerPlaceholder.blurDataURL,
    },
    {
      playbackId: residencesBanner.muxSrc,
      aspect: residencesBanner.aspect,
      placeholder:
        'https://panel.citysresidences.com/assets/images/residences/03112025102126.jpg',
      blurDataURL: residencesPlaceholder.blurDataURL,
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
          // ...videos,
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
              placeholder={video.blurDataURL}
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
