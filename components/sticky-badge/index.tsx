"use client"

import s from "./sticky-badge.module.css"

import cn from "clsx"
import { useLenis } from "lenis/react"
import { useEffect, useState } from "react"

import { AnimatedButton } from "@/components/animated-button"

interface StickyBadgeProps {
  hidden: boolean
}

export function StickyBadge({ hidden }: StickyBadgeProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (modalOpen) {
      return lenis?.stop()
    }

    lenis?.start()
  }, [lenis, modalOpen])

  return (
    <>
      <div className={cn(s.stickyBadge, { [s.hidden]: !hidden })} onClick={() => setModalOpen((prev) => !prev)}>
        <AnimatedButton text="RANDEVU AL" size="sm" theme="secondary" />
      </div>
    </>
  )
}
