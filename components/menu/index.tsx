"use client"

import { gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { useRef, useState } from "react"
import { useClickAway, useWindowSize } from "react-use"

import { IconWrapper } from "@/components/icon-wrapper"
import { IconPin, socialIcons } from "@/components/icons"
import { ScrollableBox } from "@/components/utility/scrollable-box"
import { useStackingCardsStore } from "@/lib/store/stacking-cards"
import { breakpoints, colors } from "@/styles/config.mjs"
import { ChevronLeft, X } from "lucide-react"

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
  const { scrollToCard } = useStackingCardsStore()
  const [active, setActive] = useState<number | null>(null)

  // Simple touch device detection
  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)

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
        if (id.includes("stacking-cards")) {
          const cardIndex = parseInt(id.split("-")[2])
          scrollToCard(parseInt(cardIndex.toFixed(0)), true)
        } else {
          lenis?.scrollTo(`#${id}`, { immediate: true })
        }

        // Always run this animation regardless of the condition
        gsap.to(".wrapper", {
          opacity: 1,
          delay: 0.4,
        })
      },
    })
  }

  const handleMenuItemInteraction = (index: number) => {
    if (width > breakpoints.breakpointTablet) {
      setActive(index)
    }
  }

  const handleMenuItemClick = (index: number, id: string, event: React.MouseEvent) => {
    if (isTouchDevice) {
      // On touch devices, first click activates submenu, second click navigates
      if (active === index) {
        handleScroll(id)
      } else {
        event.preventDefault()
        setActive(index)
      }
    } else {
      // On desktop, click always navigates
      handleScroll(id)
    }
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
        <button
          className="absolute top-6 right-8 z-[var(--z-menu-close-button)]"
          onClick={() => {
            setOpen(false)
            setActive(null)
          }}
          type="button"
        >
          <X strokeWidth={1} className="text-white h-12 w-12" />
        </button>
        <nav className="w-full h-full flex items-end justify-center lg:justify-start px-10 lg:px-10">
          <ul className="w-full flex flex-col items-start justify-start lg:justify-end gap-3 lg:gap-2 xl:gap-3 2xl:gap-4 3xl:gap-5">
            {items.map(({ title, id }, i) => (
              <li
                className={cn(
                  "text-xl lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl",
                  "font-primary font-normal text-white text-center lg:text-left",
                  "transition-opacity duration-300 ease-in-out",
                  {
                    "opacity-100": active === null || active === i,
                    "opacity-30": active !== null && active !== i,
                  }
                )}
                key={title}
                onMouseEnter={() => handleMenuItemInteraction(i)}
              >
                <span className="block cursor-pointer" onClick={(event) => handleMenuItemClick(i, id, event)}>
                  {title}
                </span>
              </li>
            ))}
            <li className="my-4 lg:my-8 xl:my-8 2xl:my-10 3xl:my-10">
              <a
                href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-xl lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl",
                  "leading-none lg:leading-none xl:leading-none 2xl:leading-none 3xl:leading-none",
                  "font-primary font-normal text-white text-center lg:text-left",
                  "transition-opacity duration-300 ease-in-out",
                  "opacity-100",
                  "hover:opacity-70",
                  "flex items-center gap-2"
                )}
              >
                <span className="flex items-end h-5 w-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8">
                  <IconPin fill={colors.white} />
                </span>
                CR Satış Ofisi Konum
              </a>
            </li>
            <li className="flex flex-col items-center lg:items-start mt-auto mb-8 w-7/12 lg:w-full">
              <p
                className={cn(
                  "w-full font-primary font-normal text-white text-left",
                  "text-sm xl:text-xl 2xl:text-xl 3xl:text-2xl",
                  "py-2 border-b-[3px] border-b-white/30"
                )}
              >
                Bizi Takip Edin
              </p>
              <div className="grid grid-cols-4 gap-2 lg:gap-4 py-3 xl:py-4 pr-4">
                <IconWrapper
                  className={cn(
                    "w-full aspect-square opacity-70 transition-opacity cursor-pointer",
                    "hover:opacity-100"
                  )}
                >
                  {socialIcons(colors.white).instagram}
                </IconWrapper>
                <IconWrapper
                  className={cn(
                    "w-full aspect-square opacity-70 transition-opacity cursor-pointer",
                    "hover:opacity-100"
                  )}
                >
                  {socialIcons(colors.white).facebook}
                </IconWrapper>
                <IconWrapper
                  className={cn(
                    "w-full aspect-square opacity-70 transition-opacity cursor-pointer",
                    "hover:opacity-100"
                  )}
                >
                  {socialIcons(colors.white).tiktok}
                </IconWrapper>
                <IconWrapper
                  className={cn(
                    "w-full aspect-square opacity-70 transition-opacity cursor-pointer",
                    "hover:opacity-100"
                  )}
                >
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
          "blur-bg-bricky-brick w-screen z-[var(--z-menu-submenu)]",
          "border-l border-white/30",
          "left-0 lg:left-[30vw] xl:left-[22vw] 2xl:left-[20vw]",
          "w-full lg:w-[30vw] xl:w-[18vw] 2xl:w-[15vw]"
        )}
        style={{ clipPath: clipPath.current }}
        ref={submenuRef}
        data-ignore-click-away
      >
        <button
          className="absolute top-6 right-8 z-[var(--z-menu-close-button)]"
          onClick={() => {
            setOpen(false)
            setActive(null)
          }}
          type="button"
        >
          <X strokeWidth={1} className="text-white h-12 w-12" />
        </button>
        <button
          className="absolute top-6 left-8 z-[var(--z-menu-close-button)]"
          onClick={() => setActive(null)}
          type="button"
        >
          <ChevronLeft strokeWidth={1} className="text-white h-12 w-12" />
        </button>
        <div className="h-full w-full flex" data-lenis-prevent>
          <ScrollableBox>
            <nav className="h-full w-full px-10 lg:px-6 flex items-start justify-start">
              <ul
                className={cn(
                  "flex flex-col items-start gap-3 lg:gap-2 xl:gap-0 2xl:gap-2",
                  "py-0 pt-20 lg:pt-20 pb-0 lg:py-12 w-full"
                )}
              >
                <div className="w-full border-b-2 border-white/20">
                  <div className="text-white text-2xl font-semibold pb-2 lg:hidden">
                    {active !== null && items[active].title}
                  </div>
                </div>
                {active !== null &&
                  items[active]?.sections &&
                  Object.values(items[active].sections).map((section) => (
                    <li
                      className={cn(
                        "text-lg lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl",
                        "font-primary font-normal text-white text-left"
                      )}
                      key={section.id}
                    >
                      <span className="cursor-pointer block xl:py-1" onClick={() => handleScroll(section.id)}>
                        {section.label}
                      </span>
                      {section.subitems && (
                        <ul className="flex flex-col gap-2 lg:ml-2 my-2 lg:my-4">
                          {Object.values(section.subitems).map((subitem) => (
                            <li key={subitem.id}>
                              <span
                                className="text-lg lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl cursor-pointer block py-0.5"
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
