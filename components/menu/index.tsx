"use client"

import { gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { X } from "lucide-react"
import { useRef } from "react"
import { useClickAway } from "react-use"

import { IconWrapper } from "@/components/icon-wrapper"
import { socialIcons } from "@/components/icons"
import { Img } from "@/components/utility/img"
import { ScrollableBox } from "@/components/utility/scrollable-box"
import { citysIstanbulAvmGoogleMaps, NavigationMetadata } from "@/lib/constants"
import { useScrollStore } from "@/lib/store/scroll"
import { colors } from "@/styles/config.mjs"

interface MenuProps {
  items: NavigationMetadata[]
}

export function Menu({ items }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()
  const lenis = useLenis()
  const clipPath = useRef("inset(0% 100% 0% 0%)")

  // Use the new unified scroll store
  const {
    menu: { isOpen: open },
    setMenuOpen: setOpen,
    scrollToCard,
    smoothScrollWithWrapper,
  } = useScrollStore()

  useClickAway(menuRef, (e) => {
    if ((e.target as HTMLElement).closest("[data-ignore-click-away]")) {
      return
    }
    setOpen(false)
  })

  useGSAP(() => {
    const animationConfig = {
      from: { clipPath: "inset(0% 0% 0% 100%)" },
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
  })

  useGSAP(
    () => {
      if (!menuTL.current) return

      if (open) {
        gsap.to(menuTL.current, { time: menuTL.current?.duration(), ease: "expo.out" })
        lenis?.stop()
      } else {
        gsap.to(menuTL.current, {
          duration: 0.3,
          time: 0,
          ease: "expo.out",
          overwrite: true,
          onComplete: () => {
            lenis?.start()
          },
        })
      }
    },
    {
      dependencies: [open, lenis],
    }
  )

  const handleScroll = (id: string) => {
    if (id.includes("stacking-cards")) {
      const cardIndex = parseInt(id.split("-")[2])
      smoothScrollWithWrapper(() => scrollToCard(cardIndex, true))
    } else {
      smoothScrollWithWrapper(() => lenis?.scrollTo(`#${id}`, { immediate: true }))
    }
  }

  const handleMenuItemClick = (id: string) => {
    handleScroll(id)
  }

  return (
    <>
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 overflow-hidden z-[var(--z-menu)]",
          "w-screen lg:w-[60vw]",
          "blur-bg-white-2",
          "pt-20 pl-24 pr-16 pb-10"
        )}
        style={{ clipPath: clipPath.current }}
        ref={menuRef}
        data-ignore-click-away
      >
        <button
          className='absolute top-5 left-24 -translate-x-full z-[var(--z-menu-close-button)]'
          onClick={() => {
            setOpen(false)
          }}
          type='button'
        >
          <X strokeWidth={1} className='text-white h-12 w-12' />
        </button>
        <div className='flex justify-between gap-24'>
          <div className='flex lg:items-end' data-lenis-prevent>
            <ScrollableBox>
              <nav className='w-full h-full flex items-end justify-center lg:justify-start'>
                <ul className={cn("flex flex-col items-stretch gap-3 lg:gap-3 xl:gap-3 2xl:gap-4 3xl:gap-4 w-full")}>
                  {items.map((item) => (
                    <li
                      className={cn(
                        "flex items-center justify-between gap-2",
                        "text-xl lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl",
                        "font-primary font-[300] text-white text-center lg:text-left",
                        {
                          "text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl 3xl:text-6xl": item.mainRoute,
                        }
                      )}
                      key={item.title}
                    >
                      <span
                        className='block cursor-pointer whitespace-nowrap'
                        onClick={() => handleMenuItemClick(item.id)}
                      >
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            </ScrollableBox>
          </div>
          <div className='flex flex-col flex-1 gap-8'>
            <div className='h-72 w-full relative overflow-hidden'>
              <Img
                src='/img/citys-istanbul-avm-hero.jpg'
                alt="City's Istanbul AVM"
                fill
                sizes='100vw'
                loading='lazy'
                className='object-cover'
              />
            </div>
            <p
              className={cn(
                "flex items-center justify-between gap-2",
                "text-xl lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl",
                "font-primary font-[300] text-white text-center lg:text-left"
              )}
            >
              Hayatın tam merkezinde, zamanı kendinize ve sevdiklerinize ayırarak keyifle, yaşamı sanata dönüştürerek
              daha çok yaşa.
            </p>
          </div>
        </div>
        <div className='flex items-end justify-between'>
          <div className='flex flex-col items-start'>
            <div className='grid grid-cols-4 gap-2 lg:gap-2 xl:gap-2 w-[300px]'>
              <IconWrapper
                className={cn("w-full aspect-square opacity-70 transition-opacity cursor-pointer", "hover:opacity-100")}
              >
                {socialIcons(colors.white).instagram}
              </IconWrapper>
              <IconWrapper
                className={cn("w-full aspect-square opacity-70 transition-opacity cursor-pointer", "hover:opacity-100")}
              >
                {socialIcons(colors.white).facebook}
              </IconWrapper>
              <IconWrapper
                className={cn("w-full aspect-square opacity-70 transition-opacity cursor-pointer", "hover:opacity-100")}
              >
                {socialIcons(colors.white).tiktok}
              </IconWrapper>
              <IconWrapper
                className={cn("w-full aspect-square opacity-70 transition-opacity cursor-pointer", "hover:opacity-100")}
              >
                {socialIcons(colors.white).youtube}
              </IconWrapper>
            </div>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <div className='w-40 h-40 border-red-800 border'>Randevu Oluştur</div>
            <div className='w-40 h-40 border-red-800 border'>Temsilciyle Görüş</div>
            <a
              href={citysIstanbulAvmGoogleMaps}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                "block",
                "transition-opacity duration-300 ease-in-out",
                "opacity-100 hover:opacity-70",
                "flex items-start gap-1",
                "w-40 h-40 border-red-800 border"
              )}
            >
              Yol Tarifi Al
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
