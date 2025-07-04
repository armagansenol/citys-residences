"use client"

import s from "./header.module.css"

import { Link as LocalizedLink } from "@/i18n/routing"
import { initialScroll } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Lenis from "lenis"
import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Logo } from "@/components/icons"
import { Menu } from "@/components/menu"
import { MenuX } from "@/components/menu-x"
import { colors } from "@/styles/config.mjs"

export function Header() {
  const lenis = useLenis()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollState, setScrollState] = useState({
    hidden: false,
    atTop: true,
  })
  const pathname = usePathname()
  const t = useTranslations("common")

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
        <div className={cn(s.cross, "cursor-pointer flex items-center")}>
          <MenuX
            className="hidden bt:block"
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            strokeWidth="2"
            color="#fff"
            transition={{ type: "spring", stiffness: 260, damping: 40 }}
            width="50"
            height="6"
          />
          <MenuX
            className="block bt:hidden"
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            strokeWidth="2"
            color="#fff"
            transition={{ type: "spring", stiffness: 260, damping: 40 }}
            width="35"
            height="6"
          />
        </div>
        <div
          className={cn(s.text, "cursor-pointer text-white font-primary font-medium text-sm lg:text-base xl:text-lg")}
        >
          <span>{t("close")}</span>
          <span>{t("open")}</span>
        </div>
      </button>
      <header
        className={cn(s.header, "flex items-center", {
          [s.hidden]: scrollState.hidden,
          [s.atTop]: scrollState.atTop,
          [s.menuOpen]: menuOpen,
        })}
        role="banner"
      >
        <div
          className={cn(s.content, "flex items-center justify-end flex-1", {
            [s.atTop]: scrollState.atTop,
          })}
        >
          <LocalizedLink
            className={cn(s["logo-c"], "cursor-pointer gsap-blur")}
            href="/"
            scroll={initialScroll}
            aria-label="Home"
          >
            <Logo fill={colors.white} />
          </LocalizedLink>
          <nav className={cn(s["nav"], "flex gap-10 items-center text-white")} role="navigation">
            <div className={"flex items-center gap-6"}>
              {/* <div className={cn(s["locale-switcher"], s["nav-item"], "cursor-pointer hidden bt:block")}>
                <LocaleSwitcher />
              </div> */}
              {/* <div className={cn(s["sticky-badge"], s["nav-item"], "cursor-pointer")}>
                <div className="hidden bt:block">
                  <div className={cn(s.stickyBadge, "cursor-pointer")} onClick={() => setModalOpen((prev) => !prev)}>
                    <AnimatedButton text={t("inquiry")} size="fit-content" theme="tertiary" />
                  </div>
                </div>
           
              </div> */}
            </div>
          </nav>
          <Menu open={menuOpen} setOpen={setMenuOpen} items={navigationItems} />
        </div>
      </header>
    </>
  )
}
