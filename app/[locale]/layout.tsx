import '@/styles/globals.css'

import { Locale } from '@/i18n/routing'
import { StyleVariables } from '@/lib/style-variables'
import { colors, themes } from '@/styles/config.mjs'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Montagu_Slab } from 'next/font/google'
import localFont from 'next/font/local'

import { GSAP } from '@/components/gsap'
import { ModalContactForm } from '@/components/modal-contact-form'
import { ReactQueryProvider } from '@/components/react-query-provider'
import { RealViewport } from '@/components/real-viewport'
import { Scroller } from '@/components/scroller'
import { StickySidebar } from '@/components/sticky-sidebar'
import { WebChat } from '@/components/web-chat'
// import { WebChat } from '@/components/web-chat'

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   variable: '--font-montserrat',
//   weight: ['500'],
// })

const montaguSlab = Montagu_Slab({
  subsets: ['latin'],
  variable: '--font-montagu-slab',
  weight: ['400'],
})

const suisseIntl = localFont({
  src: [
    // {
    //   path: './fonts/suisse-intl/SuisseIntl-UltraLight.woff2',
    //   weight: '100',
    //   style: 'normal',
    // },
    {
      path: './fonts/suisse-intl/SuisseIntl-Thin.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/suisse-intl/SuisseIntl-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    // {
    //   path: './fonts/suisse-intl/SuisseIntl-Book.woff2',
    //   weight: '350',
    //   style: 'normal',
    // },
    {
      path: './fonts/suisse-intl/SuisseIntl-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/suisse-intl/SuisseIntl-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/suisse-intl/SuisseIntl-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/suisse-intl/SuisseIntl-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    // {
    //   path: './fonts/suisse-intl/SuisseIntl-Black.woff2',
    //   weight: '900',
    //   style: 'normal',
    // },
  ],
  variable: '--font-suisse-intl',
})

const copperplate = localFont({
  src: [
    {
      path: './fonts/copperplate/Copperplate-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-copperplate',
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
      <body
        className={`${montaguSlab.variable} ${suisseIntl.variable} ${copperplate.variable} antialiased`}
      >
        {/* Hidden element for webchat to detect language */}
        {/* <span id='selectedLanguage' style={{ display: 'none' }}>
          {locale}
        </span> */}
        <RealViewport />
        {/* <Preloader /> */}
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            {children}
            <ModalContactForm />
            <Scroller />
            {/* <PreloaderClient /> */}
            <StickySidebar />
          </ReactQueryProvider>
        </NextIntlClientProvider>
        <GSAP scrollTrigger={true} />
        <WebChat key={locale} locale={locale} />
      </body>
    </html>
  )
}
