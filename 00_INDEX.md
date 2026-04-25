# 가족 커뮤니케이션 앱 — 프로젝트 문서 인덱스

| 항목 | 값 |
|---|---|
| 프로젝트명 (가칭) | **FamilyHub** |
| 문서 세트 버전 | v0.1 (Draft, 2026-04-25) |
| 작성자 | 임명협 (with Claude) |
| 상태 | 초안 — 검토 및 확정 필요 |

> 본 폴더는 가족(2~4인 핵가족 중심)을 위한 모바일 앱의 **요구사항·기능·기술 설계 문서 세트**다. 이 문서를 시작점으로 읽어 각 영역 문서로 이동하면 된다.

---

## 1. 한 페이지 요약 (Executive Summary)

- **무엇을**: 가족 전용 통합 모바일 앱 (iOS + Android, React Native)
- **왜**: 카톡 가족방 + 캘린더 + 위치공유 + 학원 알림이 흩어져 있어 통합 가족 공간이 부족
- **누구를 위해**: 우리 가족(부부 + 자녀, 2~4명) → 추후 일반 사용자 확장
- **MVP 핵심 기능**:
  1. 가족 그룹 채팅 + 1:1 다이렉트 메시지
  2. 실시간 위치 공유 (백그라운드)
  3. 공유 캘린더
  4. 학원 일정/시간표 캘린더 통합 표시
- **기술 스택**: React Native (Expo) + React Navigation v7 + NativeWind v4 + React Query v5 + Zustand + Firebase (Auth/Firestore/Functions/FCM/Storage)
- **아키텍처 베이스**: 검증된 `poc-bank` 프로젝트 (`/Users/lmh/Documents/work/source/react/busanpoc/poc-bank`) 패턴을 그대로 채택 — Router/Provider/API 4계층/폰트 토큰 모두 동일
- **로드맵**: M0(설계 4주) → M1~M3(MVP 12주) → M4~M6(Closed Beta) → M7~M9(Open Beta) → M10(정식 출시)
- **수익화**: Freemium (가족 4명 무료 / 8명 + 무제한 학원·사진은 프리미엄 월 4,900원 가정)

---

## 2. 문서 구성

| 파일 | 내용 | 대상 독자 |
|---|---|---|
| **`00_INDEX.md`** (이 문서) | 전체 안내 + 한 페이지 요약 | 전원 |
| **`01_PRD.md`** | 제품 요구사항: 비전, 페르소나, 경쟁 분석, MVP 범위, 수익화, 로드맵, KPI, 리스크 | 기획·디자인·개발·경영 |
| **`02_기능명세서.md`** | 기능별 상세: User Stories, 사용자 플로우, 권한 모델, 화면 흐름, 빈 상태/에러 | 디자이너·개발자·QA |
| **`03_기술설계서.md`** | 아키텍처, 스택, 데이터 모델(Firestore Schema), Security Rules, Cloud Functions, 배포·모니터링·비용 | 개발자·DevOps·보안 |
| **`04_와이어프레임.md`** | 디자인 시스템 토큰, User Flow, 23개 화면 ASCII 와이어프레임 + 컴포넌트·상태 명세 | 디자이너·프론트엔드 |
| **`05_Pencil_연동_가이드.md`** | Pencil.dev × Claude MCP 연동 셋업, 작업 흐름, Cowork와의 분업 | 디자이너·개발자 |
| **`06_프롬프트_INDEX.md`** | 프롬프트 묶음 매니페스트 — 단계 시퀀스, 사용법, 트러블슈팅 | 디자이너·개발자 |
| **`07_프롬프트_디자인시스템.md`** | 단계 1: 디자인 시스템 토큰 시각화 (2 프롬프트) | 디자이너 |
| **`08_프롬프트_컴포넌트.md`** | 단계 2: 12종 공통 컴포넌트 (12 프롬프트) | 디자이너 |
| **`09_프롬프트_화면.md`** | 단계 3: S01~S23 23개 화면 (23 프롬프트) | 디자이너 |
| **`10_프롬프트_변형_상태.md`** | 단계 4: 다크/로딩/빈/에러/권한 상태 변형 (5 프롬프트) | 디자이너 |
| **`11_프롬프트_코드변환.md`** | 단계 5: Pencil → React Native 코드 변환 (6 프롬프트 + 부트스트랩) | 개발자 |
| **`12_Constitution.md`** | 가족채팅 개발 원칙 (Type Safety / NativeWind-Only / Centralized Navigation / React Query / Feature Org / Privacy by Design / Accessibility) | 전원 |
| **`13_부트스트랩_A_분석.md`** | 분할 부트스트랩 단계 A — poc-bank 분석만 (파일 생성 X) | 개발자 |
| **`13_부트스트랩_B_프로젝트.md`** | 단계 B — mobile/ Expo 프로젝트 + 의존성 설치 | 개발자 |
| **`13_부트스트랩_C_핵심이식.md`** | 단계 C — poc-bank Tailwind/Router/Provider/Pretendard 이식 | 개발자 |
| **`13_부트스트랩_D_도메인.md`** | 단계 D — 가족채팅 도메인 스캐폴드 + Git | 개발자 |

---

## 3. 빠른 탐색 (자주 찾는 정보)

### 3.1 "이 앱이 뭐 하는 앱인지 빨리 알고 싶다"
→ `01_PRD.md` §2 (개요), §7 (제품 범위)

### 3.2 "MVP에 어떤 기능이 들어가는지"
→ `01_PRD.md` §7.1 / `02_기능명세서.md` §3 (각 기능 F1~F9)

### 3.3 "경쟁 서비스와 어떻게 다른지"
→ `01_PRD.md` §6 (시장/경쟁 분석), §6.3 (차별화 전략)

### 3.4 "권한 모델, 누가 무엇을 할 수 있는지"
→ `02_기능명세서.md` §2.2 (권한 매트릭스)

### 3.5 "기술 스택이 왜 React Native + Firebase인지"
→ `03_기술설계서.md` §2.3 (기술 스택 결정 매트릭스)

### 3.6 "데이터가 어떻게 저장되는지"
→ `03_기술설계서.md` §4 (Firestore Schema)

### 3.7 "보안과 개인정보 보호"
→ `03_기술설계서.md` §5 (Security Rules), §8 (PIPA 컴플라이언스 체크리스트)

### 3.8 "수익화 모델"
→ `01_PRD.md` §10

### 3.9 "비용이 얼마나 들지"
→ `03_기술설계서.md` §11 (비용 추산)

### 3.10 "각 화면이 어떻게 생겼는지 / 디자인 토큰"
→ `04_와이어프레임.md` §1 (디자인 시스템), §4 (S01~S23 화면 명세)

### 3.11 "사용자 플로우 (가입, 학원 등록, 픽업 요청 등)"
→ `04_와이어프레임.md` §3 (User Flow Diagrams)

### 3.12 "개발 원칙 (Constitution)"
→ `12_Constitution.md` — 7개 원칙 (poc-bank 5개 + 가족채팅 전용 2개)

### 3.13 "기존 검증 프로젝트(poc-bank) 와의 매핑"
→ `03_기술설계서.md` §3 (폴더 구조), `12_Constitution.md` (원칙)

---

## 4. 문서 사용법

### 4.1 의사결정 진행 순서 (권장)
1. **PRD (01) §13.3 사용 시나리오** 읽기 — 제품 그림 잡기
2. **기능명세서 (02) §1 정보 구조** 보기 — 화면 구조 잡기
3. **기능명세서 (02) §3 각 기능별 명세** 정독 — 동작 정의 확정
4. **기술설계서 (03) §4 데이터 모델, §5 Security Rules** 검토 — 구현 가능성 검증
5. **PRD (01) §11 로드맵** 으로 일정 합의

### 4.2 변경 관리
- 모든 문서는 v0.1 → v0.2 식으로 패치. 큰 변경은 v1.0(MVP 확정), v2.0(베타 후) 등.
- 각 문서 상단의 변경 이력 표 갱신.
- "Open Questions"에 미해결 항목을 남겨두고 합의 시 본문 반영.

---

## 5. 결정해야 할 항목 모음 (Cross-doc Open Questions)

각 문서의 "Open Questions" 섹션에서 아직 결정되지 않은 것들의 통합 목록:

### 5.1 비즈니스/제품
- [ ] 정식 앱 명칭 확정 (`01_PRD §14.3`)
- [ ] 결제 가격 정책 확정 (현재 가정안: 4,900원/월)
- [ ] 학원 정보 입력: 사용자 직접 입력만 vs 학원 DB 검색 제공

### 5.2 법무/컴플라이언스
- [ ] 위치정보사업자 신고 여부 (법무 검토 필수, 출시 전 완료)
- [ ] 만 14세 미만 부모 인증 수단 (휴대폰 본인인증 vs OTP 등)
- [ ] 개인정보처리방침/이용약관 초안 작성 시기

### 5.3 UX/제품
- [ ] 1:1 대화 PIN 잠금 (자녀-부모 사적 대화 보호) 도입 여부
- [ ] 자녀의 위치 공유 일시 정지를 부모가 거부할 권한
- [ ] 메시지 신고/차단 기능을 가족 내에서도 둘지

### 5.4 기술
- [ ] 카카오 소셜 로그인 우선순위
- [ ] 학원 데이터 모델 — 옵션 A(materialized) vs B(lazy) vs 하이브리드 (현재 하이브리드 채택)
- [ ] 지도 라이브러리: react-native-maps vs Mapbox
- [ ] Phase 2 사진 앨범에서 동영상 지원 여부
- [ ] 자체 백엔드 이전 임계점 정의 (예: WAU 1만, 채팅 1초 도달 못 할 때)

---

## 6. 다음 단계 (Suggested Next Actions)

1. **본 문서 검토 미팅** — 임명협 단독 검토 + 가족과 핵심 시나리오 검증
2. **법무 자문** — 위치정보법 신고 필요 여부, 만 14세 미만 처리 방안
3. **UX 와이어프레임** — Figma로 핵심 5개 화면 먼저 (홈/채팅방/지도/캘린더/학원관리)
4. **디자인 시스템 v0** — 컬러·타이포·컴포넌트 정의
5. **개발 환경 셋업** — Firebase 프로젝트 2개(dev/prod), Expo + EAS 초기 설정
6. **MVP α 스프린트 계획** — M1 4주 분량 작업 목록화

---

## 7. 부록

### 7.1 약어집

| 약어 | 풀이 |
|---|---|
| PRD | Product Requirements Document |
| MVP | Minimum Viable Product |
| RN | React Native |
| FCM | Firebase Cloud Messaging |
| IAP | In-App Purchase |
| RBAC | Role-Based Access Control |
| PIPA | Personal Information Protection Act (개인정보 보호법) |
| MAU/WAU/DAU | Monthly/Weekly/Daily Active Users |
| WAF | Weekly Active Families |
| LBS | Location-Based Service |
| KPI | Key Performance Indicator |
| OTA | Over-The-Air (업데이트) |

### 7.2 외부 참고 자료
- 「개인정보 보호법」 (한국)
- 「위치정보의 보호 및 이용 등에 관한 법률」
- Firebase Documentation: https://firebase.google.com/docs
- Expo Documentation: https://docs.expo.dev
- Apple Human Interface Guidelines / Material Design 3

---

> 이 문서는 v0.1 초안입니다. 검토 의견은 각 문서의 본문 또는 별도 코멘트로 남겨주세요.
