"use client"

import s from "./locale-switcher.module.css"

import cn from "clsx"

import { Locale, routing, usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { useParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    <Select value={locale} onValueChange={setLocale}>
      <SelectTrigger className={cn(s.selectTrigger, "text-foreground")}>
        <SelectValue placeholder={locale.toUpperCase()} />
      </SelectTrigger>
      <SelectContent className={cn(s.selectContent, "text-foreground")}>
        {routing.locales.map((loc) => (
          <SelectItem className={cn(s.selectItem)} key={loc} value={loc}>
            {loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
