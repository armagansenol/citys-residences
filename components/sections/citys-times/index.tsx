import { cn } from '@/lib/utils'
import {
  FacebookLogoIcon,
  YoutubeLogoIcon,
  InstagramLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react/dist/ssr'

import { GsapSplitText } from '@/components/gsap-split-text'
import { LogoSlim } from '@/components/icons'
import { SectionSetter } from '@/components/section-setter'
import { SvgBgC } from '@/components/svgs/svg-bg-c'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

import { ScrollToTop } from '@/components/scroll-to-top'
import { WistiaPlayerWrapper } from '@/components/wistia-player'

export function CitysTimes() {
  return (
    <>
      <SectionSetter
        sectionId={navigationConfig['/citys-times']?.id as string}
      />
      <section className='pointer-events-none h-screen overflow-hidden lg:h-[45vw]'>
        <WistiaPlayerWrapper
          mediaId='luxxfpk3x3'
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
        />
      </section>
      <div
        className={cn(
          'relative z-30 flex min-h-lvh items-center justify-center overflow-hidden bg-trapped-darkness lg:min-h-[120vh]',
          'before:absolute before:left-0 before:top-0 before:z-10 before:h-3/6 before:w-full before:bg-gradient-to-b before:from-trapped-darkness before:to-transparent',
          'after:absolute after:bottom-0 after:left-0 after:z-10 after:h-3/6 after:w-full after:bg-gradient-to-t after:from-trapped-darkness after:to-transparent'
        )}
      >
        <SvgBgC className='absolute left-1/2 top-1/2 z-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 text-white opacity-30 lg:h-auto lg:w-full' />
        <div className='z-40 flex flex-col items-center justify-center gap-6 lg:gap-6'>
          <span className='size-24 lg:size-24'>
            <LogoSlim fill={colors.white} />
          </span>
          <h2
            className={cn(
              'text-center font-primary font-[500] text-white',
              'text-3xl/tight tracking-[0.4em] lg:text-5xl/tight xl:text-5xl/tight 2xl:text-5xl/tight'
            )}
          >
            <GsapSplitText type='chars' stagger={0.02} duration={1}>
              CITY&apos;S TIMES
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              'text-center font-primary font-[300] text-white',
              'text-xl/tight lg:text-2xl/tight xl:text-2xl/tight 2xl:text-3xl/tight',
              'max-w-sm lg:max-w-md'
            )}
          >
            <GsapSplitText type='lines' stagger={0.01} duration={1}>
              Bizi takip edin.
            </GsapSplitText>
          </p>
          <div className='mt-16 flex gap-4'>
            <div className='flex items-center justify-center'>
              <FacebookLogoIcon
                size={64}
                weight='fill'
                className='text-white'
              />
            </div>
            <div className='flex items-center justify-center'>
              <InstagramLogoIcon
                size={64}
                weight='fill'
                className='text-white'
              />
            </div>
            <div className='flex items-center justify-center'>
              <XLogoIcon size={64} weight='fill' className='text-white' />
            </div>
            <div className='flex items-center justify-center'>
              <YoutubeLogoIcon size={64} weight='fill' className='text-white' />
            </div>
          </div>
          <ScrollToTop className='absolute bottom-24 left-1/2 -translate-x-1/2' />
        </div>
      </div>
    </>
  )
}
