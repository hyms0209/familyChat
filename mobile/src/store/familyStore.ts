// 단계 P-5.5 에서 FamilyProvider 와 동기화 (Provider 가 source of truth, store 는 캐시 미러).
import { create } from 'zustand'
import type { FamilyMember } from '@/src/providers/FamilyProvider'

interface FamilyStoreState {
    activeFamilyId: string | null
    members: FamilyMember[]
    setActiveFamily: (id: string | null) => void
    setMembers: (members: FamilyMember[]) => void
}

export const useFamilyStore = create<FamilyStoreState>((set) => ({
    activeFamilyId: null,
    members: [],
    setActiveFamily: (id) => set({ activeFamilyId: id }),
    setMembers: (members) => set({ members }),
}))
