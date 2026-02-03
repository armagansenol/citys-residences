'use client'

import { scrollDelay } from '@/lib/constants'
import { useUiStore } from '@/lib/store/ui'
import { useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

export function useNavigation() {
  const { setIsMenuOpen, setIsNavTransitionVisible } = useUiStore()
  const lenis = useLenis()
  const timeoutsRef = useRef<number[]>([])

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(timeoutId => window.clearTimeout(timeoutId))
    timeoutsRef.current = []
  }

  const handleNavClick = (itemId: string) => {
    clearTimeouts()
    // Close menu if it's open
    setIsMenuOpen(false)
    setIsNavTransitionVisible(true)

    const fadeDurationMs = 400
    const delayMs = scrollDelay * 1000

    const scrollTimeout = window.setTimeout(() => {
      const targetElement = document.getElementById(itemId)
      if (targetElement && lenis) {
        lenis.scrollTo(targetElement, { immediate: true })
      }

      const hideTimeout = window.setTimeout(() => {
        setIsNavTransitionVisible(false)
      }, delayMs)
      timeoutsRef.current.push(hideTimeout)
    }, fadeDurationMs)

    timeoutsRef.current.push(scrollTimeout)
  }

  useEffect(() => clearTimeouts, [])

  return { handleNavClick }
}
