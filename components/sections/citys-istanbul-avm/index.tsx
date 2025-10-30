import { BrandsContainer } from '@/components/sections/citys-istanbul-avm/brands-container'
import { WistiaPlayerWrapper } from '@/components/wistia-player-wrapper'
import { getBrandsData } from '@/lib/api/server-actions'
import { colors } from '@/styles/config.mjs'
import { PageTitle } from '@/components/page-title'
import { citysIstanbulAvmBanner, navigationConfig } from '@/lib/constants'
import { SectionSetter } from '@/components/section-setter'
import { AspectCover } from '@/components/aspect-cover'

export default async function Page() {
  const brands = await getBrandsData()

  return (
    <SectionSetter
      sectionId={navigationConfig['/citys-istanbul-avm']?.id as string}
    >
      <PageTitle
        primaryColor={colors['aqua-belt']}
        secondaryColor={colors['trapped-darkness']}
        tertiaryColor={colors['trapped-darkness']}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>İSTANBUL AVM</span>
          </>
        }
        description='Hayatı tüm renkleriyle yaşa.'
        id={navigationConfig['/citys-istanbul-avm']?.id as string}
      />
      <section className='h-screen overflow-hidden lg:h-[45vw]'>
        <AspectCover ratio={citysIstanbulAvmBanner.aspect()}>
          <WistiaPlayerWrapper
            mediaId={citysIstanbulAvmBanner.mediaId}
            aspect={citysIstanbulAvmBanner.aspect()}
          />
        </AspectCover>
      </section>
      <section className='section-container px-8 py-8 lg:px-0 lg:py-24'>
        <BrandsContainer initialBrands={brands.items || []} />
      </section>
    </SectionSetter>
  )
}
