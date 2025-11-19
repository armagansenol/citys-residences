'use client'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { Locale, useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { ReactNode, useTransition } from 'react'

const LOCALE_COOKIE = 'LOCALE'

/**
 * Set locale cookie on client side
 */
function setLocaleCookie(locale: string) {
  const maxAge = 60 * 60 * 24 * 365 // 1 year
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`
}

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
  className?: string
}

export function LocaleSwitcherSelect({ children, label, className }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  function onValueChange(value: string) {
    const nextLocale = value as Locale

    // Set cookie immediately for better UX
    setLocaleCookie(nextLocale)

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  // useEffect(() => {
  //   const tl = gsap.timeline({ paused: true })

  //   tl.to('body', {
  //     opacity: 0,
  //     duration: 0.3,
  //     overwrite: true,
  //   })

  //   if (isPending) {
  //     tl.play()
  //   } else if (!isPending) {
  //     tl.reverse()
  //   }
  // }, [isPending])

  return (
    <div className='relative'>
      <div
        className={cn(
          'absolute left-0 top-1/2 -translate-x-full -translate-y-1/2',
          'transition-opacity duration-300 ease-in-out',
          {
            'pointer-events-none opacity-0': !isPending,
            'pointer-events-auto opacity-100': isPending,
          }
        )}
      >
        <div className='h-2 w-2 animate-pulse rounded-full bg-white'></div>
      </div>
      <span className='sr-only'>{label}</span>
      <Select value={locale} onValueChange={onValueChange} disabled={isPending}>
        <SelectTrigger
          className={cn(
            'bg-transparent font-primary text-base font-[400] leading-none text-white [&>svg]:mb-[1px] [&>svg]:size-4',
            className
          )}
        >
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  )
}
