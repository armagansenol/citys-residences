import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'

const ZoomImageDialog = dynamic(
  () =>
    import('@/components/dialogs/zoom-image-dialog').then(
      module => module.ZoomImageDialog
    ),
  {
    ssr: false,
  }
)

import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import { InteractiveMap } from '@/components/interactive-map'
import { PageTitle } from '@/components/page-title'
import { QuoteWithVideo } from '@/components/quote-with-video'
import { navigationConfig, projectBanner } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

import a1 from '@/public/img/project/a-1.jpg'
import a2 from '@/public/img/project/a-2.jpg'
import b1Mobile from '@/public/img/project/b-1-mobile.jpg'
import b1 from '@/public/img/project/b-1.jpg'

import { AutoplayVideo } from '@/components/autoplay-video'
import { SectionSetter } from '@/components/section-setter'
import a1Zoom from '@/public/img/project/a-1-zoom.jpg'
import a2Zoom from '@/public/img/project/a-2-zoom.jpg'

const images = {
  a1,
  a2,
  b1,
  b1Mobile,
  a1Zoom,
  a2Zoom,
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'project' })
  return (
    <SectionSetter sectionId={navigationConfig['/project']?.id as string}>
      <PageTitle
        primaryColor={colors['white']}
        secondaryColor={colors['bricky-brick']}
        tertiaryColor={colors['bricky-brick']}
        title={t('pageTitle.title')}
        description={t.rich('pageTitle.description', {
          br: () => <span className='hidden lg:block' />,
          strong: chunks => <strong className='font-[500]'>{chunks}</strong>,
        })}
        id={navigationConfig['/project']?.id as string}
        bgImage='/img/backgrounds/red.png'
      />
      <section className='relative h-screen overflow-hidden lg:h-[60vw] xl:h-[45vw]'>
        <AutoplayVideo
          playbackId={projectBanner.muxSrc}
          aspectRatio={projectBanner.aspect()}
        />
      </section>
      <InteractiveMap />
      <div className='gap-y-8 py-12'>
        {/* block and parking entrances text*/}
        <section className='grid grid-cols-24 gap-y-4 px-8 py-8 lg:px-0 lg:py-16 xl:py-36'>
          <div className='col-span-24 flex lg:col-span-9 lg:col-start-6 xl:col-span-8 xl:col-start-7'>
            <h3
              className={cn(
                'lg:ml-auto',
                'text-left font-primary font-[400] text-black',
                'text-3xl/[1.15] lg:text-4xl/[1.15] xl:text-5xl/[1.15] 2xl:text-6xl/[1.15] 3xl:text-6xl/[1.15]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {t('sections.blockParking.title')}
              </GsapSplitText>
            </h3>
          </div>
          <div className='col-span-24 lg:col-span-9 lg:px-16 xl:col-span-8 2xl:px-20'>
            <article
              className={cn(
                'text-left font-primary font-[300] text-black',
                'text-base/snug lg:text-base/snug xl:text-xl/snug 2xl:text-xl/snug 3xl:text-2xl/snug',
                'prose'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {t('sections.blockParking.p1')}
                <p></p>
                {t('sections.blockParking.p2')}
              </GsapSplitText>
            </article>
          </div>
        </section>
        {/* blok ve otopark girişleri images*/}
        <section className='grid grid-cols-24 gap-x-0 gap-y-6 px-8 py-4 lg:gap-x-4 lg:gap-y-0 lg:px-0 lg:py-8'>
          <div className='col-span-24 aspect-[16/9] lg:col-span-8 lg:col-start-7'>
            <ZoomImageDialog
              dialogTrigger={
                <Image
                  className='h-full w-full'
                  src={images.a1.src}
                  alt='Project Visual'
                  loading='lazy'
                />
              }
              dialogContent={
                <div className='relative h-screen w-screen'>
                  <Image
                    className='h-screen w-screen object-contain'
                    fill
                    mobileSize='100vw'
                    desktopSize='100vw'
                    src={images.a1Zoom.src}
                    alt='Project Visual'
                    loading='lazy'
                  />
                </div>
              }
            />
          </div>
          <div className='col-span-24 aspect-[16/9] lg:col-span-8'>
            <ZoomImageDialog
              dialogTrigger={
                <Image
                  className='h-full w-full'
                  src={images.a2.src}
                  alt='Project Visual'
                  loading='lazy'
                />
              }
              dialogContent={
                <div className='relative h-screen w-screen'>
                  <Image
                    className='h-screen w-screen object-contain'
                    src={images.a2Zoom.src}
                    fill
                    desktopSize='100vw'
                    mobileSize='100vw'
                    alt='Project Visual'
                    loading='lazy'
                  />
                </div>
              }
            />
          </div>
        </section>
        {/* green spaces text*/}
        <section
          className={cn(
            'grid grid-cols-24 gap-x-0 gap-y-6 lg:gap-x-4 lg:gap-y-0',
            'px-8 py-8 pb-24 pt-12 lg:px-0 xl:pb-0 xl:pt-44'
          )}
        >
          <div className='col-span-24 flex justify-start lg:col-span-8 lg:col-start-7 lg:justify-center'>
            <h3
              className={cn(
                'text-left font-primary font-[400] text-black',
                'text-3xl/[1.15] lg:text-4xl/[1.15] xl:text-5xl/[1.15] 2xl:text-6xl/[1.15] 3xl:text-6xl/[1.15]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {t('sections.greenAreas.title')}
              </GsapSplitText>
            </h3>
          </div>
          <div className='col-span-24 lg:col-span-8 lg:px-20'>
            <p
              className={cn(
                'text-left font-primary font-[300] text-black',
                'text-base/snug lg:text-base/snug xl:text-xl/snug 2xl:text-xl/snug 3xl:text-2xl/snug',
                'prose',
                'max-w-[90%] 2xl:max-w-[65%]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {t('sections.greenAreas.p1')}
              </GsapSplitText>
            </p>
          </div>
        </section>
        {/* green spaces images*/}
        <section
          className={cn('grid grid-cols-24', 'px-8 py-12 lg:px-0 lg:py-20')}
        >
          <div className='col-span-24 aspect-[9/10] lg:col-span-18 lg:-col-end-3 lg:aspect-[16/9]'>
            <ZoomImageDialog
              dialogTrigger={
                <>
                  <Image
                    className='hidden h-full w-full object-cover sm:block lg:object-contain'
                    src={images.b1.src}
                    alt='Project Visual'
                    loading='lazy'
                  />
                  <Image
                    className='block h-full w-full object-contain sm:hidden'
                    src={images.b1Mobile.src}
                    alt='Project Visual'
                    loading='lazy'
                  />
                </>
              }
              dialogContent={
                <div className='relative h-screen w-screen'>
                  <Image
                    className='h-full w-full object-contain'
                    fill
                    desktopSize='100vw'
                    mobileSize='100vw'
                    src={images.b1.src}
                    alt='Project Visual'
                    loading='lazy'
                  />
                </div>
              }
            />
          </div>
        </section>
        {/* architects say text*/}
        <section className='grid grid-cols-24 gap-x-0 gap-y-6 px-8 py-8 lg:gap-x-4 lg:gap-y-0 lg:px-0 lg:py-8 xl:pb-0 xl:pt-32'>
          <div className='col-span-24 flex justify-start lg:col-span-8 lg:col-start-7 lg:justify-center lg:pl-24 xl:pl-44'>
            <h3
              className={cn(
                'text-left font-primary font-[400] text-black',
                'text-3xl/[1.15] lg:text-4xl/[1.15] xl:text-5xl/[1.15] 2xl:text-6xl/[1.15] 3xl:text-6xl/[1.15]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {t('sections.architectsSay.title')}
              </GsapSplitText>
            </h3>
          </div>
          <div className='col-span-24 lg:col-span-8 lg:pl-24 xl:px-24'>
            <p
              className={cn(
                'text-left font-primary font-[300] text-black',
                'text-base/snug lg:text-base/snug xl:text-xl/snug 2xl:text-xl/snug 3xl:text-2xl/snug',
                'max-w-[90%]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                {t('sections.architectsSay.p1')}
              </GsapSplitText>
            </p>
          </div>
        </section>
        <section className='grid grid-cols-24 gap-0 px-8 py-8 lg:gap-4 lg:px-0 lg:py-16'>
          <div className='relative col-span-24 grid aspect-[16/16.75] grid-cols-24 gap-0 sm:aspect-[16/7] lg:col-span-16 lg:col-start-7 lg:gap-8'>
            <Image
              className='hidden object-contain sm:block'
              src='/img/architects-grid.png'
              alt='Project Visual'
              loading='lazy'
              fill
              desktopSize='80vw'
            />
            <Image
              className='block object-contain sm:hidden'
              src='/img/architects-grid-mobile.png'
              alt='Project Visual'
              loading='lazy'
              fill
              desktopSize='80vw'
            />
          </div>
        </section>
      </div>
      {/* architecture sections */}
      <QuoteWithVideo
        quote={t('quotes.architecture.quote')}
        mediaId='tDjMbuCzuO9iJCH901CkmX1KxMf00pr8ugfUKCNr018Zmw'
        thumbnail='/img/thumbnail-murat-kader.jpg'
        portraitImage='/img/murat-kader-portrait.png'
        portraitImageMobile='/img/murat-kader-portrait.png'
        personName='Murat Kader'
        personTitle={t('quotes.architecture.personTitle')}
        sidebarText={t('quotes.architecture.sidebarText')}
        primaryColor={colors['bricky-brick']}
        secondaryColor={colors['white']}
        hasBg
      />
      <QuoteWithVideo
        quote={t('quotes.interior.quote')}
        mediaId='mLJCKzl700KKCbhHSdsjKoe02wBdIqCtu3IqmjNPDp6og'
        thumbnail='/img/thumbnail-toners.jpg'
        portraitImage='/img/toners-portrait.png'
        portraitImageMobile='/img/toners-portrait-mobile.png'
        personName={
          <>
            Mustafa & <span className='block xl:hidden' /> Emre Toner
          </>
        }
        personTitle={t('quotes.interior.personTitle')}
        sidebarText={t('quotes.interior.sidebarText')}
        primaryColor={colors['white']}
        secondaryColor={colors['bricky-brick']}
        hasBg={false}
      />
      <QuoteWithVideo
        quote={t('quotes.landscape.quote')}
        mediaId='iiovQu22t3dx6FSfG5m2zhMOrrONjfXhQeDS01NqzMtI'
        thumbnail='/img/thumbnail-aktas.jpg'
        portraitImage='/img/aktas-portrait.png'
        portraitImageMobile='/img/aktas-portrait-mobile.png'
        personName={
          <>
            Cemil Aktaş, <span className='block xl:hidden' /> Pınar Kesim Aktaş
          </>
        }
        personTitle={t('quotes.landscape.personTitle')}
        sidebarText={t('quotes.landscape.sidebarText')}
        primaryColor={colors['army-canvas']}
        secondaryColor={colors['white']}
        hasBg={false}
        portraitClassName='w-[65%]'
      />
      <QuoteWithVideo
        quote={t('quotes.structural.quote')}
        mediaId='CFIFTz5N8wsl6VdwWBpKfeVg2TAgykGz9Xtjf700Dx2w'
        thumbnail='/img/thumbnail-melih-bulgur.jpg'
        portraitImage='/img/melih-bulgur-portrait.png'
        portraitImageMobile='/img/melih-bulgur-portrait-mobile.png'
        personName='Melih Bulgur'
        personTitle={t('quotes.structural.personTitle')}
        sidebarText={t('quotes.structural.sidebarText')}
        primaryColor={colors['birch-strain']}
        secondaryColor={colors['white']}
        hasBg={false}
      />
    </SectionSetter>
  )
}
