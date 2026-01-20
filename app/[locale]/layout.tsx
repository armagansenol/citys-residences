import '@/styles/globals.css'

import { Locale } from '@/i18n/routing'
import { StyleVariables } from '@/lib/style-variables'
import { colors, themes } from '@/styles/config.mjs'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import localFont from 'next/font/local'
import Script from 'next/script'
import { headers } from 'next/headers'

import { GSAP } from '@/components/gsap'
import { ReactQueryProvider } from '@/components/react-query-provider'
import { RealViewport } from '@/components/real-viewport'
import { generateCanonicalUrl } from '@/lib/utils'

const suisseIntl = localFont({
  src: [
    // {
    //   path: '../fonts/suisse-intl/SuisseIntl-UltraLight.woff2',
    //   weight: '100',
    //   style: 'normal',
    // },
    {
      path: '../fonts/suisse-intl/SuisseIntl-Thin.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/suisse-intl/SuisseIntl-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    // {
    //   path: '../fonts/suisse-intl/SuisseIntl-Book.woff2',
    //   weight: '350',
    //   style: 'normal',
    // },
    {
      path: '../fonts/suisse-intl/SuisseIntl-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/suisse-intl/SuisseIntl-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/suisse-intl/SuisseIntl-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/suisse-intl/SuisseIntl-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    // {
    //   path: '../fonts/suisse-intl/SuisseIntl-Black.woff2',
    //   weight: '900',
    //   style: 'normal',
    // },
  ],
  variable: '--font-suisse-intl',
})

export const viewport = {
  themeColor: '#ffffff',
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const t = await getTranslations({ locale, namespace: 'metadata.default' })

  // Get the current pathname from headers to build canonical URL
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || `/${locale}`

  // Generate canonical URL using utility function
  const canonicalUrl = generateCanonicalUrl(pathname)

  // Get current path without locale to build alternate links
  // e.g., if pathname is "/tr/citys-dna", pathWithoutLocale becomes "/citys-dna"
  const pathWithoutLocale =
    pathname.replace(new RegExp(`^/${locale}`), '') || ''
  const baseUrl = 'https://www.citysresidences.com'

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${baseUrl}/tr${pathWithoutLocale}`,
        en: `${baseUrl}/en${pathWithoutLocale}`,
        'x-default': `${baseUrl}/tr${pathWithoutLocale}`,
      },
    },
    verification: {
      google: 'google918f2bcab83a8f97',
    },
    icons: {
      icon: [
        {
          url: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/favicon/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: '/favicon/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        { url: '/favicon/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      ],
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <StyleVariables colors={colors} themes={themes} />
      </head>
      <body className={`${suisseIntl.variable} antialiased`}>
        {/* Google Tag Manager */}
        <Script
          id='google-tag-manager'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5J5QKG8K');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google Analytics */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-6QJLTVF7F9'
          strategy='afterInteractive'
        />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6QJLTVF7F9');
            `,
          }}
        />
        {/* End Google Analytics */}

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-5J5QKG8K'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <RealViewport />
        {/* <VideoObserverInitializer /> */}
        {/* <Preloader /> */}
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            {children}
            {/* <PreloaderClient /> */}
          </ReactQueryProvider>
        </NextIntlClientProvider>
        <GSAP scrollTrigger={true} />
      </body>
    </html>
  )
}
