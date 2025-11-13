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
  children?: React.ReactNode
}

export function SectionSetter({
  children,
  sectionId,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
}: SectionSetterProps) {
  const ref = useRef(null)
  const sectionStore = useSectionStore()

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top+=200px center',
      end: 'bottom center',
      onEnter: () => {
        sectionStore.setCurrentSection(sectionId)
        onEnter?.(sectionId)
      },
      onEnterBack: () => {
        sectionStore.setCurrentSection(sectionId)
        onEnterBack?.(sectionId)
      },
      onLeave: () => {
        onLeave?.(sectionId)
      },
      onLeaveBack: () => {
        onLeaveBack?.(sectionId)
      },
    })
  })

  return <div ref={ref}>{children}</div>
}
