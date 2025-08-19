"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

type NavigateWithCallback = (path: string, callback: () => void) => void

export function useNavigateWithCallback(): NavigateWithCallback {
  const router = useRouter()
  const pathname = usePathname()
  const callbackRef = useRef<(() => void) | null>(null)
  const targetPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (targetPathRef.current && pathname === targetPathRef.current) {
      // Run the callback when we land on the target page
      callbackRef.current?.()
      callbackRef.current = null
      targetPathRef.current = null
    }
  }, [pathname])

  return (path: string, callback: () => void) => {
    targetPathRef.current = path
    callbackRef.current = callback
    router.push(path)
  }
}
