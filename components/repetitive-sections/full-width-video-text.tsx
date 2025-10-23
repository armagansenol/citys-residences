import { cn } from '@/lib/utils'
import DOMPurify from 'isomorphic-dompurify'

import { GsapSplitText } from '../gsap-split-text'
import { LazyWistiaPlayer } from '../lazy-wistia-player'

export interface FullWidthVideoTextProps {
  title: string
  subtitle: string
  description: string
  mediaId: string
  thumbnail?: string
}

export function FullWidthVideoText(props: FullWidthVideoTextProps) {
  const { title, subtitle, description, mediaId, thumbnail } = props
  return (
    <section className={cn('relative min-h-lvh bg-white')}>
      <div className={cn('relative z-30 grid grid-cols-24')}>
        <div className='col-span-15 flex py-36 pr-36'>
          <div className='ml-auto flex flex-col gap-4'>
            <h3
              className={cn(
                'text-left font-primary font-[400] text-black',
                'text-[0.8rem] lg:text-6xl/tight'
              )}
            >
              <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
                {title}
              </GsapSplitText>
            </h3>
            <h4
              className={cn(
                'text-left font-primary font-[300] text-black',
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
              'text-left font-primary font-[300] text-black',
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
      <div className={cn('relative z-30 grid grid-cols-24 py-24')}>
        <div className='col-span-24 aspect-[16/9]'>
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
