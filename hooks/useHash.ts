'use client'

import { useEffect, useState } from 'react'

export function useHash() {
  const [hash, setHash] = useState<string | null>(null)

  useEffect(() => {
    const updateHash = () => {
      if (window.location.hash) {
        const hashValue = decodeURIComponent(window.location.hash.slice(1))
        setHash(hashValue)
      } else {
        // No hash means we should use scroll-based detection
        setHash(null)
      }
    }

    updateHash() // initial load
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  return hash
}
