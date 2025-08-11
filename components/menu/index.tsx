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
import { X } from "lucide-react"

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

  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0
  }

  useClickAway(menuRef, (e) => {
    if (isTouchDevice()) return
    if ((e.target as HTMLElement).closest("[data-ignore-click-away]")) {
      return
    }
    setOpen(false)
    setActive(null)
  })

  useClickAway(submenuRef, (e) => {
    if (isTouchDevice()) return
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
        gsap.to(menuTL.current, {
          time: menuTL.current?.duration(),
          ease: "expo.out",
        })
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
    },
  )

  useGSAP(
    () => {
      if (!submenuTL.current) return

      const shouldShowSubmenu = active !== null && items[active]?.sections

      if (shouldShowSubmenu) {
        gsap.to(submenuTL.current, {
          time: submenuTL.current?.duration(),
          ease: "expo.out",
        })
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
    },
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

  return (
    <>
      {/* menu */}
      <div
        className={cn(
          "fixed bottom-0 left-0 top-0 overflow-hidden",
          "blur-bg-bricky-brick z-[var(--z-menu)] w-screen lg:w-[30vw] xl:w-[22vw] 2xl:w-[20vw]",
        )}
        style={{ clipPath: clipPath.current }}
        ref={menuRef}
        data-ignore-click-away
      >
        <button
          className="absolute right-8 top-6 z-[var(--z-menu-close-button)]"
          onClick={() => {
            setActive(null)
            setOpen(false)
          }}
          type="button"
        >
          <X strokeWidth={1} className="h-12 w-12 text-white" />
        </button>
        <nav className="flex h-full w-full items-start justify-start px-10 pt-20 lg:justify-center lg:px-10 xl:items-end xl:pt-0">
          <ul className="flex w-full flex-col items-start justify-start gap-3 lg:items-start lg:gap-2 xl:gap-3 2xl:gap-4 3xl:gap-5">
            {items.map(({ title, id }, i) => (
              <li
                className={cn(
                  "text-2xl lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl",
                  "text-center font-primary font-normal text-white lg:text-left",
                  "transition-opacity duration-300 ease-in-out",
                  {
                    "opacity-100": active === null || active === i,
                    "opacity-30": active !== null && active !== i,
                  },
                )}
                key={title}
                // onMouseEnter={() => {
                //   if (width > breakpoints.breakpointTablet) {
                //     setActive(i);
                //   }
                // }}
                onClick={() => {
                  if (width <= breakpoints.breakpointTablet) {
                    setActive(i)
                  }
                }}
              >
                <span
                  className="block cursor-pointer"
                  onClick={() => {
                    if (isTouchDevice()) return
                    handleScroll(id)
                  }}
                >
                  {title}
                </span>
              </li>
            ))}
            <li className="my-4 xl:my-8 2xl:my-10 3xl:my-10">
              <a
                href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-left font-primary text-2xl font-normal text-white lg:text-lg xl:text-xl xl:leading-none 2xl:text-xl 3xl:text-2xl",
                  "transition-opacity duration-300 ease-in-out",
                  "opacity-100 hover:opacity-70",
                  "flex items-center gap-2",
                )}
              >
                <span className="flex h-5 w-5 items-end xl:h-6 xl:w-6 2xl:h-8 2xl:w-8">
                  <IconPin fill={colors.white} />
                </span>
                CR Satış Ofisi Konum
              </a>
            </li>
            <li className="mb-8 mr-auto mt-auto flex w-full flex-col items-start">
              <p className="py-2 text-center font-primary text-sm font-normal text-white lg:text-left xl:text-xl 2xl:text-xl 3xl:text-2xl">
                Bizi Takip Edin
              </p>
              <div className="h-[3px] w-full bg-white/30"></div>
              <div className="grid grid-cols-4 gap-2 py-2 pr-2 sm:gap-3 sm:py-3 sm:pr-3 md:gap-4 md:py-3 md:pr-4 lg:gap-4 lg:py-3 xl:gap-4 xl:py-4">
                <IconWrapper className="aspect-square w-8 cursor-pointer opacity-70 transition-opacity hover:opacity-100 sm:w-10 md:w-12 lg:w-12 xl:w-16">
                  {socialIcons(colors.white).instagram}
                </IconWrapper>
                <IconWrapper className="aspect-square w-8 cursor-pointer opacity-70 transition-opacity hover:opacity-100 sm:w-10 md:w-12 lg:w-12 xl:w-16">
                  {socialIcons(colors.white).facebook}
                </IconWrapper>
                <IconWrapper className="aspect-square w-8 cursor-pointer opacity-70 transition-opacity hover:opacity-100 sm:w-10 md:w-12 lg:w-12 xl:w-16">
                  {socialIcons(colors.white).tiktok}
                </IconWrapper>
                <IconWrapper className="aspect-square w-8 cursor-pointer opacity-70 transition-opacity hover:opacity-100 sm:w-10 md:w-12 lg:w-12 xl:w-16">
                  {socialIcons(colors.white).youtube}
                </IconWrapper>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {/* submenu */}
      <div
        className={cn(
          "fixed bottom-0 top-0 overflow-hidden",
          "blur-bg-bricky-brick z-[var(--z-menu-submenu)]",
          "border-l border-white/30",
          "left-0 lg:left-[30vw] xl:left-[22vw] 2xl:left-[20vw]",
          "w-full lg:w-[30vw] xl:w-[18vw] 2xl:w-[15vw]",
        )}
        style={{ clipPath: clipPath.current }}
        ref={submenuRef}
        data-ignore-click-away
      >
        <button
          className="absolute right-8 top-6 z-[var(--z-menu-close-button)]"
          onClick={() => {
            setActive(null)
            setOpen(false)
          }}
          type="button"
        >
          <X strokeWidth={1} className="h-12 w-12 text-white" />
        </button>
        <div className="flex h-full w-full" data-lenis-prevent>
          <ScrollableBox>
            <nav className="flex h-full w-full items-start justify-start px-10 lg:px-6">
              <ul className="flex flex-col items-start gap-3 py-0 pb-0 pt-20 lg:gap-2 lg:py-12 xl:gap-0 2xl:gap-2">
                {active !== null &&
                  items[active]?.sections &&
                  Object.values(items[active].sections).map((section) => (
                    <li
                      className={cn(
                        "text-lg lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl",
                        "font-primary font-normal text-white lg:text-left",
                      )}
                      key={section.id}
                    >
                      <span
                        className="block cursor-pointer xl:py-1"
                        onClick={() => handleScroll(section.id)}
                      >
                        {section.label}
                      </span>
                      {section.subitems && (
                        <ul className="my-0 flex flex-col items-start gap-2 lg:my-4 lg:ml-2">
                          {Object.values(section.subitems).map((subitem) => (
                            <li key={subitem.id}>
                              <span
                                className="block cursor-pointer py-0.5 text-lg lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl"
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
