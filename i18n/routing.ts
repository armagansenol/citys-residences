import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    "/contact": {
      tr: "/iletisim",
      en: "/contact",
    },
    "/location": {
      tr: "/konum",
      en: "/location",
    },
    "/residences": {
      tr: "/konutlar",
      en: "/residences",
    },
    "/citys-members-club": {
      tr: "/citys-members-club",
      en: "/citys-members-club",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
    },
    "/citys-life-privileges": {
      tr: "/citys-life-privileges",
      en: "/citys-life-privileges",
    },
  },
  localePrefix: "as-needed",
  localeDetection: false,
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
