import {
    CommonActions,
    createNavigationContainerRef,
    StackActions,
} from '@react-navigation/native'
import {
    MENU,
    RootStackParamList,
    ScreenResultProp,
    TAB_SCREENS,
} from './NavigationTypes'

/** ✅ 네비게이션 전역 참조 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>()

/** ✅ 공통 네비게이션 유틸 */
const ensureReady = (): boolean => {
    if (!navigationRef.isReady()) {
        console.log('⚠️ Navigation is not ready.')
        return false
    }
    return true
}

/** ✅ 네비게이션이 준비될 때까지 대기 */
const waitForNavigation = (maxRetries = 10, delay = 100): Promise<boolean> => {
    return new Promise((resolve) => {
        let retries = 0
        const checkReady = () => {
            if (navigationRef.isReady()) {
                resolve(true)
            } else if (retries < maxRetries) {
                retries++
                setTimeout(checkReady, delay)
            } else {
                console.log('⚠️ Navigation ready timeout')
                resolve(false)
            }
        }
        checkReady()
    })
}

/** ✅ 메뉴로 이동 함수 (내부 함수로 정의) */
const moveToMenuImpl = async <K extends keyof RootStackParamList>(
    menu: K,
    params?: RootStackParamList[K],
    retryCount = 0
) => {
    console.log(`메뉴 이동 시도: ${menu}`)

    try {
        if (!navigationRef.isReady()) {
            const isReady = await waitForNavigation()
            if (!isReady && retryCount < 3) {
                console.log(
                    `⚠️ Navigation ready timeout, retrying... (${retryCount + 1}/3)`
                )
                setTimeout(() => {
                    moveToMenuImpl(menu, params, retryCount + 1)
                }, 500)
                return
            } else if (!isReady) {
                console.log('❌ Navigation ready failed after retries')
                return
            }
        }

        if (TAB_SCREENS.includes(menu as string)) {
            console.log(`❗ "${menu}" is registered in Tab Navigator`)
            return
        }
        ;(navigationRef.navigate as any)(menu, params)
        console.log(`✅ 메뉴 이동 완료: ${menu}`)
    } catch (error) {
        console.log(`❌ 메뉴 이동 중 오류 발생 (${menu})`, error)
    }
}

const Router = {
    /** ✅ 메뉴로 이동 (접근권한 검사 포함) */
    async moveToMenu<K extends keyof RootStackParamList>(
        menu: K,
        params?: RootStackParamList[K]
    ) {
        return moveToMenuImpl(menu, params)
    },

    async moveToTabMenu<K extends keyof RootStackParamList>(
        menu: K,
        params?: RootStackParamList[K]
    ) {
        console.log(`메뉴 이동 시도: ${menu}`)

        try {
            if (!ensureReady()) return
            ;(navigationRef.navigate as any)(menu, params)
            console.log(`✅ 메뉴 이동 완료: ${menu}`)
        } catch (error) {
            console.log(`❌ 메뉴 이동 중 오류 발생 (${menu})`, error)
        }
    },

    async replaceToMenu<K extends keyof RootStackParamList>(
        menu: K,
        params?: RootStackParamList[K]
    ) {
        try {
            if (!ensureReady()) return

            const state = navigationRef.getState()
            console.log('state : ', state)

            if (!state) {
                console.log('⚠️ replace 실패 — navigation state가 없습니다.')
                return
            }

            const currentRoute = state.routes[state.index]
            console.log(`🧭 현재 화면: ${currentRoute?.name}`)

            navigationRef.dispatch(StackActions.replace(menu as string, params))

            console.log(`✅ 메뉴 대체 완료: ${menu}`)
        } catch (error) {
            console.log(`❌ 메뉴 대체 중 오류 발생 (${menu})`, error)
        }
    },

    /** ✅ 이전 화면으로 이동 (params 전달 가능) */
    async pop(params?: ScreenResultProp) {
        if (!ensureReady()) return

        const state = navigationRef.getState()
        if (!state || !navigationRef.canGoBack()) {
            console.log('⚠️ 뒤로 이동 불가 (스택 없음)')
            return
        }

        const previousRoute = state.routes[state.index - 1]
        console.log('previouseRoute : ', previousRoute)

        if (previousRoute) {
            console.log(`📦 popTo: ${previousRoute.name}`, params)

            const safeParams = params ?? { data: undefined }

            const prettyParams = JSON.stringify(safeParams, null, 2)

            console.log(`📦 safe params: ${prettyParams}`)

            navigationRef.dispatch({
                ...CommonActions.setParams(safeParams as any),
                source: previousRoute.key,
            })

            navigationRef.dispatch(StackActions.pop(1))
        }
    },

    async popToMenu<K extends keyof RootStackParamList>(
        menu: K,
        params?: ScreenResultProp
    ) {
        if (!ensureReady()) return

        const state = navigationRef.getState()
        if (!state || state.routes.length === 0) {
            console.log('⚠️ 스택이 비어 있습니다.')
            return
        }

        console.log(
            '📚 현재 스택:',
            state.routes.map((r) => r.name)
        )

        const targetIndex = state.routes.findIndex((r) => r.name === menu)

        if (targetIndex === -1) {
            console.log(`❌ '${menu}' 화면을 스택에서 찾을 수 없습니다.`)
            return
        }

        const popCount = state.index - targetIndex

        if (popCount <= 0) {
            console.log(`⚠️ 이미 '${menu}' 화면에 있습니다.`)
        } else {
            console.log(`🔙 '${menu}' 화면까지 ${popCount}단계 pop 실행`)
            navigationRef.dispatch(StackActions.pop(popCount))
        }

        const safeParams = params ?? { data: undefined }
        const prettyParams = JSON.stringify(safeParams, null, 2)

        console.log(`📦 '${menu}' 화면에 전달할 params: ${prettyParams}`)

        navigationRef.dispatch({
            ...CommonActions.setParams(safeParams as any),
            source: state.routes[targetIndex]?.key,
        })

        console.log('✅ 상위 메뉴로 팝 적용')
        setTimeout(() => {
            const updatedState = navigationRef.getState()
            console.log(
                '📚 pop 이후 실제 네비게이션 스택:',
                updatedState?.routes.map((r) => r.name)
            )
        }, 200)
    },

    /** ✅ MainTabNavigator로 초기화 */
    async moveToMain() {
        if (!ensureReady()) return
        if (!navigationRef.isReady()) return
        console.log('moveToMain ------------------------------')
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: MENU.MAIN.INDEX }],
            })
        )
    },

    async restart() {
        if (navigationRef.current) {
            navigationRef.current.reset({
                index: 0,
                routes: [{ name: MENU.INTRO.INDEX }],
            })
        }
    },

    isExistMain(): boolean {
        const state = navigationRef.getState()
        return state?.routes.some((r) => r.name === MENU.MAIN.INDEX) ?? false
    },
}

export default Router
