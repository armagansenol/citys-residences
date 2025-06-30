"use client"

import { gsap } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"

interface ScrollToTopProps {
  className?: string
}

export function ScrollToTop({ className }: ScrollToTopProps) {
  const lenis = useLenis()
  const t = useTranslations("common")

  const handleScrollToTop = () => {
    gsap.to("body", {
      opacity: 0,
      onComplete: () => {
        lenis?.scrollTo(0, { immediate: true })
        gsap.to("body", {
          opacity: 1,
          delay: 0.2,
        })
      },
    })
  }

  return (
    <button
      onClick={handleScrollToTop}
      className={cn(
        "font-suisse-intl font-normal text-lg text-white opacity-50 hover:opacity-100 transition-opacity cursor-pointer",
        className
      )}
      type="button"
    >
      {t("scrollToTop")}
    </button>
  )
}
