'use client'

import { useEffect } from 'react'

export function VideoObserverInitializer() {
  useEffect(() => {
    // Avoid running twice
    if (window.__videoObserver) return

    window.__videoObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement
          const delay = Number(video.dataset.scrollDelay || 0)

          if (entry.isIntersecting) {
            video.dataset.enterTime = String(performance.now())

            const tryPlay = () => {
              const enter = Number(video.dataset.enterTime || 0)
              const elapsed = performance.now() - enter

              if (elapsed >= delay) {
                video.play().catch(() => {})
              } else {
                requestAnimationFrame(tryPlay)
              }
            }

            requestAnimationFrame(tryPlay)
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.1 }
    )

    console.log('🎉 video observer initialized')
  }, [])

  return null
}
