# Pencil.dev × Claude 연동 가이드

| 항목 | 값 |
|---|---|
| 문서 버전 | v0.1 |
| 작성일 | 2026-04-25 |
| 목적 | 가족채팅 앱 디자인을 Pencil.dev에서 진행하면서 Claude로 자동 코드 생성하기 위한 셋업 |
| 분업 | 기획/문서(PRD·기능명세·기술설계·와이어프레임) → Cowork / 시각 디자인 + UI 코드 → IDE+Pencil |

> **중요**: Pencil.dev MCP는 IDE의 Claude Code(또는 호환 클라이언트)와 연결되도록 설계되어 있어, Cowork 데스크톱 앱에서는 직접 연결되지 않는다. VS Code 또는 Cursor에서 진행해야 한다.

---

## 1. 사전 요구사항

다음을 미리 준비/확인해야 한다.

- macOS (현재 사용자 환경)
- VS Code 또는 Cursor 설치
- **Claude Code 또는 Claude 호환 IDE 클라이언트** 인증 (유료 구독 또는 API 크레딧)
- pencil.dev 계정 (얼리 액세스 무료, 이메일/Google/GitHub 가입)

지원되는 Claude 클라이언트 (Pencil 공식 호환 목록):
- Claude Code (CLI 및 IDE)
- Claude Desktop
- Cursor
- Windsurf IDE
- Codex CLI
- Antigravity IDE
- OpenCode CLI

> 본 가이드는 **Cursor + Claude Code** 조합을 기본으로 한다. VS Code도 절차는 거의 동일.

---

## 2. 설치 단계

### Step 1. Cursor 설치 (없는 경우)
- https://www.cursor.com 에서 다운로드 → 설치 → 로그인

### Step 2. Claude Code 설치 / 인증
- Cursor 또는 터미널에서 Claude Code 설치
  ```bash
  curl -fsSL https://claude.ai/install.sh | bash
  ```
  또는 공식 문서 참조: https://docs.claude.com/claude-code
- 로그인:
  ```bash
  claude login
  ```

### Step 3. Pencil 설치
세 가지 옵션 중 하나:

**옵션 A — Cursor/VS Code 확장으로 설치 (가장 간단)**
1. Cursor에서 좌측 사이드바 **Extensions** 패널 열기
2. 검색창에 `Pencil` 입력
3. **High Agency**가 게시한 **Pencil** 확장 설치
4. Cursor 재시작

**옵션 B — Pencil 데스크톱 앱**
- https://www.pencil.dev/downloads 에서 macOS용 다운로드 → 설치
- 데스크톱 앱은 자체 캔버스 + IDE 연동 모두 지원

**옵션 C — Open VSX (VS Code OSS 빌드용)**
- https://open-vsx.org/extension/trypencildev/pencil-code-editor

### Step 4. Pencil 로그인
- 확장/앱 실행 후 로그인 (이메일/Google/GitHub)
- 무료 얼리 액세스 활성화 자동 적용

---

## 3. MCP 연동 설정

### Step 5. Pencil의 MCP 자동 설정 확인
- Pencil 설치 시 `MCP.json`이 자동으로 작성된다.
- **수동 확인 경로** (필요할 때만):
  - Cursor: `~/.cursor/mcp.json`
  - VS Code: `~/.config/Code/User/mcp.json` (OS별 상이)
- 다음과 비슷한 항목이 들어 있는지 확인:
  ```json
  {
    "mcpServers": {
      "pencil": {
        "command": "...",
        "args": [...]
      }
    }
  }
  ```

### Step 6. Pencil 내부에서 Claude Code 활성화
1. Pencil 앱/확장 → **Settings (설정)**
2. **Agents and MCP** 메뉴
3. **Claude Code** 항목을 찾아 **Enable** 토글

### Step 7. 시작 순서 (중요)
> ⚠ **반드시 다음 순서로 실행**: Pencil 먼저 → Claude Code 나중
>
> Claude Code를 먼저 실행하면 MCP 연결이 안 되고, Claude Code를 재시작해야 한다.

매번 작업을 시작할 때:
1. Pencil 앱/확장 먼저 켜기
2. 그 다음 Cursor에서 Claude Code 패널 열기

### Step 8. 연동 검증
- Cursor 안에서 Claude Code 채팅창에 다음 명령:
  ```
  /mcp
  ```
- 출력에 `pencil` 서버가 **Connected** 상태로 보이면 성공.
- 보이지 않으면:
  1. Pencil이 켜져 있는지 확인
  2. `mcp.json`에 pencil 항목이 있는지 확인
  3. Cursor 재시작 후 다시 시도

---

## 4. 가족채팅 프로젝트와 연결

### Step 9. 워크스페이스 열기
- Cursor에서 다음 폴더를 워크스페이스로 열기:
  ```
  /Users/lmh/Documents/Claude/Projects/가족채팅
  ```
- 이 폴더에는 이미 다음 문서들이 있어, IDE의 Claude가 컨텍스트로 읽을 수 있다:
  - `00_INDEX.md` — 프로젝트 개요
  - `01_PRD.md` — 제품 요구사항
  - `02_기능명세서.md` — 기능 상세
  - `03_기술설계서.md` — 아키텍처/스택
  - `04_와이어프레임.md` — 화면 명세 + 디자인 토큰

### Step 10. 첫 .pen 파일 만들기
- 프로젝트 루트 또는 `/design` 하위에 `.pen` 확장자로 새 파일 생성
- 권장 구조:
  ```
  가족채팅/
    ├─ 00_INDEX.md
    ├─ 01_PRD.md
    ├─ 02_기능명세서.md
    ├─ 03_기술설계서.md
    ├─ 04_와이어프레임.md
    ├─ 05_Pencil_연동_가이드.md  ← 본 문서
    └─ design/
       ├─ 01_design_system.pen   ← 컬러/타이포 토큰
       ├─ 02_components.pen      ← 공통 컴포넌트
       ├─ 03_screens_auth.pen    ← S01~S11
       ├─ 04_screens_main.pen    ← S12~S23
       └─ 05_flows.pen           ← User Flow
  ```

---

## 5. 권장 작업 흐름

### 흐름 1 — 디자인 시스템 먼저
1. `01_design_system.pen` 생성
2. Cmd/Ctrl + K → Claude에게 다음 프롬프트:
   ```
   /Users/lmh/Documents/Claude/Projects/가족채팅/04_와이어프레임.md 의 §1을 읽고,
   거기 정의된 컬러 토큰, 타이포그래피, 스페이싱, 모서리 반경, 공통 컴포넌트를
   이 캔버스에 디자인 시스템 라이브러리로 만들어줘.
   ```
3. Pencil이 Claude를 통해 캔버스에 토큰을 시각화

### 흐름 2 — 핵심 5개 화면부터
와이어프레임 문서의 화면 인벤토리에서 우선순위 5개:
- S12 홈
- S14 채팅방
- S16 지도
- S18 캘린더
- S20 학원 관리

각 화면을 새 .pen 파일/프레임으로:
```
04_와이어프레임.md 의 S12-HOME 섹션을 읽고
이 캔버스에 iPhone 14 (390×844) 프레임으로 그려줘.
컬러는 §1.2 컬러 토큰을, 타이포는 §1.3을 따라.
컴포넌트 명세 그대로 충실히.
```

### 흐름 3 — 디자인 → React Native 코드
Pencil 캔버스에서 디자인 완성 후:
```
이 프레임을 React Native + NativeWind 코드로 변환해줘.
03_기술설계서.md §3.1 폴더 구조의 src/features/home/ 아래에 저장.
기능명세서 §F1.5 에서 정의한 상태들(loading/empty/error)을 모두 구현.
```

### 흐름 4 — 다크 모드 변형
한 화면이 완성되면:
```
이 화면의 다크 모드 변형을 04_와이어프레임.md §1.2의 다크 컬럼대로 만들어줘.
```

---

## 6. Cowork와의 분업

| 작업 | 어디서 | 이유 |
|---|---|---|
| 문서 (PRD/기능명세/기술설계) 갱신 | Cowork | 멀티 문서 일관성 검증, AskUserQuestion으로 의사결정 |
| Open Questions 의사결정 | Cowork | 구조화된 질문 답변 UX |
| 시각 디자인 / .pen 파일 | IDE+Pencil | Pencil MCP 자체가 IDE 전제 |
| React Native 코드 생성 | IDE+Pencil 또는 IDE+Claude Code | 디자인 → 코드 전환은 IDE에서 |
| 코드 리뷰 / 리팩터링 | IDE+Claude Code | 코드 컨텍스트가 IDE에 있음 |
| 일반 질문 / 설명 | 아무 곳 | 둘 다 가능 |

같은 폴더(`가족채팅`)를 양쪽에서 열어두면, 한쪽에서 갱신한 문서를 다른 쪽이 즉시 참조한다.

---

## 7. 일반적인 트러블슈팅

### Q1. `/mcp` 명령에 pencil이 안 보인다
- 시작 순서 위반 가능성 (§3 Step 7) → Pencil 먼저 켜고 Claude Code 재시작
- `mcp.json`에 pencil 항목 누락 → Pencil 재설치 또는 수동 등록

### Q2. Pencil 캔버스에서 Cmd+K 눌러도 Claude가 응답 안 함
- Pencil 설정 → Agents and MCP에서 Claude Code 활성화 확인 (§3 Step 6)
- Claude Code 인증 만료 → `claude login` 다시 실행

### Q3. 한국어 폰트(Pretendard)가 캔버스에 적용 안 됨
- Pencil 캔버스에 시스템 폰트만 우선 사용 → export 시 또는 코드 변환 시 NativeWind에서 적용
- 또는 Pencil에 폰트 추가 (Settings → Fonts)

### Q4. .pen 파일을 Git에 어떻게 관리?
- .pen은 JSON 기반 텍스트 포맷이라 Git diff 가능
- 단, 큰 디자인 파일은 Git LFS 권장
- 가족채팅 폴더에 Git을 적용한다면 `design/` 하위는 `.gitattributes`로 LFS 설정

### Q5. 비용은?
- Pencil 자체: 얼리 액세스 무료 (출시 후 유료 전환 예상)
- Claude Code: 유료 구독 또는 API 크레딧 (사용량 기반)

---

## 8. 다음 액션 (체크리스트)

이 문서를 본 직후 따라하면 좋은 순서:

- [ ] Cursor (또는 VS Code) 설치 확인
- [ ] Claude Code 설치 + 로그인
- [ ] Pencil 확장 설치 + 로그인
- [ ] Pencil → Settings → Agents and MCP → Claude Code 활성화
- [ ] Pencil 켜고, Cursor에서 가족채팅 폴더 열기
- [ ] `/mcp` 로 연결 확인
- [ ] `design/01_design_system.pen` 생성하고 §5 흐름 1 실행
- [ ] S12 홈 화면부터 순차 디자인

---

## 9. 참고 링크

- Pencil 공식 사이트: https://www.pencil.dev/
- Pencil 다운로드: https://www.pencil.dev/downloads
- Pencil 문서: https://docs.pencil.dev/
- Pencil VS Code 확장: https://marketplace.visualstudio.com/items?itemName=highagency.pencildev
- Pencil Open VSX: https://open-vsx.org/extension/trypencildev/pencil-code-editor
- Claude Code 문서: https://docs.claude.com/claude-code
- MCP 표준 문서: https://modelcontextprotocol.io
