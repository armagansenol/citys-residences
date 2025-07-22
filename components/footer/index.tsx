"use client"

import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { useIntersection } from "react-use"

import { Logo, socialIcons } from "@/components/icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Link as LocalizedLink } from "@/components/utility/link"
import { Locale, routing } from "@/i18n/routing"
import { useVisibilityStore } from "@/lib/store/visibility"
import { colors } from "@/styles/config.mjs"
import { ScrollToTop } from "../scroll-to-top"

const styles = {
  // Text size patterns
  textSizes: {
    linkTextSm: "text-base lg:text-xs xl:text-sm",
    linkText: "text-base lg:text-xs xl:text-lg",
    headingText: "text-lg lg:text-sm xl:text-xl 2xl:text-3xl",
    contactText: "text-base lg:text-sm xl:text-lg",
    copyrightCredit: "text-[0.8rem] lg:text-xs xl:text-base",
    mobileAccordionLink: "text-base lg:text-xs xl:text-sm",
    mobileAccordionHeading: "text-lg lg:text-sm xl:text-base",
  },
  // Interactive states
  interactions: {
    linkHover: "text-white hover:text-white/60 transition-colors",
    opacityHover: "opacity-100 hover:opacity-60 transition-opacity",
    socialIcon: "transition-opacity cursor-pointer",
  },
  // Layout patterns
  layout: {
    sectionHeader: "pb-2 mb-6",
    mobileOnly: "block lg:hidden",
    desktopOnly: "hidden lg:block",
  },
  // Icon sizes
  iconSizes: {
    social: "h-6 w-6 lg:h-4 lg:w-4 xl:h-7 xl:w-7",
    accordion: "[&>svg]:text-white [&>svg]:w-5 [&>svg]:h-5",
  },
}

export function Footer() {
  const t = useTranslations("common")
  const locale = useLocale()
  const { setAloTechVisibility, setStickyContactMenuVisibility } = useVisibilityStore()
  const footerItems = {
    menu: [
      { title: t("navigation.home"), href: "/" },
      { title: t("navigation.project"), href: "/project" },
      { title: t("navigation.location"), href: "/location" },
      { title: t("navigation.residences"), href: "/residences" },
      { title: t("navigation.citysPark"), href: "/citys-park" },
      { title: t("navigation.citysMembersClub"), href: "/citys-members-club" },
      { title: t("navigation.citysLifePrivileges"), href: "/citys-life-privileges" },
      { title: t("navigation.citysPsm"), href: "/" },
      { title: t("navigation.citysIstanbul"), href: "/citys-istanbul-avm" },
      { title: t("navigation.citysTimes"), href: "/" },
    ],
    legal: [
      {
        title: t("kvkRelatedInformation"),
        href: routing.pathnames["/pdpl-related-information"][locale as Locale],
      },
      {
        title: t("commercialElectronicMessage"),
        href: routing.pathnames["/commercial-electronic-message"][locale as Locale],
      },
      {
        title: t("explicitConsent"),
        href: routing.pathnames["/explicit-consent"][locale as Locale],
      },
      {
        title: t("cookiePolicy"),
        href: routing.pathnames["/cookie-policy"][locale as Locale],
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
    <footer className="relative bg-bricky-brick text-white py-12 xl:py-8 xl:pb-12 font-primary" ref={footerRef}>
      <div className="section-container flex flex-col gap-12 lg:gap-0">
        <div className="flex flex-col-reverse items-stretch lg:flex-row lg:items-center gap-12 lg:gap-0">
          {/* Logo Section */}
          <div className="w-full lg:w-3/12 flex flex-col items-center justify-center gap-8 lg:gap-12 mr-auto">
            <LocalizedLink href="/" className="w-[200px] lg:w-[200px] xl:w-[260px]">
              <Logo fill={colors["white"]} />
            </LocalizedLink>
          </div>
          <div className="w-full lg:w-8/12 flex flex-col items-stretch lg:flex-row pb-7 lg:pb-0 relative">
            <ScrollToTop className={cn("text-3xl", "absolute top-0 right-0 z-50")} />
            {/* Contact Section */}
            <div className="w-full lg:w-4/12 py-10 lg:py-0">
              <h5 className={cn(styles.textSizes.headingText, styles.layout.sectionHeader)}>{t("contact")}</h5>
              <div className="flex flex-col items-stretch gap-6 mr-0 xl:mr-10 pr-10">
                <div className="space-y-3">
                  <span className={cn("block", styles.textSizes.contactText, "text-white whitespace-pre-line")}>
                    {t.rich("contactInfo", {
                      br: () => <br />,
                    })}
                  </span>
                  <a
                    href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
                    className={cn(
                      "block",
                      "text-white whitespace-pre-line",
                      styles.textSizes.linkText,
                      styles.interactions.opacityHover,
                      "xl:leading-tight"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="font-bold">City’s İstanbul AVM</span> <br />
                    <span>İçerenköy, Çayır Cd No: 1,</span>
                    <span>34752 Ataşehir/Istanbul</span>
                  </a>
                  <a
                    href="mailto:info@citysresidences.com"
                    className={cn(
                      "block",
                      styles.textSizes.linkText,
                      "text-white whitespace-pre-line",
                      styles.interactions.opacityHover
                    )}
                  >
                    info@citysresidences.com
                  </a>
                  <a
                    href="tel:+902162666600"
                    className={cn(
                      "block",
                      "text-white font-bold whitespace-pre-line",
                      styles.textSizes.linkText,
                      styles.interactions.opacityHover
                    )}
                  >
                    +90 (216) 266 66 00
                  </a>
                </div>
              </div>
            </div>
            {/* Menu Section */}
            <div className="w-full lg:w-4/12">
              {/* desktop */}
              <div className={styles.layout.desktopOnly}>
                <h5 className={cn(styles.textSizes.headingText, styles.layout.sectionHeader)}>{t("menu")}</h5>
                <div className="flex flex-col flex-wrap gap-y-2 gap-x-6 h-48">
                  {footerItems.menu.map((item, i) => (
                    <LocalizedLink
                      key={i}
                      href={item.href}
                      className={cn(styles.textSizes.linkText, styles.interactions.linkHover)}
                    >
                      {item.title}
                    </LocalizedLink>
                  ))}
                </div>
              </div>
              {/* mobile */}
              <Accordion className={styles.layout.mobileOnly} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className={cn(styles.iconSizes.accordion, styles.layout.sectionHeader)}>
                    <h5 className={cn(styles.textSizes.mobileAccordionHeading, "font-normal")}>{t("menu")}</h5>
                  </AccordionTrigger>
                  <AccordionContent className="py-4">
                    <div className="flex flex-col gap-y-2 gap-x-6 mr-0 xl:mr-12">
                      {footerItems.menu.map((item, i) => (
                        <LocalizedLink
                          key={i}
                          href={item.href}
                          className={cn(styles.textSizes.mobileAccordionLink, styles.interactions.linkHover)}
                        >
                          {item.title}
                        </LocalizedLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            {/* Legal Section */}
            <div className="w-full lg:w-4/12 ml-24 opacity-60">
              {/* desktop */}
              <div className={styles.layout.desktopOnly}>
                <h5 className={cn(styles.textSizes.headingText, styles.layout.sectionHeader, "opacity-0")}>
                  {t("legal")}
                </h5>
                <div className="space-y-2">
                  <h5 className={cn("block", styles.textSizes.linkTextSm, styles.interactions.linkHover, "text-white")}>
                    {t("legal")}
                  </h5>
                  {footerItems.legal.map((item, i) => (
                    <LocalizedLink
                      target="_blank"
                      rel="noopener noreferrer"
                      key={i}
                      href={item.href}
                      className={cn("block", styles.textSizes.linkTextSm, styles.interactions.linkHover)}
                    >
                      {item.title}
                    </LocalizedLink>
                  ))}
                </div>
              </div>
              {/* mobile */}
              <Accordion className={cn("w-full", styles.layout.mobileOnly)} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className={cn(styles.iconSizes.accordion, styles.layout.sectionHeader)}>
                    <h5 className={cn(styles.textSizes.mobileAccordionHeading, "font-normal")}>{t("legal")}</h5>
                  </AccordionTrigger>
                  <AccordionContent className="py-4">
                    <div className="space-y-2">
                      {footerItems.legal.map((item, i) => (
                        <LocalizedLink
                          target="_blank"
                          rel="noopener noreferrer"
                          key={i}
                          href={item.href}
                          className={cn("block", styles.textSizes.mobileAccordionLink, styles.interactions.linkHover)}
                        >
                          {item.title}
                        </LocalizedLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-5 relative">
          <span
            className={cn(
              styles.textSizes.copyrightCredit,
              "block absolute left-1/2 -translate-x-1/2 bottom-0 text-center"
            )}
          >
            {t("copyright")}
          </span>
          <div className="w-full lg:w-3/12 flex flex-col items-center justify-center">
            <div className="flex flex-col items-start justify-center">
              <span className={cn(styles.textSizes.copyrightCredit, "mr-auto")}>Bizi Takip Edin</span>
              <div className="flex items-center justify-center gap-6 lg:gap-6 pt-2 mt-1.5 border-t-[3px] border-white/40">
                <div
                  className={cn(
                    styles.iconSizes.social,
                    styles.interactions.opacityHover,
                    styles.interactions.socialIcon
                  )}
                >
                  {socialIcons.instagram}
                </div>
                <div
                  className={cn(
                    styles.iconSizes.social,
                    styles.interactions.opacityHover,
                    styles.interactions.socialIcon
                  )}
                >
                  {socialIcons.facebook}
                </div>
                <div
                  className={cn(
                    styles.iconSizes.social,
                    styles.interactions.opacityHover,
                    styles.interactions.socialIcon
                  )}
                >
                  {socialIcons.tiktok}
                </div>
                <div
                  className={cn(
                    styles.iconSizes.social,
                    styles.interactions.opacityHover,
                    styles.interactions.socialIcon
                  )}
                >
                  {socialIcons.youtube}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-8/12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-5">
              {/* <ScrollToTop className={cn(styles.textSizes.copyrightCredit, "ml-auto")} /> */}
              <span className={cn(styles.textSizes.copyrightCredit, "ml-auto")}>
                Made by{" "}
                <LocalizedLink
                  href="https://justdesignfx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  JUST DESIGN FX
                </LocalizedLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
