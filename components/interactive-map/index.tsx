'use client'

import { cn } from '@/lib/utils'
import {
  BankIcon,
  GraduationCapIcon,
  HospitalIcon,
  TrainIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useState } from 'react'
import { useTranslations } from 'next-intl'

import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'

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
    map: 'map-1.jpg',
    icon: <TrainIcon className='size-full' weight='thin' />,
  },
  {
    id: 'yenisahra-metro',
    name: 'yenisahra-metro',
    distance: '2 km',
    map: 'map-2.jpg',
    icon: <TrainIcon className='size-full' weight='thin' />,
  },
  {
    id: 'memorial-atasehir',
    name: 'memorial-atasehir',
    distance: '1 km',
    map: 'map-3.jpg',
    icon: <HospitalIcon className='size-full' weight='thin' />,
  },
  {
    id: 'acibadem-atasehir',
    name: 'acibadem-atasehir',
    distance: '4 km',
    map: 'map-4.jpg',
    icon: <HospitalIcon className='size-full' weight='thin' />,
  },
  {
    id: 'fenerbahce-university',
    name: 'fenerbahce-university',
    distance: '3 km',
    map: 'map-5.jpg',
    icon: <GraduationCapIcon className='size-full' weight='thin' />,
  },
  {
    id: 'istanbul-finance',
    name: 'istanbul-finance',
    distance: '3 km',
    map: 'map-6.jpg',
    icon: <BankIcon className='size-full' weight='thin' />,
  },
]

const MemoizedTitle = memo(() => {
  const t = useTranslations('project.map')
  return (
    <GsapSplitText type='lines' stagger={0.01} duration={1.5}>
      {t('title')}
    </GsapSplitText>
  )
})

MemoizedTitle.displayName = 'MemoizedTitle'

export function InteractiveMap() {
  const t = useTranslations('project.map')
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  return (
    <div className='grid grid-cols-1 gap-4 overflow-hidden lg:gap-8 xl:min-h-[110vh] xl:grid-cols-24'>
      <div className='relative h-[100vw] overflow-hidden bg-[url(/img/map.jpg)] bg-cover bg-center xl:col-span-14 xl:h-full'>
        <AnimatePresence mode='sync'>
          {locations.map(location => {
            if (location.icon === null) return null

            const isHovered = hoveredLocation === location.id
            const isSelected =
              location.id === 'memorial-atasehir' && !hoveredLocation

            if (!isHovered && !isSelected) return null

            return (
              <motion.div
                key={location.id}
                className='absolute inset-0'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  className='block scale-150 object-cover xl:hidden'
                  src={`/img/interactive-map/mobile/${location.map}`}
                  alt={t(`locations.${location.name}`)}
                  fill
                  desktopSize='50vw'
                  mobileSize='100vw'
                  quality={100}
                  loading='lazy'
                />
                <Image
                  className='hidden object-cover xl:block'
                  src={`/img/interactive-map/desktop/${location.map}`}
                  alt={t(`locations.${location.name}`)}
                  fill
                  desktopSize='50vw'
                  mobileSize='100vw'
                  quality={100}
                  loading='lazy'
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
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
                  onMouseLeave={() => setHoveredLocation(null)}
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
                        `font-primary text-sm font-[300] text-black transition-colors duration-300 sm:text-lg lg:text-2xl`,
                        isHovered || isSelected
                          ? 'text-bricky-brick'
                          : 'text-black'
                      )}
                    >
                      {t(`locations.${location.name}`)}
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
