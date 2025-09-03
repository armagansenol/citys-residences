"use client"

import { Link, Link as LocalizedLink, type Locale } from "@/i18n/routing"
import { getNavigationItems, initialScroll } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Lenis from "lenis"
import { useLenis } from "lenis/react"
import { animate, AnimatePresence, motion, stagger } from "motion/react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { Logo, LogoSlim } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Menu } from "@/components/menu"
import { MenuX } from "@/components/menu-x"
import { useScrollStore } from "@/lib/store/scroll"
import { useSectionsMenuStore } from "@/lib/store/sections-menu"
import { colors } from "@/styles/config.mjs"
import { ArrowLeft } from "lucide-react"

export function Header({ nonHome = false }: { nonHome?: boolean }) {
  const lenis = useLenis()
  const { sections } = useSectionsMenuStore()
  const {
    menu: { isOpen: menuOpen },
    setMenuOpen,
    setLenis,
  } = useScrollStore()

  // Set lenis instance in the scroll store
  useEffect(() => {
    if (lenis) {
      setLenis(lenis)
    }
  }, [lenis, setLenis])
  const [scrollState, setScrollState] = useState({
    hidden: false,
    atTop: true,
  })
  const pathname = usePathname()
  const t = useTranslations("common")
  const locale = useLocale()
  const sectionsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    // Clear refs when sections becomes empty
    if (sections.length === 0) {
      sectionsRef.current = []
      return
    }

    if (sectionsRef.current.length === 0) return

    const validElements = sectionsRef.current.filter(Boolean) as HTMLAnchorElement[]

    // Don't animate if there are no valid elements
    if (validElements.length === 0) return

    if (scrollState.atTop) {
      // Animate out
      animate(validElements, { opacity: 0, y: -4, pointerEvents: "none" }, { duration: 0.1, delay: stagger(0.05) })
    } else {
      // Animate in with stagger
      animate(validElements, { opacity: 1, y: 0, pointerEvents: "auto" }, { duration: 0.3, delay: stagger(0.05) })
    }
  }, [scrollState.atTop, sections.length])

  const navigationItems = getNavigationItems(t, locale as Locale)

  useEffect(() => {
    return menuOpen ? lenis?.stop() : lenis?.start()
  }, [lenis, menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, setMenuOpen])

  useEffect(() => {
    let prevDirection = 0
    let prevAtTop = true

    const handleEvents = (e: Lenis) => {
      const atTop = Boolean(e.className) && e.actualScroll < 10
      const hidden = lenis?.direction === 1 && e.actualScroll > window.innerHeight / 2

      if (prevDirection !== lenis?.direction || prevAtTop !== atTop || e.actualScroll > window.innerHeight / 2) {
        prevDirection = lenis?.direction || 0
        prevAtTop = atTop

        setScrollState({
          atTop,
          hidden,
        })
      }
    }

    lenis?.on("scroll", handleEvents)
    return () => lenis?.off("scroll", handleEvents)
  }, [lenis])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[var(--z-header)]",
          "flex items-stretch section-padding",
          "transition-all duration-300",
          {
            "bg-white h-[var(--header-height)]": !scrollState.atTop,
            "bg-transparent h-[var(--header-height-slim)]": scrollState.atTop,
          }
        )}
      >
        <div className="flex items-stretch justify-between flex-1 gap-12 z-[var(--z-header-content)] px-4 lg:px-0">
          {!nonHome ? (
            <button
              className="flex items-center gap-2 lg:gap-4 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-ignore-click-away
            >
              <div className="cursor-pointer flex items-center">
                <MenuX
                  className="hidden lg:block"
                  isOpen={false}
                  onClick={() => setMenuOpen(!menuOpen)}
                  strokeWidth="2"
                  color={scrollState.atTop || menuOpen ? colors.white : colors.black}
                  transition={{ type: "spring", stiffness: 260, damping: 40 }}
                  width="50"
                  height="6"
                />
                <MenuX
                  className="block lg:hidden"
                  isOpen={menuOpen}
                  onClick={() => setMenuOpen(!menuOpen)}
                  strokeWidth="2"
                  color={scrollState.atTop || menuOpen ? colors.white : colors.black}
                  transition={{ type: "spring", stiffness: 260, damping: 40 }}
                  width="30"
                  height="6"
                />
              </div>
              <div
                className={cn(
                  "font-primary font-medium text-sm lg:text-base xl:text-lg",
                  "cursor-pointer overflow-hidden",
                  "transition-colors duration-300",
                  {
                    "text-black": !scrollState.atTop,
                    "text-white": scrollState.atTop,
                  }
                )}
              >
                <span>{t("open")}</span>
              </div>
            </button>
          ) : (
            <Link
              href="/"
              className={cn(
                "font-primary text-white text-xl font-medium",
                "relative flex items-center gap-2 lg:gap-2 cursor-pointer",
                "transition-colors duration-300",
                {
                  "text-black": !scrollState.atTop,
                  "text-white": scrollState.atTop,
                }
              )}
            >
              <ArrowLeft className="w-6 h-6" />
              ANASAYFAYA DÖN
            </Link>
          )}
          {Object.values(sections).length > 0 && !scrollState.atTop && (
            <div className={cn("flex items-stretch gap-8")}>
              {Object.values(sections).map((item, index) => (
                <div key={item.id} className="group relative flex items-center">
                  <a
                    ref={(el) => {
                      sectionsRef.current[index] = el
                    }}
                    href={`#${item.id}`}
                    className={cn("font-primary text-black text-base font-regular relative block", {
                      "opacity-0": scrollState.atTop,
                      "opacity-100": !scrollState.atTop,
                      "pointer-events-none": scrollState.atTop,
                      "pointer-events-auto": !scrollState.atTop,
                    })}
                  >
                    {item.label}
                  </a>
                  {item.subitems && Object.values(item.subitems).length > 0 && (
                    <div className="absolute -bottom-px translate-y-full -translate-x-1/2 left-1/2 blur-bg-bricky-brick-light flex flex-col p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                      {Object.values(item.subitems).map((subitem) => (
                        <a href={`#${subitem.id}`} className="text-white italic whitespace-nowrap" key={subitem.id}>
                          {subitem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <AnimatePresence mode="wait">
            {scrollState.atTop ? (
              <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 h-32 w-48 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40"
                key="logo-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <LocalizedLink href="/" scroll={initialScroll} aria-label="Home">
                  <Logo fill={colors.white} />
                </LocalizedLink>
              </motion.div>
            ) : (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[65%]"
                key="logo-slim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <LocalizedLink className="block h-full w-full" href="/" scroll={initialScroll} aria-label="Home">
                  <LogoSlim fill={colors["bricky-brick"]} />
                </LocalizedLink>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center cursor-pointer">
            <LocaleSwitcher theme={scrollState.atTop ? "dark" : "light"} />
          </div>
        </div>
      </header>
      <Menu items={navigationItems} />
    </>
  )
}
