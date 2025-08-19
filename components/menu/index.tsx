"use client"

import { gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { useRef } from "react"
import { useClickAway, useWindowSize } from "react-use"

import { IconWrapper } from "@/components/icon-wrapper"
import { IconPin, socialIcons } from "@/components/icons"
import { ScrollableBox } from "@/components/utility/scrollable-box"
import { citysIstanbulAvmGoogleMaps } from "@/lib/constants"
import { useScrollStore } from "@/lib/store/scroll"
import { useHashNavigation, useStackingCardsHashNavigation } from "@/hooks/useHashNavigation"
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
  items: MenuItem[]
}

export function Menu({ items }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const submenuRef = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()
  const submenuTL = useRef<gsap.core.Timeline>()
  const lenis = useLenis()
  const { width } = useWindowSize()
  const clipPath = useRef("inset(0% 100% 0% 0%)")

  // Use the new unified scroll store
  const {
    menu: { isOpen: open, activeItem: active },
    setMenuOpen: setOpen,
    setMenuActiveItem: setActive,
    smoothScrollWithWrapper,
  } = useScrollStore()

  // Use hash navigation for section tracking
  const { navigateToSection, currentHash } = useHashNavigation()
  const { navigateToCard } = useStackingCardsHashNavigation()

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
    if (id.includes("stacking-cards")) {
      // Handle stacking cards with hash navigation
      const cardIndex = parseInt(id.split("-")[2])
      smoothScrollWithWrapper(() => navigateToCard(cardIndex, true))
    } else {
      // Handle regular sections with hash navigation
      smoothScrollWithWrapper(() => navigateToSection(id, { immediate: true, closeMenu: false }))
    }
  }

  const handleMenuItemInteraction = (index: number) => {
    if (width > breakpoints.breakpointTablet) {
      setActive(index)
    }
  }

  const handleMenuItemClick = (id: string, event: React.MouseEvent, index?: number) => {
    if (isTouchDevice) {
      const currentItem = index !== undefined ? items[index] : null
      const hasSubitems = currentItem?.sections && Object.keys(currentItem.sections).length > 0

      if (hasSubitems) {
        // Item has subitems: first click activates submenu, second click navigates
        if (active === index) {
          handleScroll(id)
        } else {
          event.preventDefault()
          setActive(index ?? null)
        }
      } else {
        // Item has no subitems: directly navigate (same as desktop)
        handleScroll(id)
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
          "fixed top-0 left-0 bottom-0 overflow-hidden z-[var(--z-menu)]",
          "w-screen lg:w-[20vw] xl:w-[19vw] 2xl:w-[19vw] 3xl:w-[17vw]",
          "blur-bg-bricky-brick"
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
        <div className="h-full w-full flex lg:items-end" data-lenis-prevent>
          <ScrollableBox>
            <nav className="w-full h-full flex items-end justify-center lg:justify-start px-10 lg:pl-8 lg:pr-4">
              <ul
                className={cn(
                  "flex flex-col items-start gap-3 lg:gap-2 xl:gap-3 2xl:gap-4 3xl:gap-4",
                  "pt-20 lg:pt-0 pb-0 lg:py-8 2xl:py-12 w-full"
                )}
              >
                {items.map(({ title, id }, i) => {
                  // Check if this menu item or any of its sections match the current hash
                  const isCurrentSection =
                    currentHash === id ||
                    (items[i]?.sections &&
                      Object.values(items[i].sections).some(
                        (section) =>
                          section.id === currentHash ||
                          (section.subitems &&
                            Object.values(section.subitems).some((subitem) => subitem.id === currentHash))
                      ))

                  return (
                    <li
                      className={cn(
                        "text-xl lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl",
                        "font-primary font-normal text-white text-center lg:text-left",
                        "transition-all duration-300 ease-in-out",
                        {
                          "opacity-100": active === null || active === i,
                          "opacity-30": active !== null && active !== i,
                        },
                        // Add visual indicator for current section
                        isCurrentSection && "relative"
                      )}
                      key={title}
                      onMouseEnter={() => handleMenuItemInteraction(i)}
                    >
                      {/* Current section indicator */}
                      {isCurrentSection && (
                        <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-full" />
                      )}
                      <span
                        className={cn(
                          "block cursor-pointer transition-all duration-300",
                          isCurrentSection && "text-white font-medium"
                        )}
                        onClick={(event) => handleMenuItemClick(id, event, i)}
                      >
                        {title}
                      </span>
                    </li>
                  )
                })}
                <li className="my-4 lg:my-6 xl:my-4 2xl:my-8 3xl:my-6 flex flex-col gap-2">
                  <a
                    href={citysIstanbulAvmGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "block",
                      "text-base lg:text-base xl:text-xl 2xl:text-2xl 3xl:text-2xl",
                      "leading-none lg:leading-none xl:leading-none 2xl:leading-none 3xl:leading-none",
                      "font-primary font-normal text-white text-center lg:text-left",
                      "transition-opacity duration-300 ease-in-out",
                      "opacity-100 hover:opacity-70",
                      "flex items-start gap-1"
                    )}
                  >
                    <span className="flex items-end h-5 w-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8">
                      <IconPin fill={colors.white} />
                    </span>
                    <span className="flex flex-col gap-2">
                      <span>CR Satış Ofisi Konum</span>
                      <span
                        className={cn(
                          "block whitespace-pre-line pl-1",
                          "text-sm lg:text-sm xl:text-sm 2xl:text-base 3xl:text-base",
                          "leading-normal lg:leading-normal xl:leading-normal 2xl:leading-normal 3xl:leading-normal",
                          "font-primary font-normal text-white text-center lg:text-left"
                        )}
                      >
                        <span className="block sm:whitespace-nowrap">İçerenköy, Çayır Cd No: 1,</span>
                        <span className="block sm:whitespace-nowrap">CITY&apos;S İstanbul AVM</span>
                        <span className="block sm:whitespace-nowrap">34752 Ataşehir/İstanbul</span>
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex flex-col items-center lg:items-start mt-auto ">
                  <p
                    className={cn(
                      "w-full font-primary font-normal text-white text-left",
                      "text-sm xl:text-sm 2xl:text-sm 3xl:text-base",
                      "py-2 border-b-[3px] border-b-white/30"
                    )}
                  >
                    Bizi Takip Edin
                  </p>
                  <div className="grid grid-cols-4 gap-2 lg:gap-2 xl:gap-2 pt-3 xl:pt-2 pr-4 w-7/12 xl:w-9/12">
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
              </ul>
            </nav>
          </ScrollableBox>
        </div>
      </div>
      {/* submenu */}
      <div
        className={cn(
          "fixed top-0 bottom-0 overflow-hidden z-[var(--z-menu-submenu)]",
          "blur-bg-bricky-brick",
          "border-l border-white/30",
          "left-0 lg:left-[20vw] xl:left-[19vw] 2xl:left-[19vw] 3xl:left-[17vw]",
          "w-full lg:w-[30vw] xl:w-[13.5vw] 2xl:w-[11.5vw] 3xl:w-[12vw]"
        )}
        style={{ clipPath: clipPath.current }}
        ref={submenuRef}
        data-ignore-click-away
      >
        <button
          className="absolute top-6 right-8 z-[var(--z-menu-close-button)] lg:hidden"
          onClick={() => {
            setOpen(false)
            setActive(null)
          }}
          type="button"
        >
          <X strokeWidth={1} className="text-white h-12 w-12" />
        </button>
        <button
          className="absolute top-6 left-8 z-[var(--z-menu-close-button)] lg:hidden"
          onClick={() => setActive(null)}
          type="button"
        >
          <ChevronLeft strokeWidth={1} className="text-white h-12 w-12" />
        </button>
        <div className="h-full w-full flex" data-lenis-prevent>
          <ScrollableBox>
            <nav className="h-full w-full px-10 lg:px-4 flex items-start justify-start pb-12 lg:pb-0">
              <ul
                className={cn(
                  "flex flex-col items-start gap-3 lg:gap-2 xl:gap-0 2xl:gap-2",
                  "py-0 pt-20 lg:pt-20 pb-0 lg:py-12 w-full"
                )}
              >
                <div className="w-full border-b-2 border-white/20 lg:border-none">
                  <div
                    className="text-white text-2xl font-semibold pb-2 lg:hidden"
                    onClick={(event) => {
                      if (active === null) return
                      handleMenuItemClick(items[active].id, event)
                    }}
                  >
                    {active !== null && items[active].title}
                  </div>
                </div>
                {active !== null &&
                  items[active]?.sections &&
                  Object.values(items[active].sections).map((section) => {
                    const isSectionCurrent = currentHash === section.id

                    return (
                      <li key={section.id} className="relative">
                        {/* Current section indicator for main sections */}
                        {isSectionCurrent && <span className="absolute -left-3 top-1 w-1 h-6 bg-white rounded-full" />}
                        <span
                          className={cn(
                            "font-primary font-normal text-white my-0 lg:my-[.2em]",
                            "text-lg lg:text-xl xl:text-base 2xl:text-base 3xl:text-xl",
                            "cursor-pointer block transition-all duration-300",
                            isSectionCurrent && "font-medium opacity-100",
                            !isSectionCurrent && "opacity-90 hover:opacity-100"
                          )}
                          onClick={() => handleScroll(section.id)}
                        >
                          {section.label}
                        </span>
                        {section.subitems && (
                          <ul className="flex flex-col gap-2 my-2 lg:my-2">
                            {Object.values(section.subitems).map((subitem) => {
                              const isSubitemCurrent = currentHash === subitem.id

                              return (
                                <li key={subitem.id} className="relative">
                                  {/* Current section indicator for subitems */}
                                  {isSubitemCurrent && (
                                    <span className="absolute -left-3 top-1 w-1 h-5 bg-white/80 rounded-full" />
                                  )}
                                  <span
                                    className={cn(
                                      "font-primary font-light",
                                      "text-lg lg:text-xl xl:text-base 2xl:text-base 3xl:text-xl",
                                      "leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight 3xl:leading-tight",
                                      "cursor-pointer block transition-all duration-300",
                                      isSubitemCurrent && "text-white font-medium opacity-100",
                                      !isSubitemCurrent && "text-white/80 hover:text-white/90"
                                    )}
                                    onClick={() => handleScroll(subitem.id)}
                                  >
                                    {subitem.label}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </li>
                    )
                  })}
              </ul>
            </nav>
          </ScrollableBox>
        </div>
      </div>
    </>
  )
}
