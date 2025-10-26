'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

import { GsapSplitText } from '@/components/gsap-split-text'
import { WistiaPlayerWrapper } from '@/components/wistia-player'

interface VideoWithTextProps {
  mediaId: string
  primaryVideoUrl: string
  primaryVideoType?: string
  thumbnail?: string
  thumbnailMobile?: string
  title: ReactNode
  description: ReactNode
  className?: string
  spot?: string
  customPoster?: string
}

export function VideoWithText(props: VideoWithTextProps) {
  const { mediaId, title, description, className, customPoster } = props

  return (
    <div
      className={cn(
        'relative h-[100vh] overflow-hidden after:absolute after:bottom-0 after:left-0 after:z-10 after:h-1/2 after:w-full after:bg-gradient-to-t after:from-current after:to-transparent xl:h-[60vw]',
        className
      )}
    >
      <div className='pointer-events-none absolute inset-0 h-full w-full'>
        <WistiaPlayerWrapper
          mediaId={mediaId}
          autoplay
          muted
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
          customPoster={customPoster}
        />
      </div>
      <div
        className={cn('absolute bottom-[15%] left-1/2 z-50 -translate-x-1/2')}
      >
        {title && (
          <article
            className={cn(
              'text-center font-primary font-semibold text-white',
              'flex flex-shrink-0 flex-col items-center justify-center gap-4 lg:gap-6'
            )}
          >
            <h3
              className={cn(
                'whitespace-nowrap text-center font-primary font-[200] text-white',
                'text-4xl xl:text-6xl 2xl:text-7xl',
                'w-full min-w-[90vw] lg:min-w-52',
                'flex flex-shrink-0 flex-col items-center justify-center gap-4 lg:flex-row lg:gap-0'
              )}
            >
              <GsapSplitText type='chars' stagger={0.02} duration={1}>
                {title}
              </GsapSplitText>
            </h3>
            <p
              className={cn(
                'text-center font-primary font-[300] text-white',
                'text-xl xl:text-2xl 2xl:text-3xl',
                'leading-relaxed xl:leading-relaxed 2xl:leading-relaxed',
                'flex flex-shrink-0 flex-col items-center justify-center gap-4 lg:flex-row lg:gap-0',
                'max-w-4xl'
              )}
            >
              <GsapSplitText type='lines' stagger={0.02} duration={1}>
                {description}
              </GsapSplitText>
            </p>
          </article>
        )}
      </div>
    </div>
  )
}
