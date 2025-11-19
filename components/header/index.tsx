'use client'

import { Link as LocalizedLink } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ListIcon } from '@phosphor-icons/react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { Logo } from '@/components/icons'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { Menu } from '@/components/menu'
import { Locale, Pathnames } from '@/i18n/routing'
import { navigationConfig } from '@/lib/constants'
import { useUiStore } from '@/lib/store/ui'
import { colors } from '@/styles/config.mjs'

export interface HeaderProps {
  withNavigation?: boolean
}

export function Header({ withNavigation = true }: HeaderProps) {
  const { isMenuOpen, setIsMenuOpen } = useUiStore()
  const pathname = usePathname()
  const locale = useLocale()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname, setIsMenuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-[var(--z-header)] mix-blend-difference',
          'section-padding flex items-stretch',
          'pointer-events-none h-[var(--header-height-slim)] bg-transparent'
        )}
      >
        <div className='z-[var(--z-header-content)] flex flex-1 items-center justify-between px-6 lg:px-0'>
          <LocalizedLink
            href={navigationConfig['/'].href as Pathnames}
            className='2xl:size-46 pointer-events-auto block size-28 xl:size-32 3xl:size-40'
            aria-label='Home'
            locale={locale as Locale}
          >
            <Logo fill={colors.white} />
          </LocalizedLink>
          <div className='pointer-events-auto ml-auto flex cursor-pointer items-center gap-2 lg:gap-6'>
            <LocaleSwitcher />
            {withNavigation && (
              <button
                className='pointer-events-auto cursor-pointer'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type='button'
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <ListIcon weight='thin' className='size-12 text-white' />
              </button>
            )}
          </div>
        </div>
      </header>
      <Menu />
    </>
  )
}
