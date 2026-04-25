// 단계 D 에서 DialogProvider 와 본격적으로 연결.
// poc-bank 의 useCreateDialog 시그니처만 유지 — QueryProvider 가 의존.
import { useCallback } from 'react'
import { useDialogContext, DialogType } from '@/src/providers/DialogProvider'

export function useCreateDialog() {
    const { showDialogContext } = useDialogContext()

    const showAlertDialog = useCallback(
        (message: string, confirm?: string, onConfirm?: () => void) => {
            showDialogContext({
                type: DialogType.Alert,
                message,
                confirm,
                onConfirm,
            })
        },
        [showDialogContext]
    )

    return { showAlertDialog }
}
