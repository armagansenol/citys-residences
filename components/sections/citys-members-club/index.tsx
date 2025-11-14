import { getTranslations } from 'next-intl/server'
import { type CSSProperties } from 'react'

import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { SectionSetter } from '@/components/section-setter'
import { type CitysMembersClubData } from '@/lib/api/queries'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { MembersClubCardSection } from './members-club-card-section'

interface CitysMembersClubProps {
  items: CitysMembersClubData[]
  locale: string
}

export default async function CitysMembersClub({
  items,
  locale,
}: CitysMembersClubProps) {
  const t = await getTranslations({ locale, namespace: 'citys-members-club' })
  const sectionId = navigationConfig['/citys-members-club']?.id as string

  return (
    <SectionSetter sectionId={sectionId}>
      <PageTitle
        primaryColor={colors['blue-shimmer']}
        secondaryColor={colors.black}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>MEMBERS CLUB</span>
          </>
        }
        description={t.rich('description', {
          br: () => <span className='hidden lg:block' />,
        })}
        id={sectionId}
        bgImage='/img/backgrounds/blue-shimmer.png'
      />
      <div
        style={
          {
            '--bg-color': colors['blue-shimmer'],
            '--text-color': colors.black,
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
      <MembersClubCardSection />
    </SectionSetter>
  )
}
