'use client'

import React, { ReactNode, useRef, useEffect, useState } from 'react'
import styles from './aspect-cover.module.css'

interface AspectCoverProps {
  ratio: number // e.g. 16/9, 4/3, 1/1
  children: ReactNode
}

/**
 * AspectCover
 * - Maintains a fixed aspect ratio (width / height)
 * - Children behave like object-fit: cover (centered, cropped if needed)
 * - Fits dynamically within its parent container
 */
export const AspectCover: React.FC<AspectCoverProps> = ({
  ratio,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Set initial dimensions immediately
    const rect = el.getBoundingClientRect()
    setDimensions({ width: rect.width, height: rect.height })

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })

    resizeObserver.observe(el)
    return () => resizeObserver.disconnect()
  }, [])

  const containerRatio = dimensions.width / dimensions.height
  const objectRatio = ratio

  // Cover logic from reference implementation:
  // If object is wider than container -> fit height (fill height, crop sides)
  // If object is narrower -> fit width (fill width, crop top/bottom)
  const useFitHeight = objectRatio > containerRatio

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        className={`${styles.content} ${useFitHeight ? styles.fitHeight : styles.fitWidth}`}
        style={{ '--ratio': String(ratio) } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}
