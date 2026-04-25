// 단계 P-5.5 에서 expo-location + expo-task-manager 와 연결.
import { create } from 'zustand'

export interface LocationPoint {
    lat: number
    lng: number
    accuracy?: number
    capturedAt: number
}

interface LocationStoreState {
    sharingEnabled: boolean
    pausedUntil: number | null
    lastPoint: LocationPoint | null
    setSharingEnabled: (v: boolean) => void
    setPausedUntil: (ts: number | null) => void
    setLastPoint: (p: LocationPoint | null) => void
}

export const useLocationStore = create<LocationStoreState>((set) => ({
    sharingEnabled: true,
    pausedUntil: null,
    lastPoint: null,
    setSharingEnabled: (v) => set({ sharingEnabled: v }),
    setPausedUntil: (ts) => set({ pausedUntil: ts }),
    setLastPoint: (p) => set({ lastPoint: p }),
}))
