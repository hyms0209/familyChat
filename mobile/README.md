# 가족채팅 (FamilyHub) Mobile

가족채팅 모바일 앱 — React Native + Expo + Firebase.

> **출처**: poc-bank ([../../work/source/react/busanpoc/poc-bank](../../work/source/react/busanpoc/poc-bank)) 의 검증된 인프라 (Router/Provider/Tailwind/SpecKit 패턴) 를 베이스로, 가족채팅 도메인에 맞춰 적응했다.

---

## 기술 스택

| 계층            | 기술                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------- |
| 플랫폼          | React Native 0.81 + Expo SDK 54                                                               |
| 언어            | TypeScript strict                                                                             |
| 스타일          | NativeWind v4 (Tailwind) + Pretendard                                                         |
| 서버 상태       | TanStack React Query v5                                                                       |
| 클라이언트 상태 | Zustand v5                                                                                    |
| 라우팅          | React Navigation v7 (Stack + Bottom Tab) + 커스텀 Router                                      |
| 백엔드          | Firebase (Firestore / Auth / FCM / Storage / Functions)                                       |
| 외부 SDK        | expo-location, expo-task-manager, expo-notifications, react-native-maps, @sentry/react-native |
| 워크플로        | SpecKit                                                                                       |

---

## 셋업

```bash
git clone <this-repo>
cd mobile
npm install
cp .env.example .env.local      # Firebase / Sentry / Kakao 키 채우기
npm start                       # Expo Dev Server (QR)
```

빌드:

```bash
npm run ios        # iOS Simulator
npm run android    # Android Emulator
npm run ios:device # 실 디바이스
```

---

## 폴더 구조

```
mobile/
├─ App.tsx                       # composeProviders + NavigationContainer
├─ tailwind.config.js            # 가족채팅 컬러 (코랄/블루)
├─ tailwind.plugin.font-styles.js
├─ babel.config.js               # nativewind/babel + worklets
├─ global.css
├─ assets/fonts/                 # Pretendard 4 weight
├─ src/
│  ├─ navigation/                # Router.ts, RootNavigator.tsx, NavigationTypes.ts
│  ├─ providers/                 # FamilyProvider, AuthCheck, Dialog, Toast, Loading, Query, DevTools, Deeplink
│  ├─ deeplink/                  # OutLink / OutLinker / DeepLinkManager (+ outlink/{Main,Invite}OutLink)
│  ├─ api/
│  │  ├─ axios/{config,familyClient}.ts
│  │  ├─ firebase/{firestore,auth,messaging,storage}.ts
│  │  ├─ logger.ts
│  │  └─ queryKeys.ts
│  ├─ screens/                   # auth, family, main/{home,chat,map,calendar,more}, chat, event, academy, location, notifications, settings
│  ├─ components/                # button, card, chip, avatar, input, header, list, divider, empty, modal, sheet, toast, badge, loading, devtools
│  ├─ hooks/                     # api, auth, deeplink, dialog, router, backhandler, screen, util
│  ├─ store/                     # auth, family, location, theme, notification, devTools, useGlobalStore
│  ├─ utils/                     # Logger, loadingManager, auth/CheckList, firebase/initializeFirebase
│  └─ constants/theme.ts         # 가족채팅 컬러 / 타이포 / 스페이싱 / 그림자 토큰
├─ functions/                    # Cloud Functions (P-5.5 ~ P-5.6 에서 채움)
├─ firestore.rules               # 03_기술설계서.md §5.2
├─ storage.rules                 # 03_기술설계서.md §5.3
├─ firebase.json                 # rules + emulators
├─ .specify/                     # SpecKit (templates/scripts/memory/constitution)
├─ .claude/commands/             # SpecKit slash commands
├─ .cursor/{commands,rules}/     # Cursor SpecKit 통합
└─ .maestro/                     # E2E 시나리오 (Phase 2)
```

---

## 아키텍처 핵심 규칙 (Constitution 요약)

자세한 헌법은 [`.specify/memory/constitution.md`](.specify/memory/constitution.md) 또는 [부모의 `12_Constitution.md`](../12_Constitution.md) 참조.

1. **Type Safety First** — TypeScript strict, RootStackParamList 까지 모두 타입.
2. **NativeWind Only** — `StyleSheet.create()` / inline `style` 금지 (동적 값 제외).
3. **Centralized Navigation** — `Router.moveToMenu(MENU.X.Y, params)` 만 사용.
4. **React Query for Server State** — Component → Hook → Service → Client 4-계층.
5. **Feature Organization by Domain** — `src/screens/{feature}` 형태.
6. **Privacy by Design** — 위치/메시지 PII 외부 송신 금지, 자녀 보호.
7. **Accessibility & 세대 간 사용성** — VoiceOver/TalkBack 동선, 컬러 대비 AA, 다크모드 모든 화면.

---

## 부모 폴더 문서

- [00_INDEX.md](../00_INDEX.md) — 문서 인덱스
- [01_PRD.md](../01_PRD.md) — 제품 요구사항
- [03\_기술설계서.md](../03_기술설계서.md) — 아키텍처 / 데이터 모델 / 보안 룰
- [04\_와이어프레임.md](../04_와이어프레임.md) — 컬러/타이포 토큰 + 화면 정의
- [11*프롬프트*코드변환.md](../11_프롬프트_코드변환.md) — Pencil → 코드 변환 프롬프트
- [12_Constitution.md](../12_Constitution.md) — 가족채팅 헌법

---

## 다음 단계

**P-5.1 — 디자인 토큰 코드 변환** ([../11*프롬프트*코드변환.md](../11_프롬프트_코드변환.md) §P-5.1)

`mobile/src/shared/tokens/*.ts` 로 디자인 토큰을 모듈화한 뒤, P-5.2 (컴포넌트), P-5.3 (화면), P-5.5 (Firebase 셋업) 로 진행.
