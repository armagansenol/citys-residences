'use client'

import { gsap } from '@/components/gsap'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
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

export function Menu() {
  const t = useTranslations('common')
  const { isMenuOpen, setIsMenuOpen, setIsModalContactFormOpen } = useUiStore()
  const overlayRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const animationTL = useRef<gsap.core.Timeline>()
  const lenis = useLenis()

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
        lenis?.stop()
      } else {
        animationTL.current?.reverse()
        lenis?.start()
      }
    },
    {
      dependencies: [isMenuOpen, lenis],
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
          'py-8 pl-8 pr-8 lg:py-20 lg:pl-16 lg:pr-20 xl:pl-24 xl:pr-24',
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
        <MenuNavList />
        <div className='mt-12 flex flex-col items-end justify-between gap-16 lg:mt-auto lg:flex-row'>
          <div className='mr-auto flex gap-4'>
            <FacebookLogoIcon
              weight='fill'
              className='size-9 text-white xl:size-8'
            />
            <InstagramLogoIcon
              weight='fill'
              className='size-9 text-white xl:size-8'
            />
            <XLogoIcon weight='fill' className='size-9 text-white xl:size-8' />
            <YoutubeLogoIcon
              weight='fill'
              className='size-9 text-white xl:size-8'
            />
          </div>
          {/* buttons */}
          <div className='mr-auto flex flex-col lg:ml-auto lg:mr-0'>
            <div className='grid grid-cols-3 gap-2 sm:gap-3 lg:gap-3'>
              <button
                className='border-radius-gradient-gray flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-3 lg:py-5'
                type='button'
                onClick={handleAppointment}
              >
                <CalendarPlusIcon
                  weight='thin'
                  className='size-8 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                />
                <span className='mt-auto text-left font-primary text-sm font-[400] leading-tight text-white sm:text-sm lg:text-base'>
                  {t.rich('createAppointment', {
                    br: () => <br />,
                  })}
                </span>
              </button>
              <button className='border-radius-gradient-gray flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-3 lg:py-5'>
                <HeadsetIcon
                  weight='thin'
                  className='size-8 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                />
                <span className='mt-auto text-left font-primary text-sm font-[400] leading-tight text-white sm:text-sm lg:text-base'>
                  {t.rich('speakWithRepresentative', {
                    br: () => <br />,
                  })}
                </span>
              </button>
              <Link
                href={citysIstanbulAvmGoogleMaps}
                className='border-radius-gradient-gray flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-3 lg:py-5'
              >
                <MapPinPlusIcon
                  weight='thin'
                  className='size-8 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                />
                <span className='mt-auto text-left font-primary text-sm font-[400] leading-tight text-white sm:text-sm lg:text-base'>
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
