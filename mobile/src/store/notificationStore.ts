// 단계 P-5.5 에서 expo-notifications + FCM 토큰 관리.
import { create } from 'zustand'

export type NotificationCategory =
    | 'chat'
    | 'event'
    | 'location'
    | 'family'
    | 'system'

interface NotificationStoreState {
    fcmToken: string | null
    unreadCount: number
    prefs: Record<NotificationCategory, boolean>
    setFcmToken: (t: string | null) => void
    setUnreadCount: (n: number) => void
    setPref: (key: NotificationCategory, v: boolean) => void
}

export const useNotificationStore = create<NotificationStoreState>((set) => ({
    fcmToken: null,
    unreadCount: 0,
    prefs: {
        chat: true,
        event: true,
        location: true,
        family: true,
        system: true,
    },
    setFcmToken: (t) => set({ fcmToken: t }),
    setUnreadCount: (n) => set({ unreadCount: n }),
    setPref: (key, v) => set((s) => ({ prefs: { ...s.prefs, [key]: v } })),
}))
