# AGENTS.md

## 개발 목적

- home: 프론트엔드 개발자 홈 페이지
- blog: 프론트엔드 개발자 블로그

## 작업 기준

- 문서는 한국어로 작성합니다.
- 사용자가 명시적으로 요청하지 않는 한 앱별 `package.json`이나 npm
  workspaces를 추가하지 않습니다.
- 기존 URL redirect는 사용자가 요청하기 전까지 추가하지 않습니다.
- 생성 산출물인 `dist`, `apps/home/dist`, `apps/blog/.vitepress/dist`,
  `apps/blog/.vitepress/cache`는 커밋하지 않습니다.

## 앱 구조 규칙

- `apps/home`은 루트 경로(`/`)를 담당하는 vanilla Vite 앱입니다.
- 홈의 다국어 문구와 경력·기술 스택 데이터는
  `apps/home/src/content.ts`에서 관리합니다.
- 홈 기능을 수정할 때 `apps/blog`와 `content/blog`의 VitePress 구현은
  변경하지 않습니다.
- `apps/blog`는 `/blog/`를 담당하는 VitePress 앱입니다.
- `content/blog`는 블로그 마크다운과 VitePress public 자산을 담습니다.
- 사이트 경로 상수와 URL helper는 `src/router`에서 관리합니다.
- VitePress config의 `base: '/blog/'`를 유지합니다.
- 루트 `robots.txt`는 `https://logone72.github.io/sitemap.xml`을
  가리켜야 합니다.

## 개발 서버 규칙

- `npm run dev`는 사이트 gateway, 홈, 블로그 개발 서버를 함께 실행합니다.
- 사이트 gateway 개발 서버는 `5173` 포트를 사용합니다.
- 블로그 개발 서버는 `5174` 포트를 사용합니다.
- 홈 개발 서버는 격리 실행 시 `5175` 포트를 사용합니다.
- 사이트 gateway Vite 서버는 `/` 요청을 홈 개발 서버로, `/blog` 요청을
  VitePress 개발 서버로 proxy합니다.
- 한쪽 앱만 격리해서 볼 때만 `npm run dev:home`, `npm run dev:blog`,
  `npm run dev:site`를 사용합니다.

## 빌드 규칙

- `npm run build:home`은 `apps/home/dist`를 생성합니다.
- `npm run build:blog`는 `apps/blog/.vitepress/dist`를 생성합니다.
- `npm run assemble`은 두 산출물을 최종 루트 `dist`로 복사합니다.
- 조립 시 VitePress sitemap에 홈의 `/`와 `/ko/`를 합쳐
  `dist/sitemap.xml`을 생성합니다.
- VitePress가 루트 `dist/blog`로 직접 출력되도록 설정하지 않습니다.
- `npm run build` 결과에는 `dist/index.html`, `dist/ko/index.html`,
  `dist/blog/index.html`, `dist/sitemap.xml`이 있어야 합니다.

## 검증

구조나 빌드와 관련된 작업을 마치기 전에는 다음 명령어를 실행합니다.

```sh
npm run build
npm run markdownlint
```

개발 서버 관련 변경이라면 다음 URL도 확인합니다.

```text
http://localhost:5173/
http://localhost:5173/blog/
```

## 에이전트 파일 미러

이 저장소에서 `AGENTS.md`를 만들거나 유지보수할 때는 반드시 `CLAUDE.md`도
`AGENTS.md`를 가리키는 심볼릭 링크로 함께 만들어야 합니다.

`CLAUDE.md`를 별도 복사본으로 관리하지 마세요. 에이전트 지침이 서로
어긋나지 않도록 항상 심볼릭 링크 상태를 유지해야 합니다.
