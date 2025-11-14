import { getTranslations } from 'next-intl/server'
import { type CSSProperties } from 'react'

import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { SectionSetter } from '@/components/section-setter'
import { type CitysLivingData } from '@/lib/api/queries'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

interface CitysLivingProps {
  items: CitysLivingData[]
  locale: string
}

export default async function CitysLiving({ items, locale }: CitysLivingProps) {
  const t = await getTranslations({ locale, namespace: 'citys-living' })
  const sectionId = navigationConfig['/citys-living']?.id as string

  return (
    <SectionSetter sectionId={sectionId}>
      <PageTitle
        primaryColor={colors['verve-violet']}
        secondaryColor={colors.white}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>LIVING</span>
          </>
        }
        description={t('description')}
        id={sectionId}
        bgImage='/img/backgrounds/verve-violet.png'
      />
      <div
        style={
          {
            '--bg-color': colors['verve-violet'],
            '--text-color': colors.white,
          } as CSSProperties
        }
      >
        {items.map(item => (
          <RepetitiveSectionsWrapper
            key={item.id}
            componentType={item.componentType}
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
            mediaId={item.mediaId}
            thumbnail={item.thumbnail}
            videoAspectRatio={item.aspectRatio}
          />
        ))}
      </div>
    </SectionSetter>
  )
}
