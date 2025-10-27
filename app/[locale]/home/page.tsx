import { cn } from '@/lib/utils'
import { getMessages, getTranslations } from 'next-intl/server'

import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll'
import { ScaleOut } from '@/components/animations/scale-out'
import { GsapSplitText } from '@/components/gsap-split-text'
import { IconCollab } from '@/components/icons'
import { Image } from '@/components/image'
import { SectionContactForm } from '@/components/section-contact-form'
import { VideoWithText } from '@/components/video-with-text'
// import { WistiaPlayerWrapper } from '@/components/wistia-player'
import { citysParkVideo, navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { FormTranslations } from '@/types'

// import heroVideoPoster from '@/public/img/poster-hero.jpg'
import liveMorePoster from '@/public/img/thumbnail-live-more.jpg'
import livePeacefullyPoster from '@/public/img/thumbnail-live-peacefully.jpg'
import { SectionSetter } from '@/components/section-setter'
import { VimeoPlayer } from '@/components/vimeo-player'

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
        className={cn(
          'relative z-10 h-[100vh] overflow-hidden',
          'before:absolute before:bottom-0 before:left-0 before:z-20 before:h-[300px] before:w-full before:bg-gradient-to-t before:from-black/90 before:to-transparent lg:before:h-[200px]',
          'after:absolute after:left-0 after:top-0 after:z-20 after:h-[200px] after:w-full after:bg-gradient-to-b after:from-black/50 after:to-transparent'
        )}
        id={navigationConfig['/']?.id}
      >
        <ScaleOut>
          {/* <div className='pointer-events-none relative h-svh w-full'>
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
          </div> */}
          <div className='pointer-events-none relative h-svh w-full'>
            <VimeoPlayer
              poster='/img/poster-hero.jpg'
              src='https://player.vimeo.com/progressive_redirect/playback/1130616578/rendition/1080p/file.mp4?loc=external&log_user=0&signature=4c84b12cfbf4f5ae9ef7087bd4cc4277a815c1235d739ebda936132a2a46214b'
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
              'flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-0'
            )}
          >
            <span
              className={cn(
                'whitespace-nowrap text-center font-montserrat font-[500] text-white',
                'text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight xl:text-5xl/tight 2xl:text-5xl/tight 3xl:text-6xl/tight',
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
                'block translate-y-1 leading-[1]'
              )}
            >
              CITY
              <span className='font-montagu-slab font-[400] leading-[0.5]'>
                &apos;
              </span>
              S
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
          <div className='relative ml-0 flex flex-col items-center justify-center gap-8 py-12 xl:ml-32 xl:flex-row xl:gap-32 xl:py-28'>
            <div className='flex w-full flex-shrink-0 flex-col items-center gap-2 lg:w-[300px] lg:gap-2 xl:w-[700px]'>
              <article
                className={cn(
                  'text-center font-montserrat font-[500] text-black',
                  'text-xl/tight lg:text-4xl/tight xl:text-5xl/tight',
                  'tracking-wide lg:tracking-wide'
                )}
              >
                <GsapSplitText type='chars' stagger={0.02} duration={1.5}>
                  {t('section1.title1')}
                </GsapSplitText>
                <span className='sr-only'>{t('section1.title1')}</span>
              </article>
              <FadeInOnScroll delay={0.5}>
                <article className='relative h-16 w-screen lg:h-24 xl:h-32'>
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
            <article
              className={cn(
                'flex w-auto flex-shrink-0 xl:w-96',
                'font-primary font-[200] text-black',
                'text-xl/normal lg:text-2xl/normal xl:text-3xl/normal',
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
        <SectionContactForm formTranslations={formTranslations} />
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
