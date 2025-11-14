'use client'

import { AutoplayVideo } from '@/components/autoplay-video'
import { Image } from '@/components/image'
import { useNavigation } from '@/hooks/useNavigation'
import { Locale } from '@/i18n/routing'
import {
  getMenuTextKey,
  getNavigationItems,
  menuMedia,
  navigationConfig,
} from '@/lib/constants'
import { cn } from '@/lib/utils'
import { breakpoints } from '@/styles/config.mjs'
import { useWindowSize } from 'hamo'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export function MenuNavList() {
  const { width: windowWidth } = useWindowSize(100)
  const isMobile = windowWidth && windowWidth < breakpoints.breakpointTablet
  const { handleNavClick } = useNavigation()
  const t = useTranslations('common')
  const tMenu = useTranslations('menu')
  const locale = useLocale()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const getAspectRatio = (itemId: string): number => {
    const media = menuMedia[itemId as keyof typeof menuMedia]
    if (media && 'aspect' in media && typeof media.aspect === 'function') {
      return media.aspect()
    }
    return 16 / 9
  }

  return (
    <div className='flex w-full items-start justify-between gap-32 3xl:gap-40'>
      <nav className='flex items-start justify-center lg:justify-start'>
        <div
          className={cn(
            'flex w-full flex-col items-stretch gap-4 lg:gap-12 xl:gap-6 2xl:gap-8 3xl:gap-10'
          )}
        >
          <ul className='flex flex-col gap-2 lg:gap-6 xl:gap-3 2xl:gap-4'>
            {getNavigationItems(t, locale as Locale)
              .filter(item => item.mainRoute)
              .map(item => {
                const isHovered = hoveredItem === item.id
                const opacityClass =
                  hoveredItem && !isHovered
                    ? 'opacity-50'
                    : 'opacity-100' +
                      (item.mainRoute === false && 'text-bricky-brick')

                return (
                  <li
                    className='text-3xl sm:text-2xl lg:text-5xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl'
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    // onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => {
                        if (item.disabled) {
                          handleNavClick(navigationConfig['/'].id)
                          return
                        }
                        handleNavClick(item.id as string)
                      }}
                      className={cn(
                        'cursor-pointer',
                        'text-left font-primary font-[300] text-white',
                        'transition-all duration-300',
                        opacityClass
                      )}
                      type='button'
                    >
                      {item.title}
                    </button>
                  </li>
                )
              })}
          </ul>
          <ul className='flex flex-col gap-3 lg:gap-6 xl:gap-3 2xl:gap-3'>
            {getNavigationItems(t, locale as Locale)
              .filter(item => !item.mainRoute)
              .map(item => {
                const isHovered = hoveredItem === item.id
                const opacityClass =
                  hoveredItem && !isHovered ? 'opacity-50' : 'opacity-100'

                return (
                  <li
                    className='text-base sm:text-2xl lg:text-2xl xl:text-base 2xl:text-xl 3xl:text-xl'
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => {
                        if (item.disabled) {
                          handleNavClick(navigationConfig['/'].id)
                          return
                        }
                        handleNavClick(item.id as string)
                      }}
                      className={cn(
                        'cursor-pointer text-left font-primary font-[300] text-white transition-all duration-300',
                        opacityClass
                      )}
                      type='button'
                    >
                      {item.title}
                    </button>
                  </li>
                )
              })}
          </ul>
        </div>
      </nav>
      {!isMobile && (
        <div className='relative ml-auto hidden w-full flex-col items-stretch justify-start gap-6 xl:flex'>
          <div className='relative aspect-[16/9] flex-shrink-0 overflow-hidden'>
            {Object.entries(menuMedia).map(([itemId, media]) => {
              const isVisible = hoveredItem === itemId
              return (
                <div
                  key={itemId}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-300',
                    isVisible
                      ? 'pointer-events-auto opacity-100'
                      : 'pointer-events-none opacity-0'
                  )}
                >
                  {media.type === 'image' && (
                    <Image
                      src={media.src}
                      alt='Menu Image'
                      fill
                      className='h-full w-full object-cover'
                      desktopSize='20vw'
                    />
                  )}
                  {media.type === 'video' && (
                    <AutoplayVideo
                      playbackId={media.src}
                      aspectRatio={getAspectRatio(itemId)}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <div className='relative'>
            {Object.keys(menuMedia).map(itemId => {
              const isVisible = hoveredItem === itemId
              return (
                <article
                  key={itemId}
                  className={cn(
                    'absolute left-0 top-0',
                    'flex',
                    'transition-opacity duration-300',
                    isVisible
                      ? 'pointer-events-auto opacity-100'
                      : 'pointer-events-none opacity-0'
                  )}
                >
                  <p className='text-left font-primary text-sm font-[300] text-white xl:text-base 3xl:text-xl'>
                    {tMenu.rich(getMenuTextKey(itemId), {
                      br: () => <br />,
                    })}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
