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
}

export function Wrapper({
  children,
  theme = 'light',
  lenis = true,
  className,
  ...props
}: WrapperProps) {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [pathname, theme])

  return (
    <>
      <Header />
      <div className='transition-wrapper z-[var(--z-content)]'>
        <main className={className} {...props}>
          {children}
          {/* <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script> */}
        </main>
        <Footer />
      </div>
      <StickySidebar />
      {lenis && <SmoothScroll root />}
    </>
  )
}
