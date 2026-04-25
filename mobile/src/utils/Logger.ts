/**
 * 로그 유틸리티
 * Log.d, Log.i, Log.w, Log.e 등의 메서드를 제공합니다.
 */

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug'

export interface LogContext {
    className?: string
    functionName?: string
}

function formatLog(
    level: LogLevel,
    message: string,
    context?: LogContext,
    ..._args: any[]
): string {
    let location = ''

    if (context?.className && context?.functionName) {
        location = `${context.className}.${context.functionName}`
    } else if (context?.className) {
        location = context.className
    } else if (context?.functionName) {
        location = context.functionName
    }

    const prefix = location ? `[${location}]` : ''

    return prefix ? `${prefix} ${message}` : message
}

export const Log = {
    l(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('log', message, context, ...args)
        console.log(formatted, ...args)
    },
    i(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('info', message, context, ...args)
        console.info(formatted, ...args)
    },
    w(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('warn', message, context, ...args)
        console.warn(formatted, ...args)
    },
    e(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('error', message, context, ...args)
        console.error(formatted, ...args)
    },
    d(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('debug', message, context, ...args)
        console.log(formatted, ...args)
    },
}

export default Log
