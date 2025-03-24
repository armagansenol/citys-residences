import { useTranslations } from "next-intl"
import Link from "next/link"

import { Logo, socialIcons } from "@/components/icons"
import { ScrollToTop } from "@/components/scroll-to-top"

export function Footer() {
  const t = useTranslations("common")
  const footerItems = {
    menu: [
      { title: t("navigation.residences"), href: "#" },
      { title: t("navigation.location"), href: "#" },
      { title: t("navigation.citysPark"), href: "#" },
      { title: t("navigation.citysMembersClub"), href: "#" },
      { title: t("navigation.citysLifePrivileges"), href: "#" },
      { title: t("navigation.citysIstanbul"), href: "#" },
    ],
    legal: [
      {
        title: t("kvkk"),
        href: "#",
      },
      {
        title: t("commercialElectronicMessage"),
        href: "#",
      },
      {
        title: t("explicitConsent"),
        href: "#",
      },
      {
        title: t("kvkRelatedInformation"),
        href: "#",
      },
      {
        title: t("cookiePolicy"),
        href: "#",
      },
    ],
  }

  return (
    <footer className="relative bg-bricky-brick text-white py-12 bd:py-14 bd:pb-8 font-halenoir">
      <div className="container flex flex-col">
        <div className="flex flex-col items-center bt:items-start bt:grid bt:grid-cols-24 gap-16 bt:gap-4 bd:gap-8 mb-14">
          {/* Logo Section */}
          <div className="bt:col-span-9 bd:col-span-8 flex">
            <div className="mx-auto bt:mx-0 bt:mb-auto bt:mr-auto w-[200px] bd:w-[260px]">
              <Logo fill="var(--white)" />
            </div>
          </div>
          {/* Contact Section */}
          <div className="bt:col-span-6 bd:col-span-5 text-center bt:text-left px-5 bt:px-0">
            <h2 className="text-base bt:text-sm bd:text-base font-normal mb-5 border-b border-grenadier pb-2">
              {t("contact")}
            </h2>
            <div className="flex flex-col items-center gap-6 mr-0 bd:mr-12">
              <div className="space-y-2">
                <span className="block text-sm text-white whitespace-pre-line">
                  {t.rich("contactInfo", {
                    br: () => <br />,
                  })}
                </span>
                <a
                  href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
                  className="block text-sm bt:text-xs bd:text-sm text-white opacity-50 hover:opacity-100 transition-opacity whitespace-pre-line"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  İçerenköy, Çayır Cd No: 1, 34752 Ataşehir/Istanbul
                </a>
                <a
                  href="mailto:info@citysresidences.com"
                  className="block text-sm bt:text-xs bd:text-sm text-white opacity-50 hover:opacity-100 transition-opacity whitespace-pre-line"
                >
                  info@citysresidences.com
                </a>
                <a
                  href="tel:+902162255000"
                  className="block text-sm bt:text-xs bd:text-sm text-white opacity-50 hover:opacity-100 transition-opacity whitespace-pre-line"
                >
                  +90 (216) 225 50 00
                </a>
              </div>
            </div>
          </div>
          {/* Menu Section */}
          <div className="bt:col-span-5 bd:col-span-5 text-center bt:text-left">
            <h2 className="text-base bt:text-sm bd:text-base font-normal mb-5 border-b border-grenadier pb-2">
              {t("menu")}
            </h2>
            <div className="flex flex-col gap-y-2 gap-x-6 mr-0 bd:mr-12">
              {footerItems.menu.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="text-sm bt:text-xs bd:text-sm text-white/60 hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          {/* Legal Section */}
          <div className="bt:col-span-4 bd:col-span-6 text-center bt:text-left">
            <h2 className="text-base bt:text-sm bd:text-base font-normal mb-5 border-b border-grenadier pb-2">
              {t("legal")}
            </h2>
            <div className="space-y-2">
              {footerItems.legal.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="block text-sm bt:text-xs bd:text-sm text-white/60 hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="flex flex-col bt:flex-row justify-between items-center gap-5 pt-5 bt:grid bt:grid-cols-24 bt:gap-2 bd:gap-8 border-t border-grenadier">
          <div className="bt:col-span-9 bd:col-span-8 text-center bt:text-left order-3 bt:order-1 text-sm bt:text-xs bd:text-sm">
            <span>{t("copyright")}</span>
          </div>
          <div className="bt:col-span-8 bd:col-span-10 flex gap-4 order-1 bt:order-2">
            <div className="h-5 w-5 bt:h-4 bt:w-4 bd:h-5 bd:w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              {socialIcons.instagram}
            </div>
            <div className="h-5 w-5 bt:h-4 bt:w-4 bd:h-5 bd:w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              {socialIcons.facebook}
            </div>
            <div className="h-5 w-5 bt:h-4 bt:w-4 bd:h-5 bd:w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              {socialIcons.tiktok}
            </div>
            <div className="h-5 w-5 bt:h-4 bt:w-4 bd:h-5 bd:w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              {socialIcons.youtube}
            </div>
          </div>
          <div className="bt:col-span-7 bd:col-span-6 flex flex-col-reverse bt:flex-row justify-between gap-5 order-2 bt:order-3">
            <span className="flex-shrink-0 text-sm bt:text-xs bd:text-sm">
              Made by{" "}
              <Link href="https://justdesignfx.com" target="_blank" rel="noopener noreferrer" className="underline">
                JUST DESIGN FX
              </Link>
            </span>
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  )
}
