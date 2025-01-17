import { getMessages } from "next-intl/server"
import localFont from "next/font/local"
import "@/styles/globals.css"

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

import { NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"

import { Locale } from "@/i18n/routing"
import { SmoothScroll } from "@/components/smooth-scroll"

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale, namespace: "metadata.default" })

  return {
    title: t("title"),
    description: t("description"),
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
      <body className={`${halenoir.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <SmoothScroll root={true} />
      </body>
    </html>
  )
}
