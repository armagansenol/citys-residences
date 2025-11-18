import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const SUPPORTED_LOCALES = ['tr', 'en'] as const
const LOCALE_COOKIE = 'LOCALE'

export default function middleware(req: NextRequest) {
  const { nextUrl, geo } = req

  // Current requested path
  const path = nextUrl.pathname
  const localeInPath = path.split('/')[1]

  // If URL already contains a locale
  const hasLocaleInPath = SUPPORTED_LOCALES.includes(
    localeInPath as (typeof SUPPORTED_LOCALES)[number]
  )

  // 1) When user visits `/tr/...` or `/en/...`,
  //    store that locale in a cookie for future visits.
  if (hasLocaleInPath) {
    const res = intlMiddleware(req)

    // Save locale in cookie
    const userPref = req.cookies.get(LOCALE_COOKIE)?.value
    if (userPref !== localeInPath) {
      res.cookies.set(LOCALE_COOKIE, localeInPath, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      })
    }

    return res
  }

  // 2) No locale in URL → detect locale preference
  // Priority: Accept-Language header > Geo > Cookie (if matches) > Default

  // Check Accept-Language header (most reliable with VPNs)
  const acceptLanguage = req.headers.get('accept-language')
  let detectedLocale: string | null = null

  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,tr;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale, q = 'q=1'] = lang.trim().split(';')
        const quality = parseFloat(q.replace('q=', ''))
        return { locale: locale.toLowerCase().split('-')[0], quality }
      })
      .sort((a, b) => b.quality - a.quality)

    // Find first supported locale
    for (const { locale } of languages) {
      if (SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number])) {
        detectedLocale = locale
        break
      }
    }
  }

  // Fall back to geo detection if Accept-Language didn't match
  if (!detectedLocale) {
    const country = geo?.country?.toUpperCase()
    detectedLocale = country === 'TR' ? 'tr' : 'en'
  }

  // Check if cookie exists
  const userPref = req.cookies.get(LOCALE_COOKIE)?.value
  const userHasPreference = SUPPORTED_LOCALES.includes(
    userPref as (typeof SUPPORTED_LOCALES)[number]
  )

  // Use detected locale (from Accept-Language or geo) instead of cookie
  // This ensures VPN users get the correct locale based on their browser settings
  // Only use cookie if it matches the detected preference (user preference confirmed)
  const finalLocale =
    userHasPreference && userPref === detectedLocale ? userPref : detectedLocale

  return NextResponse.redirect(
    new URL(`/${finalLocale}${path}${nextUrl.search}`, req.url)
  )
}

export const config = {
  matcher: ['/', '/(tr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
