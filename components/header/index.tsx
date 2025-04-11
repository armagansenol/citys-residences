"use client"

import s from "./header.module.css"

import { Link as LocalizedLink } from "@/i18n/routing"
import { initialScroll } from "@/lib/constants"
import cn from "clsx"
import Lenis from "lenis"
import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { AnimatedButton } from "@/components/animated-button"
import { Logo } from "@/components/icons"
import { Menu } from "@/components/menu"
import { MenuX } from "@/components/menu-x"
import { ModalContactForm } from "@/components/modal-contact-form"
import { colors } from "@/styles/config.mjs"

export function Header() {
  const lenis = useLenis()
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollState, setScrollState] = useState({
    hidden: false,
    atTop: true,
  })
  const pathname = usePathname()
  const t = useTranslations("common")

  const navigationItems = [
    { title: t("navigation.residences"), href: "#" },
    { title: t("navigation.location"), href: "/location" },
    { title: t("navigation.citysPark"), href: "#" },
    { title: t("navigation.citysMembersClub"), href: "#" },
    { title: t("navigation.citysLifePrivileges"), href: "#" },
    { title: t("navigation.citysIstanbul"), href: "#" },
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

      if (prevDirection !== lenis?.direction || prevAtTop !== atTop) {
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

  useEffect(() => {
    if (modalOpen) {
      return lenis?.stop()
    }

    lenis?.start()
  }, [lenis, modalOpen])

  const memoizedModal = useMemo(() => {
    return <ModalContactForm open={modalOpen} setOpen={setModalOpen} />
  }, [modalOpen, setModalOpen])

  return (
    <>
      <button
        className={cn(s.trigger, "cursor-pointer flex items-center gap-2 bt:gap-4", {
          [s.active]: menuOpen,
        })}
        onClick={() => setMenuOpen((prev) => !prev)}
        type="button"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        data-ignore-click-away
      >
        <div className={cn(s.cross, "cursor-pointer")}>
          <MenuX
            className="hidden bt:block"
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            strokeWidth="1"
            color="#fff"
            transition={{ type: "spring", stiffness: 260, damping: 40 }}
            width="50"
            height="6"
          />
          <MenuX
            className="block bt:hidden"
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            strokeWidth="1"
            color="#fff"
            transition={{ type: "spring", stiffness: 260, damping: 40 }}
            width="35"
            height="6"
          />
        </div>
        <div className={cn(s.text, "cursor-pointer text-white font-halenoir")}>
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
              <div className={cn(s["sticky-badge"], s["nav-item"], "cursor-pointer")}>
                <div className="hidden bd:block">
                  <div className={cn(s.stickyBadge, "cursor-pointer")} onClick={() => setModalOpen((prev) => !prev)}>
                    <AnimatedButton text={t("inquiry")} size="fit-content" theme="tertiary" />
                  </div>
                </div>
                <div
                  className="block bd:hidden font-lexend-giga font-light text-white text-[0.7rem] bt:text-base text-center blur-bg-bricky-brick py-1 bt:py-2 px-2 bt:px-4 rounded-sm bt:rounded-md"
                  onClick={() => setModalOpen((prev) => !prev)}
                >
                  {t("inquiry")}
                </div>
              </div>
            </div>
          </nav>
          <Menu open={menuOpen} setOpen={setMenuOpen} items={navigationItems} />
        </div>
      </header>
      {memoizedModal}
    </>
  )
}
