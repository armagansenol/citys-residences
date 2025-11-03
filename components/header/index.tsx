'use client'

import { cn } from '@/lib/utils'
import { ListIcon } from '@phosphor-icons/react'
import { Link } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { Logo } from '@/components/icons'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { Menu } from '@/components/menu'
import { useUiStore } from '@/lib/store/ui'
import { colors } from '@/styles/config.mjs'

export function Header() {
  // const { handleNavClick } = useNavigation()
  const { isMenuOpen, setIsMenuOpen } = useUiStore()
  const pathname = usePathname()

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
          <Link
            href='/'
            className='2xl:size-46 pointer-events-auto block size-28 xl:size-32 3xl:size-40'
            aria-label='Home'
          >
            <Logo fill={colors.white} />
          </Link>
          <div className='pointer-events-auto ml-auto flex cursor-pointer items-center gap-2 lg:gap-6'>
            <LocaleSwitcher />
            <button
              className='pointer-events-auto cursor-pointer'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type='button'
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <ListIcon weight='thin' className='size-12 text-white' />
            </button>
          </div>
        </div>
      </header>
      <Menu />
    </>
  )
}
