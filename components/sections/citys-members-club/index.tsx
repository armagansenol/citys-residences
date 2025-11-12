'use client'

import { type CSSProperties, useEffect } from 'react'

import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'

import { ScrollTrigger } from '@/components/gsap'
import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import { PageTitle } from '@/components/page-title'
import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { SectionSetter } from '@/components/section-setter'
import {
  fetchCitysMembersClubData,
  type CitysMembersClubData,
} from '@/lib/api/queries'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

type CitysMembersClubQueryResult = CitysMembersClubData[]

export default function CitysMembersClub() {
  const t = useTranslations('citys-members-club')
  const locale = useLocale()
  const sectionId = navigationConfig['/citys-members-club']?.id as string

  const {
    data: items = [],
    isFetching,
    isError,
    error,
  } = useQuery<CitysMembersClubQueryResult, Error>({
    queryKey: ['citys-members-club', locale],
    queryFn: async () => {
      const response = await fetchCitysMembersClubData(locale)

      if (!response.success || !response.data) {
        throw new Error(
          response.error ?? "Failed to load City's Members Club content."
        )
      }

      return response.data
    },
    staleTime: 60 * 60 * 1000, // 1 hour, matches ISR cache
  })

  const errorMessage = isError
    ? (error?.message ?? "Failed to load City's Members Club content.")
    : null

  const messageStyle: CSSProperties = {
    color: 'var(--text-color)',
  }

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
        {isFetching && (
          <div
            className='h-[50vh] text-center font-primary text-base opacity-80'
            style={messageStyle}
          >
            ...
          </div>
        )}
        {!isFetching && errorMessage && (
          <div
            className='py-16 text-center font-primary text-base opacity-80'
            style={messageStyle}
          >
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
      <section
        className={cn(
          'relative flex items-center justify-center overflow-hidden',
          'h-screen w-full lg:aspect-[16/7] lg:h-auto'
        )}
      >
        <Image
          src='/img/members-club-card-mobile.jpg'
          alt='Members Club Card'
          fill
          className='absolute inset-0 z-0 block object-cover object-center lg:hidden'
          loading='lazy'
          desktopSize='100vw'
          mobileSize='100vw'
        />
        <Image
          src='/img/members-club-card.jpg'
          alt='Members Club Card'
          fill
          className='absolute inset-0 z-0 hidden object-cover object-center lg:block'
          loading='lazy'
          desktopSize='100vw'
          mobileSize='100vw'
        />
        <div className='z-40 mb-40 flex flex-shrink-0 flex-col items-center justify-center gap-2'>
          <h2
            className={cn(
              'text-center font-primary font-[400] text-white',
              'text-4xl/tight lg:text-4xl/tight xl:text-6xl/tight 2xl:text-6xl/tight'
            )}
          >
            <GsapSplitText type='chars' stagger={0.02} duration={1}>
              {t('card.title')}
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              'text-center font-primary font-[200] text-white',
              'text-xl/tight lg:text-2xl/tight xl:text-2xl/tight 2xl:text-3xl/tight',
              'w-[90vw] md:w-[60vw] lg:w-[60vw] xl:w-[40vw] 2xl:w-[40vw] 3xl:w-[40vw]'
            )}
          >
            <GsapSplitText type='chars' stagger={0.02} duration={1}>
              {t('card.subtitle')}
            </GsapSplitText>
          </p>
        </div>
      </section>
    </SectionSetter>
  )
}
