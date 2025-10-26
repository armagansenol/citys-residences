'use client'

import { useEffect, useRef } from 'react'
import { useSectionStore } from '@/lib/store/sections'
import { useHash } from './useHash'

interface UseActiveSectionCallbacks {
  onEnter?: (section: string) => void
  onLeave?: (section: string, nextSection: string) => void
  onLeaveBack?: (section: string, prevSection: string) => void
}

/**
 * Combines hash-based navigation (link clicks) with scroll-based section detection
 * Returns the active section ID, prioritizing hash over scroll detection
 *
 * @example
 * ```tsx
 * const activeSection = useActiveSection()
 *
 * // With callbacks
 * useActiveSection({
 *   onEnter: (section) => console.log('Entered:', section),
 *   onLeave: (prev, next) => console.log('Left', prev, 'for', next),
 * })
 * ```
 */
export function useActiveSection(): string
export function useActiveSection(callbacks?: UseActiveSectionCallbacks): string
export function useActiveSection(
  callbacks?: UseActiveSectionCallbacks
): string {
  const hash = useHash()
  const { currentSection, previousSection } = useSectionStore()
  const prevHashRef = useRef<string | null>(null)

  // If there's a hash (from link click), use that
  // Otherwise, use the section detected by scrolling
  const activeSection = hash || currentSection

  // Update previous hash reference for hash-based navigation
  useEffect(() => {
    if (hash) {
      prevHashRef.current = hash
    }
  }, [hash])

  // Handle callbacks on section changes
  useEffect(() => {
    if (!callbacks) return

    const prev = previousSection
    const curr = activeSection

    // Only trigger if section actually changed
    if (!prev || prev === curr) return

    const { onEnter, onLeave } = callbacks

    // Call onEnter for the new section
    onEnter?.(curr)

    // Call onLeave for the previous section
    onLeave?.(prev, curr)

    // Note: onLeaveBack would need scroll direction detection
    // For now, we rely on SectionSetter's onLeaveBack callback
  }, [activeSection, previousSection, callbacks])

  return activeSection
}

/**
 * Get both current and previous sections
 * @returns Object with current and previous section IDs
 */
export function useActiveSectionWithPrevious() {
  const hash = useHash()
  const { currentSection, previousSection } = useSectionStore()

  return {
    current: hash || currentSection,
    previous: previousSection,
  }
}
