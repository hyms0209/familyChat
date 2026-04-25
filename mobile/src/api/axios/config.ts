import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios'
import { networkLogger } from '../logger'
import { useDevToolsStore } from '@/src/store/devToolsStore'
import { useGlobalStore } from '@/src/store/useGlobalStore'
import Router from '@/src/navigation/Router'
import { loadingManager } from '@/src/utils/loadingManager'

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token))
    refreshSubscribers = []
}

const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback)
}

// TypeScript 타입 확장
declare module 'axios' {
    export interface AxiosRequestConfig {
        /** 전역 로딩 표시 건너뛰기 (풀다운 새로고침, 무한스크롤 등) */
        skipLoading?: boolean
    }
    export interface InternalAxiosRequestConfig {
        metadata?: {
            startTime: number
        }
        skipLoading?: boolean
    }
}

export interface ApiClientConfig {
    baseURL: string
    timeout?: number
    headers?: Record<string, string>
}

// 단계 D 에서 familyClient.ts 가 createRefreshInstance 로 채울 모듈 레벨 인스턴스.
// poc-bank 의 refreshAxiosInstance 역할.
let _refreshAxiosInstance: AxiosInstance | null = null

export const setRefreshAxiosInstance = (instance: AxiosInstance) => {
    _refreshAxiosInstance = instance
}

const getRefreshAxiosInstance = (): AxiosInstance => {
    if (!_refreshAxiosInstance) {
        // 단계 D 에서 familyClient.ts 가 setRefreshAxiosInstance 로 등록하기 전까지의 안전망
        _refreshAxiosInstance = axios.create({ baseURL: '', timeout: 10000 })
    }
    return _refreshAxiosInstance
}

// Request Interceptor Factory
export const createRequestInterceptor = () => {
    const onFulfilled = async (
        config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
        config.metadata = { startTime: Date.now() }

        if (!config.skipLoading) {
            loadingManager.startLoading()
        }

        const { showNetworkInfo } = useDevToolsStore.getState()
        networkLogger.request(
            config.method || 'get',
            config.url || '',
            config.data,
            __DEV__ && showNetworkInfo
        )

        const token = await useGlobalStore.getState().getAuthToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }

    const onRejected = (error: AxiosError): Promise<AxiosError> => {
        if (!error.config?.skipLoading) {
            loadingManager.endLoading()
        }

        const { showNetworkError } = useDevToolsStore.getState()
        networkLogger.error(
            'request',
            'unknown',
            error,
            __DEV__ && showNetworkError
        )

        return Promise.reject(error)
    }

    return { onFulfilled, onRejected }
}

// Response Interceptor Factory
export const createResponseInterceptor = (instance: AxiosInstance) => {
    const onFulfilled = (response: AxiosResponse): AxiosResponse => {
        if (!response.config?.skipLoading) {
            loadingManager.endLoading()
        }

        const duration = response.config.metadata?.startTime
            ? Date.now() - response.config.metadata.startTime
            : undefined

        const { showNetworkInfo } = useDevToolsStore.getState()
        networkLogger.response(
            response.config.method || 'get',
            response.config.url || '',
            response.status,
            duration,
            __DEV__ && showNetworkInfo
        )

        networkLogger.responseData(
            response.data,
            __DEV__ && showNetworkInfo,
            response.config.url
        )

        return response
    }

    const onRejected = async (error: AxiosError): Promise<AxiosError> => {
        const backendMessage = (error.response?.data as { message?: string })
            ?.message
        if (backendMessage) error.message = backendMessage

        if (!error.config?.skipLoading) {
            loadingManager.endLoading()
        }

        const { showNetworkError } = useDevToolsStore.getState()
        const { config, response } = error

        networkLogger.error(
            error.config?.method || 'unknown',
            error.config?.url || 'unknown',
            error,
            __DEV__ && showNetworkError
        )

        const originalRequest = config

        const authTokenValue = await useGlobalStore.getState().getAuthToken()

        // 401: 토큰 시간 만료
        const responseData = response?.data as { reason?: string } | undefined
        if (
            response?.status === 401 &&
            responseData?.reason === 'ACCESS_TOKEN_EXPIRED' &&
            originalRequest
        ) {
            if (!isRefreshing) {
                isRefreshing = true
                console.log('🔄 Refreshing token...')

                try {
                    const refreshTokenValue = await useGlobalStore
                        .getState()
                        .getRefreshToken()

                    if (!refreshTokenValue) {
                        throw new Error('Refresh token not found')
                    }

                    const { data } = await getRefreshAxiosInstance().post<{
                        accessToken: string
                        refreshToken: string
                    }>('/api/auth/refresh', {
                        refreshToken: refreshTokenValue,
                    })

                    const newAccessToken = data.accessToken
                    const newRefreshToken = data.refreshToken

                    await useGlobalStore.getState().setAuthToken(newAccessToken)
                    if (newRefreshToken) {
                        await useGlobalStore
                            .getState()
                            .setRefreshToken(newRefreshToken)
                    }

                    isRefreshing = false
                    onRefreshed(newAccessToken)
                    console.log('🔄 Completed Refreshing token...')

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return instance.request(originalRequest) as any
                } catch (refreshError) {
                    isRefreshing = false
                    console.log('🔄 Failed to Refreshing token...')
                    await useGlobalStore.getState().clear()
                    Router.restart()
                    return Promise.reject(refreshError)
                }
            }

            return new Promise((resolve) => {
                addRefreshSubscriber((newAccessToken) => {
                    if (originalRequest) {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                        resolve(axios(originalRequest) as any)
                    }
                })
            }) as any
        } else if (authTokenValue != '' && response?.status === 401) {
            await useGlobalStore.getState().clear()
            Router.restart()
            return Promise.reject(error)
        }

        return Promise.reject(error)
    }

    return { onFulfilled, onRejected }
}

// Axios 인스턴스 생성 팩토리
export const createAxiosInstance = (config: ApiClientConfig): AxiosInstance => {
    const instance = axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout || 10000,
        headers: {
            'Content-Type': 'application/json',
            ...config.headers,
        },
    })

    const requestInterceptor = createRequestInterceptor()
    instance.interceptors.request.use(
        requestInterceptor.onFulfilled,
        requestInterceptor.onRejected
    )

    const responseInterceptor = createResponseInterceptor(instance)
    instance.interceptors.response.use(
        responseInterceptor.onFulfilled,
        responseInterceptor.onRejected
    )

    return instance
}

// Refresh 전용 인스턴스 (인터셉터 없이 — 무한 루프 방지)
export const createRefreshInstance = (
    config: ApiClientConfig
): AxiosInstance => {
    const instance = axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout || 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return instance
}

// 환경 변수 헬퍼
export const getEnvVar = (key: string, defaultValue?: string): string => {
    const env = process.env as Record<string, string | undefined>
    const value = env[key]
    if (!value && !defaultValue) {
        throw new Error(`Environment variable ${key} is not defined`)
    }
    return value || defaultValue || ''
}
