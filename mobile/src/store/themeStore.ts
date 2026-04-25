// 라이트/다크 모드 + 폰트 스케일. 시스템 따름이 기본.
import { create } from 'zustand'

export type ThemeMode = 'system' | 'light' | 'dark'

interface ThemeStoreState {
    mode: ThemeMode
    fontScale: number
    setMode: (m: ThemeMode) => void
    setFontScale: (s: number) => void
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
    mode: 'system',
    fontScale: 1,
    setMode: (m) => set({ mode: m }),
    setFontScale: (s) => set({ fontScale: s }),
}))
