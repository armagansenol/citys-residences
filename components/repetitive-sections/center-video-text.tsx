'use client'

import { cn } from '@/lib/utils'
import { GsapSplitText } from '@/components/gsap-split-text'
import { LazyWistiaPlayer } from '../lazy-wistia-player'
import { useState, useEffect } from 'react'

export interface CenterVideoTextProps {
  title: string
  subtitle: string
  description: string
  mediaId: string
  thumbnail?: string
}

export function CenterVideoText(props: CenterVideoTextProps) {
  const { title, subtitle, description, mediaId, thumbnail } = props
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
      className='pointer-events-none relative min-h-screen bg-white'
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      <div className='absolute left-0 top-0'>CenterVideoText</div>
      <div className='relative z-30 grid grid-cols-24 py-12 xl:py-32 2xl:py-48 2xl:pb-32'>
        <div className='col-span-24 flex px-8 py-8 xl:col-span-10 xl:col-start-5 xl:py-0'>
          <div className='flex flex-col gap-4 xl:ml-auto'>
            <h3
              className={cn(
                'font-primary font-[400]',
                'text-3xl/tight xl:text-5xl/tight 2xl:text-6xl/tight',
                'max-w-[60vw]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {title}
              </GsapSplitText>
            </h3>
            <h4
              className={cn(
                'font-primary font-[200]',
                'text-xl/tight xl:text-4xl/tight',
                'md:max-w-[60vw]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {subtitle}
              </GsapSplitText>
            </h4>
          </div>
        </div>
        <div className='col-span-24 px-8 py-4 xl:col-span-8 xl:px-16 xl:py-0'>
          <p
            className={cn(
              'text-left font-primary font-[300]',
              'text-base/normal xl:text-lg/normal',
              'md:max-w-[50vw] xl:max-w-none',
              'prose'
            )}
            style={{ color: 'var(--text-color)' }}
          >
            <GsapSplitText
              type='lines'
              stagger={0.01}
              duration={1.5}
              html={sanitizedDescription}
            />
          </p>
        </div>
      </div>
      <div className='relative z-30 grid grid-cols-24'>
        <div className='col-span-24 aspect-[16/19] overflow-hidden lg:col-span-16 lg:col-start-6 xl:aspect-[16/9]'>
          <LazyWistiaPlayer
            muted
            autoplay
            preload='none'
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
          />
        </div>
      </div>
    </section>
  )
}
