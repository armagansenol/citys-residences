'use client'

import { useNavigation } from '@/hooks/useNavigation'
import { cn, toAllUppercase } from '@/lib/utils'
import React from 'react'

interface DesktopSliderProps {
  items: Array<{ label: string; href: string; id: string }>
  activeSection: string | null
  isStickySidebarVisible: boolean
}

export const DesktopSlider: React.FC<DesktopSliderProps> = ({
  items,
  activeSection,
  isStickySidebarVisible,
}) => {
  const { handleNavClick } = useNavigation()

  return (
    <div
      className={cn(
        'pointer-events-auto z-[var(--z-sticky-menu)] mix-blend-difference',
        'hidden flex-col lg:flex',
        'fixed left-8 top-1/2 xl:left-16',
        '-translate-y-[40%]',
        'opacity-100 transition-opacity duration-300 ease-in-out',
        !isStickySidebarVisible && 'pointer-events-none opacity-0'
      )}
    >
      {items.map(item => (
        <div
          className={cn(
            'relative',
            'lg:h-24 lg:w-64 xl:h-16 xl:w-52 2xl:h-16 2xl:w-52 3xl:h-20 3xl:w-52',
            'flex-shrink-0 transition-all duration-300 ease-in-out',
            'before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-white before:transition-all before:duration-300 before:ease-in-out before:content-[""]',
            'hover:before:w-1',
            {
              'before:w-[3px]': activeSection === item.id,
            }
          )}
          key={item.id}
        >
          <button
            onClick={() => handleNavClick(item.id as string)}
            className={cn(
              'absolute left-8 top-1/2 flex -translate-y-1/2 cursor-pointer whitespace-pre-line',
              'text-left font-primary font-[500] text-white lg:tracking-[0.4em]',
              'flex-col items-center justify-center',
              'transition-all duration-300 ease-out',
              {
                'lg:text-[0.7rem] 3xl:text-[0.8rem]': activeSection === item.id,
                'lg:text-[0.6rem] 3xl:text-[0.7rem]': activeSection !== item.id,
              }
            )}
            type='button'
          >
            {toAllUppercase(item.label)}
          </button>
        </div>
      ))}
    </div>
  )
}
