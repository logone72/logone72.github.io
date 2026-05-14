# logone72.github.io

Logone72의 개인 홈과 개발 블로그입니다.

- `/`: vanilla Vite 기반 홈
- `/blog/`: VitePress 기반 블로그

## 링크

<https://logone72.github.io/>

## 요구사항

- Node.js 22 이상
- npm

## 구조

```text
apps/home/     # 루트 홈 앱
apps/blog/     # VitePress 블로그 앱
content/blog/  # 블로그 마크다운과 public 자산
src/router/    # 사이트 라우트 상수와 URL helper
scripts/       # 개발 서버 실행과 배포 산출물 조립 스크립트
```

최종 배포 산출물은 `npm run build`로 생성되는 루트 `dist/`입니다.

## 명령어

```sh
npm run dev           # 홈과 블로그 개발 서버를 함께 실행
npm run build         # 최종 dist/ 생성
npm run preview       # 최종 dist/ 미리보기
npm run markdownlint  # 마크다운 검사
```

개발 서버 주소는 다음과 같습니다.

```text
http://localhost:5173/       # 홈
http://localhost:5173/blog/  # 블로그
http://localhost:5174/blog/  # VitePress 직접 접근
```

앱별 명령어가 필요하면 `dev:home`, `dev:blog`, `build:home`,
`build:blog`, `preview:home`, `preview:blog`를 사용할 수 있습니다.

## 배포

GitHub Actions는 `npm run build`를 실행하고 최종 `dist/`를 GitHub Pages에
배포합니다.
