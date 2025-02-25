"use client"

import s from "./sticky-badge.module.css"

import cn from "clsx"
import { useLenis } from "lenis/react"
import { useEffect, useState } from "react"

import { AnimatedButton } from "@/components/animated-button"
import { ModalContactForm } from "@/components/modal-contact-form"

interface StickyBadgeProps {
  hidden: boolean
}

export function StickyBadge({ hidden }: StickyBadgeProps) {
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (open) {
      return lenis?.stop()
    }

    lenis?.start()
  }, [lenis, open])

  return (
    <>
      <div className={cn(s.stickyBadge, { [s.hidden]: !hidden })} onClick={() => setOpen((prev) => !prev)}>
        <AnimatedButton text="RANDEVU AL" size="sm" theme="secondary" />
      </div>
      <ModalContactForm open={open} setOpen={setOpen} />
    </>
  )
}
