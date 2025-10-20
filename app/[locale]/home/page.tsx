import { cn } from '@/lib/utils'
import { getMessages, getTranslations } from 'next-intl/server'

import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll'
import { ScaleOut } from '@/components/animations/scale-out'
import { ContactForm } from '@/components/form-contact'
import { GsapSplitText } from '@/components/gsap-split-text'
import { IconCollab } from '@/components/icons'
import { Image } from '@/components/image'
import { VideoWithText } from '@/components/video-with-text'
import { WistiaPlayerWrapper } from '@/components/wistia-player'
import { citysParkVideo, navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { FormTranslations } from '@/types'

import heroVideoPoster from '@/public/img/poster-hero.jpg'
import liveMorePoster from '@/public/img/thumbnail-live-more.jpg'
import livePeacefullyPoster from '@/public/img/thumbnail-live-peacefully.jpg'

export default async function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'home' })
  const messages = await getMessages({ locale })
  type ContactMessages = { contact: { form: FormTranslations } }
  const formTranslations = (messages as unknown as ContactMessages).contact.form

  return (
    <>
      <section
        className='relative z-10 h-[100vh] overflow-hidden'
        id={navigationConfig['/']?.id}
      >
        <ScaleOut>
          <div className='pointer-events-none relative h-[100vh] w-full'>
            <WistiaPlayerWrapper
              mediaId='e2tew1zhxj'
              muted
              autoplay
              preload='auto'
              qualityMin={1080}
              swatch={false}
              bigPlayButton={false}
              silentAutoplay='allow'
              endVideoBehavior='loop'
              controlsVisibleOnLoad={false}
              playBarControl={false}
              volumeControl={false}
              settingsControl={false}
              transparentLetterbox={true}
              customPoster={heroVideoPoster.src}
              posterPriority={true}
            />
          </div>
        </ScaleOut>
        <div className='absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
          <div
            className={cn(
              'flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-0'
            )}
          >
            <span
              className={cn(
                'whitespace-nowrap text-center font-montserrat font-[500] text-white',
                'text-2xl sm:text-3xl lg:text-5xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl',
                'leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight',
                'flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-0'
              )}
            >
              Yaşam Yeniden Tasarlandı
            </span>
            <span className='mx-8 h-12 w-12 2xl:h-14 2xl:w-14 3xl:h-16 3xl:w-16'>
              <IconCollab fill={colors.white} />
            </span>
            <span
              className={cn(
                'text-center font-copperplate font-[700] text-white',
                'text-[44px] lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl',
                'block translate-y-1 leading-[0]'
              )}
            >
              CITY
              <span className='font-montagu-slab font-normal leading-[0.5]'>
                &apos;
              </span>
              S
            </span>
          </div>
        </div>
        <div className='absolute bottom-[8%] left-1/2 z-50 size-12 -translate-x-1/2 xl:size-16 2xl:size-16'>
          <div className='size-full animate-bounce-translate'>
            <Image
              src='/svg/scroll-down.svg'
              alt='Scroll Down'
              fill
              className='object-contain'
            />
          </div>
          <span className='sr-only'>Scroll Down</span>
        </div>
      </section>
      <div className='relative z-20 bg-white'>
        <section className='relative py-12 lg:py-12'>
          <div className='relative ml-32 flex items-center justify-center gap-32 py-12 xl:py-28'>
            <div className='flex w-[700px] flex-shrink-0 flex-col items-center gap-2 lg:gap-2'>
              <article
                className={cn(
                  'text-center font-montserrat font-[500] text-trapped-darkness',
                  'text-4xl lg:text-5xl',
                  'leading-tight lg:leading-tight',
                  'tracking-wide lg:tracking-widest'
                )}
              >
                <GsapSplitText splitBy='chars' stagger={0.02} duration={1.5}>
                  {t('section1.title1')}
                </GsapSplitText>
                <span className='sr-only'>{t('section1.title1')}</span>
              </article>
              <FadeInOnScroll delay={0.5}>
                <article className='relative h-16 w-screen lg:h-44 xl:h-32'>
                  <Image
                    src='/img/sanati.png'
                    alt='Sanatı'
                    fill
                    className='object-contain'
                    desktopSize='40vw'
                    mobileSize='100vw'
                    loading='lazy'
                  />
                  <span className='sr-only'>{t('section1.title2')}</span>
                </article>
              </FadeInOnScroll>
            </div>
            <div className='flex w-96 flex-shrink-0'>
              <article
                className={cn(
                  'text-left font-primary font-[200] text-trapped-darkness',
                  'text-[0.8rem] lg:text-3xl',
                  'leading-relaxed'
                )}
              >
                <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
                  {t('section1.title3')}
                </GsapSplitText>
              </article>
            </div>
          </div>
        </section>
        <VideoWithText
          customPoster={livePeacefullyPoster.src}
          mediaId='dxd0f32sha'
          primaryVideoUrl={citysParkVideo}
          title={
            <span>
              Daha <strong>huzurlu</strong> yaşa.
            </span>
          }
          description={
            <>
              Farklı ve zamansız mimarinin, doğanın cömertliği ile buluştuğu
              mekanlarda güven içinde, daha huzurlu yaşa.
            </>
          }
        />
        <section className='bg-gradient-appointment py-8 xl:py-40'>
          <FadeInOnScroll delay={0.25}>
            <div className='grid grid-cols-12 px-16 lg:col-start-4 lg:grid-cols-24'>
              <div className='col-span-12 mb-12 lg:col-span-18 lg:col-start-6 lg:mb-24'>
                <h3
                  className={cn(
                    'mb-4 font-primary font-[400] text-white lg:mb-4',
                    'text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl',
                    'leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight'
                  )}
                >
                  Randevu al
                </h3>
                <p
                  className={cn(
                    'max-w-[90%] font-primary font-[300] text-white',
                    'text-2xl lg:text-2xl xl:text-xl 2xl:text-2xl 3xl:text-2xl',
                    'leading-snug lg:leading-snug xl:leading-snug 2xl:leading-snug',
                    'xl:max-w-md 2xl:max-w-lg 3xl:max-w-lg'
                  )}
                >
                  Ekibimizin sizinle iletişime geçebilmesi için lütfen kayıt
                  formunu doldurunuz.
                </p>
              </div>
              <div className='col-span-12 lg:col-span-18 lg:col-start-6'>
                <ContactForm translations={formTranslations} />
              </div>
            </div>
          </FadeInOnScroll>
        </section>
        <VideoWithText
          customPoster={liveMorePoster.src}
          mediaId='cpkxfmdyvb'
          primaryVideoUrl={citysParkVideo}
          title={
            <span>
              Daha <strong>dolu</strong> yaşa.
            </span>
          }
          description={
            <>
              Spor, sanat, kültür, alışveriş, eğlence ve çok daha fazlasını bir
              araya getiren yeni bir yaşam dizaynı ile daha dolu yaşa.
            </>
          }
        />
      </div>
    </>
  )
}
