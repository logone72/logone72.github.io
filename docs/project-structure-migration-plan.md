# Project Structure Migration Plan

## 목적

현재 프로젝트는 VitePress 단일 사이트로 구성되어 있다. 앞으로는 루트 경로(`/`)에 별도 홈 페이지를 제공하고, 기존 블로그는 `/blog` 하위 경로에서 VitePress로 제공하는 구조로 전환한다.

이번 작업의 핵심 목표는 다음과 같다.

- 루트 홈과 블로그의 빌드 책임을 분리한다.
- 홈 앱은 Vue에 종속되지 않아도 되며, 필요하면 vanilla JavaScript 또는 TypeScript 기반 Vite 앱으로 구성한다.
- 각 앱에서 사용하지 않는 패키지가 브라우저 번들에 포함되지 않도록 import 경계를 명확히 한다.
- 기존 검색 색인과 이전 URL 보존은 이번 마이그레이션의 필수 요구사항에서 제외한다.
- VitePress 패키지를 먼저 최신화하고, 변경된 규칙이나 빌드 동작을 확인한 뒤 구조 변경을 진행한다.

## 마이그레이션 전 구조

마이그레이션 전 구조의 주요 특징은 다음과 같다.

- `package.json`의 실행 스크립트는 `vitepress dev docs`, `vitepress build docs`, `vitepress preview docs` 중심이다.
- VitePress 설정은 `docs/.vitepress/config.ts`에 있다.
- 실제 마크다운 콘텐츠는 `posts`에 있고, VitePress는 `srcDir: '../posts'`로 이를 읽는다.
- GitHub Actions는 `docs/.vitepress/dist`를 GitHub Pages artifact로 업로드한다.
- 현재 루트(`/`)도 VitePress의 `posts/index.md` 홈 화면이 담당한다.

## 목표 구조

마이그레이션 후에는 다음 구조를 목표로 한다.

```text
.
├── apps
│   ├── home
│   │   ├── index.html
│   │   ├── dist
│   │   └── src
│   └── blog
│       └── .vitepress
│           └── dist
├── content
│   └── blog
├── docs
│   └── project-structure-migration-plan.md
├── scripts
│   └── build.mjs
├── dist
│   ├── index.html
│   ├── assets
│   └── blog
└── package.json
```

역할은 다음처럼 나눈다.

- `apps/home`: 루트(`/`) 홈 페이지를 담당한다.
- `apps/blog`: VitePress 설정과 블로그 빌드 책임을 담당한다.
- `content/blog`: 블로그 원문 마크다운과 public asset을 담당한다.
- `apps/home/dist`: 홈 앱의 독립 빌드 산출물이다.
- `apps/blog/.vitepress/dist`: 블로그 앱의 독립 빌드 산출물이다.
- `dist`: GitHub Pages에 배포할 최종 통합 산출물이다.
- `scripts/build.mjs`: 앱별 빌드 산출물을 최종 `dist`로 조립한다.

## 기술 선택

홈 앱은 우선 vanilla Vite 앱으로 시작하는 것을 기본안으로 둔다.

이유는 다음과 같다.

- 루트 홈이 단순한 개인 소개, 프로젝트 링크, 블로그 진입점 정도라면 Vue 런타임이 필수는 아니다.
- VitePress는 내부적으로 Vue를 사용하지만, 홈 앱이 Vue를 import하지 않으면 홈 브라우저 번들에 Vue가 포함되지 않는다.
- 추후 홈에 복잡한 상태나 컴포넌트 구조가 필요해지면 Vue, React, Astro 등으로 바꿀 수 있다.

의존성 관리는 두 단계로 접근한다.

- 1차: root `package.json`에서 공통 스크립트를 관리하고, 각 앱의 번들 경계는 import 기준으로 분리한다.
- 2차: 앱별 의존성 경계가 더 중요해지면 npm workspaces로 `apps/home`과 `apps/blog`의 `package.json`을 분리한다.

현재 규모에서는 1차 접근으로 시작해도 충분하다.

## 진행 순서

### 1. VitePress 최신화

구조를 바꾸기 전에 VitePress를 먼저 최신화한다.

확인할 항목은 다음과 같다.

- `vitepress@next` 또는 현재 2.x alpha 라인의 최신 버전으로 업데이트한다.
- lockfile 변경을 확인한다.
- `npm run build`가 통과하는지 확인한다.
- `npm run markdownlint`가 통과하는지 확인한다.
- VitePress changelog에서 현재 프로젝트에 영향을 줄 수 있는 breaking change를 확인한다.
- `vitepress-sidebar`와 최신 VitePress 조합에 문제가 없는지 확인한다.

주의할 변경 가능성은 다음과 같다.

- markdown 처리 규칙 변경
- local search index 생성 방식 변경
- theme CSS 또는 기본 레이아웃 변경
- Vite 버전 상승에 따른 Node.js 요구사항 변경
- snippet include 또는 markdown extension 동작 변경

### 2. 블로그 경로를 `/blog`로 전환

VitePress 설정을 `/blog` 하위 배포에 맞춘다.

필수 변경 사항은 다음과 같다.

- VitePress config에 `base: '/blog/'`를 추가한다.
- `srcDir`를 새 콘텐츠 경로에 맞춰 조정한다.
- VitePress의 독립 빌드 산출물은 `apps/blog/.vitepress/dist`에 둔다.
- 블로그 nav에서 루트 홈으로 돌아가는 링크와 블로그 인덱스 링크를 명확히 분리한다.
- `sitemap.hostname`이 최종 URL을 올바르게 생성하는지 확인한다.

기존 URL 보존은 이번 범위에서 제외한다.

이유는 현재 Google Search Console 등록이 정상적으로 되지 않았고, 기존 검색 색인 이관을 우선순위로 두지 않기 때문이다. 필요해지면 이후에 정적 redirect HTML 또는 404 기반 fallback을 별도 작업으로 추가한다.

### 3. 콘텐츠 위치 정리

현재 `posts`를 `content/blog`로 이동하는 것을 목표로 한다.

이동 후에는 다음 기준을 적용한다.

- `content/blog/index.md`는 `/blog/` 인덱스로 사용한다.
- 기존 `posts/public`은 VitePress public directory로 계속 동작하도록 위치를 맞춘다.
- 이미지와 내부 링크가 `base: '/blog/'` 기준에서 정상 동작하는지 확인한다.
- 한글 파일명과 clean URL 조합이 빌드 결과에서 정상 동작하는지 확인한다.

### 4. 홈 앱 추가

`apps/home`에 루트 홈 페이지를 만든다.

초기 기준은 다음과 같다.

- Vite vanilla template 수준의 가벼운 구조로 시작한다.
- 라우터는 처음부터 넣지 않는다.
- 루트 홈에서 블로그 진입 링크는 `/blog/`를 사용한다.
- 홈 앱의 독립 빌드 산출물은 `apps/home/dist`에 둔다.

라우터는 다음 조건이 생기면 도입한다.

- `/projects`, `/about`, `/resume` 같은 독립 하위 페이지가 필요하다.
- 페이지 간 상태 유지나 클라이언트 전환 경험이 중요해진다.
- GitHub Pages fallback과 refresh 대응 전략을 함께 설계할 수 있다.

### 5. 최종 빌드 파이프라인 구성

각 앱은 독립적으로 빌드하고, 최종 배포는 하나의 루트 `dist`로 조립한다. 이 방식을 기본안으로 확정한다.

이 구조를 사용하면 홈 앱과 VitePress 블로그를 각각 별도로 빌드하고 preview할 수 있다. 동시에 GitHub Pages에는 하나의 정적 사이트 artifact만 업로드할 수 있다.

앱별 산출물은 다음 위치를 기준으로 한다.

```text
apps/home/dist
apps/blog/.vitepress/dist
```

최종 통합 산출물은 다음 위치를 기준으로 한다.

```text
dist
├── index.html
├── assets
└── blog
    ├── index.html
    └── assets
```

빌드 흐름은 다음과 같다.

```text
npm run build
├── clean dist
├── npm run build:home
│   └── apps/home/dist
├── npm run build:blog
│   └── apps/blog/.vitepress/dist
└── npm run assemble
    ├── copy apps/home/dist/* to dist/*
    └── copy apps/blog/.vitepress/dist/* to dist/blog/*
```

개별 빌드 명령은 다음처럼 분리한다.

```text
npm run build:home
npm run build:blog
```

개별 preview 명령도 다음처럼 분리한다.

```text
npm run preview:home
npm run preview:blog
```

`npm run build:blog`는 VitePress만 따로 검증할 수 있어야 한다. 따라서 VitePress의 기본 산출물 위치인 `.vitepress/dist`를 유지하고, 최종 배포 경로인 `dist/blog`로 직접 출력하지 않는다.

### 6. GitHub Actions 변경

현재 GitHub Actions는 `docs/.vitepress/dist`를 배포한다. 마이그레이션 후에는 최종 `dist`를 업로드하도록 변경한다.

변경할 항목은 다음과 같다.

- install 단계는 기존처럼 `npm ci`를 유지한다.
- build 단계는 최종 통합 빌드인 `npm run build`를 실행한다.
- artifact path는 `dist`로 변경한다.
- Node.js 버전은 로컬과 CI가 일치하도록 정한다.

## 검증 항목

구조 변경 후에는 다음을 확인한다.

- `npm run build`가 통과한다.
- `npm run markdownlint`가 통과한다.
- `npm run preview` 또는 별도 preview 명령으로 루트(`/`)가 홈 앱을 보여준다.
- `/blog/`가 VitePress 블로그 인덱스를 보여준다.
- `/blog/아티클/...` 형태의 글 URL이 정상 접근된다.
- `/blog/assets/...` 정적 자산이 정상 로드된다.
- `/blog/sitemap.xml` 또는 최종 sitemap 경로가 의도대로 생성된다.
- 홈 앱 번들에 Vue 또는 VitePress 런타임이 불필요하게 포함되지 않는다.
- 블로그 댓글 컴포넌트가 `/blog` 경로 기준으로 의도한 issue term을 생성한다.

## 별도 고려 사항

### 댓글 경로

현재 utterances는 `issue-term="pathname"`을 사용한다. 블로그 경로가 `/blog/...`로 바뀌면 댓글 이슈 매핑도 바뀐다.

기존 댓글을 유지할 필요가 없다면 그대로 둬도 된다. 유지가 필요하면 `issue-term`을 `title` 또는 다른 기준으로 변경하는 방안을 검토한다.

### Google Search Console

기존 검색 색인 보존은 고려하지 않지만, 새 구조 배포 후 Search Console 등록 실패 원인은 따로 확인하는 것이 좋다.

확인할 항목은 다음과 같다.

- `robots.txt`
- `sitemap.xml`
- GitHub Pages 배포 URL
- URL-prefix 속성 등록 여부
- canonical URL
- 루트 홈과 `/blog`의 meta description

### 앱별 의존성

브라우저 번들은 import graph 기준으로 생성된다. 따라서 root에 Vue와 VitePress가 설치되어 있어도 홈 앱이 이를 import하지 않으면 홈 번들에는 포함되지 않는다.

다만 다음 상황이 생기면 workspaces 전환을 검토한다.

- 앱별 dependency audit을 분리하고 싶다.
- 홈 앱과 블로그 앱의 devDependency 버전 충돌이 생긴다.
- 앱별 배포 또는 CI를 독립시키고 싶다.
- 홈 앱이 별도 프레임워크를 사용하면서 설정 복잡도가 올라간다.

## 완료 기준

이번 마이그레이션은 다음 상태가 되면 완료로 본다.

- 루트(`/`)는 별도 홈 앱이 담당한다.
- `/blog/`는 VitePress가 담당한다.
- 최종 GitHub Pages artifact는 `dist` 하나로 통합된다.
- VitePress는 최신화된 버전에서 빌드된다.
- 홈 앱 번들은 블로그 전용 런타임을 포함하지 않는다.
- 기존 URL redirect 없이도 새 구조에서 모든 주요 페이지가 정상 접근된다.
