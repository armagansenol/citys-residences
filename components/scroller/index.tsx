'use client'

import { useHash } from '@/hooks/useHash'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

export function Scroller() {
  const lenis = useLenis()
  const hash = useHash()

  useEffect(() => {
    // Handle hash navigation
    if (!hash || !lenis) return

    const hashWithSymbol = `#${hash}`

    // Use requestAnimationFrame to ensure the DOM is ready
    requestAnimationFrame(() => {
      const targetElement = document.getElementById(hash)

      if (targetElement && lenis) {
        lenis.scrollTo(hashWithSymbol, {
          duration: 1.2,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            // Update the URL without scrolling
            window.history.replaceState(
              null,
              '',
              window.location.pathname + hashWithSymbol
            )
          },
        })
      }
    })
  }, [hash, lenis])

  return null
}
