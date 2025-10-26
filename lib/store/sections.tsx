import { create } from 'zustand'
import { navigationConfig } from '@/lib/constants'

interface State {
  currentSection: string
  previousSection: string | null
  setCurrentSection: (section: string) => void
}

export const useStore = create<State>(set => ({
  currentSection: navigationConfig['/']?.id || '',
  previousSection: null,
  setCurrentSection: section =>
    set(state => ({
      previousSection:
        state.currentSection === section
          ? state.previousSection
          : state.currentSection,
      currentSection: section,
    })),
}))

export const useSectionStore = useStore
