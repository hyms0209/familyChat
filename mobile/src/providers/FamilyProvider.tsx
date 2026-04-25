import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

// 단계 P-5.5 에서 Firestore 연결로 교체. 일단 mock 데이터.
// 03_기술설계서.md §4.2 families/members 스키마 참조.

export type MemberRole = 'owner' | 'parent' | 'child' | 'guardian'

export interface FamilyMember {
    userId: string
    role: MemberRole
    nickname?: string
    color: string
    active: boolean
}

interface FamilyContextType {
    primaryFamilyId: string | null
    members: FamilyMember[]
    role: MemberRole | null
    isLoading: boolean
    refresh: () => void
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined)

const MOCK_FAMILY_ID = 'mock-family'
const MOCK_MEMBERS: FamilyMember[] = [
    {
        userId: 'mock-owner',
        role: 'owner',
        nickname: '엄마',
        color: '#FF7E6B',
        active: true,
    },
    {
        userId: 'mock-parent',
        role: 'parent',
        nickname: '아빠',
        color: '#7EB6E8',
        active: true,
    },
    {
        userId: 'mock-child',
        role: 'child',
        nickname: '아이',
        color: '#4CAF7A',
        active: true,
    },
]

export function FamilyProvider({ children }: { children: React.ReactNode }) {
    const [primaryFamilyId, setPrimaryFamilyId] = useState<string | null>(null)
    const [members, setMembers] = useState<FamilyMember[]>([])
    const [role, setRole] = useState<MemberRole | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const load = useCallback(async () => {
        setIsLoading(true)
        // 단계 P-5.5 에서 Firestore subscribeToFamily 로 교체.
        await new Promise((r) => setTimeout(r, 0))
        setPrimaryFamilyId(MOCK_FAMILY_ID)
        setMembers(MOCK_MEMBERS)
        setRole('owner')
        setIsLoading(false)
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const value = useMemo<FamilyContextType>(
        () => ({
            primaryFamilyId,
            members,
            role,
            isLoading,
            refresh: load,
        }),
        [primaryFamilyId, members, role, isLoading, load]
    )

    return (
        <FamilyContext.Provider value={value}>
            {children}
        </FamilyContext.Provider>
    )
}

export function useFamily() {
    const ctx = useContext(FamilyContext)
    if (!ctx) throw new Error('useFamily must be used within FamilyProvider')
    return ctx
}
