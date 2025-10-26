import { create } from 'zustand'
import { navigationConfig } from '../constants'

interface State {
  currentSection: string
  setCurrentSection: (section: string) => void
}

export const useStore = create<State>(set => ({
  currentSection: navigationConfig['/']?.id || '',
  setCurrentSection: section => set({ currentSection: section }),
}))

export const useSectionStore = useStore
