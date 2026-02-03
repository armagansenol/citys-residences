'use client'

import type { themeNames } from '@/styles/config.mjs'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ModalContactForm } from '@/components/modal-contact-form'
import { SmoothScroll } from '@/components/smooth-scroll'
import { StickySidebar } from '@/components/sticky-sidebar'
import { WebChat } from '@/components/web-chat'
import { useUiStore } from '@/lib/store/ui'

interface CountryData {
  isoCode: string
  name: string
}

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: (typeof themeNames)[number]
  lenis?: boolean
  webgl?: boolean | object
  stickySidebar?: boolean
  headerWithNavigation?: boolean
  contactForm?: boolean
  footer?: boolean
  countries?: CountryData[]
}

export function Wrapper({
  children,
  theme = 'light',
  lenis = true,
  className,
  stickySidebar = true,
  headerWithNavigation = true,
  footer = true,
  contactForm = true,
  countries = [],
  ...props
}: WrapperProps) {
  const pathname = usePathname()
  const locale = useLocale()
  const { isNavTransitionVisible } = useUiStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [pathname, theme])

  return (
    <>
      <Header withNavigation={headerWithNavigation} />
      <div className='z-[var(--z-content)]'>
        <AnimatePresence>
          {isNavTransitionVisible && (
            <motion.div
              aria-hidden='true'
              className='transition-wrapper pointer-events-none fixed inset-0 z-50 bg-white'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
        <main className={className} {...props}>
          {children}
          {/* <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script> */}
        </main>
        {footer && <Footer />}
      </div>
      {contactForm && <ModalContactForm countries={countries} />}
      {stickySidebar && <StickySidebar />}
      {lenis && <SmoothScroll root />}
      {/* Hidden element for webchat to detect language */}
      <span id='selectedLanguage' className='hidden'>
        {locale}
      </span>
      <WebChat key={locale} locale={locale} />
    </>
  )
}
