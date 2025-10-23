import { cn } from '@/lib/utils'
import DOMPurify from 'isomorphic-dompurify'

import { GsapSplitText } from '@/components/gsap-split-text'
import { LazyWistiaPlayer } from '../lazy-wistia-player'

export interface BackgroundVideoTextProps {
  title: string
  subtitle: string
  description: string
  mediaId: string
  thumbnail?: string
}

export function BackgroundVideoText(props: BackgroundVideoTextProps) {
  const { title, subtitle, description, mediaId, thumbnail } = props
  return (
    <section
      className={cn(
        'relative min-h-lvh',
        'after:absolute after:left-0 after:top-0 after:z-20 after:h-full after:w-full after:bg-gradient-to-b after:from-black/80 after:to-transparent'
      )}
    >
      <div className={cn('relative z-30 grid h-full grid-cols-24')}>
        <div className='col-span-15 flex py-36 pr-36'>
          <div className='ml-auto flex flex-col gap-4'>
            <h3
              className={cn(
                'text-left font-primary font-[400] text-white',
                'text-[0.8rem] lg:text-6xl/tight'
              )}
            >
              <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
                {title}
              </GsapSplitText>
            </h3>
            <h4
              className={cn(
                'text-left font-primary font-[300] text-white',
                'text-[0.8rem] lg:text-4xl/tight'
              )}
            >
              <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
                {subtitle}
              </GsapSplitText>
            </h4>
          </div>
        </div>
        <div className='col-span-6 py-36'>
          <p
            className={cn(
              'text-left font-primary font-[300] text-white',
              'text-[0.8rem] lg:text-2xl/snug'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description),
                }}
              />
            </GsapSplitText>
          </p>
        </div>
      </div>
      <div className='absolute inset-0 bottom-0 left-0 right-0 top-0 z-10'>
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
    </section>
  )
}
