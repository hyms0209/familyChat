import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { getFirebaseApp } from '@/src/utils/firebase/initializeFirebase'

// Firebase Auth 적응 — onAuthStateChanged 로 사용자 상태 추적.
// 실제 Custom Claims 갱신 / 가족 가입 검증 로직은 P-5.5 에서 추가.

interface AuthState {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthCheckProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isLoading: true,
        isAuthenticated: false,
    })

    useEffect(() => {
        const app = getFirebaseApp()
        if (!app) {
            // .env 미설정 — Firebase 초기화 skip 됐을 때.
            setState({ user: null, isLoading: false, isAuthenticated: false })
            return
        }

        const auth = getAuth(app)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setState({
                user,
                isLoading: false,
                isAuthenticated: !!user,
            })
        })

        return () => unsubscribe()
    }, [])

    const signOut = useCallback(async () => {
        const app = getFirebaseApp()
        if (!app) return
        await getAuth(app).signOut()
    }, [])

    const value = useMemo<AuthContextType>(
        () => ({ ...state, signOut }),
        [state, signOut]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthCheckProvider')
    return ctx
}

// 단계 C 의 useAuthContext 시그니처 호환용 (CheckList 기반 코드가 남아있을 경우 대비).
export function useAuthContext() {
    return useAuth()
}
