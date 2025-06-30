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
      tr: "/daireler",
      en: "/residences",
    },
    "/citys-members-club": {
      tr: "/citys-members-club",
      en: "/citys-members-club",
    },
    "/citys-park": {
      tr: "/citys-park",
      en: "/citys-park",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
    },
    "/citys-life-privileges": {
      tr: "/citys-life-privileges",
      en: "/citys-life-privileges",
    },
    "/citys-istanbul-avm": {
      tr: "/citys-istanbul-avm",
      en: "/citys-istanbul-avm",
    },
    "/citys-psm": {
      tr: "/citys-psm",
      en: "/citys-psm",
    },
    "/citys-times": {
      tr: "/citys-times",
      en: "/citys-times",
    },
    "/project": {
      tr: "/proje",
      en: "/project",
    },
    "/explicit-consent": {
      tr: "/acik-riza-metni",
      en: "/explicit-consent",
    },
    "/cookie-policy": {
      tr: "/cerez-politikasi",
      en: "/cookie-policy",
    },
    "/commercial-electronic-message": {
      tr: "/ticari-elektronik-ileti-aydinlatma-metni",
      en: "/commercial-electronic-message",
    },
    "/pdpl-related-information": {
      tr: "/kvkk-iliskin-aydinlatma-metni",
      en: "/pdpl-related-information",
    },
  },
  localePrefix: "as-needed",
  localeDetection: false,
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
