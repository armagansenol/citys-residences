"use client"

import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { useIntersection } from "react-use"

import { gsap } from "@/components/gsap"
import { Logo } from "@/components/icons"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Link as LocalizedLink } from "@/components/utility/link"
import { Locale, routing } from "@/i18n/routing"
import { getNavigationItems } from "@/lib/constants"
import { useVisibilityStore } from "@/lib/store/visibility"
import { colors } from "@/styles/config.mjs"

const styles = {
  // Text size patterns
  textSizes: {
    linkTextSm: "text-base lg:text-xs xl:text-sm",
    linkText: "text-lg lg:text-xs xl:text-lg 2xl:text-xl",
    headingText: "text-3xl lg:text-sm xl:text-2xl 2xl:text-3xl",
    contactText: "text-lg lg:text-sm xl:text-lg",
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
    sectionHeader: "pb-2 mb-3",
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
  const navigationItems = getNavigationItems(t, locale as Locale)
  const lenis = useLenis()
  const { setAloTechVisibility, setStickyContactMenuVisibility } = useVisibilityStore()
  const footerItems = {
    menu: navigationItems,
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

  const handleScroll = (id: string) => {
    gsap.to("body", {
      opacity: 0,
      onComplete: () => {
        lenis?.scrollTo(`#${id}`, { immediate: true })
        gsap.to("body", {
          opacity: 1,
          delay: 0.4,
        })
      },
    })
  }

  return (
    <footer className="relative bg-bricky-brick py-12 xl:py-10 xl:pt-2 text-white" ref={footerRef}>
      <div className="section-container flex flex-col gap-12 lg:gap-0 pt-0 lg:pt-12">
        <div className="flex flex-col-reverse items-stretch lg:flex-row lg:items-center gap-12 lg:gap-0 px-5 lg:px-0">
          {/* Logo Section */}
          <div className="order-1 lg:order-none w-full lg:w-3/12 flex items-center justify-center mr-auto">
            <LocalizedLink
              href="/"
              className="w-[240px] sm:w-[200px] lg:w-[200px] xl:w-[260px] 2xl:w-[300px] max-w-full"
            >
              <Logo fill={colors["white"]} />
            </LocalizedLink>
          </div>
          <div className="w-full lg:w-8/12 flex flex-col-reverse lg:flex-col items-stretch pb-7 lg:pb-0 relative">
            <ScrollToTop className={cn("text-3xl 3xl:text-4xl ml-auto lg:w-3/12 mx-auto lg:mx-0 mt-8 lg:mt-0")} />
            <div className="flex flex-col lg:flex-row">
              {/* Contact Section */}
              <div className="w-full lg:w-4/12 py-10 lg:py-0">
                <h5 className={cn(styles.textSizes.headingText, styles.layout.sectionHeader)}>{t("contact")}</h5>
                <div className="flex flex-col items-stretch gap-6 mr-0 xl:mr-10 pr-0 lg:pr-10">
                  <div className="space-y-4">
                    <span className={cn("block", styles.textSizes.contactText, "whitespace-pre-line")}>
                      {t.rich("contactInfo", {
                        br: () => <br />,
                      })}
                    </span>
                    <a
                      href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
                      className={cn(
                        "block",
                        "whitespace-pre-line",
                        styles.textSizes.linkText,
                        styles.interactions.opacityHover,
                        "xl:leading-tight"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="block font-bold sm:whitespace-nowrap">City’s İstanbul AVM</span>
                      <span className="block sm:whitespace-nowrap">İçerenköy, Çayır Cd No: 1,</span>
                      <span className="block sm:whitespace-nowrap">34752 Ataşehir/Istanbul</span>
                    </a>
                    <a
                      href="mailto:info@citysresidences.com"
                      className={cn(
                        "block",
                        styles.textSizes.linkText,
                        "whitespace-pre-line",
                        styles.interactions.opacityHover
                      )}
                    >
                      info@citysresidences.com
                    </a>
                    <a
                      href="tel:+902162666600"
                      className={cn(
                        "block",
                        "font-bold whitespace-pre-line",
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
                      <span
                        key={i}
                        onClick={() => handleScroll(item.id)}
                        className={cn(styles.textSizes.linkText, styles.interactions.linkHover, "cursor-pointer")}
                      >
                        {item.title}
                      </span>
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
                          <span
                            key={i}
                            onClick={() => handleScroll(item.id)}
                            className={cn(
                              styles.textSizes.mobileAccordionLink,
                              styles.interactions.linkHover,
                              "cursor-pointer"
                            )}
                          >
                            {item.title}
                          </span>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              {/* Legal Section */}
              <div className="w-full lg:w-3/12 ml-auto opacity-60">
                {/* desktop */}
                <div className={styles.layout.desktopOnly}>
                  <h5 className={cn(styles.textSizes.headingText, styles.layout.sectionHeader, "opacity-0")}>
                    {t("legal")}
                  </h5>
                  <div className="space-y-2">
                    <h5 className={cn("block", styles.textSizes.linkTextSm, styles.interactions.linkHover)}>
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
        </div>
        {/* Copyright Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-5 relative lg:mt-14">
          <span
            className={cn(
              styles.textSizes.copyrightCredit,
              "block text-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-0"
            )}
          >
            {t("copyright")}
          </span>
          <div className="w-full">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-5">
              <span className={cn(styles.textSizes.copyrightCredit, "lg:ml-auto")}>
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
