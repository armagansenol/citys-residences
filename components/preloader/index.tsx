"use client"

import s from "./preloader.module.css"

import { useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import { AnimatePresence, motion } from "motion/react"
import { useState, useEffect } from "react"

import { Img } from "@/components/utility/img"

export function Preloader() {
  const lenis = useLenis()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useGSAP(() => {
    lenis?.stop()

    if (!isVisible) {
      lenis?.start()
    }
  }, [isVisible, lenis])

  if (process.env.NODE_ENV !== "production") {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            s["preloader-frame"],
            "fixed top-0 left-0 w-full h-full overflow-hidden bg-bricky-brick",
            "flex items-center justify-center"
          )}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-64 h-64">
            <Img
              src="/gif/citys-logo-animation.gif"
              alt="City's Residences Logo Animation"
              width={256}
              height={256}
              priority={true}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
