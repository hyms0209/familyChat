// 단계 D 에서 실제 모달 컴포넌트 (4종) 로 교체 — 03_기술설계서.md 와 04_와이어프레임.md 참조.
// poc-bank 의 prop 시그니처만 stub 으로 유지하여 DialogProvider 컴파일 통과.
import React from 'react'

type ModalProps = {
    visible: boolean
    title?: string
    content?: string
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
    onDismiss?: () => void
}

const NullModal: React.FC<ModalProps> = () => null

export const AlertModal = NullModal
export const AlertTitleModal = NullModal
export const ConfirmModal = NullModal
export const ConfirmTitleModal = NullModal
