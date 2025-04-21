"use client"

import s from "./menu.module.css"

import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"

import { gsap, useGSAP } from "@/components/gsap"
import { socialIcons } from "@/components/icons"
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

  //   const [animateLinks, setAnimateLinks] = useState(false)

  //   const animateLinksForwards = () => setAnimateLinks(true)

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
          //   onEnd: () => {
          //     animateLinksForwards()
          //   },
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
    <div className={cn(s.frame, "blur-bg-bricky-brick-light")} ref={ref}>
      <nav
        className={cn(
          s.menu,
          "menu",
          "absolute top-0 left-0 w-full h-full p-4 bt:p-10 flex items-center justify-center bd:justify-start"
        )}
        // onClick={() => animateLinksForwards()}
      >
        <ul
          className={cn(
            s.navList,
            "flex flex-col items-center bd:items-start gap-3 bt:gap-10 bd:gap-0 py-0 pt-20 pb-0 bt:py-12 w-full"
          )}
        >
          {items.map(({ title, href }, i) => (
            <li
              className={cn(
                s.navItem,
                "font-halenoir text-white text-2xl bt:text-4xl bd:text-3xl text-center bd:text-left",
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
              <Link className="cursor-pointer block bd:py-2" href={href}>
                {title}
              </Link>
            </li>
          ))}
          <li className="w-full flex flex-col items-center bd:items-start mt-5 bt:mt-10 bd:mt-5 mb-0 bd:my-6">
            <p className="w-full font-halenoir font-normal text-white text-sm bd:text-base py-2 bd:border-b bd:border-white/30 text-center bd:text-left">
              Bizi Takip Edin
            </p>
            <div className="flex gap-4 justify-center bd:justify-start py-3 bd:py-4">
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
              "font-halenoir font-light text-white text-2xl bt:text-4xl bd:text-3xl text-center bd:text-left"
            )}
          >
            <a
              href="https://maps.app.goo.gl/2hSJUsgo2U198Kqq9"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                s.navItem,
                "font-halenoir font-normal text-white text-2xl bt:text-4xl bd:text-3xl text-center bd:text-left",
                "transition-opacity duration-300 ease-in-out",
                "opacity-100 hover:opacity-70"
                // "hover:font-medium"
              )}
            >
              {/* <AnimatedButton theme="transparent" size="lg" text="Satış Ofisi Konum" fontFamily="halenoir" /> */}
              CR Satış Ofisi Konum
            </a>
          </li>
          {/* <li className={cn(s.navItem, "block bt:hidden")}>
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
