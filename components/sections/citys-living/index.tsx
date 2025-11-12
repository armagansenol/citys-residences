'use client'

import { type CSSProperties, useEffect } from 'react'

import { ScrollTrigger } from '@/components/gsap'
import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { SectionSetter } from '@/components/section-setter'
import { fetchCitysLivingData, type CitysLivingData } from '@/lib/api/queries'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'

type CitysLivingItem = CitysLivingData & { aspectRatio?: number }

type CitysLivingQueryResult = CitysLivingItem[]

export default function CitysLiving() {
  const t = useTranslations('citys-living')
  const locale = useLocale()
  const sectionId = navigationConfig['/citys-living']?.id as string

  const {
    data: items = [],
    isFetching,
    isError,
    error,
  } = useQuery<CitysLivingQueryResult, Error>({
    queryKey: ['citys-living', locale],
    queryFn: async () => {
      const response = await fetchCitysLivingData(locale)

      if (!response.success || !response.data) {
        throw new Error(
          response.error ?? "Failed to load City's Living content."
        )
      }

      return response.data as CitysLivingQueryResult
    },
    staleTime: 60 * 60 * 1000, // align with ISR cache duration
  })

  const errorMessage = isError
    ? (error?.message ?? "Failed to load City's Living content.")
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
              thumbnail={item.thumbnail}
              videoAspectRatio={item.aspectRatio}
            />
          ))}
      </div>
    </SectionSetter>
  )
}
