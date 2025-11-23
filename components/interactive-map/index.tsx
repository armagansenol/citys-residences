'use client'

import { cn } from '@/lib/utils'
import {
  BankIcon,
  GraduationCapIcon,
  LetterCircleHIcon,
  TrainIcon,
} from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'

import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import { navigationConfig } from '@/lib/constants'

interface LocationItem {
  id: string
  name: string
  distance: string
  className?: string
  map: string
  icon?: React.ReactNode
}

const locations: LocationItem[] = [
  {
    id: 'kozyatagi-metro',
    name: 'kozyatagi-metro',
    distance: '1 km',
    map: 'map-5.jpg',
    icon: <TrainIcon className='size-full' weight='thin' />,
  },
  {
    id: 'yenisahra-metro',
    name: 'yenisahra-metro',
    distance: '2 km',
    map: 'map-4.jpg',
    icon: <TrainIcon className='size-full' weight='thin' />,
  },
  {
    id: 'memorial-atasehir',
    name: 'memorial-atasehir',
    distance: '1 km',
    map: 'map-6.jpg',
    icon: <LetterCircleHIcon className='size-full' weight='thin' />,
  },
  {
    id: 'acibadem-atasehir',
    name: 'acibadem-atasehir',
    distance: '4 km',
    map: 'map-2.jpg',
    icon: <LetterCircleHIcon className='size-full' weight='thin' />,
  },
  {
    id: 'fenerbahce-university',
    name: 'fenerbahce-university',
    distance: '3 km',
    map: 'map-1.jpg',
    icon: <GraduationCapIcon className='size-full' weight='thin' />,
  },
  {
    id: 'istanbul-finance',
    name: 'istanbul-finance',
    distance: '3 km',
    map: 'map-3.jpg',
    icon: <BankIcon className='size-full' weight='thin' />,
  },
]

const MemoizedTitle = memo(() => {
  const t = useTranslations('project.map')
  return (
    <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
      {t.rich('title', {
        br: () => <br />,
      })}
    </GsapSplitText>
  )
})

MemoizedTitle.displayName = 'MemoizedTitle'

export function InteractiveMap() {
  const t = useTranslations('project.map')
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(
    'kozyatagi-metro'
  )

  return (
    <div
      className='grid grid-cols-1 gap-4 overflow-hidden lg:gap-8 xl:min-h-[110vh] xl:grid-cols-24'
      id={navigationConfig['/location'].id}
    >
      <div className='relative h-[100vw] overflow-hidden bg-[url(/img/map.jpg)] bg-cover bg-center xl:col-span-14 xl:h-full'>
        {locations.map(location => {
          if (location.icon === null) return null

          const isHovered = hoveredLocation === location.id
          const isSelected =
            location.id === 'memorial-atasehir' && !hoveredLocation
          const isActive = isHovered || isSelected

          return (
            <motion.div
              key={location.id}
              className='absolute inset-0'
              initial={{ opacity: 0, zIndex: 1 }}
              animate={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 10 : 1,
              }}
              transition={{
                duration: isActive ? 0.3 : 0,
                delay: isActive ? 0 : 0.3,
              }}
            >
              <Image
                className='block scale-150 object-cover xl:hidden'
                src={`/img/interactive-map/mobile/${location.map}`}
                alt={t(`locations.${location.name}`)}
                fill
                desktopSize='50vw'
                mobileSize='100vw'
                quality={100}
              />
              <Image
                className='hidden object-cover xl:block'
                src={`/img/interactive-map/desktop/${location.map}`}
                alt={t(`locations.${location.name}`)}
                fill
                desktopSize='50vw'
                mobileSize='100vw'
                quality={100}
              />
            </motion.div>
          )
        })}
      </div>
      <div className='flex flex-col gap-8 pb-8 pl-8 pr-12 pt-8 lg:pb-16 lg:pl-20 lg:pr-24 lg:pt-24 xl:col-span-10'>
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
            if (location.icon === null) return null

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
                      ? 'text-bricky-brick'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation('kozyatagi-metro')}
                >
                  <div
                    className={cn(
                      `mr-3 flex size-6 items-center justify-center transition-colors duration-300 sm:mr-4 xl:size-10`,
                      isHovered || isSelected
                        ? 'text-bricky-brick'
                        : 'text-black'
                    )}
                  >
                    {location.icon}
                  </div>
                  <div className='ml-auto flex items-end gap-2 sm:gap-4'>
                    <div
                      className={cn(
                        `font-primary text-sm font-[300] text-black transition-colors duration-300 sm:text-lg lg:text-2xl xl:text-xl 3xl:text-2xl`,
                        isHovered || isSelected
                          ? 'text-bricky-brick'
                          : 'text-black'
                      )}
                    >
                      {t(`locations.${location.name}`)}
                    </div>
                    <div className='font-primary text-sm font-[200] text-black/50 sm:text-lg lg:text-2xl xl:text-xl 3xl:text-2xl'>
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
