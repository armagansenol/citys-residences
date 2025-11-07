/**
 * Example usage of MuxPlayerWrapper component
 *
 * This file demonstrates various use cases for the MuxPlayerWrapper component.
 * Copy and adapt these examples to your needs.
 */

import { MuxPlayerWrapper } from './index'

// Example 1: Basic Background Video
export function BasicBackgroundVideo() {
  return (
    <section className='relative h-screen w-full'>
      <MuxPlayerWrapper
        playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
        className='absolute inset-0'
      />
      <div className='relative z-10 flex h-full items-center justify-center'>
        <h1 className='text-6xl font-bold text-white'>Hero Section</h1>
      </div>
    </section>
  )
}

// Example 2: Background Video with Analytics
export function BackgroundVideoWithAnalytics() {
  return (
    <section className='relative h-screen w-full'>
      <MuxPlayerWrapper
        playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
        metadata={{
          video_id: 'hero-background-1',
          video_title: 'Hero Background Video',
          viewer_user_id: 'anonymous',
        }}
        className='absolute inset-0'
      />
      <div className='relative z-10'>
        <h1>Content with Analytics</h1>
      </div>
    </section>
  )
}

// Example 3: Background Video with Custom Styling
export function BackgroundVideoWithStyling() {
  return (
    <section className='relative h-screen w-full overflow-hidden'>
      <MuxPlayerWrapper
        playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
        objectFit='cover'
        objectPosition='center'
        style={{
          filter: 'brightness(0.6) contrast(1.1)',
        }}
        className='absolute inset-0'
      />
      {/* Dark overlay */}
      <div className='absolute inset-0 z-10 bg-gradient-to-b from-black/50 to-black/80' />

      {/* Content */}
      <div className='relative z-20 flex h-full items-center justify-center'>
        <div className='text-center text-white'>
          <h1 className='mb-4 text-7xl font-bold'>Styled Background</h1>
          <p className='text-xl'>With custom filters and overlay</p>
        </div>
      </div>
    </section>
  )
}

// Example 4: Background Video with Event Handlers
export function BackgroundVideoWithEvents() {
  const handleCanPlay = () => {
    console.log('Video is ready to play')
  }

  const handlePlay = () => {
    console.log('Video started playing')
  }

  const handleError = (error: Error | Event) => {
    console.error('Video error:', error)
  }

  return (
    <section className='relative h-screen w-full'>
      <MuxPlayerWrapper
        playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
        onCanPlay={handleCanPlay}
        onPlay={handlePlay}
        onError={handleError}
        className='absolute inset-0'
      />
      <div className='relative z-10'>
        <h1>Video with Event Handlers</h1>
      </div>
    </section>
  )
}

// Example 5: Optimized Background Video with Resolution Control
export function OptimizedBackgroundVideo() {
  return (
    <section className='relative h-screen w-full'>
      <MuxPlayerWrapper
        playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
        maxResolution='1080p'
        minResolution='720p'
        preload='auto'
        metadata={{
          video_id: 'optimized-bg',
          video_title: 'Optimized Background',
        }}
        className='absolute inset-0'
      />
      <div className='relative z-10'>
        <h1>Optimized Video</h1>
        <p>Limited to 1080p maximum resolution</p>
      </div>
    </section>
  )
}

// Example 6: Multiple Background Videos in a Grid
export function MultipleBackgroundVideos() {
  const videos = [
    {
      id: 'video-1',
      playbackId: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe',
      title: 'Video 1',
    },
    {
      id: 'video-2',
      playbackId: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe',
      title: 'Video 2',
    },
    {
      id: 'video-3',
      playbackId: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe',
      title: 'Video 3',
    },
    {
      id: 'video-4',
      playbackId: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe',
      title: 'Video 4',
    },
  ]

  return (
    <section className='grid grid-cols-2 gap-4 p-4'>
      {videos.map(video => (
        <div
          key={video.id}
          className='aspect-video relative overflow-hidden rounded-lg'
        >
          <MuxPlayerWrapper
            playbackId={video.playbackId}
            metadata={{
              video_id: video.id,
              video_title: video.title,
            }}
            className='absolute inset-0'
          />
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/30'>
            <h3 className='text-2xl font-bold text-white'>{video.title}</h3>
          </div>
        </div>
      ))}
    </section>
  )
}

// Example 7: Background Video with Placeholder
export function BackgroundVideoWithPlaceholder() {
  // In a real app, you'd generate this from an actual image
  const placeholderDataUri =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"%3E%3Crect fill="%23333" width="1920" height="1080"/%3E%3C/svg%3E'

  return (
    <section className='relative h-screen w-full'>
      <MuxPlayerWrapper
        playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
        placeholder={placeholderDataUri}
        className='absolute inset-0'
      />
      <div className='relative z-10'>
        <h1>Video with Placeholder</h1>
      </div>
    </section>
  )
}

// Example 8: Responsive Background Video
export function ResponsiveBackgroundVideo() {
  return (
    <section className='relative w-full'>
      {/* Desktop: full screen */}
      <div className='relative hidden h-screen lg:block'>
        <MuxPlayerWrapper
          playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
          maxResolution='1080p'
          className='absolute inset-0'
        />
        <div className='relative z-10 flex h-full items-center justify-center'>
          <h1 className='text-6xl text-white'>Desktop View</h1>
        </div>
      </div>

      {/* Mobile: shorter height */}
      <div className='relative h-[60vh] lg:hidden'>
        <MuxPlayerWrapper
          playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
          maxResolution='720p'
          className='absolute inset-0'
        />
        <div className='relative z-10 flex h-full items-center justify-center'>
          <h1 className='text-4xl text-white'>Mobile View</h1>
        </div>
      </div>
    </section>
  )
}

// Example 9: Background Video with Start Time
export function BackgroundVideoWithStartTime() {
  return (
    <section className='relative h-screen w-full'>
      <MuxPlayerWrapper
        playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
        startTime={10} // Start at 10 seconds
        className='absolute inset-0'
      />
      <div className='relative z-10'>
        <h1>Video Starting at 10s</h1>
      </div>
    </section>
  )
}

// Example 10: Background Video with Lazy Loading
export function BackgroundVideoWithLazyLoading() {
  return (
    <section className='relative h-screen w-full'>
      <MuxPlayerWrapper
        playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
        loading='viewport'
        placeholder='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"%3E%3Crect fill="%23333" width="1920" height="1080"/%3E%3C/svg%3E'
        metadata={{
          video_id: 'lazy-loaded-bg',
          video_title: 'Lazy Loaded Background',
        }}
        className='absolute inset-0'
      />
      <div className='relative z-10'>
        <h1>Lazy Loaded Video</h1>
        <p>This video loads only when it enters the viewport</p>
      </div>
    </section>
  )
}

// Example 11: Background Video with Different Object Fits
export function BackgroundVideoObjectFitDemo() {
  return (
    <section className='grid grid-cols-2 gap-4 p-4'>
      <div className='aspect-video relative overflow-hidden rounded-lg'>
        <MuxPlayerWrapper
          playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
          objectFit='cover'
          className='absolute inset-0'
        />
        <div className='absolute bottom-4 left-4 z-10 rounded bg-black/50 px-3 py-1 text-white'>
          object-fit: cover
        </div>
      </div>

      <div className='aspect-video relative overflow-hidden rounded-lg'>
        <MuxPlayerWrapper
          playbackId='DS00Spx1CV902MCtPj5WknGlR102V5HFkDe'
          objectFit='contain'
          className='absolute inset-0'
        />
        <div className='absolute bottom-4 left-4 z-10 rounded bg-black/50 px-3 py-1 text-white'>
          object-fit: contain
        </div>
      </div>
    </section>
  )
}
