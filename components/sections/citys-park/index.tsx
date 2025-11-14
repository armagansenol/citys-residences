import { getTranslations } from 'next-intl/server'
import { type CSSProperties } from 'react'

import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { SectionSetter } from '@/components/section-setter'
import { type CitysParkData } from '@/lib/api/queries'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

interface CitysParkProps {
  items: CitysParkData[]
  locale: string
}

export default async function CitysPark({ items, locale }: CitysParkProps) {
  const t = await getTranslations({ locale, namespace: 'citys-park' })
  const sectionId = navigationConfig['/citys-park']?.id as string

  return (
    <SectionSetter sectionId={sectionId}>
      <PageTitle
        primaryColor={colors['army-canvas']}
        secondaryColor={colors.white}
        title="CITY'S PARK"
        description={t.rich('description', {
          br: () => <span className='hidden lg:block' />,
        })}
        id={sectionId}
        bgImage='/img/backgrounds/green.png'
      />
      <div
        style={
          {
            '--bg-color': colors['army-canvas'],
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
            videoAspectRatio={item.aspectRatio}
            thumbnail={item.thumbnail}
          />
        ))}
      </div>
    </SectionSetter>
  )
}
