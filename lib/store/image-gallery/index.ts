import { ReactNode } from "react"
import { create } from "zustand"

interface State {
  slides: ReactNode[]
  currentSlide: number
  isOpen: boolean
  setSlides: (slides: ReactNode[]) => void
  setCurrentSlide: (index: number) => void
  openModal: (slides: ReactNode[], initialSlide?: number) => void
  closeModal: () => void
}

export const useImageGalleryStore = create<State>((set) => ({
  slides: [],
  currentSlide: 0,
  isOpen: false,
  setSlides: (slides) => set({ slides }),
  setCurrentSlide: (index) => set({ currentSlide: index }),
  openModal: (slides, initialSlide = 0) => {
    set({ slides, currentSlide: initialSlide, isOpen: true })
  },
  closeModal: () => {
    set({ isOpen: false, slides: [], currentSlide: 0 })
  },
}))
