// 화면 복귀시 송신 데이터 타입
export interface ScreenResultProp<
    T extends keyof RootStackParamList = keyof RootStackParamList,
    D extends object = object,
> {
    screenType: T
    data: D
}

// 가족채팅 MENU (03_기술설계서.md §3.3.2 와 동일)
export const MENU = {
    SPLASH: { INDEX: '/splash' },
    AUTH: {
        SIGN_IN: '/auth/sign-in',
        SIGN_UP: '/auth/sign-up',
        VERIFY: '/auth/verify',
        TERMS: '/auth/terms',
        PROFILE: '/auth/profile',
        MINOR_CONSENT: '/auth/minor-consent',
    },
    FAMILY: {
        CHOICE: '/family/choice',
        NEW: '/family/new',
        INVITE: '/family/invite',
        INVITE_JOIN: '/family/invite-join',
        MANAGE: '/family/manage',
    },
    MAIN: {
        INDEX: '/main',
        HOME: '/main/home',
        CHAT: '/main/chat',
        MAP: '/main/map',
        CALENDAR: '/main/calendar',
        MORE: '/main/more',
    },
    CHAT: {
        ROOM: '/chat/room',
        ATTACHMENT: '/chat/attachment',
    },
    EVENT: {
        EDIT: '/event/edit',
        DETAIL: '/event/detail',
    },
    ACADEMY: {
        LIST: '/academy/list',
        EDIT: '/academy/edit',
    },
    LOCATION: {
        SETTINGS: '/location/settings',
    },
    NOTIFICATIONS: { INDEX: '/notifications' },
    SETTINGS: { INDEX: '/settings' },
    // Router.restart() 호환용 — 단계 D 이후 INTRO 도메인이 없으므로 SPLASH 와 동일하게 처리
    INTRO: { INDEX: '/splash' },
} as const

// 화면 전환시 전송 데이터 타입
export type RootStackParamList = {
    [MENU.SPLASH.INDEX]: undefined

    [MENU.AUTH.SIGN_IN]: undefined
    [MENU.AUTH.SIGN_UP]: undefined
    [MENU.AUTH.VERIFY]: undefined
    [MENU.AUTH.TERMS]: undefined
    [MENU.AUTH.PROFILE]: undefined
    [MENU.AUTH.MINOR_CONSENT]: undefined

    [MENU.FAMILY.CHOICE]: undefined
    [MENU.FAMILY.NEW]: undefined
    [MENU.FAMILY.INVITE]: undefined
    [MENU.FAMILY.INVITE_JOIN]: { token?: string } | undefined
    [MENU.FAMILY.MANAGE]: undefined

    [MENU.MAIN.INDEX]: undefined
    [MENU.MAIN.HOME]: undefined
    [MENU.MAIN.CHAT]: undefined
    [MENU.MAIN.MAP]: undefined
    [MENU.MAIN.CALENDAR]: undefined
    [MENU.MAIN.MORE]: undefined

    [MENU.CHAT.ROOM]: { chatId: string }
    [MENU.CHAT.ATTACHMENT]: { chatId: string; messageId?: string } | undefined

    [MENU.EVENT.EDIT]: { eventId?: string } | undefined
    [MENU.EVENT.DETAIL]: { eventId: string }

    [MENU.ACADEMY.LIST]: undefined
    [MENU.ACADEMY.EDIT]: { academyId?: string } | undefined

    [MENU.LOCATION.SETTINGS]: undefined

    [MENU.NOTIFICATIONS.INDEX]: undefined
    [MENU.SETTINGS.INDEX]: undefined
}

// 딥링크 이동제외 화면
export const EXCLUDED_SCREENS: string[] = [MENU.SPLASH.INDEX]

// 탭 레이아웃 리스트 (5개 탭)
export const TAB_SCREENS: string[] = [
    MENU.MAIN.HOME,
    MENU.MAIN.CHAT,
    MENU.MAIN.MAP,
    MENU.MAIN.CALENDAR,
    MENU.MAIN.MORE,
]
