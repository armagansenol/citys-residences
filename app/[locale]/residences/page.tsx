import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll'
import { GsapSplitText } from '@/components/gsap-split-text'
import { IconCollab, Logo } from '@/components/icons'
import { Sequenced } from '@/components/sequenced'
import { StackingCards } from '@/components/stacking-cards'
import { Video } from '@/components/utility/video'
import { VideoSection } from '@/components/video-section'
import {
  melihBulgurVideo,
  mustafaTonerVideo,
  residencesVideo,
  sections,
} from '@/lib/constants'
import { getResidencesContent } from '@/lib/content'
import { cn } from '@/lib/utils'
import { colors } from '@/styles/config.mjs'

export default async function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const residencesContent = await getResidencesContent(locale)

  const items = residencesContent.map(item => ({
    title: item.title,
    description: item.subtitle,
    images: item.url.map(url => ({ url })),
    bg: item.bg || '#ffffff',
    sectionId: item.sectionId || '',
  }))

  return (
    <>
      <FadeInOnScroll>
        <section className='relative z-10 h-svh overflow-hidden bg-bricky-brick'>
          <Video
            primaryVideoUrl={residencesVideo}
            autoPlay
            loop
            muted
            playsInline
            className='h-full w-full object-cover'
          />
        </section>
      </FadeInOnScroll>
      <section className='relative z-30 bg-white py-12 lg:pt-20 2xl:pt-28'>
        <FadeInOnScroll>
          <div className='mx-auto h-40 w-full lg:h-64'>
            <Logo fill={colors['bricky-brick']} />
          </div>
        </FadeInOnScroll>
      </section>
      <section
        className='relative z-30 bg-white lg:py-12'
        id={sections.residences.interiorArchitecture.id}
      >
        <FadeInOnScroll>
          <div className='section-container'>
            <VideoSection
              primaryVideoUrl={mustafaTonerVideo}
              thumbnail='/img/thumbnail-toners.jpg'
              title='İÇ MİMARIN GÖZÜYLE...'
            />
          </div>
        </FadeInOnScroll>
      </section>
      <section className='section-container relative z-30 bg-white'>
        <div className='relative mx-auto flex flex-col items-center justify-center px-4 py-16 pb-0 lg:px-0 xl:py-32'>
          <h2
            className={cn(
              'mb-6 text-center font-montserrat font-bold text-bricky-brick lg:mb-24',
              'text-3xl lg:text-6xl xl:text-6xl 2xl:text-7xl 3xl:text-7xl',
              'leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.05} duration={1}>
              Hayata Dokunan Detaylar
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              'text-md mb-5 text-center font-primary font-medium lg:mb-24',
              'text-xl lg:text-4xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl',
              'leading-tighter lg:leading-tighter xl:leading-tight 2xl:leading-tight 3xl:leading-tight'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.05} duration={1}>
              Her köşesi özenle düşünülmüş, <br /> tüm çizgileri ferah bir
              nefese açılan alanlar...
            </GsapSplitText>
          </p>
          <p
            className={cn(
              'text-center font-primary font-normal',
              'lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl',
              'text-lg lg:text-3xl xl:text-2xl 2xl:text-3xl 3xl:text-3xl',
              'leading-normal lg:leading-normal xl:leading-normal 2xl:leading-normal 3xl:leading-normal'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.05} duration={1}>
              Günlük yaşamın alışkanlıklarından, yıllara yayılan huzurlu anılara
              kadar her detay; evinizin size ait bir dünyaya dönüşmesi için
              tasarlandı.
            </GsapSplitText>
          </p>
        </div>
        <Sequenced />
      </section>
      <section className='section-container relative z-30 w-full overflow-hidden bg-white py-6 lg:py-12'>
        <StackingCards items={items} />
      </section>
      <FadeInOnScroll>
        <section
          className='section-container lg:py-12'
          id={sections.residences.groundSafety.id}
        >
          <VideoSection
            primaryVideoUrl={melihBulgurVideo}
            thumbnail='/img/thumbnail-melih-bulgur.jpg'
            thumbnailMobile='/img/thumbnail-melih-bulgur-mobile.jpg'
            title={
              <>
                <span className='whitespace-nowrap'>Zemin Güvenliği</span>
                <span className='mx-8 h-12 w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16'>
                  <IconCollab fill={colors.white} />
                </span>
                <span className='whitespace-nowrap'>Huzur Mühendisliği</span>
              </>
            }
          />
        </section>
      </FadeInOnScroll>
    </>
  )
}
