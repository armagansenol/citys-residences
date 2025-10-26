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
    <section
      className={cn(
        'relative min-h-lvh space-y-16 overflow-hidden outline -outline-offset-2 outline-bricky-brick'
      )}
      style={{ backgroundColor: 'var(--bg-color)' }}
    >
      <div className={cn('relative z-30 grid grid-cols-24')}>
        <div className='col-span-24 flex px-6 pb-12 pt-20 xl:col-span-10 xl:col-start-5 xl:px-0 xl:py-36 xl:pr-36'>
          <div className='flex flex-col gap-4 xl:ml-auto'>
            <h3
              className={cn(
                'font-primary font-[400] text-black',
                'text-3xl/tight xl:text-6xl/tight'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {title}
              </GsapSplitText>
            </h3>
            <h4
              className={cn(
                'font-primary font-[300] text-black',
                'text-xl/tight xl:text-4xl/tight'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {subtitle}
              </GsapSplitText>
            </h4>
          </div>
        </div>
        <div className='col-span-24 px-6 py-0 xl:col-span-8 xl:px-0 xl:py-36'>
          <p
            className={cn(
              'text-left font-primary font-[300] text-black',
              'text-base/normal xl:text-2xl/snug'
            )}
          >
            <GsapSplitText
              type='lines'
              stagger={0.01}
              duration={1.5}
              html={DOMPurify.sanitize(description)}
            />
          </p>
        </div>
      </div>
      <div className={cn('relative grid grid-cols-24 py-0 xl:py-24')}>
        <div className='col-span-24 aspect-[16/19] xl:aspect-[16/9]'>
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
