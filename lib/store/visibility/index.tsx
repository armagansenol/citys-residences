import { create } from "zustand"

interface VisibilityState {
  isAloTechVisible: boolean
  isStickyContactMenuVisible: boolean
  setAloTechVisibility: (isVisible: boolean) => void
  setStickyContactMenuVisibility: (isVisible: boolean) => void
}

export const useVisibilityStore = create<VisibilityState>((set) => ({
  isAloTechVisible: true,
  isStickyContactMenuVisible: true,
  setAloTechVisibility: (isVisible) => set({ isAloTechVisible: isVisible }),
  setStickyContactMenuVisibility: (isVisible) => set({ isStickyContactMenuVisible: isVisible }),
}))
