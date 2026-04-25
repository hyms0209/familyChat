// components/BaseScreen.tsx
import { View } from 'react-native'
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context'

export function BaseScreen({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaViewContext
            style={{ flex: 1 }}
            edges={['top', 'bottom', 'left', 'right']}
        >
            {/* <StatusBar barStyle="dark-content" />
      <NetworkErrorBanner />
      <GlobalLoading />
      <AuthDialog />
      <Toast /> */}
            <View style={{ flex: 1 }}>{children}</View>
        </SafeAreaViewContext>
    )
}
