/**
 * 전역 로딩 상태 관리자
 * Axios interceptor에서 Provider 외부에서도 로딩 상태를 제어할 수 있도록 함
 */

type LoadingCallback = (loading: boolean) => void

let setLoadingCallback: LoadingCallback | null = null
let requestCount = 0
let isPullToRefreshing = false

export const loadingManager = {
    register(callback: LoadingCallback) {
        setLoadingCallback = callback
    },

    unregister() {
        setLoadingCallback = null
        requestCount = 0
        isPullToRefreshing = false
    },

    startPullToRefresh() {
        isPullToRefreshing = true
        this.clearAll()
    },

    endPullToRefresh() {
        isPullToRefreshing = false
    },

    startLoading() {
        if (isPullToRefreshing) return
        requestCount += 1
        if (requestCount === 1 && setLoadingCallback) {
            setLoadingCallback(true)
        }
    },

    endLoading() {
        if (isPullToRefreshing) return
        requestCount = Math.max(0, requestCount - 1)
        if (requestCount === 0 && setLoadingCallback) {
            setLoadingCallback(false)
        }
    },

    getRequestCount() {
        return requestCount
    },

    /**
     * Race condition 방지를 위해 requestCount를 직접 0으로 설정
     */
    clearAll() {
        requestCount = 0
        if (setLoadingCallback) {
            setLoadingCallback(false)
        }
    },
}
