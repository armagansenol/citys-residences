'use client'

import { type CSSProperties, useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'

import { ScrollTrigger } from '@/components/gsap'
import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { SectionSetter } from '@/components/section-setter'
import { fetchCitysParkData, type CitysParkData } from '@/lib/api/queries'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

type CitysParkQueryResult = CitysParkData[]

export default function CitysPark() {
  const t = useTranslations('citys-park')
  const locale = useLocale()
  const sectionId = navigationConfig['/citys-park']?.id as string

  const {
    data: items = [],
    isFetching,
    isError,
    error,
  } = useQuery<CitysParkQueryResult, Error>({
    queryKey: ['citys-park', locale],
    queryFn: async () => {
      const response = await fetchCitysParkData(locale)

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Failed to load City's Park content.")
      }

      return response.data
    },
    staleTime: 60 * 60 * 1000, // mirror ISR duration (1 hour)
  })

  const errorMessage = isError
    ? (error?.message ?? "Failed to load City's Park content.")
    : null

  useEffect(() => {
    if (isFetching || errorMessage) {
      return
    }

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(frame)
  }, [isFetching, errorMessage, items.length])

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
        {isFetching && (
          <div className='h-[50vh] text-center font-primary text-base text-white opacity-80'>
            ...
          </div>
        )}
        {!isFetching && errorMessage && (
          <div className='py-16 text-center font-primary text-base text-white opacity-80'>
            {errorMessage}
          </div>
        )}
        {!isFetching &&
          !errorMessage &&
          items.map(item => (
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
