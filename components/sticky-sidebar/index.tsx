'use client'

import { useActiveSection } from '@/hooks/useActiveSection'
import { Locale } from '@/i18n/routing'
import { getNavigationItems } from '@/lib/constants'
import { useUiStore } from '@/lib/store/ui'
import { EmblaCarouselType } from 'embla-carousel'
import { useLocale, useTranslations } from 'next-intl'
import React, { useCallback, useMemo, useRef } from 'react'
import { DesktopSlider } from './desktop-slider'
import { MobileSlider } from './mobile-slider'

export const StickySidebar: React.FC = () => {
  const activeSection = useActiveSection()
  const t = useTranslations('common')
  const locale = useLocale()
  const { isStickySidebarVisible } = useUiStore()
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())
  const containerRef = useRef<HTMLDivElement | null>(null)

  const emblaApiRef = useRef<EmblaCarouselType | undefined>(undefined)

  const items = useMemo(
    () =>
      getNavigationItems(t, locale as Locale)
        .filter(item => item.isOnSidebar)
        .map(item => ({
          label: item.title,
          href: item.href,
          id: item.id,
        })),
    [t, locale]
  )

  const handleEmblaApiReady = useCallback(
    (api: EmblaCarouselType | undefined) => {
      emblaApiRef.current = api
    },
    []
  )

  return (
    <>
      <DesktopSlider
        items={items}
        activeSection={activeSection}
        isStickySidebarVisible={isStickySidebarVisible}
      />

      {/* mobile */}
      <MobileSlider
        items={items}
        activeSection={activeSection}
        isStickySidebarVisible={isStickySidebarVisible}
        containerRef={containerRef}
        itemRefs={itemRefs}
        onEmblaApiReady={handleEmblaApiReady}
      />
    </>
  )
}
