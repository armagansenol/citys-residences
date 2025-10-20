'use client'

import { navigationConfig } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useLenis } from 'lenis/react'
import React, { useState } from 'react'

export const StickySidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(
    navigationConfig['/']?.id || null
  )
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
    {
      label: "CITY'S PARK",
      href: '/citys-park',
      id: navigationConfig['/citys-park']?.id,
    },
    {
      label: 'MEMBERS CLUB',
      href: '/citys-members-club',
      id: navigationConfig['/citys-members-club']?.id,
    },
    {
      label: "CITY'S LIVING",
      href: '/citys-life-privileges',
      id: navigationConfig['/citys-life-privileges']?.id,
    },
    {
      label: "CITY'S ISTANBUL AVM",
      href: '/citys-istanbul-avm',
      id: navigationConfig['/citys-istanbul-avm']?.id,
    },
  ]

  return (
    <div
      className={cn(
        'pointer-events-auto fixed left-16 top-1/2 z-[var(--z-sticky-menu)] flex -translate-y-[40%] flex-col opacity-100 mix-blend-difference transition-opacity duration-300 ease-in-out',
        isScrolledToBottom && 'pointer-events-none opacity-0'
      )}
    >
      {items.map(item => (
        <div
          className={cn(
            'relative h-[3.75vw] w-64 transition-all duration-300 ease-in-out',
            'before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-white before:transition-all before:duration-300 before:ease-in-out before:content-[""]',
            'hover:before:w-1',
            {
              'before:w-[3px]': activeItem === item.id,
            }
          )}
          key={item.href}
        >
          <div
            className='absolute left-4 top-1/2 flex -translate-y-1/2 cursor-pointer flex-col items-center justify-center'
            onClick={() => setActiveItem(item.label || null)}
            onMouseEnter={() => setActiveItem(item.label || null)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <span className='font-primary font-[600] tracking-[0.4em] text-white xl:text-[0.6rem] 2xl:text-[0.8rem]'>
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
