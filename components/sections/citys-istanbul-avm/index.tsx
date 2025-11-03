import { BrandsContainer } from '@/components/sections/citys-istanbul-avm/brands-container'
import { WistiaPlayerWrapper } from '@/components/wistia-player-wrapper'
import { getBrandsData } from '@/lib/api/server-actions'
import { colors } from '@/styles/config.mjs'
import { PageTitle } from '@/components/page-title'
import { citysIstanbulAvmBanner, navigationConfig } from '@/lib/constants'
import { SectionSetter } from '@/components/section-setter'
import { AspectCover } from '@/components/aspect-cover'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const brands = await getBrandsData()
  const t = await getTranslations('citys-istanbul-avm')

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
            <span className='block'>{t('title.line1')}</span>
            <span className='block'>{t('title.line2')}</span>
          </>
        }
        description={t('description')}
        id={navigationConfig['/citys-istanbul-avm']?.id as string}
        bgImage='/img/backgrounds/aqua-belt.png'
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
