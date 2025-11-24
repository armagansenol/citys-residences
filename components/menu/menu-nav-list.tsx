'use client'

import {
  CalendarPlusIcon,
  FacebookLogoIcon,
  HeadsetIcon,
  InstagramLogoIcon,
  MapPinPlusIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react'
import { useWindowSize } from 'hamo'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import { Image } from '@/components/image'
import { Link } from '@/components/utility/link'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useNavigation } from '@/hooks/useNavigation'
import { Link as LocalizedLink } from '@/i18n/navigation'
import { Locale, Pathnames } from '@/i18n/routing'
import {
  citysIstanbulAvmGoogleMaps,
  getMenuTextKey,
  getNavigationItems,
  menuMedia,
  navigationConfig,
} from '@/lib/constants'
import { useUiStore } from '@/lib/store/ui'
import { breakpoints } from '@/styles/config.mjs'

export function MenuNavList() {
  const { width: windowWidth } = useWindowSize(100)
  const isMobile = windowWidth && windowWidth < breakpoints.breakpointTablet

  const activeSection = useActiveSection()
  const { handleNavClick } = useNavigation()
  const t = useTranslations('common')
  const tMenu = useTranslations('menu')
  const locale = useLocale()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { setIsMenuOpen, setIsModalContactFormOpen } = useUiStore()

  function handleAppointment() {
    setIsMenuOpen(false)
    setIsModalContactFormOpen(true)
  }

  return (
    <div className='flex h-full w-full flex-col items-stretch justify-between gap-6 lg:gap-12 xl:flex-row 3xl:gap-40'>
      <nav className='flex items-start justify-center lg:justify-start'>
        <div
          className={cn(
            'flex h-full w-full flex-col items-stretch gap-3 lg:gap-12 xl:gap-6 2xl:gap-8 3xl:gap-10'
          )}
        >
          <ul
            className='flex flex-col gap-1 lg:gap-6 xl:gap-3 2xl:gap-4'
            onMouseLeave={() => !isMobile && setHoveredItem(null)}
          >
            {getNavigationItems(t, locale as Locale)
              .filter(item => item.mainRoute)
              .map(item => {
                const isHovered = !isMobile && hoveredItem === item.id
                const isActive = activeSection === item.id
                const opacityClass =
                  !isMobile && hoveredItem && !isHovered && !isActive
                    ? 'opacity-50'
                    : cn(
                        'opacity-100',
                        item.mainRoute === false && 'text-bricky-brick'
                      )
                return (
                  <li
                    className={cn(
                      'text-3xl sm:text-2xl lg:text-5xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl',
                      {
                        'lg:text-6xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl':
                          isActive,
                      }
                    )}
                    key={item.id}
                    onMouseEnter={
                      !isMobile ? () => setHoveredItem(item.id) : undefined
                    }
                    // onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.hasOwnRoute && (
                      <LocalizedLink
                        className={cn(
                          'cursor-pointer',
                          'text-left font-primary font-[200] text-white',
                          'transition-all duration-300',
                          opacityClass,
                          {
                            'font-[300]': isActive,
                          }
                        )}
                        href={item.href as Pathnames}
                        target={item.isExternal ? '_blank' : undefined}
                        rel={
                          item.isExternal ? 'noopener noreferrer' : undefined
                        }
                        locale={locale as Locale}
                        onClick={() => {
                          setIsMenuOpen(false)
                        }}
                      >
                        {item.title}
                      </LocalizedLink>
                    )}
                    {!item.hasOwnRoute && (
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
                          'text-left font-primary font-[200] text-white',
                          'transition-all duration-300',
                          opacityClass,
                          {
                            'font-[300]': isActive,
                          }
                        )}
                        type='button'
                      >
                        {item.title}
                      </button>
                    )}
                  </li>
                )
              })}
          </ul>
          <ul
            className='flex flex-col gap-2 lg:gap-6 xl:gap-3 2xl:gap-3'
            onMouseLeave={() => !isMobile && setHoveredItem(null)}
          >
            {getNavigationItems(t, locale as Locale)
              .filter(item => !item.mainRoute)
              .map(item => {
                const isHovered = !isMobile && hoveredItem === item.id
                const isActive = activeSection === item.id
                const opacityClass =
                  !isMobile && hoveredItem && !isHovered && !isActive
                    ? 'opacity-50'
                    : isActive
                      ? 'opacity-100'
                      : 'opacity-70'
                return (
                  <li
                    className={cn(
                      'text-base sm:text-2xl lg:text-2xl xl:text-base 2xl:text-xl 3xl:text-xl',
                      {
                        'sm:text-3xl lg:text-3xl xl:text-lg 2xl:text-2xl 3xl:text-2xl':
                          isActive,
                      }
                    )}
                    key={item.id}
                    onMouseEnter={
                      !isMobile ? () => setHoveredItem(item.id) : undefined
                    }
                    onMouseLeave={
                      !isMobile ? () => setHoveredItem(null) : undefined
                    }
                  >
                    {item.hasOwnRoute && (
                      <LocalizedLink
                        className={cn(
                          'cursor-pointer',
                          'text-left font-primary font-[300] text-white',
                          'transition-all duration-300',
                          opacityClass,
                          {
                            'font-[300]': isActive,
                          }
                        )}
                        href={item.href as Pathnames}
                        target={item.isExternal ? '_blank' : undefined}
                        rel={
                          item.isExternal ? 'noopener noreferrer' : undefined
                        }
                        locale={locale as Locale}
                        onClick={() => {
                          setIsMenuOpen(false)
                        }}
                      >
                        {item.title}
                      </LocalizedLink>
                    )}
                    {!item.hasOwnRoute && (
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
                          opacityClass,
                          {
                            'font-[300]': isActive,
                          }
                        )}
                        type='button'
                      >
                        {item.title}
                      </button>
                    )}
                  </li>
                )
              })}
          </ul>
          {/* desktop */}
          <div className='mr-auto mt-auto hidden gap-4 xl:flex'>
            <FacebookLogoIcon
              weight='fill'
              className='size-9 cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
            />
            <InstagramLogoIcon
              weight='fill'
              className='size-9 cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
            />
            <XLogoIcon
              weight='fill'
              className='size-9 cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
            />
            <YoutubeLogoIcon
              weight='fill'
              className='size-9 cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
            />
          </div>
        </div>
      </nav>
      <div className='flex flex-col items-start justify-between gap-6 lg:gap-12 xl:items-end xl:gap-36'>
        {!isMobile && (
          <div className='relative ml-auto hidden w-full flex-col items-stretch justify-start gap-6 xl:flex'>
            <div className='relative aspect-[16/9] flex-shrink-0 overflow-hidden'>
              {Object.entries(menuMedia).map(([itemId, media]) => {
                const isVisible = !isMobile && hoveredItem === itemId
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
                      // <AutoplayVideo
                      //   playbackId={media.src}
                      //   aspectRatio={getAspectRatio(itemId)}
                      // />
                      <video
                        poster={`https://image.mux.com/${media.src}/thumbnail.webp?width=560&time=0`}
                        src={`https://stream.mux.com/${media.src}/highest.mp4`}
                        className={cn(
                          'absolute inset-0 h-full w-full object-cover object-center'
                        )}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='none'
                      />
                    )}
                  </div>
                )
              })}
            </div>
            <div className='relative'>
              {Object.keys(menuMedia).map(itemId => {
                const isVisible = !isMobile && hoveredItem === itemId
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
        {/* buttons */}
        <div className='mt-auto grid grid-cols-3 gap-2 sm:gap-3 lg:gap-3'>
          <button
            className='border-radius-gradient-gray flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-3 lg:py-5 2xl:w-36'
            type='button'
            onClick={handleAppointment}
          >
            <CalendarPlusIcon
              weight='thin'
              className='lg::size-8 size-6 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
            />
            <span className='mt-auto text-left font-primary text-sm/[1.15] font-[400] text-white sm:text-sm lg:text-base/[1.2]'>
              {t.rich('createAppointment', {
                br: () => <br />,
              })}
            </span>
          </button>
          <Link
            href={`https://wa.me/+9002162666600`}
            className='border-radius-gradient-gray flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-3 lg:py-5 2xl:w-36'
          >
            <HeadsetIcon
              weight='thin'
              className='lg::size-8 size-6 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
            />
            <span className='mt-auto text-left font-primary text-sm/[1.15] font-[400] text-white sm:text-sm lg:text-base/[1.2]'>
              {t.rich('speakWithRepresentative', {
                br: () => <br />,
              })}
            </span>
          </Link>
          <Link
            href={citysIstanbulAvmGoogleMaps}
            className='border-radius-gradient-gray flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-3 lg:py-5 2xl:w-36'
          >
            <MapPinPlusIcon
              weight='thin'
              className='lg::size-8 size-6 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
            />
            <span className='mt-auto text-left font-primary text-sm/[1.15] font-[400] text-white sm:text-sm lg:text-base/[1.2]'>
              {t.rich('getDirections', {
                br: () => <br />,
              })}
            </span>
          </Link>
        </div>
        {/* mobile */}
        <div className='mr-auto flex gap-4 xl:hidden'>
          <FacebookLogoIcon
            weight='fill'
            className='size-9 cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
          />
          <InstagramLogoIcon
            weight='fill'
            className='size-9 cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
          />
          <XLogoIcon
            weight='fill'
            className='size-9 cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
          />
          <YoutubeLogoIcon
            weight='fill'
            className='size-9 cursor-pointer text-white transition-colors duration-300 hover:text-bricky-brick'
          />
        </div>
      </div>
    </div>
  )
}
