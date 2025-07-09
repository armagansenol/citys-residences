import { create } from "zustand"

interface Section {
  label: string
  id: string
}

interface State {
  sections: Section[]
  activeSection: string | null
  setSections: (sections: Section[]) => void
  setActiveSection: (sectionId: string | null) => void
  resetSections: () => void
}

export const useStore = create<State>((set) => ({
  sections: [],
  activeSection: null,
  setSections: (sections) => set({ sections }),
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
  resetSections: () => set({ sections: [], activeSection: null }),
}))

export const useSectionsMenuStore = useStore
