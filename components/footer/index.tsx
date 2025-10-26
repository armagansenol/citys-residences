'use client'

import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useRef } from 'react'

import { Logo } from '@/components/icons'
import { Link as LocalizedLink } from '@/components/utility/link'
import { Locale, routing } from '@/i18n/routing'
import { getNavigationItems } from '@/lib/constants'
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

export function Footer() {
  const t = useTranslations('common')
  const footerRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const navigationItems = getNavigationItems(t, locale as Locale)

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
      className={cn('pb-16 pt-32', 'relative bg-gradient-appointment-reversed')}
      ref={footerRef}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/svg/bg-footer.svg')] bg-cover bg-center"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className='section-container relative z-10 grid grid-cols-24 gap-y-4'>
        <div className='col-span-22 col-start-3'>
          <div className='grid grid-cols-24 gap-x-16'>
            <div className='col-span-7 flex items-start justify-start'>
              <LocalizedLink
                href='/'
                className='w-[240px] sm:w-[200px] lg:w-[180px] xl:w-[260px] 2xl:w-[240px]'
              >
                <Logo fill={colors['white']} />
              </LocalizedLink>
            </div>
            <div className='col-span-8 flex justify-between'>
              <div className='flex flex-col gap-8'>
                {getNavigationItems(t, locale as Locale)
                  .filter(item => item.mainRoute)
                  .map(item => (
                    <LocalizedLink
                      key={item.id}
                      href={'#' + item.id}
                      className={cn(
                        'block font-primary font-[300] text-white transition-colors duration-300',
                        item.mainRoute && 'text-3xl'
                      )}
                    >
                      {item.title}
                    </LocalizedLink>
                  ))}
              </div>
              <div className='flex flex-col gap-8'>
                {getNavigationItems(t, locale as Locale)
                  .filter(item => !item.mainRoute)
                  .map(item => (
                    <LocalizedLink
                      key={item.id}
                      href={'#' + item.href}
                      className={cn(
                        'block font-primary text-base font-[300] text-white transition-colors duration-300',
                        item.mainRoute && 'text-4xl'
                      )}
                    >
                      {item.title}
                    </LocalizedLink>
                  ))}
              </div>
            </div>
            <div className='col-span-9 flex flex-col gap-16 border-l border-white/50 pl-16'>
              <div className='flex flex-col'>
                <div className='flex items-start justify-between gap-6'>
                  <h3 className='font-primary text-2xl font-[500] text-white'>
                    {t('salesOffice')}
                  </h3>
                  <div className='flex size-20 cursor-pointer items-center justify-center bg-bricky-brick text-white transition-colors duration-300 hover:bg-bricky-brick/80'>
                    <MapPinAreaIcon size={30} pointerEvents='none' />
                  </div>
                </div>
                <div className='-mt-8 flex flex-col gap-1 text-white'>
                  <p className='font-primary font-[300]'>
                    City&apos;s Istanbul AVM
                  </p>
                  <p className='font-primary font-[300]'>
                    İçerenköy, Çayır Caddesi No: 1, 34752
                  </p>
                  <p className='font-primary font-[300]'>Ataşehir, İstanbul</p>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='flex items-start justify-between gap-6'>
                  <h3 className='font-primary text-2xl font-[500] text-white'>
                    {t('contact')}
                  </h3>
                  <div className='flex size-20 cursor-pointer items-center justify-center bg-bricky-brick text-white transition-colors duration-300 hover:bg-bricky-brick/80'>
                    <PhoneCallIcon size={30} pointerEvents='none' />
                  </div>
                </div>
                <div className='-mt-8 flex flex-col gap-1 text-white'>
                  <p className='font-primary font-[300]'>
                    info@citysresidences.com
                  </p>
                  <p className='font-primary font-[300]'>+90 (216) 266 66 00</p>
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
                <div className='grid grid-cols-3 gap-4'>
                  <button className='border-gradient-soft-light bg-gradient-soft-light flex flex-col items-start justify-start gap-8 rounded-lg px-4 py-6'>
                    <CalendarPlusIcon
                      weight='thin'
                      className='text-white'
                      size={36}
                    />
                    <span className='text-left font-primary text-base font-[400] leading-tight text-white'>
                      {t('createAppointment')}
                    </span>
                  </button>
                  <button className='border-gradient-soft-light bg-gradient-soft-light flex flex-col items-start justify-start gap-8 rounded-lg px-4 py-6'>
                    <PhoneCallIcon
                      weight='thin'
                      className='text-white'
                      size={36}
                    />
                    <span className='text-left font-primary text-base font-[400] leading-tight text-white'>
                      {t('speakWithRepresentative')}
                    </span>
                  </button>
                  <button className='border-gradient-soft-light bg-gradient-soft-light flex flex-col items-start justify-start gap-8 rounded-lg px-4 py-6'>
                    <MapPinPlusIcon
                      weight='thin'
                      className='text-white'
                      size={36}
                    />
                    <span className='text-left font-primary text-base font-[400] leading-tight text-white'>
                      {t('getDirections')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-22 col-start-3 mt-auto flex justify-between text-lg text-white/50'>
          <span className='mr-auto flex flex-col font-primary font-[300]'>
            <span>2025 ©</span>
            <span>City’s Residences İstanbul Tüm hakları saklıdır.</span>
          </span>
        </div>
        <div className='col-span-22 col-start-3 flex justify-between text-lg text-white/50'>
          <span>{t('copyright')}</span>
          <span className='ml-auto'>
            <span className='flex gap-8'>
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
          </span>
        </div>
      </div>
    </footer>
  )
}
