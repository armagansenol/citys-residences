'use client'

import { Link as LocalizedLink } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ArrowCircleLeftIcon, FilesIcon } from '@phosphor-icons/react'
import { useLocale, useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import { Logo } from '@/components/icons'
import { LegalTableOfContents } from '@/components/legal-table-of-contents'
import { LocaleSwitcher } from '@/components/locale-switcher'
// import { SmoothScroll } from '@/components/smooth-scroll'
import { Link } from '@/components/utility/link'
import { Locale, Pathnames } from '@/i18n/routing'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

export interface LegalLayoutProps {
  children: ReactNode
}

export function LegalLayout({ children }: LegalLayoutProps) {
  const t = useTranslations('common')
  const locale = useLocale()
  return (
    <>
      <section className='section-container flex h-auto flex-col gap-y-0 xl:h-screen xl:max-h-screen xl:gap-y-8'>
        <div className='flex h-28 flex-shrink-0 items-center justify-between px-8 xl:h-48'>
          <Link
            href='/'
            className='2xl:size-46 pointer-events-auto block size-28 flex-shrink-0 xl:size-32 3xl:size-40'
            aria-label='Home'
          >
            <Logo fill={colors.black} />
          </Link>
          <div className='flex items-center justify-end py-4 xl:py-4 xl:pl-20'>
            <LocalizedLink
              href={navigationConfig['/'].href as Pathnames}
              className='group mr-2 flex items-center gap-2'
              aria-label='Home'
              locale={locale as Locale}
            >
              <ArrowCircleLeftIcon
                className='size-5 text-black group-hover:animate-bounce-x'
                weight='regular'
              />
              <span className='base font-primary font-[400] uppercase leading-none text-black'>
                {t('navigation.home')}
              </span>
            </LocalizedLink>
            <LocaleSwitcher className='text-black' />
          </div>
        </div>
        <div className='grid min-h-0 flex-grow grid-cols-24'>
          <div className='col-span-24 flex h-full flex-col border-black/80 px-8 xl:col-span-7 xl:border-b-0 xl:border-r'>
            <div className='mb-8 border-b border-gray-500 py-6 pr-8 xl:mb-0 xl:border-b-0 xl:py-0'>
              <LegalTableOfContents />
            </div>
            <FilesIcon
              className='mb-12 mt-auto hidden size-24 text-black xl:block'
              weight='thin'
            />
          </div>
          <div
            className={cn(
              'col-span-24 xl:col-span-17',
              'px-8 xl:px-16',
              'flex min-h-0 flex-1 flex-col',
              'font-primary text-base font-[300] leading-[1.5] xl:text-lg [&_h1]:m-0 [&_h1]:p-0 [&_h1]:text-3xl [&_h1]:font-[400] xl:[&_h1]:text-6xl [&_h2]:m-0 [&_h2]:p-0 [&_h2]:font-[400] [&_h3]:m-0 [&_h3]:p-0 [&_h3]:font-[400] [&_h4]:m-0 [&_h4]:p-0 [&_h4]:font-[400] [&_h5]:m-0 [&_h5]:p-0 [&_h5]:font-[400] [&_h6]:m-0 [&_h6]:p-0 [&_h6]:font-[400] [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:font-[300] [&_ul_li_strong]:font-[300]'
            )}
          >
            {children}
          </div>
        </div>
      </section>
      {/* <SmoothScroll root /> */}
    </>
  )
}
