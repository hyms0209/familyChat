# Pretendard 폰트 파일

이 디렉토리에 Pretendard 폰트 파일을 추가하세요.

## 폰트 다운로드

1. Pretendard 폰트 GitHub에서 다운로드: https://github.com/orioncactus/pretendard
2. 또는 CDN에서 다운로드: https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/packages/pretendard/dist/web/static/woff2/

## 필요한 폰트 파일

다음 폰트 파일들을 이 디렉토리에 추가하세요:

- `Pretendard-Regular.ttf` (또는 `.otf`)
- `Pretendard-Medium.ttf`
- `Pretendard-SemiBold.ttf`
- `Pretendard-Bold.ttf`

## 폰트 변환 (필요시)

WOFF2 파일을 다운로드한 경우, TTF로 변환해야 할 수 있습니다.
온라인 변환 도구를 사용하거나 다음 명령어를 사용할 수 있습니다:

```bash
# woff2를 ttf로 변환 (woff2-tools 필요)
woff2_decompress Pretendard-Regular.woff2 Pretendard-Regular.ttf
```

## 참고

폰트 파일이 없으면 앱은 시스템 폰트를 사용합니다.
