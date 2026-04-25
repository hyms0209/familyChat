// 부트스트랩 placeholder. 모든 화면은 P-5.x 에서 실 화면으로 교체.
// Stack 의 MAIN.INDEX 는 Bottom Tab Navigator (5탭) 를 렌더한다.

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import { MENU, RootStackParamList } from './NavigationTypes'

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

function PlaceholderScreen({ label, sub }: { label: string; sub?: string }) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFAF5',
                paddingHorizontal: 24,
            }}
        >
            <Text
                style={{
                    color: '#FF7E6B',
                    fontSize: 22,
                    fontWeight: '600',
                    textAlign: 'center',
                }}
            >
                {label}
            </Text>
            <Text
                style={{
                    marginTop: 8,
                    color: '#7A736D',
                    fontSize: 13,
                    textAlign: 'center',
                }}
            >
                {sub ?? '실 화면은 P-5.x 에서 교체됩니다.'}
            </Text>
        </View>
    )
}

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#FF7E6B',
                tabBarInactiveTintColor: '#7A736D',
                tabBarStyle: { backgroundColor: '#FFFFFF' },
            }}
        >
            <Tab.Screen name={MENU.MAIN.HOME} options={{ title: '홈' }}>
                {() => <PlaceholderScreen label="홈" sub="MAIN.HOME" />}
            </Tab.Screen>
            <Tab.Screen name={MENU.MAIN.CHAT} options={{ title: '채팅' }}>
                {() => <PlaceholderScreen label="채팅" sub="MAIN.CHAT" />}
            </Tab.Screen>
            <Tab.Screen name={MENU.MAIN.MAP} options={{ title: '지도' }}>
                {() => <PlaceholderScreen label="지도" sub="MAIN.MAP" />}
            </Tab.Screen>
            <Tab.Screen name={MENU.MAIN.CALENDAR} options={{ title: '캘린더' }}>
                {() => <PlaceholderScreen label="캘린더" sub="MAIN.CALENDAR" />}
            </Tab.Screen>
            <Tab.Screen name={MENU.MAIN.MORE} options={{ title: '더보기' }}>
                {() => <PlaceholderScreen label="더보기" sub="MAIN.MORE" />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const stackScreens: { name: keyof RootStackParamList; label: string }[] = [
    { name: MENU.SPLASH.INDEX, label: 'Splash' },

    { name: MENU.AUTH.SIGN_IN, label: '로그인 (S01)' },
    { name: MENU.AUTH.SIGN_UP, label: '회원가입 (S02)' },
    { name: MENU.AUTH.VERIFY, label: '인증 (S03)' },
    { name: MENU.AUTH.TERMS, label: '약관 (S04)' },
    { name: MENU.AUTH.PROFILE, label: '프로필 (S05)' },
    { name: MENU.AUTH.MINOR_CONSENT, label: '미성년자 동의 (S06)' },

    { name: MENU.FAMILY.CHOICE, label: '가족 선택 (S08)' },
    { name: MENU.FAMILY.NEW, label: '가족 생성 (S09)' },
    { name: MENU.FAMILY.INVITE, label: '가족 초대 (S10)' },
    { name: MENU.FAMILY.INVITE_JOIN, label: '초대 가입 (S11)' },
    { name: MENU.FAMILY.MANAGE, label: '가족 관리' },

    { name: MENU.CHAT.ROOM, label: '채팅방 (S14)' },
    { name: MENU.CHAT.ATTACHMENT, label: '첨부 (S15)' },

    { name: MENU.EVENT.EDIT, label: '이벤트 수정' },
    { name: MENU.EVENT.DETAIL, label: '이벤트 상세' },

    { name: MENU.ACADEMY.LIST, label: '학원 목록' },
    { name: MENU.ACADEMY.EDIT, label: '학원 편집' },

    { name: MENU.LOCATION.SETTINGS, label: '위치 설정' },

    { name: MENU.NOTIFICATIONS.INDEX, label: '알림함' },
    { name: MENU.SETTINGS.INDEX, label: '설정' },
]

export function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                headerShown: false,
                gestureEnabled: false,
                cardStyle: { backgroundColor: '#FFFAF5' },
            }}
            initialRouteName={MENU.SPLASH.INDEX}
        >
            <Stack.Screen
                name={MENU.MAIN.INDEX}
                component={MainTabs}
                options={{ gestureEnabled: false }}
            />
            {stackScreens.map(({ name, label }) => (
                <Stack.Screen key={name as string} name={name}>
                    {() => <PlaceholderScreen label={label} sub={name} />}
                </Stack.Screen>
            ))}
        </Stack.Navigator>
    )
}
