import { cn } from '@/lib/utils'

import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import {
  BlueprintIcon,
  PlayCircleIcon,
  QuotesIcon,
} from '@phosphor-icons/react/dist/ssr'
import { FullScreenVideoDialog } from '@/components/dialogs/full-screen-video-dialog'

export interface QuoteWithVideoProps {
  quote: string
  mediaId: string
  portraitImage?: string
  personName?: string
  personTitle?: string
  sidebarText?: string
  primaryColor?: string
  secondaryColor?: string
  thumbnail?: string
  className?: string
  hasBg?: boolean
}

export function QuoteWithVideo({
  quote,
  mediaId,
  portraitImage,
  personName,
  personTitle,
  sidebarText,
  primaryColor,
  secondaryColor,
  thumbnail,
  className,
  hasBg = false,
}: QuoteWithVideoProps) {
  return (
    <section
      className={cn(
        'relative z-10 grid min-h-screen grid-cols-24 overflow-hidden',
        hasBg &&
          'bg-[url(/svg/murat-kader-bg.svg)] bg-contain bg-right-bottom bg-no-repeat bg-blend-soft-light',
        className
      )}
      style={{ backgroundColor: primaryColor }}
    >
      {/* quote and person name and title */}
      <div className='col-span-24 flex items-center justify-between px-8 pt-28 lg:col-span-16 lg:col-start-6 lg:px-0 lg:pt-48'>
        <h2
          className={cn(
            'relative',
            'text-left font-primary font-[400]',
            'w-[80%] lg:w-[50vw]',
            'text-2xl/snug lg:text-4xl/snug'
          )}
          style={{ color: secondaryColor }}
        >
          <span className='absolute left-0 top-0 z-20 block -translate-y-[140%]'>
            <QuotesIcon
              size={64}
              weight='thin'
              style={{ color: secondaryColor }}
            />
          </span>
          <GsapSplitText type='lines' stagger={0.1} duration={1.5}>
            {quote}
          </GsapSplitText>
        </h2>
        {/* person name and title desktop */}
        <div className='mt-auto hidden text-right lg:block'>
          {personName && (
            <h3
              className='font-primary text-xl font-[400] lg:text-2xl'
              style={{ color: secondaryColor }}
            >
              {personName}
            </h3>
          )}
          {personTitle && (
            <p
              className='mt-1 font-primary text-sm font-[300] lg:text-2xl'
              style={{ color: secondaryColor }}
            >
              {personTitle}
            </p>
          )}
        </div>
      </div>
      {/* video */}
      <div className='col-span-24 border border-red-400 px-8 pb-0 pt-8 lg:col-span-16 lg:col-start-6 lg:px-0 lg:pb-16 lg:pt-16 xl:col-start-5'>
        <div className='group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-sm border border-blue-400 text-red-400'>
          <FullScreenVideoDialog
            dialogTrigger={
              <Image
                src={thumbnail ?? ''}
                alt='Thumbnail'
                fill
                className='object-cover object-center'
              />
            }
            mediaId={mediaId}
          />
          <span className='pointer-events-none absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-white transition-transform duration-300 ease-in-out group-hover:scale-125'>
            <PlayCircleIcon size={120} weight='fill' />
          </span>
        </div>
        {/* person name and title mobile */}
        <div className='mr-auto mt-12 inline-flex flex-col lg:mt-24 lg:hidden'>
          {personName && (
            <h3
              className='max-w-[35vw] font-primary text-base/tight font-[500]'
              style={{ color: secondaryColor }}
            >
              {personName}
            </h3>
          )}
          {personTitle && (
            <p
              className='font-primary text-sm font-[300]'
              style={{ color: secondaryColor }}
            >
              {personTitle}
            </p>
          )}
        </div>
      </div>
      {/* portrait image */}
      <div className='aspect-square pointer-events-none absolute -right-4 bottom-0 z-50 h-[35%] w-full lg:right-0 lg:h-[35%] xl:h-2/4'>
        <Image
          src={portraitImage || ''}
          alt={personName || 'Portrait'}
          fill
          className='object-contain object-right-bottom'
        />
      </div>
      {/* blueprint icon and sidebar text */}
      <div className='absolute right-6 top-8 flex flex-col items-center justify-end gap-2 lg:right-24 lg:top-24'>
        <BlueprintIcon
          size={28}
          weight='thin'
          className='rotate-90'
          style={{ color: secondaryColor }}
        />
        <div
          className='writing-mode-vertical font-primary text-base font-[400] lg:text-4xl'
          style={{ color: secondaryColor }}
        >
          <span className='rotate-90 transform whitespace-nowrap'>
            {sidebarText}
          </span>
        </div>
      </div>
    </section>
  )
}
