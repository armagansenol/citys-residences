"use client"

import s from "./sticky-badge.module.css"

import cn from "clsx"

import AnimatedButton from "../animated-button"
import { ContactForm } from "../form-contact"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { useEffect, useState } from "react"
import { useLenis } from "lenis/react"

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className={cn(s.stickyBadge, "flex items-center justify-center cursor-pointer", { [s.hidden]: !hidden })}
          >
            <AnimatedButton text="RANDEVU AL" size="sm" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </>
  )
}
