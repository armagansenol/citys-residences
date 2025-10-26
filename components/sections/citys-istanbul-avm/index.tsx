import { AvmBrandsContainer } from '@/components/sections/citys-istanbul-avm/brands-container'
import { WistiaPlayerWrapper } from '@/components/wistia-player'
import { getBrandsData } from '@/lib/api/server-actions'
import { colors } from '@/styles/config.mjs'
import { PageTitle } from '@/components/page-title'

export default async function Page() {
  const brands = await getBrandsData()

  return (
    <>
      <PageTitle
        primaryColor={colors['aqua-belt']}
        secondaryColor={colors.black}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>İSTANBUL AVM</span>
          </>
        }
        description='Sanat, spor ve sosyal ayrıcalıkların buluştuğu,özel bir yaşam alanı.'
        id='citys-istanbul-avm'
      />
      <section className='pointer-events-none h-screen overflow-hidden lg:h-[45vw]'>
        <WistiaPlayerWrapper
          mediaId='a5b5zn9o9x'
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
      <section className='section-container py-16 lg:py-24'>
        <AvmBrandsContainer initialBrands={brands.items || []} />
      </section>
    </>
  )
}
