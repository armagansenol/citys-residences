"use client"

import { Locale, routing, usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { useParams } from "next/navigation"
import cn from "clsx"

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale()

  function setLocale(nextLocale: Locale) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale }
    )
  }

  return (
    <div className="flex items-center gap-2 xl:gap-1">
      {routing.locales.map((loc) => {
        return (
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full border border-background text-xs xl:text-[14px] leading-none font-medium transition duration-300",
              locale == loc ? "bg-background" : "transparent",
              locale == loc ? "text-article-gold" : "text-background",
              locale == loc ? "opacity-100" : "opacity-30"
            )}
            onClick={() => setLocale(loc)}
            key={loc}
          >
            {loc.toUpperCase()}
          </div>
        )
      })}
    </div>
  )
}
