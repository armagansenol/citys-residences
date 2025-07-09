"use client"

import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { useRef, useState } from "react"
import { useClickAway, useWindowSize } from "react-use"

import { gsap, useGSAP } from "@/components/gsap"
import { IconPin, socialIcons } from "@/components/icons"
import { Link } from "@/components/utility/link"
import { breakpoints, colors } from "@/styles/config.mjs"
import { X } from "lucide-react"

interface MenuItem {
  title: string
  href: string
}

interface MenuProps {
  open: boolean
  setOpen: (open: boolean) => void
  items: MenuItem[]
}

export function Menu({ open, setOpen, items }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()
  const lenis = useLenis()
  const { width } = useWindowSize()

  const [hover, setHover] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  useClickAway(ref, (e) => {
    if ((e.target as HTMLElement).closest("[data-ignore-click-away]")) {
      return
    }
    setOpen(false)
  })

  useGSAP(
    () => {
      menuTL.current = gsap.timeline({
        paused: true,
      })

      menuTL.current?.fromTo(
        ref.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "expo.inOut",
        }
      )
    },
    {
      scope: ref,
    }
  )

  useGSAP(
    () => {
      if (open) {
        menuTL.current?.play()
        lenis?.stop()
      } else {
        menuTL.current?.reverse()
        lenis?.start()
      }
    },
    {
      dependencies: [open, lenis],
    }
  )

  return (
    <div
      className={cn(
        "fixed top-0 left-0 bottom-0 w-screen h-screen overflow-hidden",
        "blur-bg-bricky-brick-light w-screen lg:w-[30vw] xl:w-[25vw] 2xl:w-[21vw] z-[var(--z-menu)]"
      )}
      style={{ clipPath: "inset(0% 10% 100%)" }}
      ref={ref}
    >
      <button className="absolute top-6 left-14 z-50" onClick={() => setOpen(false)} type="button">
        <X className="text-white h-12 w-12" />
      </button>
      <nav
        className={cn(
          "absolute top-0 left-0 w-full h-full lg:pl-12 xl:pl-16 lg:pr-6",
          "flex items-center justify-center lg:justify-start"
        )}
      >
        <ul className="flex flex-col items-center lg:items-start gap-3 lg:gap-2 xl:gap-0 2xl:gap-2 py-0 pt-20 pb-0 lg:py-12 w-full">
          {items.map(({ title, href }, i) => (
            <li
              className={cn(
                "text-lg lg:text-xl xl:text-xl 2xl:text-2xl",
                "font-primary font-normal text-white text-center lg:text-left",
                "transition-opacity duration-300 ease-in-out",
                {
                  "opacity-30": hover && active !== i,
                }
              )}
              key={title}
              onMouseEnter={() => {
                if (width > breakpoints.breakpointTablet) {
                  setHover(true)
                  setActive(i)
                }
              }}
              onMouseLeave={() => {
                if (width > breakpoints.breakpointTablet) {
                  setHover(false)
                  setActive(null)
                }
              }}
            >
              <Link className="cursor-pointer block xl:py-1" href={href}>
                {title}
              </Link>
            </li>
          ))}
          <li className="w-full flex flex-col items-center lg:items-start mt-2 lg:mt-10 xl:mt-5 mb-0 xl:my-6 order-last lg:order-none">
            <p className="w-full font-primary font-normal text-white text-sm xl:text-base py-2 lg:border-b lg:border-white/30 text-center lg:text-left">
              Bizi Takip Edin
            </p>
            <div className="flex gap-4 justify-center xl:justify-start py-3 xl:py-4">
              <div className="h-6 w-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                {socialIcons.instagram}
              </div>
              <div className="h-6 w-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                {socialIcons.facebook}
              </div>
              <div className="h-6 w-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                {socialIcons.tiktok}
              </div>
              <div className="h-6 w-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                {socialIcons.youtube}
              </div>
            </div>
          </li>
          <li className="mt-4 xl:mt-0">
            <a
              href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-primary font-normal text-white text-base lg:text-lg xl:text-xl 2xl:text-xl text-center lg:text-left xl:leading-none",
                "transition-opacity duration-300 ease-in-out",
                "opacity-100 hover:opacity-70",
                "flex items-center gap-2"
              )}
            >
              <span className="flex items-end h-5 w-5 xl:w-6 xl:h-6 mb-1">
                <IconPin fill={colors.white} />
              </span>
              CR Satış Ofisi Konum
            </a>
          </li>
          {/* <li className={cn(s.navItem, "block lg:hidden")}>
            <LocaleSwitcher />
          </li> */}
        </ul>
      </nav>
    </div>
  )
}
