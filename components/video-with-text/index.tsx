import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

import { AutoplayVideo } from '@/components/autoplay-video'
import { GsapSplitText } from '@/components/gsap-split-text'

interface VideoWithTextProps {
  className?: string
  mediaId: string
  thumbnail?: string
  title?: ReactNode
  description?: ReactNode
  titleHtml?: string
  descriptionHtml?: string
  aspect?: number
}

export function VideoWithText(props: VideoWithTextProps) {
  const { mediaId, title, description, className, aspect } = props

  return (
    <div
      className={cn(
        'xl:auto h-screen min-h-fit w-full xl:min-h-[120vh]',
        'relative overflow-hidden',
        'after:absolute after:bottom-0 after:left-0 after:z-10 after:h-1/2 after:w-full after:bg-gradient-to-t after:from-current after:to-transparent',
        className
      )}
    >
      <AutoplayVideo playbackId={mediaId} aspectRatio={aspect} />
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
