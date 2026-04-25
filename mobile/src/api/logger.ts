import { logger, consoleTransport } from 'react-native-logs'

const isDevelopment = __DEV__

/**
 * 로그할 엔드포인트 필터 (빈 배열 = 모두 표시)
 *
 * 가족채팅 엔드포인트 예시 (단계 D 이후 추가):
 * '/api/auth/*', '/api/family/*', '/api/chat/*', '/api/event/*',
 * '/api/location/*', '/api/notification/*'
 */
const LOG_ENDPOINT_FILTER: string[] = []

const shouldLogUrl = (url: string): boolean => {
    if (LOG_ENDPOINT_FILTER.length === 0) return true
    return LOG_ENDPOINT_FILTER.some((pattern) => !url.includes(pattern))
}

const config = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    },
    severity: isDevelopment ? 'debug' : 'error',
    transport: consoleTransport,
    transportOptions: {
        colors: {
            debug: 'blueBright' as const,
            info: 'greenBright' as const,
            warn: 'yellowBright' as const,
            error: 'redBright' as const,
        },
    },
    async: false,
    dateFormat: 'iso' as const,
    printLevel: true,
    printDate: true,
    enabled: true,
}

const log = logger.createLogger(config)

export const networkLogger = {
    request: (
        method: string,
        url: string,
        data?: any,
        shouldLog: boolean = true
    ) => {
        if (!shouldLog || !shouldLogUrl(url)) return
        log.info(`[Network Request] ${method.toUpperCase()} ${url}`, data || '')
    },

    response: (
        method: string,
        url: string,
        status: number,
        duration?: number,
        shouldLog: boolean = true
    ) => {
        if (!shouldLog || !shouldLogUrl(url)) return
        const durationText = duration ? ` (${duration}ms)` : ''
        log.info(
            `[Network Response] ${method.toUpperCase()} ${url} - ${status}${durationText}`
        )
    },

    responseData: (data: any, shouldLog: boolean = true, url?: string) => {
        if (!shouldLog || !isDevelopment) return
        if (url && !shouldLogUrl(url)) return
        log.debug('[Response Data]', JSON.stringify(data, null, 2))
    },

    error: (
        method: string,
        url: string,
        error: any,
        shouldLog: boolean = true
    ) => {
        if (!shouldLog) return
        log.error(`[Network Error] ${method.toUpperCase()} ${url}`, {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data,
        })
    },
}

export default log
