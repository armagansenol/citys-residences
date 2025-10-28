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
import { useLocale, useTranslations } from 'next-intl'
import { Fragment, useRef } from 'react'

import { Logo } from '@/components/icons'
import { Link } from '@/components/utility/link'
import { useNavigation } from '@/hooks/useNavigation'
import { Locale, Link as LocalizedLink, routing } from '@/i18n/routing'
import { getNavigationItems, navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

export function Footer() {
  const t = useTranslations('common')
  const footerRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const navigationItems = getNavigationItems(t, locale as Locale)
  const { handleNavClick } = useNavigation()

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

  return (
    <footer
      className={cn(
        'pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-16 lg:pt-32',
        'relative overflow-hidden bg-gradient-appointment-reversed'
      )}
      ref={footerRef}
    >
      <div
        className="pointer-events-none absolute inset-0 hidden bg-[url('/svg/bg-footer.svg')] bg-cover bg-center lg:block"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className='relative z-10 grid grid-cols-24 gap-y-8 pb-4'>
        <div className='order-1 col-span-24 lg:col-span-21 lg:col-start-3 xl:col-span-21 xl:col-start-3'>
          <div className='grid grid-cols-24'>
            <div
              className={cn(
                'col-span-24 md:col-span-24 lg:col-start-1 lg:justify-start xl:col-span-6',
                'flex items-center justify-center lg:items-start',
                'order-1 mb-16 xl:mb-0'
              )}
            >
              <LocalizedLink
                href='/'
                className='w-[160px] sm:w-[200px] lg:w-[180px] xl:w-[200px] 2xl:w-[240px]'
              >
                <Logo fill={colors['white']} />
              </LocalizedLink>
            </div>
            <div
              className={cn(
                'col-span-24 md:col-span-12 xl:col-span-8 xl:col-start-7',
                'flex justify-between gap-8',
                'order-2 mb-16 lg:mb-0',
                'px-8 lg:px-0 lg:pr-8 xl:pr-16'
              )}
            >
              <div className='flex flex-col gap-4 lg:gap-6'>
                {getNavigationItems(t, locale as Locale)
                  .filter(item => item.mainRoute)
                  .map(item => {
                    return (
                      <Fragment key={item.id}>
                        {item.id === navigationConfig['/']?.id ? (
                          <LocalizedLink
                            href='/'
                            className={cn(
                              'block font-primary font-[300] text-white transition-colors duration-300',
                              item.mainRoute &&
                                'text-xl sm:text-2xl lg:text-3xl'
                            )}
                            onClick={e => handleNavClick(e, item.id)}
                          >
                            {item.title}
                          </LocalizedLink>
                        ) : (
                          <Link
                            href={'#' + item.id}
                            className={cn(
                              'block font-primary font-[300] text-white transition-colors duration-300',
                              item.mainRoute &&
                                'text-xl sm:text-2xl lg:text-3xl'
                            )}
                            onClick={e => handleNavClick(e, item.id)}
                          >
                            {item.title}
                          </Link>
                        )}
                      </Fragment>
                    )
                  })}
              </div>
              <div className='flex flex-col gap-4 lg:gap-6'>
                {getNavigationItems(t, locale as Locale)
                  .filter(item => !item.mainRoute)
                  .map(item => (
                    <Link
                      key={item.id}
                      href={'#' + item.href}
                      className={cn(
                        'block font-primary text-sm font-[300] text-white transition-colors duration-300 sm:text-base',
                        item.mainRoute && 'text-4xl'
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
              </div>
            </div>
            <div
              className={cn(
                'xl:col-start-16 order-3 col-span-24 md:col-span-12 xl:col-span-9',
                'flex flex-col gap-12 lg:gap-16 xl:gap-12',
                'border-gradient-to-b',
                'px-8 lg:px-0 lg:pl-8 xl:pl-16'
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
                    City&apos;s Istanbul AVM
                  </p>
                  <p className='font-primary text-sm/[1.2] font-[300] xl:text-base'>
                    İçerenköy, Çayır Caddesi No: 1, 34752
                  </p>
                  <p className='font-primary text-sm/[1.2] font-[300] xl:text-base'>
                    Ataşehir, İstanbul
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
                <div className='grid grid-cols-3 gap-4 sm:gap-3 lg:gap-4'>
                  <button className='border-radius-gradient flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-4 lg:py-6'>
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
                  <button className='border-radius-gradient flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-4 lg:py-6'>
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
                    href='https://goo.gl/maps/X5VuQBQmZF2r9WZ17'
                    className='border-radius-gradient flex aspect-[14/16] flex-col px-3 py-4 sm:gap-6 lg:px-4 lg:py-6'
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
            'col-span-24 lg:col-span-21 lg:col-start-3 xl:col-span-21 xl:col-start-3',
            'flex flex-col gap-4 lg:flex-row lg:justify-between',
            'text-sm text-white/90',
            'font-primary font-[300]'
          )}
        >
          <span className='flex flex-col gap-4 text-center lg:gap-0 lg:text-left'>
            <span>2025 ©</span>
            <span>City&apos;s Residences İstanbul Tüm hakları saklıdır.</span>
          </span>
        </div>
        <div
          className={cn(
            'order-2 lg:order-3',
            'mt-8 lg:mt-auto',
            'col-span-24 lg:col-span-21 lg:col-start-3 xl:col-span-21 xl:col-start-3',
            'flex flex-col gap-4 lg:flex-row xl:justify-between',
            'text-sm text-white/90',
            'font-primary font-[300]'
          )}
        >
          <span className='hidden lg:inline'>{t('copyright')}</span>
          <span className='ml-auto flex flex-col flex-wrap items-center justify-center gap-6 md:gap-6 lg:flex-row lg:items-start lg:gap-6'>
            {footerItems.legal.map((item, i) => (
              <Link
                target='_blank'
                rel='noopener noreferrer'
                key={i}
                href={item.href}
                className='block flex-shrink-0 text-tangerine-flake'
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
