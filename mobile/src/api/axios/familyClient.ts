// 외부 REST API 용 axios 인스턴스 (예: 카카오 OAuth, 우편번호 등).
// 단계 P-5.5 이후 baseURL 과 refresh 인스턴스를 환경변수에서 채움.

import {
    createAxiosInstance,
    createRefreshInstance,
    setRefreshAxiosInstance,
} from './config'

const baseURL = process.env.EXPO_PUBLIC_FAMILY_API_BASE_URL ?? ''

export const familyClient = createAxiosInstance({
    baseURL,
    timeout: 10000,
})

// poc-bank 의 refreshAxiosInstance 패턴 — 무한루프 방지용 별도 인스턴스 등록.
const refreshInstance = createRefreshInstance({
    baseURL,
    timeout: 10000,
})
setRefreshAxiosInstance(refreshInstance)
