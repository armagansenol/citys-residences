"use client"

import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { useIntersection } from "react-use"

import { Logo, socialIcons } from "@/components/icons"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Link } from "@/components/utility/link"
import { useVisibilityStore } from "@/lib/store/visibility"

export function Footer() {
  const t = useTranslations("common")
  const { setAloTechVisibility, setStickyContactMenuVisibility } = useVisibilityStore()
  const footerItems = {
    menu: [
      { title: t("navigation.residences"), href: "/residences" },
      { title: t("navigation.location"), href: "/location" },
      { title: t("navigation.citysPark"), href: "/citys-park" },
      { title: t("navigation.citysMembersClub"), href: "/citys-members-club" },
      { title: t("navigation.citysLifePrivileges"), href: "/citys-life-privileges" },
      { title: t("navigation.citysIstanbul"), href: "https://citys-istanbul.com/" },
    ],
    legal: [
      {
        title: t("kvkRelatedInformation"),
        href: "/pdf/citys-residences-kvkk-aydinlatma-metni.pdf",
      },
      {
        title: t("commercialElectronicMessage"),
        href: "/pdf/citys-residences-ticari-elektronik-ileti-aydinlatma-metni.pdf",
      },
      {
        title: t("explicitConsent"),
        href: "/pdf/citys-residences-acik-riza-metni.pdf",
      },
      {
        title: t("cookiePolicy"),
        href: "#",
      },
    ],
  }

  const footerRef = useRef<HTMLDivElement>(null)

  const observer = useIntersection(footerRef, {
    rootMargin: "0px",
    threshold: 0,
  })

  useEffect(() => {
    if (observer?.isIntersecting) {
      setAloTechVisibility(false)
      setStickyContactMenuVisibility(false)
    } else if (!observer?.isIntersecting) {
      setAloTechVisibility(true)
      setStickyContactMenuVisibility(true)
    }
  }, [observer, setAloTechVisibility, setStickyContactMenuVisibility])

  return (
    <footer className="relative bg-bricky-brick text-white py-12 bd:py-14 bd:pb-8 font-halenoir" ref={footerRef}>
      <div className="container px-2 bt:px-0flex flex-col">
        <div className="flex flex-col items-stretch bt:items-start bt:grid bt:grid-cols-24 gap-4 bt:gap-4 bd:gap-8 mb-7 bt:mb-14">
          {/* Logo Section */}
          <div className="order-2 bt:-order-none bt:col-span-9 bd:col-span-8 flex">
            <Link href="/" className="mx-auto bt:mx-0 bt:mb-auto bt:mr-auto w-[200px] bt:w-[200px] bd:w-[260px]">
              <Logo fill="var(--white)" />
            </Link>
          </div>
          {/* Contact Section */}
          <div className="order-1 bt:order-none bt:col-span-6 bd:col-span-5 py-10 bt:py-0">
            <h2 className="text-lg bt:text-sm bd:text-base font-normal mb-5 border-b border-grenadier pb-2">
              {t("contact")}
            </h2>
            <div className="flex flex-col items-stretch gap-6 mr-0 bd:mr-12">
              <div className="space-y-2">
                <span className="block text-base bt:text-sm bd:text-base text-white whitespace-pre-line">
                  {t.rich("contactInfo", {
                    br: () => <br />,
                  })}
                </span>
                <a
                  href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
                  className="block text-base bt:text-xs bd:text-sm text-white opacity-50 hover:opacity-100 transition-opacity whitespace-pre-line"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  İçerenköy, Çayır Cd No: 1, 34752 Ataşehir/Istanbul
                </a>
                <a
                  href="mailto:info@citysresidences.com"
                  className="block text-base bt:text-xs bd:text-sm text-white opacity-50 hover:opacity-100 transition-opacity whitespace-pre-line"
                >
                  info@citysresidences.com
                </a>
                <a
                  href="tel:+902162666600"
                  className="block text-base bt:text-xs bd:text-sm text-white opacity-50 hover:opacity-100 transition-opacity whitespace-pre-line"
                >
                  +90 (216) 266 66 00
                </a>
              </div>
            </div>
          </div>
          {/* Menu Section */}
          <div className="bt:col-span-5 bd:col-span-5">
            {/* desktop */}
            <div className="hidden bt:block">
              <h2 className="text-lg bt:text-sm bd:text-base font-normal mb-5 border-b border-grenadier pb-2">
                {t("menu")}
              </h2>
              <div className="flex flex-col gap-y-2 gap-x-6 mr-0 bd:mr-12">
                {footerItems.menu.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="text-base bt:text-xs bd:text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            {/* mobile */}
            <Accordion className="block bt:hidden" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="[&>svg]:text-white [&>svg]:w-5 [&>svg]:h-5 border-b border-grenadier pb-2">
                  <h2 className="text-lg bt:text-sm bd:text-base font-normal">{t("menu")}</h2>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  <div className="flex flex-col gap-y-2 gap-x-6 mr-0 bd:mr-12">
                    {footerItems.menu.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="text-base bt:text-xs bd:text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {/* Legal Section */}
          <div className="w-full bt:col-span-4 bd:col-span-6">
            {/* desktop */}
            <div className="hidden bt:block">
              <h2 className="text-lg bt:text-sm bd:text-base font-normal mb-5 border-b border-grenadier pb-2">
                {t("legal")}
              </h2>
              <div className="space-y-2">
                {footerItems.legal.map((item, i) => (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    href={item.href}
                    className="block text-base bt:text-xs bd:text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            {/* mobile */}
            <Accordion className="w-full block bt:hidden" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="[&>svg]:text-white [&>svg]:w-5 [&>svg]:h-5 border-b border-grenadier pb-2">
                  <h2 className="text-lg bt:text-sm bd:text-base font-normal">{t("legal")}</h2>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  <div className="space-y-2">
                    {footerItems.legal.map((item, i) => (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        href={item.href}
                        className="block text-base bt:text-xs bd:text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="flex flex-col bt:flex-row justify-between items-center gap-5 pt-5 bt:grid bt:grid-cols-24 bt:gap-2 bd:gap-8 bt:border-t bt:border-grenadier">
          <div className="bt:col-span-9 bd:col-span-8 text-center bt:text-left order-2 bt:order-1 text-[0.8rem] bt:text-xs bd:text-sm">
            <span>{t("copyright")}</span>
          </div>
          <div className="bt:col-span-8 bd:col-span-10 flex gap-6 bt:gap-4 order-1 bt:order-2">
            <div className="h-6 w-6 bt:h-4 bt:w-4 bd:h-5 bd:w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              {socialIcons.instagram}
            </div>
            <div className="h-6 w-6 bt:h-4 bt:w-4 bd:h-5 bd:w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              {socialIcons.facebook}
            </div>
            <div className="h-6 w-6 bt:h-4 bt:w-4 bd:h-5 bd:w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              {socialIcons.tiktok}
            </div>
            <div className="h-6 w-6 bt:h-4 bt:w-4 bd:h-5 bd:w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              {socialIcons.youtube}
            </div>
          </div>
          <div className="bt:col-span-7 bd:col-span-6 flex flex-col bt:flex-row justify-between gap-5 order-3 bt:order-3">
            <span className="flex-shrink-0 text-[0.8rem] bt:text-xs bd:text-sm">
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
