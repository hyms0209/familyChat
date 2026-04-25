import React, { createContext, useContext, useState, useCallback } from 'react'
import { View, Text, Animated } from 'react-native'

interface ToastContextType {
    showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within ToastProvider')
    }
    return context
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [toastMessage, setToastMessage] = useState<string>('')
    const [fadeAnim] = useState(new Animated.Value(0))

    const showToast = useCallback(
        (message: string) => {
            setToastMessage(message)
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(2000),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setToastMessage('')
            })
        },
        [fadeAnim]
    )

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toastMessage ? (
                <Animated.View
                    className="absolute left-0 right-0 top-[100px] z-[9999] items-center"
                    style={{
                        opacity: fadeAnim,
                    }}
                >
                    <View className="max-w-[80%] rounded-lg bg-black/80 px-5 py-3">
                        <Text className="text-center text-white font14m">
                            {toastMessage}
                        </Text>
                    </View>
                </Animated.View>
            ) : null}
        </ToastContext.Provider>
    )
}
