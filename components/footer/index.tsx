'use client'

import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useRef } from 'react'

import { Logo } from '@/components/icons'
import { Link as LocalizedLink } from '@/components/utility/link'
import { Locale, routing } from '@/i18n/routing'
import { getNavigationItems, navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import {
  CalendarPlusIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  MapPinAreaIcon,
  MapPinPlusIcon,
  PhoneCallIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react'
import { useNavigation } from '@/hooks/useNavigation'

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
        'relative bg-gradient-appointment-reversed'
      )}
      ref={footerRef}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/svg/bg-footer.svg')] bg-cover bg-center"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className='section-container relative z-10 grid grid-cols-24 gap-y-4 pb-4'>
        <div className='col-span-22 col-start-3'>
          <div className='grid grid-cols-24 gap-x-8 lg:gap-x-16'>
            {/* Logo */}
            <div className='order-1 col-span-24 mb-8 flex items-start justify-center lg:col-span-6 lg:col-start-1 lg:mb-0 lg:justify-start'>
              <LocalizedLink
                href='/'
                className='w-[240px] sm:w-[200px] lg:w-[180px] xl:w-[260px] 2xl:w-[240px]'
              >
                <Logo fill={colors['white']} />
              </LocalizedLink>
            </div>

            {/* Navigation Links */}
            <div className='order-2 col-span-24 mb-8 flex justify-between gap-8 lg:col-span-8 lg:col-start-7 lg:mb-0'>
              <div className='flex flex-col gap-4 sm:gap-6 lg:gap-8'>
                {getNavigationItems(t, locale as Locale)
                  .filter(item => item.mainRoute)
                  .map(item => {
                    return (
                      <>
                        {item.id === navigationConfig['/']?.id ? (
                          <LocalizedLink
                            key={item.id}
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
                          <LocalizedLink
                            key={item.id}
                            href={'#' + item.id}
                            className={cn(
                              'block font-primary font-[300] text-white transition-colors duration-300',
                              item.mainRoute &&
                                'text-xl sm:text-2xl lg:text-3xl'
                            )}
                            onClick={e => handleNavClick(e, item.id)}
                          >
                            {item.title}
                          </LocalizedLink>
                        )}
                      </>
                    )
                  })}
              </div>
              <div className='flex flex-col gap-4 sm:gap-6 lg:gap-8'>
                {getNavigationItems(t, locale as Locale)
                  .filter(item => !item.mainRoute)
                  .map(item => (
                    <LocalizedLink
                      key={item.id}
                      href={'#' + item.href}
                      className={cn(
                        'block font-primary text-sm font-[300] text-white transition-colors duration-300 sm:text-base',
                        item.mainRoute && 'text-4xl'
                      )}
                    >
                      {item.title}
                    </LocalizedLink>
                  ))}
              </div>
            </div>
            <div className='lg:col-start-16 order-3 col-span-24 flex flex-col gap-8 border-t border-white/50 lg:col-span-9 lg:gap-16 lg:border-l lg:border-t-0 lg:pl-16'>
              <div className='flex flex-col'>
                <div className='flex items-start justify-between gap-4 sm:gap-6'>
                  <h3 className='font-primary text-xl font-[500] text-white sm:text-2xl'>
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
                <div className='-mt-6 flex flex-col gap-1 text-white sm:-mt-8'>
                  <p className='font-primary text-sm font-[300] sm:text-base'>
                    City&apos;s Istanbul AVM
                  </p>
                  <p className='font-primary text-sm font-[300] sm:text-base'>
                    İçerenköy, Çayır Caddesi No: 1, 34752
                  </p>
                  <p className='font-primary text-sm font-[300] sm:text-base'>
                    Ataşehir, İstanbul
                  </p>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='flex items-start justify-between gap-4 sm:gap-6'>
                  <h3 className='font-primary text-xl font-[500] text-white sm:text-2xl'>
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
                  <p className='font-primary text-sm font-[300] sm:text-base'>
                    info@citysresidences.com
                  </p>
                  <p className='font-primary text-sm font-[300] sm:text-base'>
                    +90 (216) 266 66 00
                  </p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center justify-center'>
                  <FacebookLogoIcon
                    size={24}
                    weight='fill'
                    className='text-white'
                  />
                </div>
                <div className='flex items-center justify-center'>
                  <InstagramLogoIcon
                    size={24}
                    weight='fill'
                    className='text-white'
                  />
                </div>
                <div className='flex items-center justify-center'>
                  <XLogoIcon size={24} weight='fill' className='text-white' />
                </div>
                <div className='flex items-center justify-center'>
                  <YoutubeLogoIcon
                    size={24}
                    weight='fill'
                    className='text-white'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-6'>
                <div className='grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4'>
                  <button className='border-gradient-soft-light bg-gradient-soft-light flex flex-col items-start justify-start gap-4 rounded-lg px-3 py-4 sm:gap-6 sm:px-4 sm:py-5 lg:gap-8 lg:px-4 lg:py-6'>
                    <CalendarPlusIcon
                      weight='thin'
                      className='h-7 w-7 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                    />
                    <span className='text-left font-primary text-xs font-[400] leading-tight text-white sm:text-sm lg:text-base'>
                      {t('createAppointment')}
                    </span>
                  </button>
                  <button className='border-gradient-soft-light bg-gradient-soft-light flex flex-col items-start justify-start gap-4 rounded-lg px-3 py-4 sm:gap-6 sm:px-4 sm:py-5 lg:gap-8 lg:px-4 lg:py-6'>
                    <PhoneCallIcon
                      weight='thin'
                      className='h-7 w-7 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                    />
                    <span className='text-left font-primary text-xs font-[400] leading-tight text-white sm:text-sm lg:text-base'>
                      {t('speakWithRepresentative')}
                    </span>
                  </button>
                  <button className='border-gradient-soft-light bg-gradient-soft-light flex flex-col items-start justify-start gap-4 rounded-lg px-3 py-4 sm:gap-6 sm:px-4 sm:py-5 lg:gap-8 lg:px-4 lg:py-6'>
                    <MapPinPlusIcon
                      weight='thin'
                      className='h-7 w-7 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9'
                    />
                    <span className='text-left font-primary text-xs font-[400] leading-tight text-white sm:text-sm lg:text-base'>
                      {t('getDirections')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-22 col-start-3 mt-8 flex flex-col gap-4 text-sm text-white/50 sm:text-base lg:mt-auto lg:flex-row lg:justify-between lg:text-lg'>
          <span className='flex flex-col font-primary font-[300]'>
            <span>2025 ©</span>
            <span>City&apos;s Residences İstanbul Tüm hakları saklıdır.</span>
          </span>
        </div>
        <div className='col-span-22 col-start-3 flex flex-col items-center gap-4 text-sm text-white/50 sm:flex-row sm:justify-between sm:text-base lg:text-lg'>
          <span className='hidden lg:inline'>{t('copyright')}</span>
          <span className='flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8'>
            {footerItems.legal.map((item, i) => (
              <LocalizedLink
                target='_blank'
                rel='noopener noreferrer'
                key={i}
                href={item.href}
                className={cn('flex-shrink-0', 'block')}
              >
                {item.title}
              </LocalizedLink>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}
