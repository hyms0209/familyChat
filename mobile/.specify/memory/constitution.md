<!--
SYNC IMPACT REPORT
==================
Version: 1.0.0 (initial ratification)
Source: Adapted from poc-bank Constitution v1.0.0 (2025-11-26)
가족채팅 도메인에 맞춰 7개 원칙 (poc-bank 5개 + 가족채팅 전용 2개) 으로 확장.
Templates aligned: 03_기술설계서.md, 11_프롬프트_코드변환.md (poc-bank 정렬 후)
-->

# 가족채팅 (FamilyHub) Constitution

| 항목        | 값                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------- |
| 버전        | 1.0.0                                                                                             |
| 제정일      | 2026-04-25                                                                                        |
| 마지막 개정 | 2026-04-25                                                                                        |
| 출처        | `/Users/lmh/Documents/work/source/react/busanpoc/poc-bank/.specify/memory/constitution.md` 베이스 |

> 본 헌법은 가족채팅(FamilyHub) 프로젝트의 모든 개발 활동에 우선한다. AI 에이전트(Claude, Cursor, SpecKit)와 사람 개발자 모두 본 원칙을 준수한다.
>
> 본 문서는 mobile 코드베이스가 셋업되면 `mobile/.specify/memory/constitution.md` 와 동기화된다.

---

## Core Principles

### I. Type Safety First

모든 코드는 **TypeScript strict mode** 로 작성한다. 타입 정의는 다음 영역에서 필수다:

- 컴포넌트 props 와 state
- API 요청/응답 페이로드 (Firestore 도큐먼트 + 외부 REST API 모두)
- 네비게이션 파라미터 (`RootStackParamList`)
- 서비스/훅 함수 시그니처
- Zustand 스토어와 Provider context

**근거**: 가족채팅은 **위치 정보, 메시지, 자녀 일정** 등 민감한 데이터를 다룬다. 타입 안전성은 컴파일 타임에 오류를 잡고, 런타임 충돌을 예방하며, 자신감 있는 리팩터링을 가능하게 한다.

---

### II. NativeWind-Only Styling

모든 UI 스타일링은 **NativeWind className** 으로 한다. 다음의 경우만 예외다:

- 런타임에 계산되는 동적 값 (애니메이션, 제스처)
- Tailwind 설정으로 표현 불가능한 값 (플랫폼별 imperative positioning)

**금지**:

- `StyleSheet.create()` 사용
- 인라인 `style={{ ... }}` (위 예외 제외)

**근거**: 일관된 스타일 시스템은 시각적 버그를 줄이고, 디자인 시스템(`04_와이어프레임.md`) 과의 정합성을 보장한다. 가족·세대 간 사용성에 영향을 주는 컬러/대비/간격이 흩어지지 않게 한다.

---

### III. Centralized Navigation

모든 화면 전환은 **`src/navigation/Router.ts` 유틸**을 통해야 한다. 다음은 금지된다:

- 컴포넌트에서 직접 `navigation.navigate()` 호출
- React Navigation 훅을 통한 이동 (`useNavigation().navigate(...)`)

**필수 패턴**:

- 전진 이동: `Router.moveToMenu(MENU.X.Y, params)`
- 결과 반환: `Router.pop({ screenType, data })` + `useRouteResult` 훅
- 스택 리셋: `Router.moveToMain()`
- 탭 전환: `Router.moveToTabMenu(MENU.MAIN.HOME)`
- 화면 정의: `MENU` 상수 + `RootStackParamList` 타입

**근거**: 단일 진실 공급원이 라우팅 불일치를 막고, 딥링크(가족 초대 링크 등)와 결합 시 일관된 처리를 보장하며, 타입 안전한 파라미터 전달을 제공한다. poc-bank 에서 검증된 패턴이다.

---

### IV. React Query for Server State

모든 API 데이터 페칭은 **React Query 훅** 으로 한다. 컴포넌트에서 다음은 금지된다:

- 직접 `axios.get()` / `fetch()` 호출
- Firestore SDK 직접 사용 (`getDoc`, `onSnapshot` 등을 컴포넌트에서)

**필수 4-계층 패턴**:

```
Component
  → Hook (src/hooks/api/useFamily.ts 등)
    → Service (src/api/firebase/firestore.ts 또는 src/services/kakao.ts)
      → Client (Firestore SDK, Axios)
```

**규칙**:

- 서비스 함수는 `src/api/firebase/` (Firebase) 또는 `src/services/` (외부 REST)
- React Query 훅은 `src/hooks/api/`
- 모든 query key 는 `src/api/queryKeys.ts` 에 중앙 등록 (가족채팅 네임스페이스 사용)
- mutation 후 자동 캐시 무효화

**근거**: React Query 는 캐싱, 백그라운드 리페치, 로딩/에러 상태 관리를 제공한다. 가족채팅처럼 **실시간 채팅 + 위치 + 캘린더**가 동시에 흐르는 앱에서 필수적이다.

---

### V. Feature Organization by Domain

코드는 **기술 계층이 아닌 도메인 기능별로 조직**한다.

**디렉토리 규칙**:

- 화면: `src/screens/{feature}/` — 예: `src/screens/family/`, `src/screens/chat/`, `src/screens/academy/`
- 도메인 훅: `src/hooks/{category}/` — 예: `src/hooks/api/useFamily.ts`, `src/hooks/dialog/useCreateDialog.ts`
- 공통 컴포넌트: `src/components/{component-type}/` — 예: `src/components/button/`, `src/components/card/`
- API 타입: `src/types/api/family/`

**가족채팅 도메인 (`MENU` 상수와 일치)**:

- `auth` — 인증/가입/약관
- `family` — 가족 생성/초대/관리
- `main` — 홈/채팅 목록/지도/캘린더/더보기 탭
- `chat` — 채팅방, 첨부 시트
- `event` — 일정 상세/추가
- `academy` — 학원 관리
- `location` — 위치 공유 설정
- `notifications` — 알림 인박스
- `settings` — 설정

**근거**: 도메인 기반 조직은 발견성을 높이고, 병렬 작업과 도메인별 테스트를 단순화한다. poc-bank 에서 검증되었다.

---

### VI. Privacy by Design (가족채팅 전용 추가)

가족채팅은 **가족 사이의 사적 공간**이다. 다음 원칙을 모든 기능 설계에 적용한다:

- **데이터 최소 수집**: 닉네임/이메일/(선택)전화번호/(선택)프로필 사진만. 그 이상 수집 금지.
- **가족 단위 데이터 격리**: Firestore Security Rules 로 다른 가족의 데이터는 절대 접근 불가. 보안 룰 위반 가능성이 있는 코드는 PR 거부.
- **위치 정보 특별 보호**:
    - 외부 SNS, 광고, 분석 시스템에 위치 데이터 절대 송신 금지
    - 로깅에 좌표 포함 절대 금지 (마스킹 또는 redaction)
    - 자녀의 위치 일시 정지 권한 보장
- **자녀 보호**:
    - 만 14세 미만은 부모 동의 없이 가입 불가 (PIPA 준수)
    - 자녀 계정에 대한 외부 광고/마케팅 금지
- **로그**: PII(이메일, 전화번호, 좌표, 메시지 본문)는 Sentry/외부 모니터링에 절대 송신 금지

**근거**: 가족 — 특히 자녀 — 의 데이터는 일반 SaaS 보다 더 엄격한 기준이 필요하다. 한국 「개인정보 보호법」, 「위치정보의 보호 및 이용 등에 관한 법률」 준수가 의무다.

---

### VII. Accessibility & 세대 간 사용성 (가족채팅 전용 추가)

가족채팅은 **자녀(초등생)부터 조부모까지** 사용 가능해야 한다.

- 모든 인터랙티브 요소에 `accessibilityLabel` 필수
- 시스템 폰트 크기 (Dynamic Type / Font Scale) 200% 까지 레이아웃 보존
- WCAG AA 4.5:1 컬러 대비 (본문) / 3:1 (큰 텍스트)
- 다크 모드 모든 화면 지원
- 가족 컬러는 본문 텍스트 위에 직접 사용 금지 (도트·바·아바타 보더로만)
- VoiceOver / TalkBack 동선 검증
- 자녀 친화 UX:
    - 한 번의 탭으로 끝나는 핵심 액션 (예: 학원 종료 → 픽업 요청)
    - 위치 공유는 "감시"가 아닌 "안전" 톤

**근거**: 가족이라는 사용자 풀은 연령대 폭이 넓다. 접근성은 부가 기능이 아니라 제품의 본질이다.

---

## Technology Standards

### Required Stack

| 계층            | 기술                                                | 버전                                         |
| --------------- | --------------------------------------------------- | -------------------------------------------- |
| 플랫폼          | React Native / Expo                                 | poc-bank 와 동일 (Expo SDK 54 기준)          |
| 언어            | TypeScript                                          | strict mode (~5.9)                           |
| 스타일          | NativeWind                                          | v4.x                                         |
| 서버 상태       | TanStack React Query                                | v5.x                                         |
| 클라이언트 상태 | Zustand                                             | v5.x                                         |
| HTTP            | Axios                                               | v1.x (외부 API 용)                           |
| 백엔드 (1차)    | Firebase (Firestore, Auth, FCM, Storage, Functions) | 최신 안정                                    |
| 네비게이션      | React Navigation                                    | v7.x (Stack + Bottom Tabs)                   |
| 폰트            | Pretendard                                          | 4개 weight (Regular, Medium, SemiBold, Bold) |
| 테스트          | Jest + ts-jest                                      | 단위 — Maestro 는 Phase 2                    |
| 도구            | SpecKit                                             | 사양 주도 개발 워크플로                      |

> 라우팅은 **expo-router 가 아니라 React Navigation v7 + 커스텀 Router 패턴**을 사용한다. poc-bank 에서 검증되었고, 본 헌법은 그 패턴을 정식 채택한다.

### Code Quality

- Prettier 자동 포맷팅 (커밋 전, `npm start` prestart 훅으로)
- 탭 4 칸
- 단일 따옴표
- 세미콜론 없음
- ES5 trailing commas
- `prettier-plugin-tailwindcss` 자동 클래스 정렬

### Performance Standards

- 앱 콜드 스타트 → 홈 화면: 3초 이내
- 화면 전환: 300ms 이내
- API 응답 표시: 데이터 수신 후 1초 이내
- 채팅 메시지 송신 → 수신: 1초 이내 (정상 네트워크)
- 위치 갱신 주기: 30초~5분 (적응적)

---

## Development Workflow

### 컴포넌트 생성

1. TypeScript props 인터페이스 정의
2. NativeWind className 으로 스타일
3. `src/hooks/` 의 공통 훅 활용
4. 기존 파일 명명 컨벤션 준수
5. 접근성 라벨 누락 없이

### API 통합

1. 서비스 함수 정의 (`src/api/firebase/` 또는 `src/services/`)
2. Query key 를 `src/api/queryKeys.ts` 에 추가 (`family` 네임스페이스)
3. React Query 훅 작성 (`src/hooks/api/`)
4. 컴포넌트에서 훅 사용 (직접 SDK 호출 금지)

### 화면 추가

1. `MENU` 객체에 라우트 추가 (`src/navigation/NavigationTypes.ts`)
2. `RootStackParamList` 타입에 파라미터 정의
3. `RootNavigator.tsx` 에 화면 등록
4. `Router.moveToMenu(MENU.X.Y, params)` 로 이동

### 화면 결과 전달

자식 화면에서 부모 화면으로 결과 전달:

```ts
// 자식
Router.pop({
    screenType: MENU.PARENT.SCREEN,
    data: { selectedAcademyId: 'xxx' },
})

// 부모
useRouteResult((params) => {
    if (params.screenType === MENU.CHILD.SCREEN) {
        // 처리
    }
})
```

### 가족 모드 인지

가족 컨텍스트가 필요한 화면:

```ts
import { useFamily } from '@/src/providers/FamilyProvider'

function MyScreen() {
    const { primaryFamilyId, members, role } = useFamily()
    // role === 'parent' | 'child' | 'owner' 에 따라 분기
}
```

### Toast / Dialog / Loading

```ts
import { useToast } from '@/src/providers/ToastProvider'
import { useCreateDialog } from '@/src/hooks/dialog/useCreateDialog'

const { showToast } = useToast()
showToast('메시지를 보냈어요')

const { showConfirm } = useCreateDialog()
const confirmed = await showConfirm({
    title: '정말 삭제하시겠어요?',
    body: '되돌릴 수 없어요.',
})
```

---

## Governance

본 헌법은 가족채팅 프로젝트의 모든 개발 관행에 우선한다. PRD/기능명세서/기술설계서/와이어프레임/프롬프트 묶음 모두 본 헌법에 종속된다.

### Amendment Process

1. 변경 제안은 **근거와 함께 문서화**되어야 한다.
2. 여러 원칙에 영향을 주는 변경은 사전 검토를 요한다.
3. 모든 개정은 `Last Amended` 날짜와 버전을 갱신한다.
4. 호환성 깨는 변경은 MAJOR 버전 증가.

### Versioning Policy

- **MAJOR**: 원칙 제거, 기본 관행의 근본 변경
- **MINOR**: 새 원칙 추가, 가이드 확장
- **PATCH**: 명확화, 오타 수정

### Compliance

- 모든 PR 은 본 헌법 준수 여부를 명시
- 코드 리뷰는 헌법 위반을 점검
- 위반 시 문서화된 정당화 또는 수정 필요

### AI Agents

Claude Code, Cursor, Pencil, SpecKit 등 모든 AI 에이전트는:

- 본 헌법을 컨텍스트로 활용
- 위반 가능성이 있는 코드 생성 시 사용자에게 확인
- `12_Constitution.md` 파일을 변경하기 전에 반드시 사용자 승인

---

## 변경 이력

| 버전  | 일자       | 변경                                                                             |
| ----- | ---------- | -------------------------------------------------------------------------------- |
| 1.0.0 | 2026-04-25 | 초기 제정. poc-bank Constitution v1.0.0 베이스 + 가족채팅 전용 원칙 VI, VII 추가 |

---

**Version**: 1.0.0 | **Ratified**: 2026-04-25 | **Last Amended**: 2026-04-25
