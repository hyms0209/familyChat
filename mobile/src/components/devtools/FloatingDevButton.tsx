// 단계 D 에서 실제 DevTools 플로팅 버튼으로 교체.
import React from 'react'
import { Pressable, Text, View } from 'react-native'

export function FloatingDevButton({ onPress }: { onPress: () => void }) {
    return (
        <View
            style={{
                position: 'absolute',
                right: 16,
                bottom: 80,
            }}
        >
            <Pressable
                onPress={onPress}
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: '#fff', fontSize: 12 }}>DEV</Text>
            </Pressable>
        </View>
    )
}
