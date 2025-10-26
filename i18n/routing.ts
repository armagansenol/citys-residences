import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/contact': {
      tr: '/iletisim',
      en: '/contact',
    },
    '/location': {
      tr: '/konum',
      en: '/location',
    },
    '/residences': {
      tr: '/residences',
      en: '/residences',
    },
    '/citys-members-club': {
      tr: '/citys-members-club',
      en: '/citys-members-club',
    },
    '/citys-park': {
      tr: '/citys-park',
      en: '/citys-park',
    },
    '/iletisim': {
      tr: '/iletisim',
      en: '/contact',
    },
    '/citys-living': {
      tr: '/citys-living',
      en: '/citys-living',
    },
    '/citys-istanbul-avm': {
      tr: '/citys-istanbul-avm',
      en: '/citys-istanbul-avm',
    },
    '/citys-psm': {
      tr: '/citys-psm',
      en: '/citys-psm',
    },
    '/citys-times': {
      tr: '/citys-times',
      en: '/citys-times',
    },
    '/project': {
      tr: '/proje',
      en: '/project',
    },
    '/pdpl': {
      tr: '/kvkk',
      en: '/pdpl',
    },
    '/pdpl/explicit-consent': {
      tr: '/kvkk/acik-riza-metni',
      en: '/pdpl/explicit-consent',
    },
    '/pdpl/cookie-policy': {
      tr: '/kvkk/cerez-politikasi',
      en: '/pdpl/cookie-policy',
    },
    '/pdpl/commercial-electronic-message': {
      tr: '/kvkk/ticari-elektronik-ileti-aydinlatma-metni',
      en: '/pdpl/commercial-electronic-message',
    },
    '/pdpl/pdpl-related-information': {
      tr: '/kvkk/kvkk-iliskin-aydinlatma-metni',
      en: '/pdpl/pdpl-related-information',
    },
  },
  localePrefix: 'as-needed',
  localeDetection: false,
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing)
