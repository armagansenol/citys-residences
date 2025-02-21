"use client"

import s from "./sticky-badge.module.css"

import cn from "clsx"
import { useEffect, useState } from "react"
import { useLenis } from "lenis/react"

import { ContactForm } from "@/components/form-contact"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AnimatedButton from "@/components/animated-button"

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
            <AnimatedButton text="RANDEVU AL" size="sm" theme="secondary" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </>
  )
}
