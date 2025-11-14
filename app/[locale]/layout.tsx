import '@/styles/globals.css'

import { Locale } from '@/i18n/routing'
import { StyleVariables } from '@/lib/style-variables'
import { colors, themes } from '@/styles/config.mjs'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import localFont from 'next/font/local'

// Extend Window interface to include custom video observer
declare global {
  interface Window {
    __videoObserver?: IntersectionObserver
  }
}

import { GSAP } from '@/components/gsap'
import { ModalContactForm } from '@/components/modal-contact-form'
import { Preloader, PreloaderClient } from '@/components/preloader'
import { ReactQueryProvider } from '@/components/react-query-provider'
import { RealViewport } from '@/components/real-viewport'
import { VideoObserverInitializer } from '@/components/video-observer'
// import { WebChat } from '@/components/web-chat'

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

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const t = await getTranslations({ locale, namespace: 'metadata.default' })

  return {
    title: t('title'),
    description: t('description'),
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
        {/* Hidden element for webchat to detect language */}
        <span id='selectedLanguage' className='hidden'>
          {locale}
        </span>
        <RealViewport />
        <VideoObserverInitializer />
        <Preloader />
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            {children}
            <ModalContactForm />
            <PreloaderClient />
          </ReactQueryProvider>
        </NextIntlClientProvider>
        <GSAP scrollTrigger={true} />
        {/* <WebChat key={locale} locale={locale} /> */}
      </body>
    </html>
  )
}
