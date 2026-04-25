// 단계 D 에서 OutLink 구현체와 연결될 때 본격 구현.
// poc-bank 의 useConsumeToTopOutLink 시그니처만 유지 — DeeplinkProvider 가 의존.
import { useCallback } from 'react'

export function useConsumeToTopOutLink() {
    const consumeToTopOutLink = useCallback(() => {
        // 단계 D 에서 OutLinker.current 와 Router 연결 구현
    }, [])

    return { consumeToTopOutLink }
}
