"use client"

import s from "./wrapper.module.css"

import type { themeNames } from "@/styles/config.mjs"
import cn from "clsx"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { SmoothScroll } from "@/components/smooth-scroll"
import { gsap } from "@/components/gsap"
import { useGSAP } from "@gsap/react"

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: (typeof themeNames)[number]
  lenis?: boolean
  webgl?: boolean | object
}

export function Wrapper({ children, theme = "light", lenis = true, className, ...props }: WrapperProps) {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [pathname, theme])

  useGSAP(
    () => {
      const gsapGlobalFadeIn: HTMLElement[] = gsap.utils.toArray(".gsap-global-fade-in")

      gsapGlobalFadeIn.forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: element,
            start: "center-=25% center+=25%",
          },
        })
      })
    },
    {
      dependencies: [pathname, children],
    }
  )

  return (
    <>
      <Header />
      <main className={cn(s.main, className)} {...props} style={{ zIndex: "var(--z-content)" }}>
        {children}
        <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script>
      </main>
      <Footer />
      {lenis && <SmoothScroll root />}
    </>
  )
}
