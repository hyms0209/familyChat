import {
    QueryClient,
    QueryClientProvider,
    MutationCache,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { PropsWithChildren, useMemo } from 'react'
import { InteractionManager } from 'react-native'
import { useCreateDialog } from '@/src/hooks/dialog/useCreateDialog'
import { loadingManager } from '@/src/utils/loadingManager'

/**
 * QueryClient 생성 함수
 * Note: 로딩 상태는 Axios interceptor에서 관리됨 (src/api/axios/config.ts)
 */
function createQueryClient(
    showAlertDialog: (
        message: string,
        confirm?: string,
        onConfirm?: () => void
    ) => void
): QueryClient {
    return new QueryClient({
        mutationCache: new MutationCache({
            onError: (error) => {
                console.error('Mutation error:', error)

                // 401 에러는 axios interceptor에서 처리되므로 다이얼로그 생략
                const isUnauthorized =
                    error instanceof AxiosError &&
                    error.response?.status === 401

                if (!isUnauthorized) {
                    loadingManager.clearAll()
                    InteractionManager.runAfterInteractions(() => {
                        const waitForLoadingToClear = (
                            maxAttempts: number = 10,
                            attempt: number = 0
                        ) => {
                            const currentRequestCount =
                                loadingManager.getRequestCount()

                            if (
                                currentRequestCount === 0 ||
                                attempt >= maxAttempts
                            ) {
                                setTimeout(() => {
                                    showAlertDialog(
                                        error instanceof Error
                                            ? error.message
                                            : '오류가 발생했습니다.'
                                    )
                                }, 300)
                            } else {
                                setTimeout(() => {
                                    waitForLoadingToClear(
                                        maxAttempts,
                                        attempt + 1
                                    )
                                }, 50)
                            }
                        }

                        waitForLoadingToClear()
                    })
                }
            },
        }),
        defaultOptions: {
            queries: {
                retry: 1,
                staleTime: 5 * 60 * 1000,
                gcTime: 10 * 60 * 1000,
                refetchOnWindowFocus: false,
            },
        },
    })
}

export default function QueryProvider({ children }: PropsWithChildren) {
    const { showAlertDialog } = useCreateDialog()

    const queryClient = useMemo(
        () => createQueryClient(showAlertDialog),
        [showAlertDialog]
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
