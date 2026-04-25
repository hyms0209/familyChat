// 단계 P-5.5 에서 Firebase Auth 사용자 상태와 동기화.
import { create } from 'zustand'

interface AuthStoreState {
    uid: string | null
    isMinor: boolean
    primaryFamilyId: string | null
    setUid: (uid: string | null) => void
    setIsMinor: (v: boolean) => void
    setPrimaryFamilyId: (id: string | null) => void
    clear: () => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
    uid: null,
    isMinor: false,
    primaryFamilyId: null,
    setUid: (uid) => set({ uid }),
    setIsMinor: (v) => set({ isMinor: v }),
    setPrimaryFamilyId: (id) => set({ primaryFamilyId: id }),
    clear: () => set({ uid: null, isMinor: false, primaryFamilyId: null }),
}))
