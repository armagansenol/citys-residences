'use client'

import { Link, Link as LocalizedLink } from '@/i18n/routing'
import { initialScroll } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Lenis from 'lenis'
import { useLenis } from 'lenis/react'
import { ArrowLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/icons'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { Menu } from '@/components/menu'
import { useUiStore } from '@/lib/store/ui'
import { colors } from '@/styles/config.mjs'
import { ListIcon } from '@phosphor-icons/react'

export function Header({ nonHome = false }: { nonHome?: boolean }) {
  const lenis = useLenis()
  const { isMenuOpen, setIsMenuOpen } = useUiStore()
  const [scrollState, setScrollState] = useState({
    hidden: false,
    atTop: true,
  })
  const pathname = usePathname()

  useEffect(() => {
    return isMenuOpen ? lenis?.stop() : lenis?.start()
  }, [lenis, isMenuOpen])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname, setIsMenuOpen])

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
          'pointer-events-none h-[var(--header-height-slim)] bg-transparent'
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
                className='pointer-events-auto cursor-pointer'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type='button'
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <ListIcon weight='thin' className='size-12 text-white' />
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
      <Menu />
    </>
  )
}
