// 단계 D 에서 본격적인 dev tools store 로 교체.
// poc-bank 의 Network 로깅 토글 형태만 유지.
import { create } from 'zustand'

type DevToolsState = {
    showNetworkInfo: boolean
    showNetworkError: boolean
    setShowNetworkInfo: (v: boolean) => void
    setShowNetworkError: (v: boolean) => void
}

export const useDevToolsStore = create<DevToolsState>((set) => ({
    showNetworkInfo: __DEV__,
    showNetworkError: __DEV__,
    setShowNetworkInfo: (v) => set({ showNetworkInfo: v }),
    setShowNetworkError: (v) => set({ showNetworkError: v }),
}))
