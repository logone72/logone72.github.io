# logone72.github.io

Logone72의 개인 홈과 개발 블로그입니다.

- `/`: vanilla Vite 기반 영문 홈
- `/ko/`: vanilla Vite 기반 한국어 홈
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
src/router/    # 사이트 라우트 상수, URL helper, 개발 gateway
scripts/       # 개발 서버 실행과 배포 산출물 조립 스크립트
```

최종 배포 산출물은 `npm run build`로 생성되는 루트 `dist/`입니다.

홈의 영문·한국어 문구, 경력 타임라인, 기술 스택 뱃지는
`apps/home/src/content.ts`에서 관리합니다. 현재 경력은 교체를 전제로 한 임시
데이터입니다. 초기 Canvas 애니메이션은 `apps/home/src/intro.ts`, 화면 구성과
테마·스크롤 동작은 `apps/home/src/main.ts`와 `apps/home/src/style.css`에서
관리합니다.

## 명령어

```sh
npm run dev           # 사이트 gateway, 홈, 블로그 개발 서버를 함께 실행
npm run build         # 최종 dist/ 생성
npm run preview       # 최종 dist/ 미리보기
npm run markdownlint  # 마크다운 검사
```

주요 스크립트 역할은 다음과 같습니다.

| 스크립트 | 역할 |
| --- | --- |
| `dev` | `dev:site`, `dev:home`, `dev:blog`를 함께 실행 |
| `dev:site` | 개발용 site gateway 실행. 배포 빌드에는 사용하지 않음 |
| `dev:home` | 홈 앱만 `5175` 포트에서 실행 |
| `dev:blog` | 블로그 앱만 `5174` 포트에서 실행 |
| `build` | 홈과 블로그를 빌드한 뒤 최종 `dist/`로 조립 |
| `assemble` | `apps/home/dist`와 `apps/blog/.vitepress/dist`를 `dist/`에 복사 |

개발 서버 주소는 다음과 같습니다.

```text
http://localhost:5173/       # 사이트 gateway -> 홈
http://localhost:5173/ko/    # 사이트 gateway -> 한국어 홈
http://localhost:5173/blog/  # 사이트 gateway -> 블로그
http://localhost:5175/       # 홈 직접 접근
http://localhost:5174/blog/  # VitePress 직접 접근
```

앱별 명령어가 필요하면 `build:home`, `build:blog`, `preview:home`,
`preview:blog`도 사용할 수 있습니다.

## 배포

GitHub Actions는 `npm run build`를 실행하고 최종 `dist/`를 GitHub Pages에
배포합니다. 조립 과정에서 VitePress sitemap에 `/`와 `/ko/`를 합쳐
`dist/sitemap.xml`을 생성합니다.

개발용 site gateway 설정(`src/router/dev-gateway.vite.config.ts`)은
`npm run dev`와 `npm run dev:site`에서만 사용합니다.
