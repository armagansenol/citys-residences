import { cn } from '@/lib/utils'

import { ZoomImageDialog } from '@/components/dialogs/zoom-image-dialog'
import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import { InteractiveMap } from '@/components/interactive-map'
import { PageTitle } from '@/components/page-title'
import { QuoteWithVideo } from '@/components/quote-with-video'
import { WistiaPlayerWrapper } from '@/components/wistia-player'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

import a1 from '@/public/img/project/a-1.jpg'
import a2 from '@/public/img/project/a-2.jpg'
import b1 from '@/public/img/project/b-1.jpg'
import a1Zoom from '@/public/img/project/a-1-zoom.jpg'
import a2Zoom from '@/public/img/project/a-2-zoom.jpg'

const images = {
  a1,
  a2,
  b1,
  a1Zoom,
  a2Zoom,
}

export default function Page() {
  return (
    <>
      <PageTitle
        primaryColor={colors['white']}
        secondaryColor={colors['bricky-brick']}
        tertiaryColor={colors['bricky-brick']}
        title='PROJE'
        description={
          <>
            Her köşesi özenle düşünülmüş bir{' '}
            <strong>karma yaşam projesi.</strong>
          </>
        }
        id={navigationConfig['/project']?.id as string}
      />
      <section className='pointer-events-none relative h-screen overflow-hidden lg:h-[60vw] xl:h-[45vw]'>
        <WistiaPlayerWrapper
          mediaId='p4l0a63nut'
          autoplay
          muted
          preload='none'
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
        />
      </section>
      <InteractiveMap />
      <div className='space-y-8 py-12'>
        <section className='grid grid-cols-24 gap-4 px-8 py-8 lg:px-0 lg:py-16 xl:py-36'>
          <div className='col-span-24 flex lg:col-span-9 lg:col-start-6 xl:col-span-8 xl:col-start-7'>
            <h3
              className={cn(
                'lg:ml-auto',
                'text-left font-primary font-[400] text-black',
                'text-3xl/[1.15] lg:text-4xl/[1.15] xl:text-6xl/[1.15]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                Blok ve Otopark <br />
                Girişleri
              </GsapSplitText>
            </h3>
          </div>
          <div className='col-span-24 lg:col-span-9 lg:px-16 xl:col-span-8'>
            <p
              className={cn(
                'text-left font-primary font-[300] text-black',
                'text-base/snug lg:text-base/snug xl:text-2xl/snug'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                Her blok için ayrı tasarlanmış lobi ve girişler, güvenli ve
                prestijli bir karşılama sunuyor.
                <br />
                Geniş otopark ve doğrudan blok bağlantılarıyla, zamandan
                kazandıran kolay erişim.
              </GsapSplitText>
            </p>
          </div>
        </section>
        <section className='grid grid-cols-24 gap-x-0 gap-y-6 px-8 py-4 lg:gap-x-4 lg:gap-y-0 lg:px-0 lg:py-8'>
          <div className='col-span-24 aspect-[16/9] lg:col-span-8 lg:col-start-7'>
            <ZoomImageDialog
              dialogTrigger={
                <Image
                  className='h-full w-full'
                  src={images.a1.src}
                  alt='Project Visual'
                  loading='lazy'
                  aspectRatio={images.a1.width / images.a1.height}
                  placeholder='blur'
                  blurDataURL={images.a1.blurDataURL}
                />
              }
              dialogContent={
                <Image
                  className='h-full w-full object-contain'
                  src={images.a1Zoom.src}
                  alt='Project Visual'
                  loading='lazy'
                  aspectRatio={images.a1Zoom.width / images.a1Zoom.height}
                  placeholder='blur'
                  blurDataURL={images.a1Zoom.blurDataURL}
                />
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
                  aspectRatio={images.a2.width / images.a2.height}
                  placeholder='blur'
                  blurDataURL={images.a2.blurDataURL}
                />
              }
              dialogContent={
                <Image
                  className='h-full w-full object-contain'
                  src={images.a2Zoom.src}
                  alt='Project Visual'
                  loading='lazy'
                  aspectRatio={images.a2Zoom.width / images.a2Zoom.height}
                  placeholder='blur'
                  blurDataURL={images.a2Zoom.blurDataURL}
                />
              }
            />
          </div>
        </section>
        <section className='grid grid-cols-24 gap-x-0 gap-y-6 px-8 py-8 lg:gap-x-4 lg:gap-y-0 lg:px-0 lg:py-8'>
          <div className='col-span-24 flex justify-start lg:col-span-8 lg:col-start-7 lg:justify-center'>
            <h3
              className={cn(
                'text-left font-primary font-[400] text-black',
                'text-3xl/tight lg:text-4xl/tight xl:text-6xl/tight'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                Yeşil Alanlar
              </GsapSplitText>
            </h3>
          </div>
          <div className='col-span-24 lg:col-span-8 lg:pl-24'>
            <p
              className={cn(
                'text-left font-primary font-[300] text-black',
                'text-base/snug lg:text-base/snug xl:text-2xl/snug'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                50.000+ m² peyzaj alanında, doğanın ortasında huzurlu bir yaşam.
              </GsapSplitText>
            </p>
          </div>
        </section>
        <section className='grid grid-cols-24 px-8 py-4 lg:px-0 lg:py-20'>
          <div className='col-span-24 aspect-[9/10] lg:col-span-18 lg:-col-end-3 lg:aspect-[16/9]'>
            <ZoomImageDialog
              dialogTrigger={
                <Image
                  className='h-full w-full'
                  src={images.b1.src}
                  alt='Project Visual'
                  loading='lazy'
                  aspectRatio={images.b1.width / images.b1.height}
                  placeholder='blur'
                  blurDataURL={images.b1.blurDataURL}
                />
              }
              dialogContent={
                <Image
                  className='h-full w-full object-contain'
                  src={images.b1.src}
                  alt='Project Visual'
                  loading='lazy'
                  aspectRatio={images.b1.width / images.b1.height}
                  placeholder='blur'
                  blurDataURL={images.b1.blurDataURL}
                />
              }
            />
          </div>
        </section>
        <section className='grid grid-cols-24 gap-x-0 gap-y-6 px-8 py-8 lg:gap-x-4 lg:gap-y-0 lg:px-0 lg:py-8'>
          <div className='col-span-24 flex justify-start lg:col-span-8 lg:col-start-7 lg:justify-center lg:pl-24'>
            <h3
              className={cn(
                'text-left font-primary font-[400] text-black',
                'text-3xl/[1.15] lg:text-4xl/[1.15] xl:text-6xl/[1.15]'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                Projenin mimarları <br />
                anlatıyor.
              </GsapSplitText>
            </h3>
          </div>
          <div className='col-span-24 lg:col-span-8 lg:pl-24'>
            <p
              className={cn(
                'text-left font-primary font-[300] text-black',
                'text-base/snug lg:text-base/snug xl:text-2xl/snug'
              )}
            >
              <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
                City’s Residences, gösterişten çok yaşam kalitesini merkeze alan
                bir mimarlık diliyle tasarlandı.
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
        quote='Karma kullanım modeliyle zamanı geri veriyoruz: yaşa, çalış, eğlen—tek ekosistem içinde.'
        mediaId='1qwipsnwiv'
        thumbnail='/img/thumbnail-murat-kader.jpg'
        portraitImage='/img/murat-kader-portrait.png'
        personName='Murat Kader'
        personTitle='Yüksek Mimar'
        sidebarText='Mimari Proje'
        primaryColor={colors['bricky-brick']}
        secondaryColor={colors['white']}
        hasBg={true}
      />
      <QuoteWithVideo
        quote='Gösteriş değil yaşam kalitesi: zamansız malzeme ve yalın detaylarla ‘gizli lüks’ kurduk.'
        mediaId='k7c3eyfiwe'
        thumbnail='/img/thumbnail-toners.jpg'
        portraitImage='/img/toner-portrait.png'
        personName='Mustafa & Emre Toner'
        personTitle='İç Mimar'
        sidebarText='İç Mimari'
        primaryColor={colors['white']}
        secondaryColor={colors['bricky-brick']}
      />
      <QuoteWithVideo
        quote='Kuzey Ormanları etkisi ve İstanbul’un endemik türleriyle, yeşilin her tonu projeye taşındı.'
        mediaId='lw6zlx5v5y'
        thumbnail='/img/thumbnail-aktas.jpg'
        portraitImage='/img/aktas-portrait.png'
        personName='Cemil Aktaş, Pınar Kesim Aktaş'
        personTitle='Peyzaj Mimari'
        sidebarText='Peyzaj'
        primaryColor={colors['army-canvas']}
        secondaryColor={colors['white']}
        hasBg={true}
      />
      <QuoteWithVideo
        quote='Sadece teknik başarı değil; City’s Residences sakinlerine huzurlu bir yuva sunmak için tasarlandı.'
        mediaId='zmn4yqnamk'
        thumbnail='/img/thumbnail-melih-bulgur.jpg'
        portraitImage='/img/melih-bulgur-portrait.png'
        personName='Melih Bulgur'
        personTitle='Yüksek İnşaat Mühendisi'
        sidebarText='Statik'
        primaryColor={colors['birch-strain']}
        secondaryColor={colors['white']}
        hasBg={true}
      />
    </>
  )
}
