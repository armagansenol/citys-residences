import { ReactNode } from 'react'

import { Logo } from '@/components/icons'
import { LegalTableOfContents } from '@/components/legal-table-of-contents'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Link } from '@/components/utility/link'
import { colors } from '@/styles/config.mjs'

export interface LegalLayoutProps {
  children: ReactNode
}

export function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <>
      <section className='section-container grid min-h-screen grid-cols-24'>
        <div className='col-span-24 px-8 lg:col-span-8 lg:pl-8 lg:pr-8 xl:col-span-6 xl:px-0'>
          <div className='sticky top-8 flex flex-col xl:gap-y-20'>
            <div className='flex items-center justify-between'>
              <Link
                href='/'
                className='2xl:size-46 pointer-events-auto block size-28 xl:size-32 3xl:size-40'
                aria-label='Home'
              >
                <Logo fill={colors.black} />
              </Link>
              <div className='flex items-center justify-end py-4 lg:hidden xl:py-28 xl:pl-20'>
                <LocaleSwitcher className='text-black' />
              </div>
            </div>
            <div className='xl-pr-16 border-b border-gray-500 py-12 lg:border-b-0 lg:border-r lg:pr-8 xl:py-0'>
              <LegalTableOfContents />
            </div>
          </div>
        </div>
        <div className='col-span-24 px-8 lg:col-span-16 lg:px-8 xl:col-span-18 xl:px-0'>
          <div className='hidden items-center justify-end py-4 lg:flex lg:py-8 xl:py-28 xl:pl-20'>
            <LocaleSwitcher className='text-black' />
          </div>
          <div className='prose-sm pb-24 pt-12 font-primary xl:prose-base xl:pl-20 xl:pt-0 [&_ul]:list-disc [&_ul]:pl-6'>
            {children}
          </div>
        </div>
      </section>
      <SmoothScroll root />
    </>
  )
}
