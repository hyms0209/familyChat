// 단계 D 에서 Firebase Auth 토큰 영속 저장 (expo-secure-store) 으로 교체.
// poc-bank 의 인터페이스 형태만 유지 — getAuthToken / getRefreshToken / setAuthToken / setRefreshToken / clear.
import { create } from 'zustand'

type GlobalState = {
    authToken: string
    refreshToken: string
    getAuthToken: () => Promise<string>
    getRefreshToken: () => Promise<string>
    setAuthToken: (token: string) => Promise<void>
    setRefreshToken: (token: string) => Promise<void>
    clear: () => Promise<void>
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
    authToken: '',
    refreshToken: '',
    getAuthToken: async () => get().authToken,
    getRefreshToken: async () => get().refreshToken,
    setAuthToken: async (token: string) => {
        set({ authToken: token })
    },
    setRefreshToken: async (token: string) => {
        set({ refreshToken: token })
    },
    clear: async () => {
        set({ authToken: '', refreshToken: '' })
    },
}))
