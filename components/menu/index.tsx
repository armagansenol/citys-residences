"use client"

import s from "./menu.module.css"

import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"

import { gsap, useGSAP } from "@/components/gsap"
import { IconPin, socialIcons } from "@/components/icons"
import { Link } from "@/components/utility/link"

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
    <div className={cn(s.frame, "blur-bg-bricky-brick-light w-screen xl:w-[26vw]")} ref={ref}>
      <nav
        className={cn(
          s.menu,
          "absolute top-0 left-0 w-full h-full lg:px-16 flex items-center justify-center xl:justify-start"
        )}
      >
        <ul className="flex flex-col items-center xl:items-start gap-3 lg:gap-10 xl:gap-2 py-0 pt-20 pb-0 lg:py-12 w-full">
          {items.map(({ title, href }, i) => (
            <li
              className={cn(
                "text-lg lg:text-3xl xl:text-2xl 2xl:text-3xl",
                "font-suisse-intl text-white text-center xl:text-left",
                "transition-opacity duration-300 ease-in-out",
                "font-normal",
                {
                  "opacity-30": hover && active !== i,
                }
              )}
              key={title}
              onMouseEnter={() => {
                setHover(true)
                setActive(i)
              }}
              onMouseLeave={() => {
                setHover(false)
                setActive(null)
              }}
            >
              <Link className="cursor-pointer block xl:py-1" href={href}>
                {title}
              </Link>
            </li>
          ))}
          <li className="w-full flex flex-col items-center xl:items-start mt-2 lg:mt-10 xl:mt-5 mb-0 xl:my-6 order-last xl:order-none">
            <p className="w-full font-suisse-intl font-normal text-white text-sm xl:text-base py-2 xl:border-b xl:border-white/30 text-center xl:text-left">
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
          <li
            className={cn(
              "font-suisse-intl font-light text-white text-2xl lg:text-4xl xl:text-3xl text-center xl:text-left mt-4 lg:mt-0"
            )}
          >
            <a
              href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-suisse-intl font-normal text-white text-base lg:text-4xl xl:text-xl 2xl:text-2xl text-center xl:text-left xl:leading-none",
                "transition-opacity duration-300 ease-in-out",
                "opacity-100 hover:opacity-70",
                "flex items-center gap-2"
                // "hover:font-medium"
              )}
            >
              {/* <AnimatedButton theme="transparent" size="lg" text="Satış Ofisi Konum" fontFamily="halenoir" /> */}
              <span className="flex items-end h-5 w-5 lg:w-6 lg:h-6 mb-1">
                <IconPin fill="var(--white)" />
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

// const AnimatedLink = ({
//   children,
//   animate,
//   reset,
// }: {
//   children: React.ReactNode
//   animate: boolean
//   reset?: boolean
// }) => {
//   const textRef = useRef<VerticalCutRevealRef>(null)

//   useEffect(() => {
//     const currentRef = textRef.current

//     if (animate) {
//       currentRef?.startAnimation()
//     } else {
//       currentRef?.reset()
//     }

//     return () => {
//       currentRef?.reset()
//     }
//   }, [animate])

//   useEffect(() => {
//     if (reset) {
//       textRef.current?.reset()
//     }
//   }, [reset])

//   return (
//     <VerticalCutReveal
//       autoStart={false}
//       splitBy="characters"
//       staggerDuration={0.005}
//       transition={{
//         type: "spring",
//         stiffness: 130,
//         damping: 42,
//       }}
//       ref={textRef}
//     >
//       {children}
//     </VerticalCutReveal>
//   )
// }
