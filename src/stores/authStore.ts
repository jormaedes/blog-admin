import { create } from 'zustand'
import type { UserState, User } from '@/types/auth'

const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (userData: User) => set({
    user: userData,
    isAuthenticated: true,
  }),

  logout: () => set({
    user: null,
    isAuthenticated: false
  }),
}));

export default useUserStore
