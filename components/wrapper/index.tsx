"use client"

import s from "./wrapper.module.css"

import { cn } from "@/lib/utils"
import type { themeNames } from "@/styles/config.mjs"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

import { SmoothScroll } from "@/components/smooth-scroll"

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

  return (
    <>
      {/* <Header /> */}
      <main className={cn(s.main, className)} {...props} style={{ zIndex: "var(--z-content)" }}>
        {children}
        <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script>
      </main>
      {/* <Footer /> */}
      {lenis && <SmoothScroll root />}
    </>
  )
}
