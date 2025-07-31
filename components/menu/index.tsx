"use client"

import { gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { useRef, useState } from "react"
import { useClickAway, useWindowSize } from "react-use"

import { IconPin, socialIcons } from "@/components/icons"
import { ScrollableBox } from "@/components/utility/scrollable-box"
import { breakpoints, colors } from "@/styles/config.mjs"
import { X } from "lucide-react"
import { IconWrapper } from "@/components/icon-wrapper"

interface MenuItem {
  title: string
  href: string
  id: string
  sections?: {
    [key: string]: {
      label: string
      id: string
      subitems?: {
        [key: string]: {
          label: string
          id: string
        }
      }
    }
  }
}

interface MenuProps {
  open: boolean
  setOpen: (open: boolean) => void
  items: MenuItem[]
}

export function Menu({ open, setOpen, items }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const submenuRef = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()
  const submenuTL = useRef<gsap.core.Timeline>()
  const lenis = useLenis()
  const { width } = useWindowSize()
  const clipPath = useRef("inset(0% 100% 0% 0%)")

  const [active, setActive] = useState<number | null>(null)

  useClickAway(menuRef, (e) => {
    if ((e.target as HTMLElement).closest("[data-ignore-click-away]")) {
      return
    }
    setOpen(false)
    setActive(null)
  })

  useClickAway(submenuRef, (e) => {
    if ((e.target as HTMLElement).closest("[data-ignore-click-away]")) {
      return
    }
    setOpen(false)
    setActive(null)
  })

  useGSAP(() => {
    const animationConfig = {
      from: { clipPath: "inset(0% 100% 0% 0%)" },
      to: {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "none",
      },
    }

    const timelineConfig = {
      paused: true,
      ease: "none",
    }

    const createTimeline = (ref: React.RefObject<HTMLDivElement>) => {
      const timeline = gsap.timeline(timelineConfig)
      timeline.fromTo(ref.current, animationConfig.from, animationConfig.to)
      return timeline
    }

    menuTL.current = createTimeline(menuRef)
    submenuTL.current = createTimeline(submenuRef)
  })

  useGSAP(
    () => {
      if (!menuTL.current || !submenuTL.current) return

      if (open) {
        gsap.to(menuTL.current, { time: menuTL.current?.duration(), ease: "expo.out" })
        lenis?.stop()
      } else {
        gsap.to(submenuTL.current, {
          duration: 0.3,
          time: 0,
          ease: "expo.in",
          overwrite: true,
          onComplete: () => {
            if (!menuTL.current) return
            gsap.to(menuTL.current, {
              duration: 0.3,
              time: 0,
              ease: "expo.out",
              overwrite: true,
              onComplete: () => {
                lenis?.start()
                setActive(null)
              },
            })
          },
        })
      }
    },
    {
      dependencies: [open, lenis],
    }
  )

  useGSAP(
    () => {
      if (!submenuTL.current) return

      const shouldShowSubmenu = active !== null && items[active]?.sections

      // Debug logging
      console.log("Menu Debug:", {
        active,
        items: items.map((item) => ({ id: item.id, hasSections: !!item.sections })),
        activeItem: active !== null ? items[active] : null,
        shouldShowSubmenu,
      })

      if (shouldShowSubmenu) {
        gsap.to(submenuTL.current, { time: submenuTL.current?.duration(), ease: "expo.out" })
      } else if (open) {
        // Only close submenu when main menu is open (e.g., hovering over items without submenus)
        gsap.to(submenuTL.current, {
          time: 0,
          duration: 0.2,
          ease: "expo.out",
          overwrite: true,
        })
      }
    },
    {
      dependencies: [open, active, items],
    }
  )

  const handleScroll = (id: string) => {
    setOpen(false)
    setActive(null)
    gsap.to(".wrapper", {
      opacity: 0,
      onComplete: () => {
        lenis?.scrollTo(`#${id}`, { immediate: true })
        gsap.to(".wrapper", {
          opacity: 1,
          delay: 0.4,
        })
      },
    })
  }

  return (
    <>
      {/* menu */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 overflow-hidden",
          "blur-bg-bricky-brick w-screen lg:w-[30vw] xl:w-[22vw] 2xl:w-[20vw] z-[var(--z-menu)]"
        )}
        style={{ clipPath: clipPath.current }}
        ref={menuRef}
        data-ignore-click-away
      >
        <button className="absolute top-6 left-8 z-50" onClick={() => setOpen(false)} type="button">
          <X strokeWidth={1} className="text-white h-12 w-12" />
        </button>
        <nav className="w-full h-full lg:px-10 flex items-end justify-center lg:justify-start">
          <ul className="flex flex-col items-center lg:items-start justify-end gap-3 lg:gap-2 xl:gap-3 2xl:gap-4 3xl:gap-5 w-full">
            {items.map(({ title, id }, i) => (
              <li
                className={cn(
                  "text-lg lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-3xl",
                  "font-primary font-normal text-white text-center lg:text-left",
                  "transition-opacity duration-300 ease-in-out",
                  {
                    "opacity-100": active === null || active === i,
                    "opacity-30": active !== null && active !== i,
                  }
                )}
                key={title}
                onMouseEnter={() => {
                  if (width > breakpoints.breakpointTablet) {
                    setActive(i)
                  }
                }}
              >
                <span className="cursor-pointer block" onClick={() => handleScroll(id)}>
                  {title}
                </span>
              </li>
            ))}
            <li className="xl:my-8 2xl:my-10 3xl:my-10">
              <a
                href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "font-primary font-normal text-white text-base lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl text-center lg:text-left xl:leading-none",
                  "transition-opacity duration-300 ease-in-out",
                  "opacity-100 hover:opacity-70",
                  "flex items-center gap-2"
                )}
              >
                <span className="flex items-end h-5 w-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8">
                  <IconPin fill={colors.white} />
                </span>
                CR Satış Ofisi Konum
              </a>
            </li>
            <li className="w-full flex flex-col items-center lg:items-start order-last lg:order-none mt-auto mb-8">
              <p className="w-full font-primary font-normal text-white text-sm xl:text-base 2xl:text-lg 3xl:text-xl py-2 lg:border-b lg:border-white/30 text-center lg:text-left">
                Bizi Takip Edin
              </p>
              <div className="grid grid-cols-4 gap-4 py-3 xl:py-4">
                <IconWrapper className="w-full aspect-square opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  {socialIcons(colors.white).instagram}
                </IconWrapper>
                <IconWrapper className="w-full aspect-square opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  {socialIcons(colors.white).facebook}
                </IconWrapper>
                <IconWrapper className="w-full aspect-square opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  {socialIcons(colors.white).tiktok}
                </IconWrapper>
                <IconWrapper className="w-full aspect-square opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  {socialIcons(colors.white).youtube}
                </IconWrapper>
              </div>
            </li>
            {/* <li className={cn(s.navItem, "block lg:hidden")}>
            <LocaleSwitcher />
          </li> */}
          </ul>
        </nav>
      </div>
      {/* submenu */}
      <div
        className={cn(
          "fixed top-0 bottom-0 overflow-hidden",
          "blur-bg-bricky-brick w-screen z-[var(--z-menu)]",
          "border-l border-white/30",
          "left-0 lg:left-[30vw] xl:left-[22vw] 2xl:left-[20vw]",
          "lg:w-[30vw] xl:w-[18vw] 2xl:w-[15vw]"
        )}
        style={{ clipPath: clipPath.current }}
        ref={submenuRef}
        data-ignore-click-away
      >
        <div className="h-full w-full flex" data-lenis-prevent>
          <ScrollableBox>
            <nav className={cn("h-full w-full px-6", "flex items-start justify-start")}>
              <ul className="flex flex-col items-center lg:items-start gap-3 lg:gap-2 xl:gap-0 2xl:gap-2 py-0 pt-20 pb-0 lg:py-12 w-full">
                {/* Show sections of the active item, or all items if no hover */}
                {active !== null &&
                  items[active]?.sections &&
                  // Render sections of the hovered item
                  Object.values(items[active].sections).map((section) => (
                    <li
                      className={cn(
                        "text-lg lg:text-xl xl:text-xl 2xl:text-2xl",
                        "font-primary font-normal text-white text-center lg:text-left"
                      )}
                      key={section.id}
                    >
                      <span
                        className="cursor-pointer block xl:py-1"
                        // href={`#${items[active].href}`}
                        onClick={() => handleScroll(section.id)}
                      >
                        {section.label}
                      </span>
                      {/* Render subitems if they exist */}
                      {section.subitems && (
                        <ul className="mt-2 flex flex-col gap-1">
                          {Object.values(section.subitems).map((subitem) => (
                            <li key={subitem.id} className="text-sm lg:text-base text-white/60">
                              <span
                                className="cursor-pointer block py-0.5"
                                // href={`#${subitem.id}`}
                                onClick={() => handleScroll(subitem.id)}
                              >
                                {subitem.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            </nav>
          </ScrollableBox>
        </div>
      </div>
    </>
  )
}
