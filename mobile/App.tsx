import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import './global.css'

import { navigationRef } from './src/navigation/Router'
import { usePretendardFont } from './src/hooks/util/usePretendardFont'
import { RootNavigator } from './src/navigation/RootNavigator'
import { composeProviders } from './src/providers/ComposeProviders'
import { FamilyProvider } from './src/providers/FamilyProvider'
import { DeeplinkProvider } from './src/providers/DeeplinkProvider'
import { AuthCheckProvider } from './src/providers/AuthCheckProvider'
import { LoadingProvider } from './src/providers/LoadingProvider'
import { DialogProvider } from './src/providers/DialogProvider'
import { ToastProvider } from './src/providers/ToastProvider'
import QueryProvider from './src/providers/QueryProvider'
import { DevToolsProvider } from './src/providers/DevToolsProvider'
import { initializeFirebase } from './src/utils/firebase/initializeFirebase'

export default function App() {
    // Firebase 초기화 — .env 가 없으면 함수 안에서 안전하게 skip.
    useEffect(() => {
        initializeFirebase()
    }, [])

    const { fontsLoaded, fontError } = usePretendardFont()

    // 03_기술설계서.md §3.5 — 가장 외곽: FamilyProvider, 가장 안쪽: DevToolsProvider.
    const AppProviders = composeProviders(
        FamilyProvider,
        DeeplinkProvider,
        AuthCheckProvider,
        DialogProvider,
        ToastProvider,
        LoadingProvider,
        QueryProvider,
        DevToolsProvider
    )

    if (!fontsLoaded && !fontError) {
        return (
            <SafeAreaProvider>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF7E6B" />
                </View>
            </SafeAreaProvider>
        )
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                    console.log('📱 Navigation ready')
                    if (navigationRef.isReady()) {
                        console.log('✅ Navigation ref is ready')
                    }
                }}
                onUnhandledAction={(e) => {
                    console.log('⚠️ Unhandled nav action:', e)
                }}
            >
                <AppProviders>
                    <RootNavigator />
                </AppProviders>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFAF5',
    },
})
