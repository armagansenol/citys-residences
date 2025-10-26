'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { CitysMembersClubData } from '@/lib/api/queries'
import { useLenis } from 'lenis/react'
import { colors } from '@/styles/config.mjs'

const LazyCitysMembersClubContent = lazy(() =>
  import('./lazy-citys-members-club-content').then(module => ({
    default: module.LazyCitysMembersClubContent,
  }))
)

interface LazyCitysMembersClubProps {
  data: CitysMembersClubData[]
}

export function LazyCitysMembersClub({ data }: LazyCitysMembersClubProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const lenis = useLenis()

  const ref = useIntersectionObserver({
    threshold: 0,
    rootMargin: '500px',
  })

  if (ref.isIntersecting && !hasLoaded) {
    setIsVisible(true)
    setHasLoaded(true)
  }

  useEffect(() => {
    if (isVisible) {
      return lenis?.stop()
    }
  }, [lenis, isVisible])

  useEffect(() => {
    if (hasLoaded) {
      return lenis?.start()
    }
  }, [lenis, hasLoaded])

  useEffect(() => {
    console.log('citys members club isVisible', isVisible)
    console.log('citys members club hasLoaded', hasLoaded)
  }, [isVisible, hasLoaded])

  return (
    <div
      className='min-h-screen'
      ref={ref.ref}
      style={
        {
          '--bg-color': colors['verve-violet'],
          '--text-color': colors['white'],
        } as React.CSSProperties
      }
    >
      {isVisible ? (
        <Suspense
          fallback={
            <div className='flex h-screen items-center justify-center'>
              <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900'></div>
            </div>
          }
        >
          <LazyCitysMembersClubContent data={data} />
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
