import Lenis from "lenis"
import { create } from "zustand"
import { ScrollTrigger } from "@/components/gsap"

interface StackingCardsState {
  scrollTrigger: ScrollTrigger | null
  currentCard: number
  itemsLength: number
  lenis: Lenis | null
  setScrollTrigger: (trigger: ScrollTrigger | null) => void
  setCurrentCard: (cardIndex: number) => void
  setItemsLength: (length: number) => void
  setLenis: (lenis: Lenis | null) => void
  scrollToCard: (cardIndex: number, immediate?: boolean) => void
  updateCurrentCardFromProgress: (progress: number) => void
}

export const useStackingCardsStore = create<StackingCardsState>((set, get) => ({
  scrollTrigger: null,
  currentCard: 0,
  itemsLength: 0,
  lenis: null,

  setScrollTrigger: (trigger) => set({ scrollTrigger: trigger }),

  setCurrentCard: (cardIndex) => set({ currentCard: cardIndex }),

  setItemsLength: (length) => set({ itemsLength: length }),

  setLenis: (lenis) => set({ lenis }),

  scrollToCard: (cardIndex, immediate = false) => {
    const { scrollTrigger, itemsLength, lenis } = get()
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

  updateCurrentCardFromProgress: (progress) => {
    const { itemsLength } = get()

    // Calculate which card should be active based on halfway point
    // Each card takes up 1/(itemsLength-1) of the total progress
    // We want to switch at 50% of each card's animation
    const cardProgress = progress * (itemsLength - 1)
    const cardIndex = Math.floor(cardProgress + 0.5) // Add 0.5 to switch at halfway

    set({ currentCard: Math.min(Math.max(cardIndex, 0), itemsLength - 1) })
  },
}))
