"use client"

import { gsap } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { ArrowUpIcon } from "lucide-react"
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
        "flex items-center gap-2",
        "font-primary font-light text-white opacity-100 hover:opacity-80 transition-opacity cursor-pointer",
        className
      )}
      type="button"
    >
      {t("scrollToTop")}
      <ArrowUpIcon className="w-6 h-6 opacity-80" />
    </button>
  )
}
