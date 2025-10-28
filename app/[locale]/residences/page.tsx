import { cn } from '@/lib/utils'
import { getMessages } from 'next-intl/server'

import { AutoScrollCarousel } from '@/components/auto-scroll-carousel'
import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import { PageTitle } from '@/components/page-title'
import { ResidencesNavigator } from '@/components/residences-navigator'
import { SectionContactForm } from '@/components/section-contact-form'
import { WistiaPlayerWrapper } from '@/components/wistia-player'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { FormTranslations } from '@/types'

const ImageCard = ({ src }: { src: string }) => (
  <div className='aspect-[9/12] w-[200px] lg:w-[350px]'>
    <Image
      src={src}
      alt='Citys Residences Interiors'
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
  const images = [
    {
      src: '/img/residences/1+1/interior.jpg',
      alt: '1+1 Interior',
    },
  ]

  const messages = await getMessages({ locale })
  type ContactMessages = { contact: { form: FormTranslations } }
  const formTranslations = (messages as unknown as ContactMessages).contact.form

  return (
    <>
      <PageTitle
        primaryColor={colors.white}
        secondaryColor={colors['bricky-brick']}
        title='RESIDENCES'
        description='Günlük yaşamın alışkanlıklarından, yıllara yayılan huzurlu anılara kadar her detay; evinizin size ait bir dünyaya dönüşmesi için tasarlandı.'
        id={navigationConfig['/residences']?.id as string}
      />
      <section
        className={cn(
          'pb-24 pt-16 lg:pb-48',
          'relative min-h-svh overflow-hidden bg-bricky-brick',
          'before:absolute before:bottom-0 before:left-0 before:top-0 before:z-20 before:h-full before:w-[20vw] before:bg-gradient-to-r before:from-bricky-brick before:to-transparent',
          'after:absolute after:bottom-0 after:right-0 after:top-0 after:z-20 after:h-full after:w-[20vw] after:bg-gradient-to-l after:from-bricky-brick after:to-transparent'
        )}
      >
        <div className='relative z-10 flex items-center justify-center py-16 lg:py-32'>
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
        <div className='relative z-30 flex flex-col items-center justify-center gap-6 lg:gap-6'>
          <h2
            className={cn(
              'text-center font-primary font-[400] text-white',
              'text-3xl/tight lg:text-5xl/tight xl:text-6xl/tight 2xl:text-6xl/tight',
              'w-[80vw] lg:w-auto'
            )}
          >
            <GsapSplitText type='chars' stagger={0.02} duration={1}>
              Hayatına konforlu bir dokunuş.
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              'text-center font-primary font-[300] text-white',
              'text-xl/snug lg:text-2xl/snug xl:text-2xl/snug 2xl:text-3xl/snug',
              'w-[90vw] md:w-[60vw] lg:w-[60vw] xl:w-[40vw] 2xl:w-[40vw] 3xl:w-[40vw]'
            )}
          >
            <GsapSplitText type='lines' stagger={0.01} duration={1}>
              Hayatın tam merkezinde, zamanı kendinize ve sevdiklerinize
              ayırarak keyifle, yaşamı sanata dönüştürerek daha çok yaşa.
            </GsapSplitText>
          </p>
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[url('/svg/bg-footer.svg')] bg-cover bg-left-bottom bg-no-repeat"
          style={{ mixBlendMode: 'overlay' }}
        />
      </section>
      <section className='pointer-events-none aspect-1 overflow-hidden lg:aspect-[9/16]'>
        <WistiaPlayerWrapper
          mediaId='4g5plgua2p'
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
      <section
        className={cn('relative overflow-hidden bg-white pt-16 lg:pt-36')}
      >
        <div className='flex flex-col items-center justify-center gap-6 px-8 lg:gap-6 lg:px-0'>
          <h2
            className={cn(
              'text-center font-primary font-[400] text-black',
              'text-3xl/tight lg:text-5xl/tight xl:text-6xl/tight 2xl:text-6xl/tight'
            )}
          >
            <GsapSplitText type='chars' stagger={0.01} duration={1}>
              Farklı ihtiyaçlar, ortak yaşam tarzı.
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              'text-center font-primary font-[300] text-black',
              'lg:text-2xl/text-xl/snug xl:text-2xl/text-xl/snug 2xl:text-2xl/text-xl/snug text-xl/snug'
            )}
          >
            <GsapSplitText type='lines' stagger={0.01} duration={1}>
              Küçük detaylardan büyük alanlara… City’s Residences’ta farklı
              daire tipleriyle size ve ailenize en uygun yaşam alanını keşfedin.
            </GsapSplitText>
          </p>
        </div>
        <ResidencesNavigator />
      </section>
      <SectionContactForm formTranslations={formTranslations} />
    </>
  )
}
