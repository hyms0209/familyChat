// Firebase 초기화. .env 가 없으면 안전하게 skip — 부트스트랩 단계에서 앱이 죽지 않도록.
// 본 구현은 P-5.5 (Firebase 셋업) 에서 onAuthStateChanged / Firestore 연결 코드와 함께 강화.

import { getApps, initializeApp, type FirebaseApp } from 'firebase/app'

let app: FirebaseApp | null = null

const requiredEnvKeys = [
    'EXPO_PUBLIC_FIREBASE_API_KEY',
    'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
    'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'EXPO_PUBLIC_FIREBASE_APP_ID',
] as const

export function initializeFirebase(): FirebaseApp | null {
    if (app) return app
    if (getApps().length > 0) {
        app = getApps()[0]
        return app
    }

    const env = process.env as Record<string, string | undefined>
    const missing = requiredEnvKeys.filter((k) => !env[k])
    if (missing.length > 0) {
        console.warn(
            '[firebase] .env 미설정 — 초기화 skip. 누락 키:',
            missing.join(', ')
        )
        return null
    }

    app = initializeApp({
        apiKey: env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.EXPO_PUBLIC_FIREBASE_APP_ID,
    })
    console.log('[firebase] initialized')
    return app
}

export function getFirebaseApp(): FirebaseApp | null {
    return app
}
