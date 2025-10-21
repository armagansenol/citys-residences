import { cn } from '@/lib/utils'

import { ZoomImageDialog } from '@/components/dialogs/zoom-image-dialog'
import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import { InteractiveMap } from '@/components/interactive-map'
import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { WistiaPlayerWrapper } from '@/components/wistia-player'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

export default function Page() {
  return (
    <>
      <PageTitle
        primaryColor={colors['white']}
        secondaryColor={colors['bricky-brick']}
        title='PROJE'
        description={
          <>
            Her köşesi özenle düşünülmüş bir{' '}
            <strong>karma yaşam projesi.</strong>
          </>
        }
        id={navigationConfig['/project']?.id as string}
      />
      <section className='pointer-events-none h-[45vw] overflow-hidden'>
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
      <section className='grid grid-cols-24'>
        <div className='col-span-8 col-start-7 flex pt-36'>
          <h3
            className={cn(
              'ml-auto',
              'text-left font-primary font-[400] text-trapped-darkness',
              'text-[0.8rem] lg:text-6xl/tight'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
              Blok ve Otopark <br />
              Girişleri
            </GsapSplitText>
          </h3>
        </div>
        <div className='col-span-8 pl-24 pt-36'>
          <p
            className={cn(
              'text-left font-primary font-[300] text-trapped-darkness',
              'text-[0.8rem] lg:text-2xl/snug'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
              Her blok için ayrı tasarlanmış lobi ve girişler, güvenli ve
              prestijli bir karşılama sunuyor.
              <br />
              Geniş otopark ve doğrudan blok bağlantılarıyla, zamandan
              kazandıran kolay erişim.
            </GsapSplitText>
          </p>
        </div>
      </section>
      <section className='grid grid-cols-24 gap-4 py-24'>
        <div className='col-span-8 col-start-7'>
          <ZoomImageDialog
            dialogTrigger={
              <Image
                className='aspect-[16/9] w-full cursor-pointer'
                src='/img/project/project-a-1.jpg'
                alt='Project Visual'
                loading='lazy'
              />
            }
            image='/img/project/project-a-1.jpg'
          />
        </div>
        <div className='col-span-8'>
          <ZoomImageDialog
            dialogTrigger={
              <Image
                className='aspect-[16/9] w-full cursor-pointer'
                src='/img/project/project-a-2.jpg'
                alt='Project Visual'
                loading='lazy'
              />
            }
            image='/img/project/project-a-2.jpg'
          />
        </div>
      </section>
      <section className='grid grid-cols-24'>
        <div className='col-span-8 col-start-7 flex justify-center py-36'>
          <h3
            className={cn(
              'text-left font-primary font-[400] text-trapped-darkness',
              'text-[0.8rem] lg:text-6xl/tight'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
              Yeşil Alanlar
            </GsapSplitText>
          </h3>
        </div>
        <div className='col-span-8 py-36 pl-24'>
          <p
            className={cn(
              'text-left font-primary font-[300] text-trapped-darkness',
              'text-[0.8rem] lg:text-2xl/snug'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
              50.000+ m² peyzaj alanında, doğanın ortasında huzurlu bir yaşam.
            </GsapSplitText>
          </p>
        </div>
      </section>
      <section className='grid grid-cols-24 gap-4 py-24'>
        <div className='col-span-16 col-start-7'>
          <ZoomImageDialog
            dialogTrigger={
              <Image
                className='aspect-[16/9] w-full cursor-pointer'
                src='/img/project/project-b-1.jpg'
                alt='Project Visual'
                loading='lazy'
              />
            }
            image='/img/project/project-b-1.jpg'
          />
        </div>
      </section>
      <section className='grid grid-cols-24'>
        <div className='col-span-15 flex pr-36 pt-36'>
          <h3
            className={cn(
              'ml-auto',
              'text-left font-primary font-[400] text-trapped-darkness',
              'text-[0.8rem] lg:text-6xl/tight'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
              Projenin <br />
              mimarları <br />
              anlatıyor.
            </GsapSplitText>
          </h3>
        </div>
        <div className='col-span-6 py-36'>
          <p
            className={cn(
              'text-left font-primary font-[300] text-trapped-darkness',
              'text-[0.8rem] lg:text-2xl/snug'
            )}
          >
            <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
              City’s Residences, gösterişten çok yaşam kalitesini merkeze alan
              bir mimarlık diliyle tasarlandı.
            </GsapSplitText>
          </p>
        </div>
      </section>
      <section className='grid grid-cols-24 gap-4 py-24'>
        <div className='col-span-16 col-start-7 grid h-96 grid-cols-24 gap-8'>
          <div className='col-span-12 border border-red-500'></div>
          <div className='col-span-6 border border-red-500'></div>
          <div className='col-span-6 border border-red-500'></div>
        </div>
      </section>
      <RepetitiveSectionsWrapper
        componentType='FullWidthSingleVideo'
        mediaId='p4l0a63nut'
      />
      <RepetitiveSectionsWrapper
        componentType='FullWidthVideoText'
        title='Dynamic Zone'
        subtitle='Hareket hiç bu kadar eğlenceli olmamıştı.'
        description='Dilediğiniz oyunu seçin, enerjinizi ortaya koyun! Padel, basketbol, masa tenisi ve golf simülatörüyle her gününüzü farklı bir heyecana dönüştürün. Arkadaşlarınızla kıyasıya rekabet, bol kahkahalı anlar ve sınırsız enerji… Dynamic Zone’da spor sadece bir aktivite değil, unutulmaz bir deneyim. Hazır mısınız? Çünkü burada her an bir oyuna dönüşüyor.'
        mediaId='p4l0a63nut'
      />
      <RepetitiveSectionsWrapper
        componentType='CenterVideoText'
        title='Dynamic Zone'
        subtitle='Hareket hiç bu kadar eğlenceli olmamıştı.'
        description='Dilediğiniz oyunu seçin, enerjinizi ortaya koyun! Padel, basketbol, masa tenisi ve golf simülatörüyle her gününüzü farklı bir heyecana dönüştürün. Arkadaşlarınızla kıyasıya rekabet, bol kahkahalı anlar ve sınırsız enerji… Dynamic Zone’da spor sadece bir aktivite değil, unutulmaz bir deneyim. Hazır mısınız? Çünkü burada her an bir oyuna dönüşüyor.'
        mediaId='p4l0a63nut'
      />
      <RepetitiveSectionsWrapper
        componentType='BackgroundVideoText'
        title='Dynamic Zone'
        subtitle='Hareket hiç bu kadar eğlenceli olmamıştı.'
        description='Dilediğiniz oyunu seçin, enerjinizi ortaya koyun! Padel, basketbol, masa tenisi ve golf simülatörüyle her gününüzü farklı bir heyecana dönüştürün. Arkadaşlarınızla kıyasıya rekabet, bol kahkahalı anlar ve sınırsız enerji… Dynamic Zone’da spor sadece bir aktivite değil, unutulmaz bir deneyim. Hazır mısınız? Çünkü burada her an bir oyuna dönüşüyor.'
        mediaId='p4l0a63nut'
      />
    </>
  )
}
