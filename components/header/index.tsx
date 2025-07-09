"use client"

import s from "./header.module.css"

import { Link as LocalizedLink } from "@/i18n/routing"
import { initialScroll } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Lenis from "lenis"
import { useLenis } from "lenis/react"
import { animate, AnimatePresence, motion, stagger } from "motion/react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { Logo, LogoSlim } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Menu } from "@/components/menu"
import { useSectionsMenuStore } from "@/lib/store/sections-menu"
import { colors } from "@/styles/config.mjs"

export function Header() {
  const lenis = useLenis()
  const { sections } = useSectionsMenuStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollState, setScrollState] = useState({
    hidden: false,
    atTop: true,
  })
  const pathname = usePathname()
  const t = useTranslations("common")
  const sectionsRef = useRef<(HTMLAnchorElement | null)[]>([])

  // Animate sections with programmatic control
  useEffect(() => {
    if (sectionsRef.current.length === 0) return

    if (scrollState.atTop) {
      // Animate out
      animate(
        sectionsRef.current.filter(Boolean) as HTMLAnchorElement[],
        { opacity: 0, y: -4 },
        { duration: 0.1, delay: stagger(0.05) }
      )
    } else {
      // Animate in with stagger
      animate(
        sectionsRef.current.filter(Boolean) as HTMLAnchorElement[],
        { opacity: 1, y: 0 },
        { duration: 0.3, delay: stagger(0.05) }
      )
    }
  }, [scrollState.atTop, sections.length])

  const navigationItems = [
    { title: t("navigation.home"), href: "/" },
    { title: t("navigation.project"), href: "/" },
    { title: t("navigation.location"), href: "/location" },
    { title: t("navigation.residences"), href: "/residences" },
    { title: t("navigation.citysPark"), href: "/citys-park" },
    { title: t("navigation.citysMembersClub"), href: "/citys-members-club" },
    { title: t("navigation.citysLifePrivileges"), href: "/citys-life-privileges" },
    { title: t("navigation.citysPsm"), href: "/" },
    { title: t("navigation.citysIstanbul"), href: "/citys-istanbul-avm" },
    { title: t("navigation.citysTimes"), href: "/" },
  ]

  useEffect(() => {
    return menuOpen ? lenis?.stop() : lenis?.start()
  }, [lenis, menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

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
          s.header,
          "fixed top-0 left-0 right-0 z-[var(--z-header)]",
          "flex items-center section-padding",
          "transition-all duration-300",
          {
            "bg-white": !scrollState.atTop,
            "bg-transparent": scrollState.atTop,
          },
          {
            [s.hidden]: scrollState.hidden,
            [s.atTop]: scrollState.atTop,
            [s.menuOpen]: menuOpen,
          }
        )}
      >
        <div
          className={cn(s.content, "flex items-center justify-between flex-1 gap-12 z-[var(--z-header-content)]", {
            [s.atTop]: scrollState.atTop,
          })}
        >
          <button
            className={cn(s.trigger, "cursor-pointer flex items-center gap-2 bt:gap-4", {
              [s.active]: menuOpen,
              [s.hidden]: scrollState.hidden,
            })}
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-ignore-click-away
          >
            {/* <div className={cn(s.cross, "cursor-pointer flex items-center")}>
              <MenuX
                className="hidden bt:block"
                isOpen={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                strokeWidth="2"
                color={scrollState.atTop || menuOpen ? colors.white : colors.black}
                transition={{ type: "spring", stiffness: 260, damping: 40 }}
                width="50"
                height="6"
              />
              <MenuX
                className="block bt:hidden"
                isOpen={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                strokeWidth="2"
                color={scrollState.atTop || menuOpen ? colors.white : colors.black}
                transition={{ type: "spring", stiffness: 260, damping: 40 }}
                width="35"
                height="6"
              />
            </div> */}
            <div
              className={cn("cursor-pointer overflow-hidden font-primary font-medium text-sm lg:text-base xl:text-lg", {
                "text-black": !scrollState.atTop,
                "text-white": scrollState.atTop,
              })}
            >
              <span>{t("open")}</span>
            </div>
          </button>
          <div
            className={cn(
              "flex items-center gap-4 mr-auto"
              //    {
              //   "opacity-0": menuOpen,
              //   "opacity-100": !menuOpen,
              //   "pointer-events-none": menuOpen,
              //   "pointer-events-auto": !menuOpen,
              // }
            )}
          >
            {sections.map((item, index) => (
              <a
                key={item.id}
                ref={(el) => {
                  sectionsRef.current[index] = el
                }}
                href={`#${item.id}`}
                className={cn("font-primary text-black text-sm font-regular", {
                  "opacity-0": scrollState.atTop,
                  "opacity-100": !scrollState.atTop,
                  "pointer-events-none": scrollState.atTop,
                  "pointer-events-auto": !scrollState.atTop,
                })}
              >
                {item.label}
              </a>
            ))}
          </div>
          <LocalizedLink
            className={cn(s["logo-c"], "cursor-pointer")}
            href="/"
            scroll={initialScroll}
            aria-label="Home"
          >
            <AnimatePresence mode="wait">
              {scrollState.atTop ? (
                <motion.div
                  className="w-full h-full"
                  key="logo-full"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Logo fill={colors.white} />
                </motion.div>
              ) : (
                <motion.div
                  className="w-full h-full"
                  key="logo-slim"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <LogoSlim fill={colors.black} />
                </motion.div>
              )}
            </AnimatePresence>
          </LocalizedLink>
          <div className="cursor-pointer hidden bt:block">
            <LocaleSwitcher theme={scrollState.atTop ? "dark" : "light"} />
          </div>
        </div>
      </header>
      <Menu open={menuOpen} setOpen={setMenuOpen} items={navigationItems} />
    </>
  )
}
