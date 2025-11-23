import { cn } from '@/lib/utils'

import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import {
  BlueprintIcon,
  PlayCircleIcon,
  QuotesIcon,
} from '@phosphor-icons/react/dist/ssr'
import dynamic from 'next/dynamic'
import { useLocale } from 'next-intl'

const FullScreenVideoDialog = dynamic(() =>
  import('@/components/dialogs/full-screen-video-dialog').then(
    module => module.FullScreenVideoDialog
  )
)

export interface QuoteWithVideoProps {
  quote: string
  mediaIdEnglish?: string
  mediaIdTurkish?: string
  portraitImage?: string
  portraitImageMobile?: string
  portraitClassName?: string
  personName?: React.ReactNode
  personTitle?: string
  sidebarText?: string
  primaryColor?: string
  secondaryColor?: string
  thumbnail?: string
  className?: string
  hasBg?: boolean
  videoAspectRatio?: number
}

export function QuoteWithVideo({
  quote,
  mediaIdEnglish,
  mediaIdTurkish,
  portraitImage,
  portraitImageMobile,
  portraitClassName,
  personName,
  personTitle,
  sidebarText,
  primaryColor,
  secondaryColor,
  thumbnail,
  className,
  hasBg = false,
  videoAspectRatio = 16 / 9,
}: QuoteWithVideoProps) {
  const locale = useLocale()
  const mediaId = locale === 'en' ? mediaIdEnglish : mediaIdTurkish
  return (
    <section
      className={cn(
        'relative z-10 grid grid-cols-24 overflow-hidden xl:min-h-screen',
        className
      )}
      style={{ backgroundColor: primaryColor }}
    >
      {hasBg && (
        <div
          className={cn(
            'pointer-events-none absolute -bottom-28 right-0 aspect-[16/16] w-3/4 lg:w-3/4 2xl:w-[64%]',
            'bg-[url(/svg/murat-kader-bg.svg)] bg-contain bg-right-bottom bg-no-repeat mix-blend-soft-light'
          )}
        />
      )}
      {/* quote and person name and title */}
      <div className='col-span-24 flex items-center justify-between pl-8 pr-12 pt-28 lg:col-span-16 lg:col-start-6 lg:px-0 lg:pt-48 xl:col-span-16 xl:col-start-5 2xl:pt-64'>
        <p
          className={cn(
            'relative',
            'text-left font-primary font-[400]',
            'w-[70%] lg:w-[50%] xl:w-[45%] 2xl:w-[40%] 3xl:w-[45%]',
            'text-2xl/snug lg:text-3xl/snug xl:text-4xl/snug 2xl:text-4xl/snug 3xl:text-5xl/snug'
          )}
          style={{ color: secondaryColor }}
        >
          <span className='absolute left-0 top-0 z-20 block size-16 -translate-y-[140%] lg:size-20'>
            <QuotesIcon
              className='size-full'
              weight='thin'
              style={{ color: secondaryColor, transform: 'rotateY(180deg)' }}
            />
          </span>
          <GsapSplitText type='lines' stagger={0.1} duration={1.5}>
            {quote}
          </GsapSplitText>
        </p>
        {/* person name and title desktop */}
        <div className='mt-auto hidden text-right lg:block'>
          {personName && (
            <h3
              className='font-primary text-xl/tight font-[400] lg:text-2xl/tight xl:text-xl/tight xl:font-[500] 2xl:text-2xl/tight'
              style={{ color: secondaryColor }}
            >
              {personName}
            </h3>
          )}
          {personTitle && (
            <p
              className='mt-1 font-primary text-sm font-[300] lg:mt-1 lg:text-2xl/tight xl:text-xl/tight xl:font-[200] 2xl:text-2xl/tight'
              style={{ color: secondaryColor }}
            >
              {personTitle}
            </p>
          )}
        </div>
      </div>
      {/* video */}
      <div className='col-span-24 pb-12 pl-8 pr-12 pt-8 lg:col-span-16 lg:col-start-6 lg:px-0 lg:pb-28 lg:pt-16 xl:col-span-16 xl:col-start-5'>
        <div className='group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-md 2xl:rounded-lg'>
          <FullScreenVideoDialog
            aspectRatio={videoAspectRatio}
            dialogTrigger={
              <Image
                src={thumbnail ?? ''}
                alt='Thumbnail'
                fill
                className='object-cover object-center'
                desktopSize='80vw'
                mobileSize='90vw'
                quality={100}
              />
            }
            mediaId={mediaId ?? ''}
          />
          <span className='pointer-events-none absolute left-1/2 top-1/2 z-50 size-16 -translate-x-1/2 -translate-y-1/2 text-white transition-transform duration-300 ease-in-out group-hover:scale-125 xl:size-24'>
            <PlayCircleIcon className='size-full' weight='fill' />
          </span>
        </div>
        {/* person name and title mobile */}
        <div className='mr-auto mt-20 inline-flex flex-col lg:hidden'>
          {personName && (
            <h3
              className='max-w-[35vw] font-primary text-sm/tight font-[500] md:text-lg/tight'
              style={{ color: secondaryColor }}
            >
              {personName}
            </h3>
          )}
          {personTitle && (
            <p
              className='font-primary text-xs font-[300] md:text-base/tight'
              style={{ color: secondaryColor }}
            >
              {personTitle}
            </p>
          )}
        </div>
      </div>
      {/* portrait image */}
      <div
        className={cn(
          'aspect-square pointer-events-none absolute bottom-0 right-0 z-50 h-full w-[80%] lg:w-[60%] xl:w-[40%]',
          portraitClassName
        )}
      >
        <Image
          src={portraitImage || ''}
          alt={'Architect Portrait'}
          fill
          className='hidden object-contain object-right-bottom xl:block'
          desktopSize='30vw'
          mobileSize='50vw'
        />
        <Image
          src={portraitImageMobile || ''}
          alt={'Architect Portrait'}
          fill
          className='block object-contain object-right-bottom xl:hidden'
          desktopSize='30vw'
          mobileSize='50vw'
        />
      </div>
      {/* blueprint icon and sidebar text */}
      <div className='absolute right-11 top-10 flex flex-col items-center justify-end gap-2 lg:right-16 lg:top-20 lg:gap-4 xl:top-28'>
        <BlueprintIcon
          className='size-7 rotate-90 lg:size-12 2xl:size-16'
          weight='thin'
          style={{ color: secondaryColor }}
        />
        <div
          className='writing-mode-vertical font-primary text-base font-[400] lg:text-2xl xl:text-3xl 2xl:text-4xl'
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
