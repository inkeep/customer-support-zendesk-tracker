import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  name: string
  email: string
  setUser: (name: string, email: string) => void
  clear: () => void
  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      hasHydrated: false,
      setUser: (name: string, email: string) => {
        set({ name, email })
      },
      clear: () => {
        set({ name: '', email: '' })
      },
      setHasHydrated: (hasHydrated: boolean) => {
        set({ hasHydrated })
      },
    }),
    {
      name: 'user-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
