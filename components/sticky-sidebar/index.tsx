'use client'

import { useActiveSection } from '@/hooks/useActiveSection'
import { useNavigation } from '@/hooks/useNavigation'
import { useSmooothy } from '@/hooks/useSmooothy'
import { Locale } from '@/i18n/routing'
import { getNavigationItems } from '@/lib/constants'
import { useUiStore } from '@/lib/store/ui'
import { cn, toAllUppercase } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import React, { useEffect, useMemo } from 'react'

export const StickySidebar: React.FC = () => {
  const activeSection = useActiveSection()
  const { handleNavClick } = useNavigation()
  const t = useTranslations('common')
  const locale = useLocale()
  const { isStickySidebarVisible } = useUiStore()
  const { ref, slider } = useSmooothy({
    infinite: false,
    snap: true,
    dragSensitivity: 0.005,
    speedDecay: 0.85,
    lerpFactor: 0.3,
    setOffset: ({ wrapperWidth }) => {
      return wrapperWidth / 2 // Center the active slide
    },
  })

  // Get only items that should appear in sidebar
  const items = useMemo(
    () =>
      getNavigationItems(t, locale as Locale)
        .filter(item => item.isOnSidebar)
        .map(item => ({
          label: item.title,
          href: item.href,
          id: item.id,
        })),
    [t, locale]
  )

  // Slide to active section when it changes
  useEffect(() => {
    if (!slider || !activeSection) return

    const activeIndex = items.findIndex(item => item.id === activeSection)
    if (activeIndex !== -1) {
      slider.goToIndex(activeIndex)
    }
  }, [activeSection, slider, items])

  return (
    <>
      {/* desktop */}
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
              'lg:h-24 lg:w-64 xl:h-12 xl:w-52 2xl:h-16 2xl:w-52 3xl:h-20 3xl:w-52',
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
                  'lg:text-[0.7rem] 3xl:text-[0.8rem]':
                    activeSection === item.id,
                  'lg:text-[0.6rem] 3xl:text-[0.7rem]':
                    activeSection !== item.id,
                }
              )}
              type='button'
            >
              {toAllUppercase(item.label)}
            </button>
          </div>
        ))}
      </div>
      {/* mobile */}
      <div
        className={cn(
          'fixed bottom-[4%] left-4 right-4 z-[var(--z-sticky-menu)] mix-blend-difference lg:hidden',
          'before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-[100%] before:bg-gradient-sidebar',
          !isStickySidebarVisible && 'pointer-events-none opacity-0'
        )}
      ></div>
      <div
        className={cn(
          'fixed bottom-[4%] left-0 right-0 z-[var(--z-sticky-menu)] flex w-screen overflow-x-hidden mix-blend-difference focus:outline-none lg:hidden',
          'px-[calc(50%-20vw)]', // Padding to allow items to center (50% - half of item width)
          !isStickySidebarVisible && 'pointer-events-none opacity-0'
        )}
        ref={ref}
      >
        {items.map(item => (
          <div
            key={item.id}
            className={cn(
              'relative w-[40vw]',
              'flex shrink-0 items-stretch justify-stretch',
              'before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-white before:backdrop-blur-[54px] before:transition-all before:duration-300 before:ease-in-out before:content-[""]',
              {
                'before:h-[2px]': activeSection === item.id,
              }
            )}
          >
            <button
              onClick={() => handleNavClick(item.id as string)}
              className={cn(
                'whitespace-nowrap font-primary font-[700] tracking-[0.2em] text-white',
                'flex h-full w-full items-center justify-center',
                'transition-all duration-300 ease-out',
                'cursor-pointer py-2',
                {
                  'text-[0.7rem] opacity-100': activeSection === item.id,
                  'text-[0.6rem] opacity-70': activeSection !== item.id,
                }
              )}
              type='button'
            >
              <span className='whitespace-nowrap'>
                {toAllUppercase(item.label)}
              </span>
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
