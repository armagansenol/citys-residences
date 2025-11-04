import { cn } from '@/lib/utils'
import { getMessages, getTranslations } from 'next-intl/server'

import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll'
import { ScaleOut } from '@/components/animations/scale-out'
import { GsapSplitText } from '@/components/gsap-split-text'
import { IconCollab } from '@/components/icons'
import { Image } from '@/components/image'
import { SectionContactForm } from '@/components/section-contact-form'
import { SectionSetter } from '@/components/section-setter'
import { VideoWithText } from '@/components/video-with-text'
import { VimeoPlayer } from '@/components/vimeo-player'
import { liveMore, livePeacefully, navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { FormTranslations } from '@/types'

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
    <SectionSetter sectionId={navigationConfig['/']?.id as string}>
      <section
        className={cn(
          'relative z-10 h-screen overflow-hidden',
          'before:absolute before:bottom-0 before:left-0 before:z-20 before:h-[300px] before:w-full before:bg-gradient-to-t before:from-black/90 before:to-transparent lg:before:h-[200px]',
          'after:absolute after:left-0 after:top-0 after:z-20 after:h-[200px] after:w-full after:bg-gradient-to-b after:from-black/50 after:to-transparent'
        )}
        id={navigationConfig['/']?.id}
      >
        <ScaleOut>
          <div className='pointer-events-none relative hidden h-screen w-full xl:block'>
            <VimeoPlayer
              poster='/img/desktop-hero-poster.jpg'
              src='https://player.vimeo.com/progressive_redirect/playback/1130616578/rendition/1080p/file.mp4?loc=external&log_user=0&signature=4c84b12cfbf4f5ae9ef7087bd4cc4277a815c1235d739ebda936132a2a46214b'
            />
          </div>
          <div className='pointer-events-none relative block h-screen w-full xl:hidden'>
            <VimeoPlayer
              poster='/img/mobile-hero-poster.jpg'
              src='https://player.vimeo.com/progressive_redirect/playback/1132514015/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=ba1b650d11719cb9702714d5b6709e4f0c4d9a72bd6cedab51735cf312430ad8'
            />
          </div>
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
        <div className='absolute bottom-[20%] left-1/2 z-50 size-12 -translate-x-1/2 lg:bottom-[8%] xl:size-16 2xl:size-16'>
          <div className='relative size-full animate-bounce-translate'>
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
              <div className='flex w-full flex-shrink-0 flex-col items-center gap-2 lg:w-[300px] lg:gap-2 xl:w-[700px]'>
                <article
                  className={cn(
                    'text-center font-primary font-[400] text-black',
                    'text-xl/tight lg:text-4xl/tight xl:text-5xl/tight',
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
                    'text-center font-primary font-[400] text-black',
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
                    'text-center font-primary font-[400] text-black',
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
                'flex flex-shrink-0',
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
          className='xl:aspect-[1280/852]'
          aspect={livePeacefully.aspect()}
          customPoster={livePeacefullyPoster.src}
          mediaId='dxd0f32sha'
          title={t.rich('livePeacefully.title', {
            strong: chunks => <strong>{chunks}</strong>,
          })}
          description={t('livePeacefully.description')}
        />
        <SectionContactForm formTranslations={formTranslations} />
        <VideoWithText
          className='xl:aspect-[1920/1198]'
          aspect={liveMore.aspect()}
          customPoster={liveMorePoster.src}
          mediaId='cpkxfmdyvb'
          title={t.rich('liveFully.title', {
            strong: chunks => <strong>{chunks}</strong>,
          })}
          description={t('liveFully.description')}
        />
      </div>
    </SectionSetter>
  )
}
