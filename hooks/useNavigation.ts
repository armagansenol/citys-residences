'use client'

import { useLenis } from 'lenis/react'

export function useNavigation() {
  const lenis = useLenis()

  const handleNavClick = (e: React.MouseEvent, itemId: string) => {
    if (itemId === 'home') {
      e.preventDefault()
      // Scroll to home section without adding hash
      const homeElement = document.getElementById('home')
      if (homeElement && lenis) {
        lenis.scrollTo('#home', {
          duration: 1.2,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            // Remove hash from URL
            window.history.replaceState(null, '', window.location.pathname)
          },
        })
      }
      return true // Indicates the click was handled
    }
    return false // Indicates the click was not handled by us
  }

  return { handleNavClick }
}
