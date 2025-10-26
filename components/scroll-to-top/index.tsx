'use client'

import { cn } from '@/lib/utils'
import { useLenis } from 'lenis/react'

import { gsap } from '@/components/gsap'
import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr'

interface ScrollToTopProps {
  className?: string
}

export function ScrollToTop({ className }: ScrollToTopProps) {
  const lenis = useLenis()

  const handleScrollToTop = () => {
    gsap.to('body', {
      opacity: 0,
      onComplete: () => {
        lenis?.scrollTo(0, { immediate: true })
        gsap.to('body', {
          opacity: 1,
          delay: 0.2,
        })
      },
    })
  }

  return (
    <button
      onClick={handleScrollToTop}
      className={cn(
        'flex flex-col items-center gap-2',
        'cursor-pointer font-primary font-light text-white opacity-100 transition-opacity hover:opacity-80',
        className
      )}
      type='button'
    >
      <ArrowCounterClockwiseIcon
        size={64}
        weight='thin'
        className='text-white'
      />
      <span className='text-4xl'>Yeniden Keşfet</span>
    </button>
  )
}
