'use client'

import { Link, Locale, Link as LocalizedLink } from '@/i18n/routing'
import {
  getNavigationItems,
  initialScroll,
  NavigationMetadata,
} from '@/lib/constants'
import { cn } from '@/lib/utils'
import Lenis from 'lenis'
import { useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { Logo } from '@/components/icons'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { Menu } from '@/components/menu'
import { MenuX } from '@/components/menu-x'
import { useScrollStore } from '@/lib/store/scroll'
import { colors } from '@/styles/config.mjs'

export function Header({ nonHome = false }: { nonHome?: boolean }) {
  const lenis = useLenis()
  const {
    menu: { isOpen: menuOpen },
    setMenuOpen,
    setLenis,
  } = useScrollStore()

  // Set lenis instance in the scroll store
  useEffect(() => {
    if (lenis) {
      setLenis(lenis)
    }
  }, [lenis, setLenis])
  const [scrollState, setScrollState] = useState({
    hidden: false,
    atTop: true,
  })
  const pathname = usePathname()
  const t = useTranslations('common')
  const locale = useLocale()

  const navigationItems: NavigationMetadata[] = getNavigationItems(
    t,
    locale as Locale
  )

  useEffect(() => {
    return menuOpen ? lenis?.stop() : lenis?.start()
  }, [lenis, menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, setMenuOpen])

  useEffect(() => {
    let prevDirection = 0
    let prevAtTop = true

    const handleEvents = (e: Lenis) => {
      const atTop = Boolean(e.className) && e.actualScroll < 10
      const hidden =
        lenis?.direction === 1 && e.actualScroll > window.innerHeight / 2

      if (
        prevDirection !== lenis?.direction ||
        prevAtTop !== atTop ||
        e.actualScroll > window.innerHeight / 2
      ) {
        prevDirection = lenis?.direction || 0
        prevAtTop = atTop

        setScrollState({
          atTop,
          hidden,
        })
      }
    }

    lenis?.on('scroll', handleEvents)
    return () => lenis?.off('scroll', handleEvents)
  }, [lenis])

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-[var(--z-header)] mix-blend-difference',
          'section-padding flex items-stretch',
          'transition-all duration-300',
          'pointer-events-none h-[var(--header-height-slim)] w-screen bg-transparent'
        )}
      >
        <div className='z-[var(--z-header-content)] flex flex-1 items-stretch justify-between px-6 lg:px-0'>
          <div className='2xl:size-46 pointer-events-auto size-28 xl:size-32 3xl:size-40'>
            <LocalizedLink href='/' scroll={initialScroll} aria-label='Home'>
              <Logo fill={colors.white} />
            </LocalizedLink>
          </div>
          <div className='pointer-events-auto ml-auto flex cursor-pointer items-center gap-2 lg:gap-6'>
            <LocaleSwitcher theme='dark' />
            {!nonHome ? (
              <button
                className='pointer-events-none flex cursor-pointer items-center gap-2 lg:gap-4'
                onClick={() => setMenuOpen(!menuOpen)}
                type='button'
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                data-ignore-click-away
              >
                <div className='flex cursor-pointer items-center'>
                  <MenuX
                    className='hidden lg:block'
                    isOpen={false}
                    onClick={() => setMenuOpen(!menuOpen)}
                    strokeWidth='2'
                    color={colors.white}
                    transition={{ type: 'spring', stiffness: 260, damping: 40 }}
                    width='40'
                    height='12'
                  />
                  <MenuX
                    className='block lg:hidden'
                    isOpen={false}
                    onClick={() => setMenuOpen(!menuOpen)}
                    strokeWidth='2'
                    color={colors.white}
                    transition={{ type: 'spring', stiffness: 260, damping: 40 }}
                    width='30'
                    height='9'
                  />
                </div>
              </button>
            ) : (
              <Link
                href='/'
                className={cn(
                  'font-primary text-xl font-medium text-white',
                  'relative flex cursor-pointer items-center gap-2 lg:gap-2',
                  'transition-colors duration-300',
                  {
                    'text-black': !scrollState.atTop,
                    'text-white': scrollState.atTop,
                  }
                )}
              >
                <ArrowLeft className='h-6 w-6' />
                ANASAYFAYA DÖN
              </Link>
            )}
          </div>
        </div>
      </header>
      <Menu items={navigationItems} />
    </>
  )
}
