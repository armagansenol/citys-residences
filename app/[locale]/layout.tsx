import "@/styles/globals.css"

import { Locale } from "@/i18n/routing"
import { StyleVariables } from "@/lib/style-variables"
import { colors, themes } from "@/styles/config.mjs"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { Montserrat } from "next/font/google"
import localFont from "next/font/local"

import { GSAP } from "@/components/gsap"
import { ImageGalleryModal } from "@/components/image-gallery/modal"
import { ModalContactForm } from "@/components/modal-contact-form"
import { ReactQueryProvider } from "@/components/react-query-provider"
import { RealViewport } from "@/components/real-viewport"
import { StickyContactMenu } from "@/components/sticky-contact-menu"
import { StickySidebar } from "@/components/sticky-sidebar"
import { WebChat } from "@/components/web-chat"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const halenoir = localFont({
  src: [
    {
      path: "./fonts/Halenoir/Halenoir-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Halenoir/Halenoir-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-halenoir",
})

const suisseIntl = localFont({
  src: [
    {
      path: "./fonts/suisse-intl/SuisseIntl-UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Book.woff2",
      weight: "350",
      style: "normal",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-suisse-intl",
})

const aktivGrotesk = localFont({
  src: [
    {
      path: "./fonts/aktiv-grotesk/AktivGrotesk-Hairline.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/aktiv-grotesk/AktivGrotesk-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/aktiv-grotesk/AktivGrotesk-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/aktiv-grotesk/AktivGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/aktiv-grotesk/AktivGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/aktiv-grotesk/AktivGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/aktiv-grotesk/AktivGrotesk-XBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/aktiv-grotesk/AktivGrotesk-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-aktiv-grotesk",
})

const copperplate = localFont({
  src: [
    {
      path: "./fonts/copperplate/Copperplate-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-copperplate",
})

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale, namespace: "metadata.default" })

  return {
    title: t("title"),
    description: t("description"),
    verification: {
      google: "google918f2bcab83a8f97",
    },
    icons: {
      icon: [
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        { url: "/favicon/favicon.ico", sizes: "any", type: "image/x-icon" },
      ],
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
        {/* <UTMWidgetInit /> */}
        {/* <AlotechWidget /> */}
      </head>
      <body
        className={`${halenoir.variable} ${montserrat.variable} ${suisseIntl.variable} ${aktivGrotesk.variable} ${copperplate.variable} antialiased`}
      >
        <RealViewport />
        {/* <Preloader /> */}
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            {children}
            <ImageGalleryModal />
            <ModalContactForm />
            <StickyContactMenu />
            {/* <PreloaderClient /> */}
            <StickySidebar />
          </ReactQueryProvider>
        </NextIntlClientProvider>
        <GSAP scrollTrigger={true} />
        <WebChat />
      </body>
    </html>
  )
}
