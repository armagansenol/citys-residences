"use client"

import s from "./menu.module.css"

import cn from "clsx"
import { useLenis } from "lenis/react"
import Link from "next/link"
import { useRef } from "react"

import { gsap, useGSAP } from "@/components/gsap"
import { socialIcons } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { AnimatedButton } from "../animated-button"

interface MenuItem {
  title: string
  href: string
}

interface MenuProps {
  open: boolean
  items: MenuItem[]
}

export function Menu({ open, items }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()
  const lenis = useLenis()

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
          className={cn(s.navList, "flex flex-col items-center bd:items-start gap-3 bt:gap-10 bd:gap-6 py-12 w-full")}
        >
          {items.map(({ title, href }) => (
            <li
              className={cn(
                s.navItem,
                "font-halenoir font-light text-white text-2xl bt:text-4xl bd:text-2xl text-center bd:text-left"
              )}
              key={title}
            >
              <Link className="cursor-pointer" href={href}>
                <Link href="#">{title}</Link>
              </Link>
            </li>
          ))}
          <li className="w-full flex flex-col my-6">
            <p className="w-full font-halenoir font-normal text-white text-base py-2 border-b border-white/30">
              Bizi Takip Edin
            </p>
            <div className="flex gap-4 py-4">
              <div className="h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                {socialIcons.instagram}
              </div>
              <div className="h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                {socialIcons.facebook}
              </div>
              <div className="h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                {socialIcons.tiktok}
              </div>
              <div className="h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                {socialIcons.youtube}
              </div>
            </div>
          </li>
          <li
            className={cn(
              "font-halenoir font-light text-white text-2xl bt:text-4xl bd:text-base text-center bd:text-left"
            )}
          >
            <a className="flex -ml-2" href="https://g.co/kgs/qgRLq9q" target="_blank" rel="noopener noreferrer">
              <AnimatedButton theme="transparent" size="sm" text="Satış Ofisi Konum" fontFamily="halenoir" />
            </a>
          </li>
          <li className={cn(s.navItem, "block bt:hidden")}>
            <LocaleSwitcher />
          </li>
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
