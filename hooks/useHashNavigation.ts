"use client"

import { useEffect } from "react"
import { useScrollStore } from "@/lib/store/scroll"

/**
 * Custom hook for hash-based section navigation
 * Automatically handles:
 * - Browser back/forward navigation
 * - Hash change events
 * - Initial page load restoration
 * - URL synchronization
 */
export function useHashNavigation() {
  const {
    hashNavigation: { currentHash, syncEnabled },
    setCurrentHash,
    navigateToHash,
    restoreFromHash,
    enableHashSync,
    disableHashSync,
  } = useScrollStore()

  useEffect(() => {
    if (typeof window === "undefined" || !syncEnabled) return

    // Handle browser back/forward and direct hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove # prefix
      if (hash !== currentHash) {
        setCurrentHash(hash)
        if (hash) {
          // Check if it's a stacking card
          if (hash.includes("stacking-cards")) {
            const cardIndex = parseInt(hash.split("-")[2])
            if (!isNaN(cardIndex)) {
              // Use card-based scrolling for stacking cards
              useScrollStore.getState().scrollToCard(cardIndex, false)
            }
          } else {
            // Use element-based scrolling for regular sections
            useScrollStore.getState().scrollToElement(hash, {
              immediate: false,
              updateHash: false,
            })
          }
        }
      }
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)

    // Restore from hash on initial load
    restoreFromHash()

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [syncEnabled, currentHash, setCurrentHash, restoreFromHash])

  return {
    // Current state
    currentHash,
    syncEnabled,

    // Navigation actions
    navigateToSection: navigateToHash,

    // Control actions
    enableSync: enableHashSync,
    disableSync: disableHashSync,

    // Utility functions
    getCurrentHash: () => (typeof window !== "undefined" ? window.location.hash.slice(1) : null),
    clearHash: () => {
      if (typeof window !== "undefined" && syncEnabled) {
        window.location.hash = ""
        setCurrentHash(null)
      }
    },
  }
}

/**
 * Hook specifically for stacking cards navigation
 * Maps card indices to hash format
 */
export function useStackingCardsHashNavigation() {
  const {
    stackingCards: { currentCard, itemsLength },
    scrollToCard,
  } = useScrollStore()

  const navigateToCard = (cardIndex: number, updateHash = true) => {
    if (cardIndex < 0 || cardIndex >= itemsLength) return

    const sectionId = `stacking-cards-${cardIndex}`

    if (updateHash) {
      // Update hash manually and then scroll using card-based logic
      const { hashNavigation } = useScrollStore.getState()
      if (hashNavigation.syncEnabled && typeof window !== "undefined") {
        window.location.hash = sectionId
      }
      useScrollStore.getState().setCurrentHash(sectionId)

      // Use card-based scrolling instead of element-based
      scrollToCard(cardIndex, false)
    } else {
      scrollToCard(cardIndex, false)
    }
  }

  const getCardFromHash = (hash: string): number | null => {
    const match = hash.match(/^stacking-cards-(\d+)$/)
    if (match) {
      const cardIndex = parseInt(match[1], 10)
      return cardIndex >= 0 && cardIndex < itemsLength ? cardIndex : null
    }
    return null
  }

  return {
    currentCard,
    itemsLength,
    navigateToCard,
    getCardFromHash,
  }
}
