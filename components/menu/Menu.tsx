"use client"

import s from "./menu.module.css"

import cn from "clsx"
import { useEffect, useRef, useState } from "react"

import { gsap, useGSAP } from "@/components/gsap"
import { Logo } from "@/components/icons"
import { Img } from "@/components/utility/img"
// import { Link, Link as LocalizedLink } from "@/i18n/routing"
import { initialScroll } from "@/lib/constants"
import Link from "next/link"
import VerticalCutReveal, { VerticalCutRevealRef } from "../animations/vertical-cut-reveal"

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
  const maskTL = useRef<gsap.core.Timeline>()

  const [animateLinks, setAnimateLinks] = useState(false)

  const animateLinksForwards = () => setAnimateLinks(true)
  const animateLinksBackwards = () => setAnimateLinks(false)

  useGSAP(
    () => {
      menuTL.current = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          maskTL.current?.reverse()
          animateLinksBackwards()
        },
      })
      maskTL.current = gsap.timeline({ paused: true })

      menuTL.current?.fromTo(
        ref.current,
        { clipPath: "inset(0% 10% 100%)" },
        { clipPath: "inset(0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }
      )

      maskTL.current?.fromTo(
        ".mask",
        {
          clipPath: "inset(100% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0%)",
          duration: 0.8,
          delay: 1.2,
          ease: "expo.inOut",
          onStart: () => {
            animateLinksForwards()
          },
        },
        "-=0.5"
      )
    },

    {
      scope: ref,
      revertOnUpdate: true,
    }
  )

  useGSAP(
    () => {
      if (open) {
        animateLinksBackwards()
        maskTL.current?.revert()

        menuTL.current?.play()
        maskTL.current?.play()
      } else {
        menuTL.current?.reverse()
      }
    },
    {
      dependencies: [open],
      revertOnUpdate: true,
    }
  )

  return (
    <div className={cn(s.frame)} ref={ref}>
      <div className={cn(s.wrapper, "wrapper")}>
        <div className={cn(s.menu, "menu")}>
          <div className={s.backdrop}></div>
          <div className={cn(s.content, "flex items-center dd:items-end w-full h-full")}>
            <Link className={cn(s.logoC, "cursor-pointer")} href="/" scroll={initialScroll}>
              <Logo fill="var(--white)" small />
            </Link>
            <div className={cn(s.imgC, "img-c relative overflow-hidden")}>
              <div className={cn(s.mask, "w-full h-full mask overflow-hidden")}>
                <Img
                  src="/img/menu.jpg"
                  alt="Aerial view of City's Residences"
                  fill
                  className={cn(s.img, "object-cover absolute bottom-0 left-0 right-0")}
                  priority
                  sizes="30vw"
                />
              </div>
            </div>
            <nav className={cn(s.nav)}>
              <ul className={cn("flex flex-col flex-wrap items-center dt:items-start", s.navList)}>
                {navigationItems.map(({ title, href }) => (
                  <li className={cn(s.navItem)} key={title}>
                    <Link className="cursor-pointer" href={href}>
                      <AnimatedLink animate={animateLinks}>{title}</AnimatedLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

const AnimatedLink = ({ children, animate }: { children: React.ReactNode; animate: boolean }) => {
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

  return (
    <VerticalCutReveal
      autoStart={false}
      splitBy="characters"
      staggerDuration={0.003}
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
