'use client'

import s from './styles.module.css'

import { cn } from '@/lib/utils'
import { colors } from '@/styles/config.mjs'
import {
  BankIcon,
  GraduationCapIcon,
  LetterCircleHIcon,
  TrainIcon,
} from '@phosphor-icons/react'
import { memo, useState } from 'react'

import { GsapSplitText } from '@/components/gsap-split-text'
import { SvgPinCitys, SvgPinMini } from '@/components/svgs/interactive-map'

interface LocationItem {
  id: string
  name: string
  distance: string
  listIcon: 'metro' | 'hospital' | 'university' | 'building' | 'citys' | null
  mapIcon: React.ReactNode
  className?: string
}

const locations: LocationItem[] = [
  {
    id: 'kozyatagi-metro',
    name: 'Kozyatağı Metro',
    distance: '1 km',
    listIcon: 'metro',
    mapIcon: 'metro',
    className: s.p1,
  },
  {
    id: 'yenisahra-metro',
    name: 'Yenisahra Metro',
    distance: '2 km',
    listIcon: 'metro',
    mapIcon: 'metro',
    className: s.p2,
  },
  {
    id: 'memorial-atasehir',
    name: 'Memorial Ataşehir Hastanesi',
    distance: '1 km',
    listIcon: 'hospital',
    mapIcon: 'hospital',
    className: s.p3,
  },
  {
    id: 'acibadem-atasehir',
    name: 'Acıbadem Ataşehir Hastanesi',
    distance: '4 km',
    listIcon: 'hospital',
    mapIcon: 'hospital',
    className: s.p4,
  },
  {
    id: 'fenerbahce-university',
    name: 'Fenerbahçe Üniversitesi',
    distance: '3 km',
    listIcon: 'university',
    mapIcon: 'university',
    className: s.p5,
  },
  {
    id: 'istanbul-finance',
    name: 'İstanbul Finans Merkezi',
    distance: '3 km',
    listIcon: 'building',
    mapIcon: 'building',
    className: s.p6,
  },
  {
    id: 'citys',
    name: 'Citys',
    distance: '1 km',
    listIcon: null,
    mapIcon: (
      <SvgPinCitys pinColor={colors['bricky-brick']} iconColor={colors.white} />
    ),
    className: s.p7,
  },
]

const getListIconComponent = (
  iconType: LocationItem['listIcon'],
  size: number = 64
) => {
  switch (iconType) {
    case 'metro':
      return <TrainIcon size={size} weight='thin' />
    case 'hospital':
      return <LetterCircleHIcon size={size} weight='thin' />
    case 'university':
      return <GraduationCapIcon size={size} weight='thin' />
    case 'building':
      return <BankIcon size={size} weight='thin' />
    case 'citys':
      return (
        <SvgPinCitys
          pinColor={colors['bricky-brick']}
          iconColor={colors.white}
        />
      )
    default:
      return null
  }
}

const getMapIconComponent = (
  iconType: LocationItem['mapIcon'],
  size: number = 40,
  pinColor: string = colors['bricky-brick'],
  iconColor: string = colors.white
) => {
  switch (iconType) {
    case 'metro':
      return (
        <SvgPinMini
          icon={<TrainIcon size={size} weight='thin' />}
          pinColor={pinColor}
          iconColor={iconColor}
        />
      )
    case 'hospital':
      return (
        <SvgPinMini
          icon={<LetterCircleHIcon size={size} weight='thin' />}
          pinColor={pinColor}
          iconColor={iconColor}
        />
      )
    case 'university':
      return (
        <SvgPinMini
          icon={<GraduationCapIcon size={size} weight='thin' />}
          pinColor={pinColor}
          iconColor={iconColor}
        />
      )
    case 'building':
      return (
        <SvgPinMini
          icon={<BankIcon size={size} weight='thin' />}
          pinColor={pinColor}
          iconColor={iconColor}
        />
      )
    case 'citys':
      return (
        <SvgPinMini
          icon={
            <SvgPinCitys
              pinColor={colors['bricky-brick']}
              iconColor={colors.white}
            />
          }
          pinColor={pinColor}
          iconColor={iconColor}
        />
      )
    default:
      return null
  }
}

const MemoizedTitle = memo(() => (
  <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
    Yaşamın tam <br /> merkezinde.
  </GsapSplitText>
))

MemoizedTitle.displayName = 'MemoizedTitle'

export function InteractiveMap() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  return (
    <div className='grid grid-cols-1 gap-4 overflow-hidden lg:gap-8 xl:min-h-[110vh] xl:grid-cols-24'>
      <div className='relative h-[100vw] overflow-hidden bg-[url(/img/map.jpg)] bg-cover bg-center xl:col-span-14 xl:h-full'>
        {/* Location Pins */}
        {locations.map(location => {
          const isHovered = hoveredLocation === location.id

          return (
            <div
              key={location.id}
              className={cn(location.className, 'size-16', {
                isHovered: isHovered,
                'text-black': isHovered,
                'text-white': !isHovered,
              })}
            >
              {getMapIconComponent(location.mapIcon, 24)}
            </div>
          )
        })}
      </div>

      {/* List Section */}
      <div className='flex flex-col gap-8 px-8 pb-8 pt-8 sm:px-8 lg:pb-16 lg:pl-20 lg:pr-24 lg:pt-24 xl:col-span-10'>
        <h3
          className={cn(
            'mr-auto xl:ml-auto xl:mr-0',
            'text-left font-primary font-[400] text-trapped-darkness',
            'text-4xl/[1.2] sm:text-3xl/[1.2] md:text-4xl/[1.2] lg:text-6xl/[1.2]'
          )}
        >
          <MemoizedTitle />
        </h3>
        <div className='mt-auto'>
          {locations.map(location => {
            if (location.listIcon === null) return null

            const isHovered = hoveredLocation === location.id
            const isSelected =
              location.id === 'memorial-atasehir' && !hoveredLocation

            return (
              <div
                key={location.id}
                className='border-b border-gray-200 last:border-b-0'
              >
                <div
                  className={`flex cursor-pointer items-center py-4 transition-all duration-300 sm:py-6 ${
                    isHovered || isSelected
                      ? 'text-red-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      `mr-3 flex items-center justify-center transition-colors duration-300 sm:mr-4`,
                      isHovered || isSelected
                        ? 'text-bricky-brick'
                        : 'text-black'
                    )}
                  >
                    {location.listIcon &&
                      getListIconComponent(location.listIcon, 24)}
                  </div>

                  {/* Content */}
                  <div className='ml-auto flex items-end gap-2 sm:gap-4'>
                    <div
                      className={cn(
                        `font-primary text-sm font-[300] text-black transition-colors duration-300 sm:text-lg lg:text-2xl`,
                        isHovered || isSelected
                          ? 'text-bricky-brick'
                          : 'text-black'
                      )}
                    >
                      {location.name}
                    </div>
                    <div className='font-primary text-sm font-[200] text-black/50 sm:text-lg lg:text-2xl'>
                      {location.distance}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
