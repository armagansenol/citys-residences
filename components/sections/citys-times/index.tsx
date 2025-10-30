import { cn } from '@/lib/utils'
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react/dist/ssr'

import { GsapSplitText } from '@/components/gsap-split-text'
import { LogoSlim } from '@/components/icons'
import { SectionSetter } from '@/components/section-setter'
import { citysTimesBanner, navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { ScrollToTop } from '@/components/scroll-to-top'
import { WistiaPlayerWrapper } from '@/components/wistia-player-wrapper'
import { SvgBgC } from '@/components/svgs/svg-bg-c'
import { AutoScrollCarousel } from '@/components/auto-scroll-carousel'
import { Image } from '@/components/image'
import { AspectCover } from '@/components/aspect-cover'

const ImageCard = ({ src }: { src: string }) => (
  <div className='aspect-[9/12] w-[200px] lg:w-[260px]'>
    <Image
      src={src}
      alt='Citys Times Images'
      fill
      desktopSize='90vw'
      mobileSize='30vw'
      className='object-cover'
    />
  </div>
)

export function CitysTimes() {
  const images = [
    {
      src: '/img/residences/1+1/interior.jpg',
      alt: '1+1 Interior',
    },
  ]
  return (
    <SectionSetter sectionId={navigationConfig['/citys-times']?.id as string}>
      <section className='relative h-screen overflow-hidden lg:h-[45vw]'>
        <AspectCover ratio={citysTimesBanner.aspect()}>
          <WistiaPlayerWrapper
            mediaId={citysTimesBanner.mediaId}
            aspect={citysTimesBanner.aspect()}
          />
        </AspectCover>
      </section>
      <div
        className={cn(
          'relative z-30 flex min-h-lvh items-center justify-center overflow-hidden bg-trapped-darkness lg:min-h-[120vh]',
          'before:absolute before:left-0 before:top-0 before:z-10 before:h-3/6 before:w-full before:bg-gradient-to-b before:from-trapped-darkness before:to-transparent',
          'after:absolute after:bottom-0 after:left-0 after:z-10 after:h-3/6 after:w-full after:bg-gradient-to-t after:from-trapped-darkness after:to-transparent'
        )}
      >
        <SvgBgC
          stopColor1={'transparent'}
          stopColor2={colors.white}
          className='absolute left-1/2 top-1/2 z-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 lg:h-auto lg:w-full'
        />
        <div className='z-40 flex flex-col items-center justify-center gap-6 lg:gap-6'>
          <div className='relative z-10 flex items-center justify-center py-16 lg:py-24'>
            <AutoScrollCarousel
              options={{ loop: true, dragFree: true }}
              emblaSlideClassname='items-start'
              slideSpacing='2rem'
            >
              {[
                ...images,
                ...images,
                ...images,
                ...images,
                ...images,
                ...images,
                ...images,
                ...images,
              ].map((image, index) => (
                <div
                  key={index}
                  className={cn('relative', index % 2 === 0 && 'mt-16')}
                >
                  <ImageCard {...image} />
                </div>
              ))}
            </AutoScrollCarousel>
          </div>
          <span className='size-20 lg:size-20'>
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
          <div className='mt-16 flex gap-6'>
            <div className='flex items-center justify-center'>
              <FacebookLogoIcon
                weight='fill'
                className='size-8 text-white lg:size-12'
              />
            </div>
            <div className='flex items-center justify-center'>
              <InstagramLogoIcon
                weight='fill'
                className='size-8 text-white lg:size-12'
              />
            </div>
            <div className='flex items-center justify-center'>
              <XLogoIcon
                weight='fill'
                className='size-8 text-white lg:size-12'
              />
            </div>
            <div className='flex items-center justify-center'>
              <YoutubeLogoIcon
                weight='fill'
                className='size-8 text-white lg:size-12'
              />
            </div>
          </div>
          <ScrollToTop className='py-24' />
        </div>
      </div>
    </SectionSetter>
  )
}
