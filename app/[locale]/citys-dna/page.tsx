import { cn } from '@/lib/utils'

import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll'
import { AutoplayVideo } from '@/components/autoplay-video'
import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import { Wrapper } from '@/components/wrapper'
import { dnaMedia } from '@/lib/constants'
import { ScaleOut } from '@/components/animations/scale-out'
import { getTranslations } from 'next-intl/server'
import Balancer from 'react-wrap-balancer'

// Reusable class constants
const sectionGrid = 'grid grid-cols-24'
const contentContainer =
  'col-span-22 px-8 py-16 lg:col-span-16 lg:col-start-6 lg:px-0 lg:py-24 xl:col-span-17 xl:col-start-5 xl:py-36'
const headingStyles = cn(
  'text-left font-primary font-[400] text-black',
  'text-3xl/[1.15] lg:text-4xl/[1.15] xl:text-5xl/[1.15] 2xl:text-7xl/[1.15]',
  'my-6 lg:my-10 xl:my-12'
)
const articleStyles = cn(
  'text-left font-primary font-[300] text-black',
  'text-base/[1.35] lg:text-base/[1.35] xl:text-2xl/[1.35] 2xl:text-[28px]/[1.35]',
  'prose [&_strong]:font-[400] [&_ul]:list-disc [&_li]:marker:text-black'
)
const imageContainerStyles =
  'relative col-span-24 aspect-[16/12] lg:aspect-[16/9] xl:aspect-[16/7]'

export default async function Page({ params }: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'citysDna',
  })

  return (
    <Wrapper
      stickySidebar={false}
      headerWithNavigation={false}
      contactForm={false}
      footer={false}
    >
      {/* Hero Section */}
      <ScaleOut>
        <section className='relative z-10 flex h-screen items-center justify-center'>
          <div className='absolute inset-0 z-0'>
            <Image
              src='/img/citys-dna.jpg'
              alt='Citys DNA Background'
              fill
              className='object-cover object-center'
              mobileSize='100vw'
              desktopSize='100vw'
              quality={100}
              priority
            />
          </div>
          <div className='z-10 flex flex-col items-center gap-3'>
            <article
              className={cn(
                'text-center font-primary font-[400] text-white',
                'text-6xl/tight lg:text-4xl/tight xl:text-[7.25rem]/tight',
                'tracking-wide lg:tracking-wide'
              )}
            >
              {t('hero.title')}
            </article>
            <article
              className={cn(
                'text-center font-primary font-[200] text-white',
                'text-xl/tight lg:text-2xl/tight xl:text-3xl/tight',
                'tracking-wide lg:tracking-wide'
              )}
            >
              {t.rich('hero.subtitle', {
                br: () => <br />,
              })}
            </article>
            <article
              className={cn(
                'text-center font-primary font-[300] text-white',
                'text-xl/tight lg:text-2xl/tight xl:text-3xl/tight',
                'tracking-wide lg:tracking-wide'
              )}
            >
              {t('hero.subsubtitle')}
            </article>
          </div>
          <div className='absolute bottom-[20%] left-1/2 z-50 size-12 -translate-x-1/2 lg:bottom-[8%] xl:size-16 2xl:size-16'>
            <div className='relative size-full animate-bounce-translate'>
              <Image
                src='/svg/scroll-down.svg'
                alt='Scroll Down'
                fill
                className='object-contain'
                priority
              />
            </div>
            <span className='sr-only'>Scroll Down</span>
          </div>
        </section>
      </ScaleOut>

      <div className='relative z-20 bg-white'>
        {/* Geleceğin Şehri Bugüne Geldi. Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                {t.rich('futureCity.title', {
                  br: () => <br className='hidden lg:block' />,
                })}
              </GsapSplitText>
            </h2>
            <article className={articleStyles}>
              <FadeInOnScroll delay={0.35}>
                <div>
                  <p>
                    {t.rich('futureCity.description', {
                      br: () => <br />,
                      b: chunks => <strong>{chunks}</strong>,
                    })}
                  </p>
                  <p>
                    {t.rich('futureCity.p2', {
                      br: () => <br />,
                    })}
                  </p>
                </div>
              </FadeInOnScroll>
            </article>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-1'].src}
              aspectRatio={dnaMedia['dna-1'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Şehir İçinde Bir Mikro Şehir... Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                {t('microCity.title')}
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <>
                  <p>
                    {t.rich('microCity.description', {
                      br: () => <br />,
                      b: chunks => <strong>{chunks}</strong>,
                    })}
                  </p>
                  <p>{t('microCity.p2')}</p>
                </>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-2'].src}
              aspectRatio={dnaMedia['dna-2'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Yaşam Modeli: City's Living Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                {t('citysLiving.title')}
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <p>
                  {t.rich('citysLiving.description', {
                    br: () => <br />,
                    b: chunks => <strong>{chunks}</strong>,
                  })}
                </p>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-3'].src}
              aspectRatio={dnaMedia['dna-3'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* 5 Dakikada Yaşam Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                {t('lifeIn5Minutes.title')}
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <div>
                  <p>
                    {t.rich('lifeIn5Minutes.description', {
                      br: () => <br />,
                      b: chunks => <strong>{chunks}</strong>,
                    })}
                  </p>
                </div>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-4'].src}
              aspectRatio={dnaMedia['dna-4'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Dünya Standartlarında Bir Yaşam Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                {t('worldClassLife.title')}
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <div>
                  <p>{t('worldClassLife.p1')}</p>
                  <p>{t('worldClassLife.p2')}</p>
                  <p>{t('worldClassLife.p3')}</p>
                  <p>
                    <strong>{t('worldClassLife.strong')}</strong>
                    <br />
                    <ul>
                      <li>{t('worldClassLife.list.item1')}</li>
                      <li>{t('worldClassLife.list.item2')}</li>
                      <li>{t('worldClassLife.list.item3')}</li>
                      <li>{t('worldClassLife.list.item4')}</li>
                    </ul>
                  </p>
                </div>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-5'].src}
              aspectRatio={dnaMedia['dna-5'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* City's Park: Şehrin İçinde Bir Vaha Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                {t('citysPark.title')}
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <div>
                  <p>
                    <strong>
                      {t.rich('citysPark.strong', {
                        br: () => <br />,
                      })}
                    </strong>
                  </p>
                  <p>{t('citysPark.p1')}</p>
                </div>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-6'].src}
              aspectRatio={dnaMedia['dna-6'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Akıllı Binalar, Entegre ve Sürdürülebilir Yaşam Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                <Balancer>{t('smartBuildings.title')}</Balancer>
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <ul>
                  <li>{t('smartBuildings.list.item1')}</li>
                  <li>{t('smartBuildings.list.item2')}</li>
                  <li>{t('smartBuildings.list.item3')}</li>
                  <li>{t('smartBuildings.list.item4')}</li>
                  <li>{t('smartBuildings.list.item5')}</li>
                  <li>{t('smartBuildings.list.item6')}</li>
                </ul>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-7'].src}
              aspectRatio={dnaMedia['dna-7'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Yaşamı Kolaylaştıran Ayrıcalıklar Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                {t('privileges.title')}
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <>
                  <p>{t('privileges.p1')}</p>
                  <ul>
                    <li>{t('privileges.list.item1')}</li>
                    <li>{t('privileges.list.item2')}</li>
                    <li>{t('privileges.list.item3')}</li>
                    <li>{t('privileges.list.item4')}</li>
                    <li>{t('privileges.list.item5')}</li>
                  </ul>
                  <p>
                    <strong>{t('privileges.strong')}</strong>
                  </p>
                </>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-8'].src}
              aspectRatio={dnaMedia['dna-8'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Global Bir Yönetim Vizyonu Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                {t('globalVision.title')}
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <p>{t('globalVision.p1')}</p>
                <p>{t('globalVision.p2')}</p>
                <p>
                  {t('globalVision.p3')}{' '}
                  <a
                    href='https://wamturkey.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    (wamturkey.com)
                  </a>
                </p>
              </article>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Son Söz Section */}
        <section className={cn(sectionGrid)}>
          <div className={cn(contentContainer, 'pt-0')}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                {t('conclusion.title')}
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <>
                  <p>
                    {t.rich('conclusion.p1', {
                      br: () => <br />,
                    })}
                  </p>
                  <p className='my-16 block'>
                    <span className='block border-b border-gray-900 py-4 text-3xl font-[200] xl:text-4xl'>
                      {t('conclusion.liveMore')}
                    </span>
                    <span className='block border-b border-gray-900 py-4 text-3xl font-[300] xl:text-4xl'>
                      {t('conclusion.livePeacefully')}
                    </span>
                    <span className='block border-b border-gray-900 py-4 text-3xl font-[400] xl:text-4xl'>
                      {t('conclusion.liveFully')}
                    </span>
                  </p>
                  <p>
                    <strong>{t('conclusion.welcome')}</strong>
                  </p>
                  <p>
                    <strong>{t('conclusion.footer')}</strong>
                  </p>
                </>
              </article>
            </FadeInOnScroll>
          </div>
        </section>
      </div>
    </Wrapper>
  )
}
