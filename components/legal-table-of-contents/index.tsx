'use client'

import { Link } from '@/components/utility/link'
import { usePathname } from '@/i18n/navigation'
import { type Pathnames } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export function LegalTableOfContents() {
  const pathname = usePathname()
  const t = useTranslations('legalTableOfContents')

  const legalRoutes: { titleKey: string; href: Pathnames }[] = [
    {
      titleKey: 'pdplRelatedInformation',
      href: '/pdpl/pdpl-related-information' as Pathnames,
    },
    {
      titleKey: 'commercialElectronicMessage',
      href: '/pdpl/commercial-electronic-message' as Pathnames,
    },
    {
      titleKey: 'explicitConsent',
      href: '/pdpl/explicit-consent' as Pathnames,
    },
    {
      titleKey: 'commercialElectronicMessageConsent',
      href: '/pdpl/commercial-electronic-message-consent' as Pathnames,
    },
    {
      titleKey: 'cookiePolicy',
      href: '/pdpl/cookie-policy' as Pathnames,
    },
  ]

  return (
    <div className='flex flex-col items-start gap-y-2'>
      {legalRoutes.map(route => {
        const isActive = pathname === route.href
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'inline-flex cursor-pointer py-1 font-primary text-sm font-[300] hover:underline xl:text-lg',
              isActive && 'font-[500]'
            )}
          >
            {t(route.titleKey)}
          </Link>
        )
      })}
    </div>
  )
}
