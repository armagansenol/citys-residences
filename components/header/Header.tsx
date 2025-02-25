"use client"

import s from "./header.module.css"

import cn from "clsx"
import Lenis from "lenis"
import { useLenis } from "lenis/react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Logo } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Menu } from "@/components/menu"
import { MenuX } from "@/components/menu-x"
import { StickyBadge } from "@/components/sticky-badge"
import { Link as LocalizedLink } from "@/i18n/routing"
import { initialScroll } from "@/lib/constants"

// const headerVariants = cva("w-full flex items-center justify-between", {
//   variants: {
//     variant: {
//       v1: s.v1,
//       v2: s.slim,
//     },
//   },
//   defaultVariants: {
//     variant: "v1",
//   },
// })

// type HeaderVariantsProps = VariantProps<typeof headerVariants>

export default function Header() {
  // { variant }: HeaderVariantsProps
  const lenis = useLenis()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollState, setScrollState] = useState({
    hidden: false,
    atTop: true,
    sticky: false,
  })
  const pathname = usePathname()
  // const t = useTranslations("routes")
  // const locale = useLocale()

  useEffect(() => {
    return menuOpen ? lenis?.stop() : lenis?.start()
  }, [menuOpen, lenis])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEvents = (e: Lenis) => {
      setScrollState(() => ({
        atTop: Boolean(e.className) && e.actualScroll < 10,
        hidden: lenis?.direction === 1 && e.actualScroll > window.innerHeight / 2,
        sticky: e.actualScroll > window.innerHeight / 2,
      }))
    }

    lenis?.on("scroll", handleEvents)
    return () => lenis?.off("scroll", handleEvents)
  }, [lenis])

  return (
    <>
      <header
        className={cn(s.header, "flex items-center", {
          [s.hidden]: scrollState.hidden,
          [s.atTop]: scrollState.atTop,
          [s.menuOpen]: menuOpen,
        })}
        role="banner"
      >
        <div
          className={cn(s.content, "flex items-center justify-between flex-1", {
            [s.atTop]: scrollState.atTop,
          })}
        >
          <LocalizedLink
            className={cn(s["logo-c"], "cursor-pointer gsap-blur")}
            href="/"
            scroll={initialScroll}
            aria-label="Home"
          >
            <Logo fill="var(--foreground)" />
          </LocalizedLink>
          <button
            className={cn(s.trigger, "cursor-pointer flex items-center gap-2 bt:gap-4", {
              [s.active]: menuOpen,
            })}
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
            <div className={cn(s.text, "cursor-pointer text-white font-halenoir", { [s.active]: menuOpen })}>
              <span>KAPAT</span>
              <span>MENÜ</span>
            </div>
          </button>
          <nav className={cn(s["nav"], "flex gap-10 items-center text-white")} role="navigation">
            <div className={"flex items-center gap-6"}>
              <div className={cn(s["locale-switcher"], s["nav-item"], "cursor-pointer hidden bt:block")}>
                <LocaleSwitcher />
              </div>
              <div className={cn(s["sticky-badge"], s["nav-item"], "cursor-pointer")}>
                <div className="hidden bt:block">
                  <StickyBadge hidden={true} />
                </div>
                <div className="block bt:hidden font-lexend-giga font-light text-white text-[0.7rem] text-center blur-bg-bricky-brick py-2 px-2 rounded-sm">
                  RANDEVU AL
                </div>
              </div>
            </div>
          </nav>
          <Menu open={menuOpen} />
        </div>
      </header>
    </>
  )
}
