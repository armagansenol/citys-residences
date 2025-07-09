"use client"

import { useEffect } from "react"
import { useSectionsMenuStore } from "@/lib/store/sections-menu"

interface Section {
  label: string
  id: string
}

interface SectionsMenuInitializerProps {
  sections: Section[]
}

export function SectionsMenuInitializer({ sections }: SectionsMenuInitializerProps) {
  const { setSections } = useSectionsMenuStore()

  useEffect(() => {
    setSections(sections)
  }, [sections, setSections])

  return null
}
