'use client'

import { useNavigation } from '@/hooks/useNavigation'
import { cn, toAllUppercase } from '@/lib/utils'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface MobileSliderProps {
  items: Array<{ label: string; href: string; id: string }>
  activeSection: string | null
  isStickySidebarVisible: boolean
  containerRef: MutableRefObject<HTMLDivElement | null>
  itemRefs: MutableRefObject<Map<string, HTMLElement>>
  onEmblaApiReady?: (api: EmblaCarouselType | undefined) => void
}

export const useSelectedSnapDisplay = (
  emblaApi: EmblaCarouselType | undefined
) => {
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSnapCount(emblaApi.scrollSnapList().length)
    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateScrollSnapState(emblaApi)

    emblaApi.on('select', updateScrollSnapState)
    emblaApi.on('reInit', updateScrollSnapState)
  }, [emblaApi, updateScrollSnapState])

  return {
    selectedSnap,
    snapCount,
  }
}

export const MobileSlider: React.FC<MobileSliderProps> = ({
  items,
  activeSection,
  isStickySidebarVisible,
  containerRef,
  itemRefs,
  onEmblaApiReady,
}) => {
  const { handleNavClick } = useNavigation()

  const emblaOptions = useMemo<EmblaOptionsType>(
    () => ({
      align: 'center',
      containScroll: false,
      dragFree: true,
      loop: false,
      dragThreshold: 20,
      duration: 60, // Standard snap duration
    }),
    []
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions)

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', () => {
      console.log(
        'Current snap point:',
        emblaApi.selectedScrollSnap(),
        'of',
        emblaApi.scrollSnapList().length
      )
    })
  }, [emblaApi])

  // Expose emblaApi to parent
  useEffect(() => {
    if (onEmblaApiReady) {
      onEmblaApiReady(emblaApi)
    }
  }, [emblaApi, onEmblaApiReady])

  // Scroll to active section when it changes
  // Embla's align: 'center' option automatically centers slides
  useEffect(() => {
    if (!emblaApi || !activeSection) return

    const activeIndex = items.findIndex(item => item.id === activeSection)
    if (activeIndex !== -1) {
      if (emblaApi.selectedScrollSnap() !== activeIndex) {
        emblaApi.scrollTo(activeIndex)
      }
    }
  }, [activeSection, emblaApi, items])

  // Set container ref callback
  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
    },
    [containerRef]
  )

  return (
    // ... existing code ...
    <>
      {/* Gradient line */}
      <div
        className={cn(
          'fixed bottom-[2%] left-8 right-8 z-[var(--z-sticky-menu)] mix-blend-difference lg:hidden',
          'before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-[100%] before:bg-gradient-sidebar',
          !isStickySidebarVisible && 'pointer-events-none opacity-0'
        )}
      ></div>
      {/* Embla viewport */}
      <div
        className={cn(
          'fixed bottom-[2%] left-0 right-0 z-[var(--z-sticky-menu)] w-full overflow-hidden mix-blend-difference focus:outline-none lg:hidden',
          !isStickySidebarVisible && 'pointer-events-none opacity-0'
        )}
        ref={emblaRef}
      >
        {/* Embla container */}
        <div
          className='pinch-zoom -ml-4 flex touch-pan-y items-center'
          ref={setContainerRef}
        >
          {items.map(item => (
            <div
              key={item.id}
              ref={el => {
                if (el) {
                  itemRefs.current?.set(item.id, el)
                } else {
                  itemRefs.current?.delete(item.id)
                }
              }}
              className='relative flex min-w-0 flex-none items-center justify-center pl-4'
            >
              <button
                onClick={() => handleNavClick(item.id as string)}
                className={cn(
                  'relative',
                  'whitespace-nowrap font-primary font-[600] tracking-[0.2em] text-white',
                  'flex h-full w-full items-center justify-center',
                  'transition-all duration-300 ease-out',
                  'cursor-pointer px-6 py-3',
                  'before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[4px] before:w-full before:bg-white before:backdrop-blur-[54px] before:transition-opacity before:duration-500 before:ease-in-out before:content-[""]',
                  {
                    'text-[9px] opacity-100': activeSection === item.id,
                    'text-[8px] opacity-70': activeSection !== item.id,
                    'before:opacity-100': activeSection === item.id,
                    'before:opacity-0': activeSection !== item.id,
                  }
                )}
                type='button'
              >
                <span className='whitespace-nowrap'>
                  {toAllUppercase(item.label)}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
