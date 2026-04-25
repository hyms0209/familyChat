import React, { useState } from 'react'
import { FloatingDevButton } from '@/src/components/devtools/FloatingDevButton'
import { DevToolsModal } from '@/src/components/devtools/DevToolsModal'

interface DevToolsProviderProps {
    children: React.ReactNode
}

export function DevToolsProvider({ children }: DevToolsProviderProps) {
    const [modalVisible, setModalVisible] = useState(false)

    if (!__DEV__) {
        return <>{children}</>
    }

    return (
        <>
            {children}
            <FloatingDevButton onPress={() => setModalVisible(true)} />
            <DevToolsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </>
    )
}
