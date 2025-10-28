import { cn } from '@/lib/utils'
import DOMPurify from 'isomorphic-dompurify'

import { GsapSplitText } from '@/components/gsap-split-text'
import { LazyWistiaPlayer } from '@/components/lazy-wistia-player'

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
        'pointer-events-none relative min-h-screen',
        'after:absolute after:left-0 after:top-0 after:z-20 after:h-[50%] after:w-full after:bg-gradient-to-b after:from-black/85 after:to-transparent',
        'before:absolute before:bottom-0 before:left-0 before:z-20 before:h-[50%] before:w-full before:bg-gradient-to-t before:from-black/90 before:to-transparent'
      )}
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--white)' }}
    >
      <div className='absolute left-0 top-0'>BackgroundVideoText</div>
      <div className='relative z-30 grid h-full grid-cols-24'>
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
          <article
            className={cn(
              'text-left font-primary font-[300]',
              'text-base/normal xl:text-lg/normal',
              'md:max-w-[50vw] xl:max-w-none',
              'prose'
            )}
            style={{ color: 'var(--white)' }}
          >
            <GsapSplitText
              type='lines'
              stagger={0.01}
              duration={1.5}
              html={DOMPurify.sanitize(description)}
            />
          </article>
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
