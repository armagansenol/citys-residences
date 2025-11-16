'use client'

import { cn } from '@/lib/utils'
import {
  CalendarPlusIcon,
  FacebookLogoIcon,
  HeadsetIcon,
  InstagramLogoIcon,
  MapPinAreaIcon,
  MapPinPlusIcon,
  PhoneCallIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react'
import { useIntersectionObserver } from 'hamo'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { Logo } from '@/components/icons'
import { Image } from '@/components/image'
import { Link } from '@/components/utility/link'
import { useNavigation } from '@/hooks/useNavigation'
import { Locale, routing } from '@/i18n/routing'
import { getNavigationItems, navigationConfig } from '@/lib/constants'
import { useUiStore } from '@/lib/store/ui'
import { colors } from '@/styles/config.mjs'

export function Footer() {
  const t = useTranslations('common')
  const locale = useLocale()
  const navigationItems = getNavigationItems(t, locale as Locale)
  const { handleNavClick } = useNavigation()
  const {
    setIsMenuOpen,
    setIsModalContactFormOpen,
    setIsInquiryVisible,
    setIsStickySidebarVisible,
  } = useUiStore()
  const [footerRef, entry] = useIntersectionObserver()

  useEffect(() => {
    if (!entry) return

    if (entry.isIntersecting) {
      setIsInquiryVisible(false)
      setIsStickySidebarVisible(false)
    } else {
      setIsInquiryVisible(true)
      setIsStickySidebarVisible(true)
    }
  }, [entry, setIsInquiryVisible, setIsStickySidebarVisible])

  const footerItems = {
    menu: navigationItems,
    legal: [
      {
        title: t('kvkRelatedInformation'),
        href: routing.pathnames['/pdpl/pdpl-related-information'][
          locale as Locale
        ],
      },
      {
        title: t('commercialElectronicMessage'),
        href: routing.pathnames['/pdpl/commercial-electronic-message'][
          locale as Locale
        ],
      },
      {
        title: t('explicitConsent'),
        href: routing.pathnames['/pdpl/explicit-consent'][locale as Locale],
      },
      {
        title: t('cookiePolicy'),
        href: routing.pathnames['/pdpl/cookie-policy'][locale as Locale],
      },
    ],
  }

  function handleAppointment() {
    setIsMenuOpen(false)
    setIsModalContactFormOpen(true)
  }

  return (
    <footer
      className={cn(
        'pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-16 lg:pt-32',
        'relative overflow-hidden bg-gradient-appointment-reversed'
      )}
      ref={footerRef}
    >
      <Image
        src='/svg/bg-footer.svg'
        alt='Footer Background'
        fill
        className='pointer-events-none absolute inset-0 hidden object-cover mix-blend-multiply lg:block'
        loading='lazy'
      />
      <div className='relative z-10 grid grid-cols-24 gap-y-8 pb-4'>
        <div className='order-1 col-span-24 lg:col-span-22 lg:col-start-2 xl:col-span-21 xl:col-start-3 2xl:col-span-20 2xl:col-start-4'>
          <div className='grid grid-cols-24'>
            <div
              className={cn(
                'col-span-24 md:col-span-24 lg:col-start-1 lg:justify-start xl:col-span-6',
                'flex items-center justify-center lg:items-start',
                'order-1 mb-16 xl:mb-0'
              )}
            >
              <button
                className='w-[160px] sm:w-[200px] lg:w-[180px] xl:w-[200px] 2xl:w-[240px]'
                aria-label='Home'
                onClick={() =>
                  handleNavClick(navigationConfig['/'].id as string)
                }
                type='button'
              >
                <Logo fill={colors.white} />
              </button>
            </div>
            <div
              className={cn(
                'col-span-24 md:col-span-12 xl:col-span-8 xl:col-start-7',
                'flex justify-between',
                'order-2 mb-16 lg:mb-0',
                'px-8 lg:px-0 lg:pr-8 xl:pr-8 2xl:pr-16 3xl:pr-20'
              )}
            >
              <div className='flex flex-col gap-4 lg:gap-6 xl:gap-8'>
                {getNavigationItems(t, locale as Locale)
                  .filter(item => item.mainRoute)
                  .map(item => (
                    <button
                      key={item.id}
                      className={cn(
                        'cursor-pointer text-left font-primary font-[300] text-white transition-colors duration-300',
                        item.mainRoute &&
                          'text-xl sm:text-2xl lg:text-3xl xl:text-2xl 3xl:text-3xl'
                      )}
                      onClick={() => {
                        if (item.disabled) {
                          handleNavClick(navigationConfig['/'].id)
                          return
                        }
                        handleNavClick(item.id)
                      }}
                      type='button'
                    >
                      {item.title}
                    </button>
                  ))}
              </div>
              <div className='flex flex-col gap-4 lg:gap-6 xl:gap-8'>
                {getNavigationItems(t, locale as Locale)
                  .filter(item => !item.mainRoute)
                  .map(item => (
                    <button
                      key={item.id}
                      className={cn(
                        'cursor-pointer text-left font-primary font-[300] text-white transition-colors duration-300',
                        !item.mainRoute &&
                          'text-sm sm:text-base lg:text-lg xl:text-lg 3xl:text-xl',
                        item.mainRoute && 'text-4xl 3xl:text-5xl'
                      )}
                      onClick={() => {
                        if (item.disabled) {
                          handleNavClick(navigationConfig['/'].id)
                          return
                        }
                        handleNavClick(item.id)
                      }}
                      type='button'
                    >
                      {item.title}
                    </button>
                  ))}
              </div>
            </div>
            <div
              className={cn(
                'xl:col-start-16 order-3 col-span-24 md:col-span-12 xl:col-span-9',
                'flex flex-col gap-12 lg:gap-16 xl:gap-12',
                'border-gradient-to-b',
                'px-8 lg:px-0 lg:pl-8 xl:pl-16 3xl:pl-16'
              )}
            >
              {/* sales office */}
              <div className='order-1 flex flex-col lg:order-1'>
                <div className='flex items-start justify-between gap-6 lg:gap-4'>
                  <h3 className='font-primary text-xl font-[400] text-white xl:text-2xl'>
                    {t('salesOffice')}
                  </h3>
                  <div className='flex size-14 shrink-0 cursor-pointer items-center justify-center bg-bricky-brick text-white transition-colors duration-300 hover:bg-bricky-brick/80 sm:size-16 lg:size-20'>
                    <MapPinAreaIcon
                      size={24}
                      className='sm:size-[26px] lg:size-[30px]'
                      pointerEvents='none'
                    />
                  </div>
                </div>
                <Link
                  href='https://goo.gl/maps/X5VuQBQmZF2r9WZ17'
                  className='-mt-6 flex flex-col gap-1 text-white sm:-mt-8'
                >
                  <p className='font-primary text-sm/[1.2] font-[300] xl:text-base'>
                    {t('salesOfficeAddress1')}
                  </p>
                  <p className='font-primary text-sm/[1.2] font-[300] xl:text-base'>
                    {t('salesOfficeAddress2')}
                  </p>
                  <p className='font-primary text-sm/[1.2] font-[300] xl:text-base'>
                    {t('salesOfficeAddress3')}
                  </p>
                </Link>
              </div>
              {/* contact */}
              <div className='order-2 flex flex-col lg:order-2'>
                <div className='flex items-start justify-between gap-6 lg:gap-4'>
                  <h3 className='font-primary text-xl font-[400] text-white xl:text-2xl'>
                    {t('contact')}
                  </h3>
                  <div className='flex size-14 shrink-0 cursor-pointer items-center justify-center bg-bricky-brick text-white transition-colors duration-300 hover:bg-bricky-brick/80 sm:size-16 lg:size-20'>
                    <PhoneCallIcon
                      size={24}
                      className='sm:size-[26px] lg:size-[30px]'
                      pointerEvents='none'
                    />
                  </div>
                </div>
                <div className='-mt-6 flex flex-col gap-1 text-white sm:-mt-8'>
                  <Link
                    href='mailto:info@citysresidences.com'
                    className='block font-primary text-sm/[1.2] font-[300] xl:text-base'
                  >
                    info@citysresidences.com
                  </Link>
                  <Link
                    href='tel:+902162666600'
                    className='block font-primary text-sm/[1.2] font-[300] xl:text-base'
                  >
                    +90 (216) 266 66 00
                  </Link>
                </div>
              </div>
              {/* social icons desktop */}
              <div className='order-4 mx-auto hidden gap-4 lg:order-3 lg:ml-0 lg:flex'>
                <FacebookLogoIcon weight='fill' className='size-9 text-white' />
                <InstagramLogoIcon
                  weight='fill'
                  className='size-9 text-white'
                />
                <XLogoIcon weight='fill' className='size-9 text-white' />
                <YoutubeLogoIcon weight='fill' className='size-9 text-white' />
              </div>
              {/* buttons */}
              <div className='order-3 flex flex-col gap-6 lg:order-4'>
                <div className='grid grid-cols-3 gap-2 lg:gap-4'>
                  <button
                    className='border-radius-gradient flex aspect-[14/16] flex-col px-2 py-4 sm:gap-6 lg:px-4 lg:py-6'
                    onClick={handleAppointment}
                    type='button'
                  >
                    <CalendarPlusIcon
                      weight='thin'
                      className='z-10 size-8 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                    />
                    <span className='z-10 mt-auto text-left font-primary text-xs font-[400] leading-tight text-white lg:text-sm 2xl:text-base'>
                      {t.rich('createAppointment', {
                        br: () => <br />,
                      })}
                    </span>
                  </button>
                  <button className='border-radius-gradient flex aspect-[14/16] flex-col px-2 py-4 sm:gap-6 lg:px-4 lg:py-6'>
                    <HeadsetIcon
                      weight='thin'
                      className='z-10 size-8 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                    />
                    <span className='z-10 mt-auto text-left font-primary text-xs font-[400] leading-tight text-white lg:text-sm 2xl:text-base'>
                      {t.rich('speakWithRepresentative', {
                        br: () => <br />,
                      })}
                    </span>
                  </button>
                  <Link
                    href='https://goo.gl/maps/X5VuQBQmZF2r9WZ17'
                    className='border-radius-gradient flex aspect-[14/16] flex-col px-2 py-4 sm:gap-6 lg:px-4 lg:py-6'
                  >
                    <MapPinPlusIcon
                      weight='thin'
                      className='z-10 size-8 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                    />
                    <span className='z-10 mt-auto text-left font-primary text-xs font-[400] leading-tight text-white lg:text-sm 2xl:text-base'>
                      {t.rich('getDirections', {
                        br: () => <br />,
                      })}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* social icons mobile */}
        <div className='order-2 col-span-24 mt-12 flex lg:hidden'>
          <div className='mx-auto flex gap-4'>
            <FacebookLogoIcon weight='fill' className='size-9 text-white' />
            <InstagramLogoIcon weight='fill' className='size-9 text-white' />
            <XLogoIcon weight='fill' className='size-9 text-white' />
            <YoutubeLogoIcon weight='fill' className='size-9 text-white' />
          </div>
        </div>
        <div
          className={cn(
            'order-3 lg:order-2',
            'mt-8 lg:mt-auto',
            'col-span-24 lg:col-span-21 lg:col-start-3 xl:col-span-21 xl:col-start-3 2xl:col-span-20 2xl:col-start-4',
            'text-sm text-white/90 2xl:text-base',
            'font-primary font-[300]'
          )}
        >
          <span className='flex flex-col gap-4 text-center lg:gap-0 lg:text-left'>
            <span>{t('copyrightYear')}</span>
            <span>{t('copyrightText')}</span>
          </span>
        </div>
        <div
          className={cn(
            'order-2 lg:order-3',
            'mt-8 lg:mt-auto',
            'col-span-24 lg:col-span-21 lg:col-start-3 xl:col-span-21 xl:col-start-3 2xl:col-span-19 2xl:col-start-4',
            'flex flex-col gap-4 lg:flex-row xl:justify-between',
            'text-sm text-white/90 2xl:text-base',
            'font-primary font-[300]'
          )}
        >
          <span className='hidden lg:inline'>{t('copyright')}</span>
          <span className='flex flex-col flex-wrap items-center justify-center gap-6 md:gap-6 lg:ml-auto lg:flex-row lg:items-start lg:gap-6'>
            {footerItems.legal.map((item, i) => (
              <Link
                target='_blank'
                rel='noopener noreferrer'
                key={i}
                href={item.href}
                className='whitespace-nowrap'
              >
                {item.title}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}
