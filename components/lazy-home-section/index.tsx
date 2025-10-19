"use client"

import { SuspenseLazySection } from "@/components/suspense-lazy-section"

interface LazyHomeSectionProps {
  params: { locale: string }
}

export function LazyHomeSection({}: LazyHomeSectionProps) {
  return (
    <SuspenseLazySection minHeight={1000} rootMargin='1000px' component={() => import("@/components/test-section")} />
  )
}
