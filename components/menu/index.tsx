'use client'

import { gsap, useGSAP } from '@/components/gsap'
import { cn } from '@/lib/utils'
import { useLenis } from 'lenis/react'
import { ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { useClickAway } from 'react-use'

import { IconWrapper } from '@/components/icon-wrapper'
import { socialIcons } from '@/components/icons'
import { Img } from '@/components/utility/img'
import { ScrollableBox } from '@/components/utility/scrollable-box'
import { citysIstanbulAvmGoogleMaps, NavigationMetadata } from '@/lib/constants'
import { useScrollStore } from '@/lib/store/scroll'
import { colors } from '@/styles/config.mjs'

interface MenuProps {
  items: NavigationMetadata[]
}

export function Menu({ items }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()
  const lenis = useLenis()

  // Use the new unified scroll store
  const {
    menu: { isOpen: open },
    setMenuOpen: setOpen,
    scrollToCard,
    smoothScrollWithWrapper,
  } = useScrollStore()

  useClickAway(menuRef, e => {
    if ((e.target as HTMLElement).closest('[data-ignore-click-away]')) {
      return
    }
    setOpen(false)
  })

  useGSAP(
    () => {
      menuTL.current = gsap.timeline({
        paused: true,
      })

      menuTL.current.fromTo(
        menuRef.current,
        { translateX: '100%' },
        {
          translateX: '0%',
          duration: 0.8,
          ease: 'expo.inOut',
        }
      )
    },
    {
      revertOnUpdate: true,
    }
  )

  useGSAP(
    () => {
      if (open) {
        menuTL.current?.play()
        lenis?.stop()
      } else {
        menuTL.current?.reverse().then(() => {
          lenis?.start()
        })
      }
    },
    {
      dependencies: [open, lenis],
    }
  )

  const handleScroll = (id: string) => {
    if (id.includes('stacking-cards')) {
      const cardIndex = parseInt(id.split('-')[2])
      smoothScrollWithWrapper(() => scrollToCard(cardIndex, true))
    } else {
      smoothScrollWithWrapper(() =>
        lenis?.scrollTo(`#${id}`, { immediate: true })
      )
    }
  }

  const handleMenuItemClick = (id: string) => {
    handleScroll(id)
  }

  return (
    <>
      <div
        className={cn(
          'fixed bottom-0 right-0 top-0 z-[var(--z-menu)] translate-x-full',
          'w-screen lg:w-[60vw]',
          'blur-bg-white-2',
          'pb-10 pl-24 pr-16 pt-20'
        )}
        ref={menuRef}
        data-ignore-click-away
      >
        <button
          className={cn(
            'z-16 absolute left-0 top-2 h-16 w-16 -translate-x-full bg-white p-2 text-bricky-brick lg:top-20',
            'opacity-0 transition-opacity duration-700 ease-in-out',
            'flex items-center justify-center',
            {
              'opacity-100': open,
            }
          )}
          onClick={() => setOpen(false)}
          type='button'
        >
          <ChevronRight className='h-8 w-8' />
          <span className='sr-only'>Close</span>
        </button>
        <div className='flex justify-between gap-24'>
          <div className='flex lg:items-end' data-lenis-prevent>
            <ScrollableBox>
              <nav className='flex h-full w-full items-end justify-center lg:justify-start'>
                <ul
                  className={cn(
                    'flex w-full flex-col items-stretch gap-3 lg:gap-3 xl:gap-3 2xl:gap-4 3xl:gap-4'
                  )}
                >
                  {items.map(item => (
                    <li
                      className={cn(
                        'flex items-center justify-between gap-2',
                        'text-xl lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl',
                        'text-center font-primary font-[300] text-white lg:text-left',
                        {
                          'text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl 3xl:text-6xl':
                            item.mainRoute,
                        }
                      )}
                      key={item.title}
                    >
                      <span
                        className='block cursor-pointer whitespace-nowrap'
                        onClick={() => handleMenuItemClick(item.id)}
                      >
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            </ScrollableBox>
          </div>
          <div className='flex flex-1 flex-col gap-8'>
            <div className='relative h-72 w-full overflow-hidden'>
              <Img
                src='/img/citys-istanbul-avm-hero.jpg'
                alt="City's Istanbul AVM"
                fill
                sizes='40vw'
                loading='lazy'
                className='object-cover'
              />
            </div>
            <p
              className={cn(
                'flex items-center justify-between gap-2',
                'text-xl lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl',
                'text-center font-primary font-[300] text-white lg:text-left'
              )}
            >
              Hayatın tam merkezinde, zamanı kendinize ve sevdiklerinize
              ayırarak keyifle, yaşamı sanata dönüştürerek daha çok yaşa.
            </p>
          </div>
        </div>
        <div className='flex items-end justify-between'>
          <div className='flex flex-col items-start'>
            <div className='grid w-[300px] grid-cols-4 gap-2 lg:gap-2 xl:gap-2'>
              <IconWrapper
                className={cn(
                  'aspect-square w-full cursor-pointer opacity-70 transition-opacity',
                  'hover:opacity-100'
                )}
              >
                {socialIcons(colors.white).instagram}
              </IconWrapper>
              <IconWrapper
                className={cn(
                  'aspect-square w-full cursor-pointer opacity-70 transition-opacity',
                  'hover:opacity-100'
                )}
              >
                {socialIcons(colors.white).facebook}
              </IconWrapper>
              <IconWrapper
                className={cn(
                  'aspect-square w-full cursor-pointer opacity-70 transition-opacity',
                  'hover:opacity-100'
                )}
              >
                {socialIcons(colors.white).tiktok}
              </IconWrapper>
              <IconWrapper
                className={cn(
                  'aspect-square w-full cursor-pointer opacity-70 transition-opacity',
                  'hover:opacity-100'
                )}
              >
                {socialIcons(colors.white).youtube}
              </IconWrapper>
            </div>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <div className='border-gradient-white h-40 w-40 rounded-sm'>
              Randevu Oluştur
            </div>
            <div className='border-gradient-white h-40 w-40 rounded-sm'>
              Temsilciyle Görüş
            </div>
            <a
              href={citysIstanbulAvmGoogleMaps}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                'block',
                'transition-opacity duration-300 ease-in-out',
                'opacity-100 hover:opacity-70',
                'flex items-start gap-1',
                'border-gradient-white h-40 w-40 rounded-sm'
              )}
            >
              Yol Tarifi Al
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
