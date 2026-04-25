import React, { createContext, useContext, useState } from 'react'
import {
    AlertModal,
    AlertTitleModal,
    ConfirmModal,
    ConfirmTitleModal,
} from '@/src/components/modal'

type PopupData = {
    type: DialogType
    title?: string
    message?: string
    confirm?: string
    cancel?: string
    onCancel?: () => void
    onConfirm?: () => void
}

export enum DialogType {
    Warning = 'Warning',
    Alert = 'Alert',
    AlertTitle = 'AlertTitle',
    Confirm = 'Confirm',
    ConfirmTitle = 'ConfirmTitle',
}

type DialogContextType = {
    showDialogContext: (data: PopupData) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false)
    const [popupData, setPopupData] = useState<PopupData | null>(null)

    const showPopup = (data: PopupData) => {
        setPopupData(data)
        setTimeout(() => {
            setVisible(true)
        }, 0)
    }

    const handleConfirm = () => {
        popupData?.onConfirm?.()
        setVisible(false)
    }

    const handleCancel = () => {
        popupData?.onCancel?.()
        setVisible(false)
    }

    const handleDismiss = () => {
        setVisible(false)
    }

    const renderDialog = () => {
        switch (popupData?.type) {
            case DialogType.Alert:
                return (
                    <AlertModal
                        visible={visible}
                        content={popupData?.message}
                        onConfirm={handleConfirm}
                        onDismiss={handleDismiss}
                        confirmText={popupData?.confirm}
                    />
                )
            case DialogType.AlertTitle:
                return (
                    <AlertTitleModal
                        visible={visible}
                        title={popupData?.title}
                        content={popupData?.message}
                        onConfirm={handleConfirm}
                        onDismiss={handleDismiss}
                        confirmText={popupData?.confirm}
                    />
                )
            case DialogType.Confirm:
                return (
                    <ConfirmModal
                        visible={visible}
                        content={popupData?.message}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        onDismiss={handleDismiss}
                        confirmText={popupData?.confirm}
                        cancelText={popupData?.cancel}
                    />
                )
            case DialogType.ConfirmTitle:
                return (
                    <ConfirmTitleModal
                        visible={visible}
                        title={popupData?.title}
                        content={popupData?.message}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        onDismiss={handleDismiss}
                        confirmText={popupData?.confirm}
                        cancelText={popupData?.cancel}
                    />
                )
            default:
                return null
        }
    }

    return (
        <DialogContext.Provider value={{ showDialogContext: showPopup }}>
            {children}
            {visible && renderDialog()}
        </DialogContext.Provider>
    )
}

export const useDialogContext = () => {
    const context = useContext(DialogContext)
    if (!context)
        throw new Error('useDialogContext must be used within DialogProvider')
    return context
}
