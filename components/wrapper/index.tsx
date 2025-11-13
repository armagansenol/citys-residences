'use client'

import type { themeNames } from '@/styles/config.mjs'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { SmoothScroll } from '@/components/smooth-scroll'
import { StickySidebar } from '@/components/sticky-sidebar'

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [pathname, theme])

  return (
    <>
      <Header />
      <div className='z-[var(--z-content)]'>
        <div className='transition-wrapper fixed inset-0 z-50 bg-white opacity-0'></div>
        <main className={className} {...props}>
          {children}
          {/* <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script> */}
        </main>
        <Footer />
      </div>
      {stickySidebar && <StickySidebar />}
      {lenis && <SmoothScroll root />}
    </>
  )
}
