'use client'

import { useSectionStore } from '@/lib/store/sections'
import { ScrollTrigger, useGSAP } from '@/components/gsap'
import { useRef } from 'react'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface SectionSetterProps {
  sectionId: string
  onEnter?: (sectionId: string) => void
  onLeave?: (sectionId: string) => void
  onEnterBack?: (sectionId: string) => void
  onLeaveBack?: (sectionId: string) => void
}

export function SectionSetter({
  sectionId,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
}: SectionSetterProps) {
  const ref = useRef(null)
  const sectionStore = useSectionStore()
  const prevSectionRef = useRef<string | null>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 50%', // Trigger when section reaches 50% of viewport
      end: 'bottom 50%', // End when section leaves 50% of viewport
      onEnter: () => {
        const prevSection = sectionStore.currentSection
        sectionStore.setCurrentSection(sectionId)
        onEnter?.(sectionId)
        prevSectionRef.current = prevSection
      },
      onEnterBack: () => {
        const prevSection = sectionStore.currentSection
        sectionStore.setCurrentSection(sectionId)
        onEnterBack?.(sectionId)
        prevSectionRef.current = prevSection
      },
      onLeave: () => {
        onLeave?.(sectionId)
      },
      onLeaveBack: () => {
        onLeaveBack?.(sectionId)
      },
    })
  })

  return (
    <div
      ref={ref}
      className='pointer-events-none absolute left-0 top-0 h-full w-full'
    />
  )
}
