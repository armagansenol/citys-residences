import dynamic from 'next/dynamic'

const OptimizedVideo = dynamic(
  () => import('@/components/optimized-video').then(mod => mod.OptimizedVideo),
  { ssr: false }
)

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
      <OptimizedVideo
        playbackId={mediaId}
        scrollDelay={1500}
        placeholder={thumbnail}
        aspectRatio={videoAspectRatio}
      />
    </section>
  )
}
