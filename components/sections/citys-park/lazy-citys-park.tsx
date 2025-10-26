'use client'

import { Suspense, lazy, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { CitysParkData } from '@/lib/api/queries'
import { colors } from '@/styles/config.mjs'

const LazyCitysParkContent = lazy(() =>
  import('./lazy-citys-park-content').then(module => ({
    default: module.LazyCitysParkContent,
  }))
)

interface LazyCitysParkProps {
  data: CitysParkData[]
}

export function LazyCitysPark({ data }: LazyCitysParkProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const ref = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '500px',
  })

  if (ref.isIntersecting && !hasLoaded) {
    setIsVisible(true)
    setHasLoaded(true)
  }

  return (
    <div
      ref={ref.ref}
      style={
        {
          '--bg-color': colors['army-canvas'],
          '--text-color': colors['white'],
        } as React.CSSProperties
      }
    >
      {isVisible ? (
        <Suspense
          fallback={
            <div className='flex h-screen items-center justify-center py-20'>
              <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900'></div>
            </div>
          }
        >
          <LazyCitysParkContent data={data} />
        </Suspense>
      ) : (
        <div className='animate-pulse bg-gray-50 py-20'>
          <div className='container mx-auto px-4'>
            <div className='space-y-8'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='h-64 rounded-lg bg-gray-200'></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
