import Lenis from "lenis"
import { create } from "zustand"
import { ScrollTrigger, gsap } from "@/components/gsap"

interface ScrollState {
  // Lenis instance
  lenis: Lenis | null

  // Stacking cards state
  stackingCards: {
    scrollTrigger: ScrollTrigger | null
    currentCard: number
    itemsLength: number
  }

  // Menu state
  menu: {
    isOpen: boolean
    activeItem: number | null
  }

  // Hash navigation state
  hashNavigation: {
    currentHash: string | null
    syncEnabled: boolean
  }

  // Actions for Lenis
  setLenis: (lenis: Lenis | null) => void

  // Actions for stacking cards
  setStackingCardsScrollTrigger: (trigger: ScrollTrigger | null) => void
  setCurrentCard: (cardIndex: number) => void
  setStackingCardsItemsLength: (length: number) => void
  updateCurrentCardFromProgress: (progress: number) => void

  // Actions for menu
  setMenuOpen: (isOpen: boolean) => void
  setMenuActiveItem: (activeItem: number | null) => void

  // Hash navigation actions
  setCurrentHash: (hash: string | null) => void
  enableHashSync: () => void
  disableHashSync: () => void
  navigateToHash: (hash: string, options?: { immediate?: boolean; closeMenu?: boolean }) => void
  restoreFromHash: () => void

  // Unified scroll actions
  scrollToCard: (cardIndex: number, immediate?: boolean) => void
  scrollToElement: (id: string, options?: { immediate?: boolean; closeMenu?: boolean; updateHash?: boolean }) => void
  smoothScrollWithWrapper: (
    targetAction: () => void,
    options?: {
      wrapperSelector?: string
      fadeOutDuration?: number
      fadeInDelay?: number
      closeMenu?: boolean
    }
  ) => void
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  // Initial state
  lenis: null,
  stackingCards: {
    scrollTrigger: null,
    currentCard: 0,
    itemsLength: 0,
  },
  menu: {
    isOpen: false,
    activeItem: null,
  },
  hashNavigation: {
    currentHash: null,
    syncEnabled: true,
  },

  // Lenis actions
  setLenis: (lenis) => set({ lenis }),

  // Stacking cards actions
  setStackingCardsScrollTrigger: (trigger) =>
    set((state) => ({
      stackingCards: { ...state.stackingCards, scrollTrigger: trigger },
    })),

  setCurrentCard: (cardIndex) =>
    set((state) => ({
      stackingCards: { ...state.stackingCards, currentCard: cardIndex },
    })),

  setStackingCardsItemsLength: (length) =>
    set((state) => ({
      stackingCards: { ...state.stackingCards, itemsLength: length },
    })),

  updateCurrentCardFromProgress: (progress) => {
    const { stackingCards } = get()
    const { itemsLength } = stackingCards

    // Calculate which card should be active based on halfway point
    const cardProgress = progress * (itemsLength - 1)
    const cardIndex = Math.floor(cardProgress + 0.5)

    set((state) => ({
      stackingCards: {
        ...state.stackingCards,
        currentCard: Math.min(Math.max(cardIndex, 0), itemsLength - 1),
      },
    }))
  },

  // Menu actions
  setMenuOpen: (isOpen) =>
    set((state) => ({
      menu: { ...state.menu, isOpen },
    })),

  setMenuActiveItem: (activeItem) =>
    set((state) => ({
      menu: { ...state.menu, activeItem },
    })),

  // Hash navigation actions
  setCurrentHash: (hash) =>
    set((state) => ({
      hashNavigation: { ...state.hashNavigation, currentHash: hash },
    })),

  enableHashSync: () =>
    set((state) => ({
      hashNavigation: { ...state.hashNavigation, syncEnabled: true },
    })),

  disableHashSync: () =>
    set((state) => ({
      hashNavigation: { ...state.hashNavigation, syncEnabled: false },
    })),

  navigateToHash: (hash, options = {}) => {
    const { immediate = false, closeMenu = true } = options
    const { hashNavigation } = get()

    if (closeMenu) {
      set((state) => ({
        menu: { ...state.menu, isOpen: false, activeItem: null },
      }))
    }

    // Update URL hash if sync is enabled
    if (hashNavigation.syncEnabled && typeof window !== "undefined") {
      window.location.hash = hash
    }

    // Update store state
    set((state) => ({
      hashNavigation: { ...state.hashNavigation, currentHash: hash },
    }))

    // Scroll to element
    get().scrollToElement(hash, { immediate, closeMenu: false, updateHash: false })
  },

  restoreFromHash: () => {
    if (typeof window === "undefined") return

    const hash = window.location.hash.slice(1) // Remove # prefix
    if (hash) {
      set((state) => ({
        hashNavigation: { ...state.hashNavigation, currentHash: hash },
      }))

      // Scroll to the element after a brief delay to ensure DOM is ready
      setTimeout(() => {
        if (hash.includes("stacking-cards")) {
          const cardIndex = parseInt(hash.split("-")[2])
          if (!isNaN(cardIndex)) {
            // Use card-based scrolling for stacking cards
            get().scrollToCard(cardIndex, false)
          }
        } else {
          // Use element-based scrolling for regular sections
          get().scrollToElement(hash, { immediate: false, updateHash: false })
        }
      }, 100)
    }
  },

  // Unified scroll actions
  scrollToCard: (cardIndex, immediate = false) => {
    const { lenis, stackingCards } = get()
    const { scrollTrigger, itemsLength } = stackingCards

    if (itemsLength === 0) return

    // If ScrollTrigger is available (desktop), use the existing method
    if (scrollTrigger) {
      const progress = cardIndex / (itemsLength - 1)
      const start = scrollTrigger.start
      const end = scrollTrigger.end
      const targetScrollTop = start + progress * (end - start)

      lenis?.scrollTo(targetScrollTop, { immediate })
    } else {
      // Mobile fallback: scroll directly to the card element
      const cards = document.querySelectorAll(".gsap-stacking-card")
      const targetCard = cards[cardIndex] as HTMLElement

      if (targetCard && lenis) {
        lenis.scrollTo(targetCard, { immediate })
      }
    }
  },

  scrollToElement: (id, options = {}) => {
    const { immediate = false, closeMenu = true, updateHash = true } = options
    const { lenis, hashNavigation } = get()

    if (closeMenu) {
      set((state) => ({
        menu: { ...state.menu, isOpen: false, activeItem: null },
      }))
    }

    // Update URL hash if enabled and requested
    if (updateHash && hashNavigation.syncEnabled && typeof window !== "undefined") {
      window.location.hash = id
    }

    // Update store state if hash tracking is enabled
    if (updateHash) {
      set((state) => ({
        hashNavigation: { ...state.hashNavigation, currentHash: id },
      }))
    }

    lenis?.scrollTo(`#${id}`, { immediate })
  },

  smoothScrollWithWrapper: (targetAction, options = {}) => {
    const { wrapperSelector = ".wrapper", fadeOutDuration = 0.6, fadeInDelay = 0.4, closeMenu = true } = options

    // Close menu if requested
    if (closeMenu) {
      set((state) => ({
        menu: { ...state.menu, isOpen: false, activeItem: null },
      }))
    }

    // Fade out wrapper, perform action, then fade back in
    gsap.to(wrapperSelector, {
      opacity: 0,
      duration: fadeOutDuration,
      onComplete: () => {
        targetAction()

        // Always fade back in
        gsap.to(wrapperSelector, {
          opacity: 1,
          delay: fadeInDelay,
        })
      },
    })
  },
}))

// Legacy exports for backward compatibility
export const useStackingCardsStore = () => {
  const store = useScrollStore()

  return {
    scrollTrigger: store.stackingCards.scrollTrigger,
    currentCard: store.stackingCards.currentCard,
    itemsLength: store.stackingCards.itemsLength,
    lenis: store.lenis,
    setScrollTrigger: store.setStackingCardsScrollTrigger,
    setCurrentCard: store.setCurrentCard,
    setItemsLength: store.setStackingCardsItemsLength,
    setLenis: store.setLenis,
    scrollToCard: store.scrollToCard,
    updateCurrentCardFromProgress: store.updateCurrentCardFromProgress,
  }
}

// Hash navigation exports for easy access
export const useHashNavigationStore = () => {
  const store = useScrollStore()

  return {
    currentHash: store.hashNavigation.currentHash,
    syncEnabled: store.hashNavigation.syncEnabled,
    setCurrentHash: store.setCurrentHash,
    enableHashSync: store.enableHashSync,
    disableHashSync: store.disableHashSync,
    navigateToHash: store.navigateToHash,
    restoreFromHash: store.restoreFromHash,
  }
}
