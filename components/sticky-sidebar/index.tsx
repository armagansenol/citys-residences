'use client'

import { useLenis } from 'lenis/react'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

import { Link } from '@/components/utility/link'
import { navigationConfig } from '@/lib/constants'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useNavigation } from '@/hooks/useNavigation'

export const StickySidebar: React.FC = () => {
  const activeSection = useActiveSection()
  const { handleNavClick } = useNavigation()
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false)

  useLenis(({ scroll, limit }) => {
    // Hide when scrolled past the available scroll distance
    // limit represents the maximum scroll distance (document height - viewport height)
    setIsScrolledToBottom(scroll >= limit - window.innerHeight)
  })

  const items = [
    {
      label: 'ANASAYFA',
      href: '/',
      id: navigationConfig['/']?.id,
    },
    {
      label: 'PROJE',
      href: '/project',
      id: navigationConfig['/project']?.id,
    },
    {
      label: 'RESIDENCES',
      href: '/residences',
      id: navigationConfig['/residences']?.id,
    },
    // {
    //   label: "CITY'S PARK",
    //   href: '/citys-park',
    //   id: navigationConfig['/citys-park']?.id,
    // },
    // {
    //   label: 'MEMBERS CLUB',
    //   href: '/citys-members-club',
    //   id: navigationConfig['/citys-members-club']?.id,
    // },
    // {
    //   label: "CITY'S LIVING",
    //   href: '/citys-living',
    //   id: navigationConfig['/citys-living']?.id,
    // },
    {
      label: "CITY'S ISTANBUL AVM",
      href: '/citys-istanbul-avm',
      id: navigationConfig['/citys-istanbul-avm']?.id,
    },
  ]

  return (
    <>
      <div
        className={cn(
          'hidden lg:block',
          'pointer-events-auto z-[var(--z-sticky-menu)] mix-blend-difference',
          'flex flex-col',
          'fixed left-16 top-1/2',
          '-translate-y-[40%]',
          'opacity-100 transition-opacity duration-300 ease-in-out',
          isScrolledToBottom && 'pointer-events-none opacity-0'
        )}
      >
        {items.map(item => (
          <div
            className={cn(
              'relative h-[3.75vw] w-64 flex-shrink-0 transition-all duration-300 ease-in-out',
              'before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-white before:transition-all before:duration-300 before:ease-in-out before:content-[""]',
              'hover:before:w-1',
              {
                'before:w-[3px]': activeSection === item.id,
              }
            )}
            key={item.href}
          >
            <Link
              href={item.id === 'home' ? '/' : `#${item.id as string}`}
              onClick={e => handleNavClick(e, item.id as string)}
              className='absolute left-4 top-1/2 flex -translate-y-1/2 cursor-pointer flex-col items-center justify-center'
            >
              <span className='whitespace-nowrap font-primary text-[0.8rem] font-[700] text-white lg:tracking-[0.4em]'>
                {item.label}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <div
        className={cn(
          'block lg:hidden',
          'pointer-events-auto z-[var(--z-sticky-menu)] mix-blend-difference',
          'flex flex-row',
          'fixed left-4 top-0 translate-y-[90vh]',
          'opacity-100 transition-opacity duration-300 ease-in-out',
          isScrolledToBottom && 'pointer-events-none opacity-0'
        )}
      >
        {items.map(item => (
          <div
            className={cn(
              'relative h-px w-32 flex-shrink-0 transition-all duration-300 ease-in-out',
              'before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-white before:transition-all before:duration-300 before:ease-in-out before:content-[""]',
              'hover:before:w-1',
              {
                'before:w-[3px]': activeSection === item.id,
              }
            )}
            key={item.href}
          >
            <Link
              href={item.id === 'home' ? '/' : `#${item.id as string}`}
              onClick={e => handleNavClick(e, item.id as string)}
              className='absolute left-4 top-1/2 flex -translate-y-1/2 cursor-pointer flex-col items-center justify-center'
            >
              <span className='whitespace-nowrap font-primary font-[700] text-white xl:text-[0.6rem] 2xl:text-[0.8rem]'>
                {item.label}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
