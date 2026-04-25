// 단계 D 에서 실제 로딩 다이얼로그로 교체.
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function LoadingDialog() {
    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            pointerEvents="auto"
        >
            <ActivityIndicator size="large" color="#FF7E6B" />
        </View>
    )
}
