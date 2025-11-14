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
      <span className='sr-only'>{label}</span>
      <Select value={locale} onValueChange={onValueChange} disabled={isPending}>
        <SelectTrigger
          className={cn(
            'bg-transparent font-primary text-base font-[400] text-white [&>svg]:size-5',
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
