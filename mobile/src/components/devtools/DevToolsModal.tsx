// 단계 D 에서 실제 DevTools 모달로 교체.
import React from 'react'
import { Modal, Pressable, Text, View } from 'react-native'

type Props = {
    visible: boolean
    onClose: () => void
}

export function DevToolsModal({ visible, onClose }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <Pressable
                onPress={onClose}
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 24,
                        borderRadius: 16,
                        minWidth: 240,
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>
                        DevTools (단계 D 에서 구현)
                    </Text>
                </View>
            </Pressable>
        </Modal>
    )
}
