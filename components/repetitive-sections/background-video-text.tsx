'use client'

import { cn } from '@/lib/utils'
import { GsapSplitText } from '@/components/gsap-split-text'
import { LazyWistiaPlayer } from '@/components/wistia-player-lazy'
import { useState, useEffect } from 'react'

export interface BackgroundVideoTextProps {
  title: string
  subtitle: string
  description: string
  mediaId: string
  thumbnail?: string
  videoAspectRatio?: number
}

export function BackgroundVideoText(props: BackgroundVideoTextProps) {
  const { title, subtitle, description, mediaId, thumbnail, videoAspectRatio } =
    props
  const [sanitizedDescription, setSanitizedDescription] = useState(description)

  useEffect(() => {
    // Dynamically import DOMPurify only on client side
    import('isomorphic-dompurify').then(module => {
      const DOMPurify = module.default
      setSanitizedDescription(DOMPurify.sanitize(description))
    })
  }, [description])

  return (
    <section
      className={cn(
        'relative h-screen xl:h-auto xl:min-h-[120vh]',
        'after:absolute after:left-0 after:top-0 after:z-20 after:h-[50%] after:w-full after:bg-gradient-to-b after:from-black/85 after:to-transparent',
        'before:absolute before:bottom-0 before:left-0 before:z-20 before:h-[60%] before:w-full before:bg-gradient-to-t before:from-black/90 before:to-transparent lg:before:hidden'
      )}
      style={{ color: 'var(--white)' }}
    >
      {/* <div className='absolute left-0 top-0'>BackgroundVideoText</div> */}
      <div className='relative z-30 grid h-full grid-cols-24 content-between'>
        <div className='col-span-24 flex px-8 pt-20 lg:col-span-7 lg:col-start-6 lg:px-0 lg:pb-16 lg:pt-24 xl:col-span-10 xl:col-start-5 xl:pb-24 xl:pt-44'>
          <div className='flex flex-col gap-4 xl:mr-auto'>
            <h3
              className={cn(
                'font-primary font-[400]',
                'text-3xl/tight xl:text-6xl/tight 2xl:text-6xl/tight'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {title}
              </GsapSplitText>
            </h3>
            <h4
              className={cn(
                'font-primary font-[300]',
                'text-xl/tight xl:text-4xl/tight 2xl:text-4xl/tight',
                'md:max-w-[60vw]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {subtitle}
              </GsapSplitText>
            </h4>
          </div>
        </div>
        <div className='col-span-24 px-8 pb-20 lg:col-span-10 lg:px-0 lg:pb-16 lg:pl-24 lg:pt-24 xl:col-span-8 xl:pb-24 xl:pl-16 xl:pr-0 xl:pt-44'>
          <article
            className={cn(
              'text-left font-primary font-[300]',
              'text-base/normal xl:text-lg/normal',
              'max-w-[90%] md:max-w-[50vw] xl:max-w-none',
              'prose-2xl'
            )}
            style={{ color: 'var(--white)' }}
          >
            <GsapSplitText
              type='lines'
              stagger={0.01}
              duration={1.5}
              html={sanitizedDescription}
            />
          </article>
        </div>
      </div>
      <div className='!pointer-events-none absolute inset-0 bottom-0 left-0 right-0 top-0 z-10'>
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
          aspect={videoAspectRatio}
        />
      </div>
    </section>
  )
}
