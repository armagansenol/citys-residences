'use client'

import { Link, Link as LocalizedLink, type Locale } from '@/i18n/routing'
import {
  getNavigationItems,
  initialScroll,
  NavigationMetadata,
} from '@/lib/constants'
import { cn } from '@/lib/utils'
import Lenis from 'lenis'
import { useLenis } from 'lenis/react'
import { animate, stagger } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Logo } from '@/components/icons'
import { LocaleSwitcher } from '@/components/locale-switcher'
// import { Menu } from "@/components/menu"
import { MenuX } from '@/components/menu-x'
import { useScrollStore } from '@/lib/store/scroll'
import { useSectionsMenuStore } from '@/lib/store/sections-menu'
import { colors } from '@/styles/config.mjs'
import { ArrowLeft } from 'lucide-react'

export function Header({ nonHome = false }: { nonHome?: boolean }) {
  const lenis = useLenis()
  const { sections } = useSectionsMenuStore()
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
  const sectionsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    // Clear refs when sections becomes empty
    if (sections.length === 0) {
      sectionsRef.current = []
      return
    }

    if (sectionsRef.current.length === 0) return

    const validElements = sectionsRef.current.filter(
      Boolean
    ) as HTMLAnchorElement[]

    // Don't animate if there are no valid elements
    if (validElements.length === 0) return

    if (scrollState.atTop) {
      // Animate out
      animate(
        validElements,
        { opacity: 0, y: -4, pointerEvents: 'none' },
        { duration: 0.1, delay: stagger(0.05) }
      )
    } else {
      // Animate in with stagger
      animate(
        validElements,
        { opacity: 1, y: 0, pointerEvents: 'auto' },
        { duration: 0.3, delay: stagger(0.05) }
      )
    }
  }, [scrollState.atTop, sections.length])

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
          'h-[var(--header-height-slim)] bg-transparent'
        )}
      >
        <div className='z-[var(--z-header-content)] flex flex-1 items-stretch justify-between gap-12 px-4 lg:px-0'>
          {Object.values(sections).length > 0 && !scrollState.atTop && (
            <div className={cn('flex items-stretch gap-8')}>
              {Object.values(sections).map((item, index) => (
                <div key={item.id} className='group relative flex items-center'>
                  <a
                    ref={el => {
                      sectionsRef.current[index] = el
                    }}
                    href={`#${item.id}`}
                    className={cn(
                      'font-regular relative block font-primary text-base text-black',
                      {
                        'opacity-0': scrollState.atTop,
                        'opacity-100': !scrollState.atTop,
                        'pointer-events-none': scrollState.atTop,
                        'pointer-events-auto': !scrollState.atTop,
                      }
                    )}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          )}
          <div className='h-32 w-48 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40'>
            <LocalizedLink href='/' scroll={initialScroll} aria-label='Home'>
              <Logo fill={colors.white} />
            </LocalizedLink>
          </div>
          <div className='ml-auto flex cursor-pointer items-center gap-5'>
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
                    isOpen={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                    strokeWidth='2'
                    color={colors.white}
                    transition={{ type: 'spring', stiffness: 260, damping: 40 }}
                    width='50'
                    height='6'
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
      {/* <Menu items={navigationItems} /> */}
    </>
  )
}
