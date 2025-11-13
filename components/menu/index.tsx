'use client'

import { gsap } from '@/components/gsap'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { Link } from '@/components/utility/link'
import { useEsc } from '@/hooks/useEsc'
import { citysIstanbulAvmGoogleMaps } from '@/lib/constants'
import { useUiStore } from '@/lib/store/ui'
import {
  CalendarPlusIcon,
  CaretRightIcon,
  FacebookLogoIcon,
  HeadsetIcon,
  InstagramLogoIcon,
  MapPinPlusIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react'
import { MenuNavList } from './menu-nav-list'
import { useWindowSize } from 'hamo'
import { breakpoints } from '@/styles/config.mjs'

export function Menu() {
  const t = useTranslations('common')
  const { width: windowWidth } = useWindowSize(100)
  const { isMenuOpen, setIsMenuOpen, setIsModalContactFormOpen } = useUiStore()
  const overlayRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const animationTL = useRef<gsap.core.Timeline>()

  // useClickAway(menuRef, e => {
  //   if (!open) return
  //   if ((e.target as HTMLElement).closest('[data-ignore-click-away]')) {
  //     return
  //   }
  //   onClose()
  // })

  useEsc(() => setIsMenuOpen(!isMenuOpen), isMenuOpen)

  useGSAP(
    () => {
      animationTL.current = gsap.timeline({
        paused: true,
      })

      animationTL.current
        ?.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          's'
        )
        .fromTo(
          menuRef.current,
          { x: '100%' },
          {
            x: 0,
            duration: 0.6,
            ease: 'expo.inOut',
          },
          's'
        )
    },
    {
      revertOnUpdate: true,
    }
  )

  useGSAP(
    () => {
      if (isMenuOpen) {
        animationTL.current?.play()
      } else {
        animationTL.current?.reverse()
      }
    },
    {
      dependencies: [isMenuOpen],
    }
  )

  function handleAppointment() {
    setIsMenuOpen(false)
    setIsModalContactFormOpen(true)
  }

  return (
    <>
      {/* Overlay */}
      <button
        className={cn(
          'fixed left-0 top-0 z-[var(--z-modal-overlay)] block h-full w-full opacity-0',
          {
            'pointer-events-none': !isMenuOpen,
            'pointer-events-auto': isMenuOpen,
          }
        )}
        ref={overlayRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type='button'
      ></button>
      {/* Menu */}
      <div
        className={cn(
          'fixed bottom-0 right-0 top-0',
          'h-full w-full translate-x-[100%] lg:w-[80vw] xl:w-[60vw]',
          'blur-bg-white-2',
          'py-8 pl-8 pr-8 lg:py-20 lg:pl-16 lg:pr-16 xl:pl-24 xl:pr-20',
          'flex flex-col',
          'z-[var(--z-modal)]'
        )}
        onClick={e => e.stopPropagation()}
        ref={menuRef}
      >
        {/* close button */}
        <button
          className={cn(
            'absolute right-0 top-28 lg:left-0 lg:right-auto lg:top-20 lg:-translate-x-full',
            'size-12 p-4 lg:size-20 xl:size-16',
            'z-[var(--z-modal-close-button)] bg-bricky-brick text-white',
            'opacity-0 transition-opacity duration-700 ease-in-out',
            'flex items-center justify-center',
            {
              'pointer-events-auto opacity-100': isMenuOpen,
              'pointer-events-none opacity-0': !isMenuOpen,
            }
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type='button'
          disabled={!isMenuOpen}
        >
          <CaretRightIcon className='size-full' weight='thin' />
          <span className='sr-only'>Close</span>
        </button>
        {windowWidth && windowWidth >= breakpoints.breakpointTablet && (
          <MenuNavList />
        )}
        <div className='mt-12 flex flex-1 flex-col items-end justify-between lg:mt-auto lg:flex-row xl:mt-auto xl:gap-36'>
          <div className='mr-auto flex gap-4'>
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
          {/* buttons */}
          <div className='mr-auto flex flex-col lg:ml-auto lg:mr-0'>
            <div className='grid grid-cols-3 gap-2 sm:gap-3 lg:gap-3'>
              <button
                className='border-radius-gradient-gray flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-3 lg:py-5 2xl:w-36'
                type='button'
                onClick={handleAppointment}
              >
                <CalendarPlusIcon
                  weight='thin'
                  className='size-8 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                />
                <span className='mt-auto text-left font-primary text-sm/[1.15] font-[400] text-white sm:text-sm lg:text-base/[1.2]'>
                  {t.rich('createAppointment', {
                    br: () => <br />,
                  })}
                </span>
              </button>
              <button className='border-radius-gradient-gray flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-3 lg:py-5 2xl:w-36'>
                <HeadsetIcon
                  weight='thin'
                  className='size-8 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                />
                <span className='mt-auto text-left font-primary text-sm/[1.15] font-[400] text-white sm:text-sm lg:text-base/[1.2]'>
                  {t.rich('speakWithRepresentative', {
                    br: () => <br />,
                  })}
                </span>
              </button>
              <Link
                href={citysIstanbulAvmGoogleMaps}
                className='border-radius-gradient-gray flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-3 lg:py-5 2xl:w-36'
              >
                <MapPinPlusIcon
                  weight='thin'
                  className='size-8 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                />
                <span className='mt-auto text-left font-primary text-sm/[1.15] font-[400] text-white sm:text-sm lg:text-base/[1.2]'>
                  {t.rich('getDirections', {
                    br: () => <br />,
                  })}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
