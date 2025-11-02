'use client'

import { cn, toAllUppercase } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import React, { useMemo } from 'react'

import { ScrollableBox } from '@/components/utility/scrollable-box'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useNavigation } from '@/hooks/useNavigation'
import { Locale } from '@/i18n/routing'
import { getNavigationItems } from '@/lib/constants'
import { useUiStore } from '@/lib/store/ui'

export const StickySidebar: React.FC = () => {
  const activeSection = useActiveSection()
  const { handleNavClick } = useNavigation()
  const t = useTranslations('common')
  const locale = useLocale()
  const { isStickySidebarVisible } = useUiStore()

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
              'h-20 w-48',
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
                'absolute left-4 top-1/2 flex -translate-y-1/2 cursor-pointer',
                'text-left font-primary font-[500] text-white lg:tracking-[0.4em]',
                'flex-col items-center justify-center',
                'transition-all duration-300 ease-out',
                'text-[0.8rem]'
                // {
                //   'text-[0.8rem]': activeSection === item.id,
                //   'text-[0.8rem]': activeSection !== item.id,
                // }
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
          'fixed bottom-4 left-0 right-0 z-[var(--z-sticky-menu)] flex w-screen mix-blend-difference lg:hidden',
          'before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-[100%] before:bg-gradient-sidebar',
          !isStickySidebarVisible && 'pointer-events-none opacity-0'
        )}
      >
        <ScrollableBox
          className='mr-8'
          orientation='horizontal'
          scrollTo={activeSection ? `[data-nav-id="${activeSection}"]` : null}
        >
          <div
            className={cn(
              'pointer-events-auto relative',
              'flex flex-row lg:hidden',
              'opacity-100 transition-opacity duration-300 ease-in-out'
            )}
          >
            {items.map(item => (
              <div
                className={cn(
                  'relative h-8 w-auto flex-shrink-0 transition-all duration-300 ease-in-out first:ml-8 last:mr-16',
                  'before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-white before:backdrop-blur-[54px] before:transition-all before:duration-300 before:ease-in-out before:content-[""]',
                  'hover:before:w-1',
                  {
                    'before:h-[3px]': activeSection === item.id,
                  }
                )}
                key={item.id}
                data-nav-id={item.id}
              >
                <button
                  onClick={() => handleNavClick(item.id as string)}
                  className={cn(
                    'whitespace-nowrap font-primary font-[700] tracking-[0.2em] text-white',
                    'cursor-pointer flex-col items-center justify-center px-8',
                    'transition-all duration-300 ease-out',
                    {
                      'text-[0.7rem]': activeSection === item.id,
                      'text-[0.6rem]': activeSection !== item.id,
                    }
                  )}
                  type='button'
                >
                  {toAllUppercase(item.label)}
                </button>
              </div>
            ))}
          </div>
        </ScrollableBox>
      </div>
    </>
  )
}
