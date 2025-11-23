'use client'

import { Image } from '@/components/image'
import { cn } from '@/lib/utils'
import { HouseSimpleIcon } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'

export function ResidencesNavigator() {
  // const t = useTranslations('residences.navigator.labels')
  const [selectedValue, setSelectedValue] = useState<string>('2')

  const options = useMemo(() => {
    const createIcon = (id: string) => {
      const isSelected = selectedValue === id
      return (
        <span className='relative inline-block size-full'>
          <HouseSimpleIcon
            className={cn(
              'size-full transition-opacity duration-300',
              isSelected ? 'opacity-0' : 'opacity-100'
            )}
            weight='thin'
          />
          <HouseSimpleIcon
            className={cn(
              'absolute inset-0 size-full transition-opacity duration-300',
              isSelected ? 'opacity-100' : 'opacity-0'
            )}
            weight='fill'
          />
        </span>
      )
    }

    return [
      {
        id: '1',
        label: '1+1',
        src: '/img/residences/1+1/interior.jpg',
        icon: createIcon('1'),
      },
      {
        id: '2',
        label: '2+1',
        src: '/img/residences/2+1/interior.jpg',
        icon: createIcon('2'),
      },
      {
        id: '3',
        label: '3+1',
        src: '/img/residences/2+1/interior.jpg',
        icon: createIcon('3'),
      },
      {
        id: '4',
        label: '3,5+1',
        src: '/img/residences/2+1/interior.jpg',
        icon: createIcon('4'),
      },
      {
        id: '5',
        label: '4+1',
        src: '/img/residences/3+1/interior.jpg',
        icon: createIcon('5'),
      },
      {
        id: '6',
        label: '4,5+1',
        src: '/img/residences/3+1/interior.jpg',
        icon: createIcon('6'),
      },
      {
        id: '7',
        label: '5+1',
        src: '/img/residences/3+1/interior.jpg',
        icon: createIcon('7'),
      },
      {
        id: '8',
        label: '5,5+1',
        src: '/img/residences/4+1/interior.jpg',
        icon: createIcon('8'),
      },
      // {
      //   id: '7',
      //   label: t('citysParkHouses'),
      //   src: '/img/residences/1+1/interior.jpg',
      //   icon: createIcon('7'),
      // },
      // {
      //   id: '8',
      //   label: t('terraceHouses'),
      //   src: '/img/residences/terrace-houses/interior.jpg',
      //   icon: createIcon('8'),
      // },
      // {
      //   id: '9',
      //   label: t('penthouse'),
      //   src: '/img/residences/terrace-houses/interior.jpg',
      //   icon: createIcon('9'),
      // },
    ]
  }, [selectedValue])

  const handleOptionClick = (id: string) => {
    setSelectedValue(id)
  }

  return (
    <div className='flex flex-col gap-16 lg:gap-24'>
      <div className='flex flex-wrap items-center justify-center gap-x-3.5 gap-y-3.5 px-8 md:px-16 lg:flex lg:px-40 xl:gap-2.5 xl:px-0 2xl:gap-3.5'>
        {options.map(option => {
          const isSelected = selectedValue === option.id
          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={cn(
                'aspect-[1/1] size-24 cursor-pointer px-1 pt-3 3xl:pt-4',
                'flex flex-shrink-0 flex-col items-center justify-start gap-2 rounded-md',
                'transition-all duration-200',
                {
                  'bg-bricky-brick text-white': isSelected,
                  'border border-bricky-brick bg-bricky-brick text-white hover:bg-white hover:text-bricky-brick':
                    !isSelected,
                  'border border-bricky-brick bg-white text-bricky-brick':
                    selectedValue === option.id,
                }
              )}
              aria-label={`Select ${option.label}`}
              type='button'
            >
              <div className='flex size-8 items-center justify-center'>
                {option.icon}
              </div>
              <span
                className={cn('text-base/[1.1] font-[300] tracking-[0.3em]')}
              >
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
      <div className='relative aspect-[16/16] lg:aspect-[16/7]'>
        {options.map(option => {
          return (
            <div
              key={option.id}
              className={cn(
                'absolute inset-0 transition-opacity duration-300',
                {
                  'opacity-100': selectedValue === option.id,
                  'opacity-0': selectedValue !== option.id,
                }
              )}
            >
              <Image
                key={option.id}
                src={option.src}
                alt={option.label}
                fill
                desktopSize='100vw'
                mobileSize='100vw'
                className='object-cover'
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
