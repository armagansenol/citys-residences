'use client'

import type { themeNames } from '@/styles/config.mjs'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ModalContactForm } from '@/components/modal-contact-form'
import { SmoothScroll } from '@/components/smooth-scroll'
import { StickySidebar } from '@/components/sticky-sidebar'
import { WebChat } from '@/components/web-chat'

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: (typeof themeNames)[number]
  lenis?: boolean
  webgl?: boolean | object
  stickySidebar?: boolean
}

export function Wrapper({
  children,
  theme = 'light',
  lenis = true,
  className,
  stickySidebar = true,
  ...props
}: WrapperProps) {
  const pathname = usePathname()
  const locale = useLocale()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [pathname, theme])

  return (
    <>
      <Header />
      <div className='z-[var(--z-content)]'>
        <div className='transition-wrapper pointer-events-none fixed inset-0 z-50 bg-white opacity-0'></div>
        <main className={className} {...props}>
          {children}
          {/* <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script> */}
        </main>
        <Footer />
      </div>
      <ModalContactForm />
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
