import { cn } from '@/lib/utils'
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react/dist/ssr'
import { getTranslations } from 'next-intl/server'

import { AutoScrollCarousel } from '@/components/auto-scroll-carousel'
import { AutoplayVideo } from '@/components/autoplay-video'
import { GsapSplitText } from '@/components/gsap-split-text'
import { LogoSlim } from '@/components/icons'
import { Image } from '@/components/image'
import { ScrollToTop } from '@/components/scroll-to-top'
import { SectionSetter } from '@/components/section-setter'
import { fetchCitysTimes } from '@/lib/api/queries'
import { citysTimesBanner, navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

const ImageCard = ({ src }: { src: string }) => (
  <div className='relative aspect-[9/12] w-[200px] lg:w-[260px] 2xl:w-[320px]'>
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

export default async function CitysTimes({ locale }: { locale?: string }) {
  const t = await getTranslations('citys-times')

  // Fetch Citys Times data
  const response = await fetchCitysTimes(locale)

  // Extract images from API response
  const images: { src: string }[] = []

  if (response.success && response.data && response.data.length > 0) {
    // Map the simple API structure: { id, image } -> { src }
    response.data.forEach(item => {
      images.push({
        src: item.image,
      })
    })
  }

  return (
    <SectionSetter sectionId={navigationConfig['/citys-times']?.id as string}>
      <section className='relative h-screen overflow-hidden lg:h-[45vw]'>
        <AutoplayVideo
          playbackId={citysTimesBanner.muxSrc}
          aspectRatio={citysTimesBanner.aspect()}
        />
      </section>
      <section
        className={cn(
          'relative z-30 flex min-h-lvh items-center justify-center overflow-hidden bg-trapped-darkness lg:min-h-[120vh]',
          'before:absolute before:left-0 before:top-0 before:z-10 before:h-3/6 before:w-full before:bg-gradient-to-b before:from-trapped-darkness before:to-transparent',
          'after:absolute after:bottom-0 after:left-0 after:z-10 after:h-3/6 after:w-full after:bg-gradient-to-t after:from-trapped-darkness after:to-transparent'
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-30',
            'before:absolute before:bottom-0 before:left-0 before:top-0 before:z-20 before:h-full before:w-[20vw] before:bg-gradient-to-r before:from-trapped-darkness before:to-transparent',
            'after:absolute after:bottom-0 after:right-0 after:top-0 after:z-20 after:h-full after:w-[20vw] after:bg-gradient-to-l after:from-trapped-darkness after:to-transparent'
          )}
        ></div>
        <div
          className={cn(
            'pointer-events-none',
            'absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2',
            'size-[300%] md:size-[200%] xl:size-[250%] 2xl:size-[250%] 3xl:size-[200%]'
          )}
        >
          <Image
            src='/img/backgrounds/night.png'
            alt='Citys Times Background'
            fill
            className={cn('object-contain object-center')}
            loading='lazy'
          />
        </div>
        <div
          className={cn(
            'z-20 flex flex-col items-center justify-center gap-6 lg:gap-6'
            // 'after:bg-gradient-citys-times z-10 after:absolute after:inset-0'
          )}
        >
          <div
            className='relative z-10 flex w-screen items-center justify-center py-24 lg:py-24'
            id={navigationConfig['/citys-times']?.id as string}
          >
            <AutoScrollCarousel
              options={{ loop: true, dragFree: true }}
              emblaSlideClassname='items-start'
              slideSpacing='2rem'
            >
              {[...images, ...images, ...images].map((image, index) => (
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
              {t('title')}
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
              {t('followUs')}
            </GsapSplitText>
          </p>
          <div className='mt-4 flex gap-6 lg:mt-16'>
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
      </section>
    </SectionSetter>
  )
}
