'use client'

import { useUiStore } from '@/lib/store/ui'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { scrollDelay } from '@/lib/constants'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useNavigation() {
  const { setIsMenuOpen } = useUiStore()
  const lenis = useLenis()

  const handleNavClick = (itemId: string) => {
    const element = document.querySelector('.transition-wrapper')

    if (!element) {
      console.error('Transition wrapper element not found')
      return
    }

    gsap.to(element, {
      opacity: 1,
      duration: 0.4,
      onComplete: () => {
        // Close menu if it's open
        setIsMenuOpen(false)

        // Scroll to the target section with Lenis smooth scroll
        const targetElement = document.getElementById(itemId)
        if (targetElement && lenis) {
          lenis.scrollTo(targetElement, { immediate: true })
          ScrollTrigger.refresh()
          gsap.to(element, {
            opacity: 0,
            duration: 0.4,
            delay: scrollDelay,
          })
        }
      },
    })
  }

  return { handleNavClick }
}
