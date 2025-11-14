import { cn } from '@/lib/utils'
import { getMessages, getTranslations } from 'next-intl/server'

import { AutoScrollCarousel } from '@/components/auto-scroll-carousel'
import { AutoplayVideo } from '@/components/autoplay-video'
import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import { PageTitle } from '@/components/page-title'
import { ResidencesNavigator } from '@/components/residences-navigator'
import { SectionContactForm } from '@/components/section-contact-form'
import { SectionSetter } from '@/components/section-setter'
import { fetchResidencesSlider } from '@/lib/api/queries'
import { navigationConfig, residencesBanner } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { FormTranslations } from '@/types'

const ImageCard = ({ src, alt }: { src: string; alt: string }) => (
  <div className='relative aspect-[9/12] w-[200px] lg:w-[350px]'>
    <Image
      src={src}
      alt={alt}
      fill
      desktopSize='90vw'
      mobileSize='30vw'
      className='object-cover'
    />
  </div>
)

export default async function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // Fetch slider images from API
  const sliderResponse = await fetchResidencesSlider()

  // Fallback to hardcoded images if API fails
  const images =
    sliderResponse.success &&
    sliderResponse.data &&
    sliderResponse.data.length > 0
      ? sliderResponse.data.map(item => ({ src: item.image }))
      : []

  const messages = await getMessages({ locale })
  const t = await getTranslations({ locale, namespace: 'residences' })
  type ContactMessages = { contact: { form: FormTranslations } }
  const formTranslations = (messages as unknown as ContactMessages).contact.form

  return (
    <SectionSetter sectionId={navigationConfig['/residences']?.id as string}>
      <PageTitle
        primaryColor={colors.white}
        secondaryColor={colors['bricky-brick']}
        title={t('pageTitle.title')}
        description={t('pageTitle.description')}
        id={navigationConfig['/residences']?.id as string}
        bgImage='/img/backgrounds/red.png'
      />
      <section
        className={cn(
          'pb-24 pt-16 lg:pb-40 2xl:pb-32',
          'relative overflow-hidden bg-bricky-brick',
          'before:absolute before:bottom-0 before:left-0 before:top-0 before:z-20 before:h-full before:w-[20vw] before:bg-gradient-to-r before:from-bricky-brick before:to-transparent',
          'after:absolute after:bottom-0 after:right-0 after:top-0 after:z-20 after:h-full after:w-[20vw] after:bg-gradient-to-l after:from-bricky-brick after:to-transparent'
        )}
      >
        <div className='relative z-10 flex items-center justify-center py-16 lg:py-28'>
          <AutoScrollCarousel
            options={{ loop: true, dragFree: true }}
            emblaSlideClassname='items-start'
            slideSpacing='2rem'
          >
            {[...images, ...images].map((image, index) => (
              <div
                key={index}
                className={cn('relative', index % 2 === 0 && 'mt-16')}
              >
                <ImageCard {...image} alt={t('imageAlt')} />
              </div>
            ))}
          </AutoScrollCarousel>
        </div>
        <div className='relative z-30 flex flex-col items-center justify-center gap-6 lg:gap-6'>
          <h2
            className={cn(
              'text-center font-primary font-[400] text-white',
              'text-3xl/tight md:text-4xl/tight lg:text-5xl/tight xl:text-6xl/tight 2xl:text-7xl/tight',
              'w-[80vw] lg:w-auto'
            )}
          >
            <GsapSplitText type='lines' stagger={0.01} duration={1}>
              {t('hero.title')}
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              'text-center font-primary font-[300] text-white',
              'text-xl/snug lg:text-2xl/snug xl:text-2xl/snug 2xl:text-3xl/snug',
              'w-[90vw] md:w-[60vw] lg:w-[60vw] xl:w-[40vw] 2xl:w-[40vw] 3xl:w-[35vw]'
            )}
          >
            <GsapSplitText type='lines' stagger={0.01} duration={1}>
              {t('hero.description')}
            </GsapSplitText>
          </p>
        </div>
        <Image
          className='pointer-events-none absolute inset-0 z-0 object-cover mix-blend-overlay'
          src='/img/residences-bg.png'
          alt='Background'
          fill
          loading='lazy'
          priority={false}
        />
      </section>
      <section className='relative aspect-1 overflow-hidden lg:aspect-[16/7]'>
        <AutoplayVideo
          playbackId={residencesBanner.muxSrc}
          aspectRatio={residencesBanner.aspect()}
        />
      </section>
      <section className='relative overflow-hidden bg-white'>
        <div className='flex flex-col items-center justify-center gap-6 px-8 py-16 lg:gap-6 lg:px-0 lg:py-24 xl:pt-36'>
          <h2
            className={cn(
              'text-center font-primary font-[400] text-black',
              'text-4xl/tight lg:text-5xl/tight xl:text-6xl/tight 2xl:text-7xl/tight',
              'max-w-[95%]'
            )}
          >
            <GsapSplitText type='lines' stagger={0.01} duration={1}>
              {t('types.title')}
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              'text-center font-primary font-[300] text-black',
              'text-xl/snug lg:text-2xl/snug xl:text-2xl/snug 2xl:text-3xl/snug',
              'max-w-[90%] xl:max-w-[50%] 3xl:max-w-[45%]'
            )}
          >
            <GsapSplitText type='lines' stagger={0.01} duration={1}>
              {t('types.description')}
            </GsapSplitText>
          </p>
        </div>
        <ResidencesNavigator />
      </section>
      <SectionContactForm formTranslations={formTranslations} />
    </SectionSetter>
  )
}
