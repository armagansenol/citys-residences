'use client'

import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'

import { Logo } from '@/components/icons'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Link as LocalizedLink } from '@/components/utility/link'
import { Locale, routing } from '@/i18n/routing'
import { getNavigationItems } from '@/lib/constants'
import { useVisibilityStore } from '@/lib/store/visibility'
import { colors } from '@/styles/config.mjs'

export function Footer() {
  const t = useTranslations('common')
  const locale = useLocale()
  const navigationItems = getNavigationItems(t, locale as Locale)
  const { setAloTechVisibility, setStickyContactMenuVisibility } =
    useVisibilityStore()
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

  const footerRef = useRef<HTMLDivElement>(null)

  const observer = useIntersection(footerRef, {
    rootMargin: '0px',
    threshold: 0,
  })

  useEffect(() => {
    // Temporarily disabled for testing
    // if (observer?.isIntersecting) {
    //   setAloTechVisibility(false)
    //   setStickyContactMenuVisibility(false)
    // } else if (!observer?.isIntersecting) {
    //   setAloTechVisibility(true)
    //   setStickyContactMenuVisibility(true)
    // }
  }, [observer, setAloTechVisibility, setStickyContactMenuVisibility])

  return (
    <footer
      className={cn('pb-16 pt-32', 'relative bg-gradient-appointment-reversed')}
      ref={footerRef}
    >
      {/* <div
        className="pointer-events-none absolute inset-0 bg-[url('/svg/bg-footer.svg')] bg-cover bg-center"
        style={{ mixBlendMode: 'multiply' }}
      /> */}
      <div className='section-container items-between relative z-10 grid h-[50vh] grid-cols-24'>
        <div className='col-span-22 col-start-3'>
          <div className='flex items-center justify-between'>
            <LocalizedLink
              href='/'
              className='w-[240px] max-w-full sm:w-[200px] lg:w-[180px] xl:w-[260px] 2xl:w-[260px]'
            >
              <Logo fill={colors['white']} />
            </LocalizedLink>
            <ScrollToTop className='ml-auto' />
          </div>
        </div>
        <div className='col-span-22 col-start-3 mt-auto flex justify-between text-lg text-white/50'>
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
