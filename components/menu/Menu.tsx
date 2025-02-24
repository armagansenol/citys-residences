"use client"

import s from "./menu.module.css"

import cn from "clsx"
import { useLenis } from "lenis/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import VerticalCutReveal, { VerticalCutRevealRef } from "@/components/animations/vertical-cut-reveal"
import { gsap, useGSAP } from "@/components/gsap"

const navigationItems: Array<{
  title: string
  href: string
}> = [
  { title: "Konutlar", href: "/" },
  { title: "City's Park", href: "/" },
  { title: "City's Club House", href: "/" },
  { title: "Konum", href: "/" },
  { title: "Yeme İçme", href: "/" },
  { title: "Alışveriş", href: "/" },
  { title: "Justwork Campus", href: "/" },
  { title: "Performans Sanatları Merkezi", href: "/" },
  { title: "City's Club Ayrıcalıkları", href: "/" },
]

interface MenuProps {
  open: boolean
}

export default function Menu({ open }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const menuTL = useRef<gsap.core.Timeline>()
  const lenis = useLenis()

  const [animateLinks, setAnimateLinks] = useState(false)

  const animateLinksForwards = () => setAnimateLinks(true)
  // const animateLinksBackwards = () => setAnimateLinks(false)

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
          onEnd: () => {
            animateLinksForwards()
          },
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
    <div className={cn(s.frame, "blur-bg-bricky-brick")} ref={ref}>
      <div
        className={cn(
          s.menu,
          "menu",
          "absolute top-0 left-0 w-full h-full flex items-center justify-center bd:justify-start p-4 bt:p-10"
        )}
        onClick={() => animateLinksForwards()}
      >
        <nav>
          <ul
            className={cn(
              s.navList,
              "flex flex-col flex-wrap items-center bd:items-start justify-center gap-3 bt:gap-10 bd:gap-6"
            )}
          >
            {navigationItems.map(({ title, href }) => (
              <li
                className={cn(
                  s.navItem,
                  "font-halenoir font-light text-white text-2xl bt:text-4xl bd:text-2xl text-center bd:text-left"
                )}
                key={title}
              >
                <Link className="cursor-pointer" href={href}>
                  <AnimatedLink animate={animateLinks}>{title}</AnimatedLink>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

const AnimatedLink = ({
  children,
  animate,
  reset,
}: {
  children: React.ReactNode
  animate: boolean
  reset?: boolean
}) => {
  const textRef = useRef<VerticalCutRevealRef>(null)

  useEffect(() => {
    const currentRef = textRef.current

    if (animate) {
      currentRef?.startAnimation()
    } else {
      currentRef?.reset()
    }

    return () => {
      currentRef?.reset()
    }
  }, [animate])

  useEffect(() => {
    if (reset) {
      textRef.current?.reset()
    }
  }, [reset])

  return (
    <VerticalCutReveal
      autoStart={false}
      splitBy="characters"
      staggerDuration={0.005}
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 42,
      }}
      ref={textRef}
    >
      {children}
    </VerticalCutReveal>
  )
}
