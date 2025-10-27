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
        'relative h-screen overflow-hidden xl:h-[60vw]',
        'after:absolute after:bottom-0 after:left-0 after:z-10 after:h-1/2 after:w-full after:bg-gradient-to-t after:from-current after:to-transparent',
        className
      )}
    >
      <div className='pointer-events-none absolute inset-0 h-full w-full'>
        <WistiaPlayerWrapper
          mediaId={mediaId}
          autoplay
          muted
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
        className={cn(
          'absolute bottom-[10%] left-1/2 z-50 -translate-x-1/2 xl:bottom-[15%]'
        )}
      >
        {title && (
          <article
            className={cn(
              'flex flex-shrink-0 flex-col items-center justify-center gap-4 xl:gap-0'
            )}
          >
            <h3
              className={cn(
                'whitespace-nowrap text-center font-primary font-[200] text-white',
                'text-4xl/snug lg:text-6xl/snug xl:text-6xl/snug 2xl:text-7xl/snug'
              )}
            >
              <GsapSplitText type='chars' stagger={0.01} duration={1}>
                {title}
              </GsapSplitText>
            </h3>
            <p
              className={cn(
                'text-center font-primary font-[300] text-white',
                'text-xl/relaxed lg:text-2xl/relaxed xl:text-2xl/relaxed 2xl:text-3xl/relaxed',
                'w-[90vw] sm:w-[70vw] lg:w-[70vw] xl:w-[50vw]'
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
