"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import { useParams } from "next/navigation"

interface LocaleSwitcherProps {
  theme?: "light" | "dark"
}

export function LocaleSwitcher({ theme = "light" }: LocaleSwitcherProps) {
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
      <SelectTrigger
        className={cn("h-8 text-sm bt:text-[0.8rem] pointer-events-none", {
          "text-black": theme === "light",
          "text-white": theme === "dark",
        })}
      >
        <SelectValue placeholder={locale.toUpperCase()} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {routing.locales.map((loc) => (
          <SelectItem className="text-black" key={loc} value={loc}>
            {loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
