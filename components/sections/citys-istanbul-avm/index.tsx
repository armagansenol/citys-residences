import { getTranslations } from 'next-intl/server'

import { AutoplayVideo } from '@/components/autoplay-video'
import { PageTitle } from '@/components/page-title'
import { SectionSetter } from '@/components/section-setter'
import { BrandsContainer } from '@/components/sections/citys-istanbul-avm/brands-container'
import { fetchBrands } from '@/lib/api/queries'
import { citysIstanbulAvmBanner, navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

export default async function Page() {
  const brandsResponse = await fetchBrands()
  const brands =
    brandsResponse.success && brandsResponse.data
      ? brandsResponse.data
      : { items: [], categories: {}, subCategories: {} }
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
      <section className='relative h-screen overflow-hidden lg:h-[45vw]'>
        <AutoplayVideo
          playbackId={citysIstanbulAvmBanner.muxSrc}
          aspectRatio={citysIstanbulAvmBanner.aspect()}
        />
      </section>
      <section className='section-container px-8 py-8 lg:px-0 lg:py-24'>
        <BrandsContainer initialBrands={brands.items || []} />
      </section>
    </SectionSetter>
  )
}
