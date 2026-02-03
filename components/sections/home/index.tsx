import { cn } from '@/lib/utils'
import { getMessages, getTranslations } from 'next-intl/server'

import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll'
import { ScaleOut } from '@/components/animations/scale-out'
import { GsapSplitText } from '@/components/gsap-split-text'
import { HeroVideo } from '@/components/hero-video'
import { IconCollab } from '@/components/icons'
import { Image } from '@/components/image'
import { SectionContactForm } from '@/components/section-contact-form'
import { SectionSetter } from '@/components/section-setter'
import { VideoWithText } from '@/components/video-with-text'
import { getCountries } from '@/lib/api/countries'
import { liveMore, livePeacefully, navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { FormTranslations } from '@/types'

import desktopPoster from '@/public/img/hero-thumbnail-desktop.webp'
import mobilePoster from '@/public/img/hero-thumbnail-mobile.webp'

// import liveMorePoster from '@/public/img/thumbnail-live-more.jpg'
// import livePeacefullyPoster from '@/public/img/thumbnail-live-peacefully.jpg'

export default async function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'home' })
  const messages = await getMessages({ locale })
  type ContactMessages = { contact: { form: FormTranslations } }
  const formTranslations = (messages as unknown as ContactMessages).contact.form
  const countries = getCountries()

  return (
    <SectionSetter sectionId={navigationConfig['/']?.id as string}>
      <section
        className={cn(
          'relative z-10 h-screen overflow-hidden',
          'before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-50 before:h-[300px] before:w-full before:bg-gradient-to-t before:from-black/90 before:to-transparent lg:before:h-[200px]',
          'after:pointer-events-none after:absolute after:left-0 after:top-0 after:z-50 after:h-[200px] after:w-full after:bg-gradient-to-b after:from-black/50 after:to-transparent'
        )}
        id={navigationConfig['/']?.id}
      >
        <ScaleOut>
          <HeroVideo
            desktopVideoId='xFW02Bl3KwJGCzmUUbAwE5NC5WJW01hIqmm7heGEYx2NM'
            mobileVideoId='Hg9dD402dgbmsAX3VwXFX3EW49jlP02cYMUZGOkL69aAY'
            desktopPoster={desktopPoster.src}
            mobilePoster={mobilePoster.src}
          />
        </ScaleOut>
        <div
          className={cn(
            'absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2'
          )}
        >
          <div
            className={cn(
              'flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-0'
            )}
          >
            <span
              className={cn(
                'whitespace-nowrap font-primary font-[500] text-white',
                'text-[1.75rem]/[1.15] sm:text-4xl/[1.15] lg:text-5xl/[1.15] xl:text-5xl/[1.15] 2xl:text-5xl/[1.15] 3xl:text-5xl/[1.15]',
                'flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-0'
              )}
            >
              {t('hero.title')}
            </span>
            <span className='mx-8 size-8 2xl:h-14 2xl:w-14 3xl:h-16 3xl:w-16'>
              <IconCollab fill={colors.white} />
            </span>
            <span
              className={cn(
                'whitespace-nowrap text-center font-primary font-[500] text-white',
                'text-[1.75rem]/[1.15] sm:text-4xl/[1.15] lg:text-5xl/[1.15] xl:text-5xl/[1.15] 2xl:text-5xl/[1.15] 3xl:text-5xl/[1.15]'
              )}
            >
              CITY&apos;S
            </span>
          </div>
        </div>
      </section>
      <div
        className={cn(
          'relative z-20 bg-white'
          // 'after:absolute after:left-0 after:top-0 after:z-20 after:h-[70px] after:w-full after:bg-gradient-to-b after:from-black/70 after:to-transparent lg:after:hidden'
        )}
      >
        <SectionSetter sectionId={navigationConfig['/']?.id || ''} />
        <section className='relative overflow-hidden py-12 lg:py-12'>
          <div className='relative ml-0 flex flex-col items-center justify-center gap-8 py-12 xl:ml-32 xl:flex-row xl:gap-32 xl:py-32'>
            {locale === 'tr' && (
              <div className='flex w-full flex-shrink-0 flex-col items-center gap-4 lg:w-[300px] lg:gap-2 xl:w-[700px]'>
                <article
                  className={cn(
                    'text-center font-primary font-[400] text-bricky-brick',
                    'text-3xl/tight lg:text-4xl/tight xl:text-5xl/tight',
                    'tracking-wide lg:tracking-wide'
                  )}
                >
                  <GsapSplitText type='chars' stagger={0.02} duration={1.5}>
                    YAŞAMA
                  </GsapSplitText>
                  <span className='sr-only'>YAŞAMA</span>
                </article>
                <FadeInOnScroll delay={0.25}>
                  <article className='relative h-16 w-screen lg:h-24 xl:h-32 2xl:h-36'>
                    <Image
                      src='/img/sanati.png'
                      alt='Sanatı Yazısı'
                      fill
                      className='object-contain'
                      desktopSize='40vw'
                      mobileSize='100vw'
                      loading='lazy'
                    />
                    <span className='sr-only'>SANATI</span>
                  </article>
                </FadeInOnScroll>
              </div>
            )}
            {locale === 'en' && (
              <div className='flex w-full flex-shrink-0 flex-col items-center gap-2 lg:w-[300px] lg:gap-4 xl:w-[700px]'>
                <article
                  className={cn(
                    'text-center font-primary font-[400] text-bricky-brick',
                    'text-xl/tight lg:text-4xl/tight xl:text-4xl/tight',
                    'tracking-wide lg:tracking-wide'
                  )}
                >
                  <GsapSplitText type='chars' stagger={0.02} duration={1.5}>
                    THE
                  </GsapSplitText>
                  <span className='sr-only'>THE</span>
                </article>
                <FadeInOnScroll delay={0.25}>
                  <article className='relative h-16 w-screen lg:h-24 xl:h-32 2xl:h-36'>
                    <Image
                      src='/img/art.png'
                      alt='Art Text Image'
                      fill
                      className='object-contain'
                      desktopSize='40vw'
                      mobileSize='100vw'
                      loading='lazy'
                    />
                    <span className='sr-only'>ART</span>
                  </article>
                </FadeInOnScroll>
                <article
                  className={cn(
                    'text-center font-primary font-[400] text-bricky-brick',
                    'text-xl/tight lg:text-4xl/tight xl:text-4xl/tight',
                    'tracking-wide lg:tracking-wide'
                  )}
                >
                  <GsapSplitText type='chars' stagger={0.02} duration={1.5}>
                    OF LIVING
                  </GsapSplitText>
                  <span className='sr-only'>OF LIVING</span>
                </article>
              </div>
            )}
            <article
              className={cn(
                'flex flex-shrink-0 justify-center xl:justify-start',
                'w-[70%] xl:w-[400px]',
                'font-primary font-[200] text-black',
                'text-lg/normal lg:text-2xl/normal xl:text-3xl/normal',
                'text-center lg:text-left'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {t('section1.title3')}
              </GsapSplitText>
            </article>
          </div>
        </section>
        <VideoWithText
          aspect={livePeacefully.aspect()}
          mediaId={livePeacefully.muxSrc as string}
          thumbnail={livePeacefully.thumbnail}
          title={t.rich('livePeacefully.title', {
            strong: chunks => <strong>{chunks}</strong>,
          })}
          description={t('livePeacefully.description')}
        />
        <SectionContactForm
          formTranslations={formTranslations}
          countries={countries}
        />
        <VideoWithText
          aspect={liveMore.aspect()}
          mediaId={liveMore.muxSrc as string}
          thumbnail={liveMore.thumbnail}
          title={t.rich('liveFully.title', {
            strong: chunks => <strong>{chunks}</strong>,
          })}
          description={t('liveFully.description')}
          horizontalPosition={70}
        />
      </div>
    </SectionSetter>
  )
}
