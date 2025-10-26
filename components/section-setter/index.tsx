'use client'

import { useSectionStore } from '@/lib/store/sections'
import { ScrollTrigger, useGSAP } from '@/components/gsap'
import { useRef } from 'react'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function SectionSetter({ sectionId }: { sectionId: string }) {
  const ref = useRef(null)
  const sectionStore = useSectionStore()

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      onEnter: () => {
        sectionStore.setCurrentSection(sectionId)
      },
      onEnterBack: () => {
        sectionStore.setCurrentSection(sectionId)
      },
    })
  })

  return <div ref={ref}></div>
}
