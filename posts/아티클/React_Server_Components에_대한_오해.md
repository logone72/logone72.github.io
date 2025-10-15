---
description: React Server Components(RSC)가 풀스택 프레임워크가 아닌 렌더링 모델임을 이해하고, React 19와 Next.js App Router의 관계를 명확히 알아봅니다.
titleTemplate: logone72
---

# React Server Components에 대한 오해

![](https://res.cloudinary.com/ddxwdqwkr/image/upload/f_auto/v1617437062/patterns.dev/reactServerComponents.png)

**React Server Components(RSC)** 라는 명칭을 보면서 아래와 같은 궁금증이 개인적으로 생겼었습니다.

> “React가 풀스택 프레임워크가 된 건가?”

하지만 실제로 React 19를 조금만 자세히 들여다보면, 이야기가 달랐습니다.  
React는 여전히 **UI 라이브러리**이고, 풀스택의 모든 부분을 담당하는 건 **Next.js** 같은 프레임워크의 몫입니다.

다만, 이번에는 그 둘이 훨씬 더 깊게 연결되었습니다.  

React가 직접 “서버-클라이언트 경계를 어떻게 정의하고, 어떤 데이터를 주고받을지”에 대한 **표준 언어**를 만든 것이죠.

## RSC는 새로운 프레임워크가 아니라 “렌더링 모델”입니다

RSC는 “React가 서버에서 돌아가는 새로운 버전”이 아닙니다.  
그보다는, **React 컴포넌트를 어디에서, 어떤 방식으로 렌더링할지 정의한 모델**이라고 이해하시면 좋습니다.

핵심 개념은 단순합니다.

> “일부 React 컴포넌트는 브라우저가 아니라 서버에서 렌더링할 수 있다.”

여기서 서버란 웹 서버만을 지칭하지 않습니다. **Server Component**는 번들링 전에 클라이언트 애플리케이션 또는 SSR 서버와 분리된 환경에서 컴포넌트를 미리 렌더링할 수 있는 새로운 옵션입니다. 이 별도의 환경이 RSC에서 **“서버”** 입니다.

예를 들어 아래 코드를 보겠습니다.

```tsx
// app/page.tsx
import UserCard from './UserCard';

export default async function Page() {
  const user = await fetch('https://api.example.com/me').then(r => r.json());
  return (
    <main>
      <h1>Hello, {user.name}</h1>
      <UserCard />
    </main>
  );
}
```

이 컴포넌트는 **Server Component**로 동작합니다.  
데이터 패칭(`fetch`)은 서버에서 이루어지고, React는 이 컴포넌트를 서버에서 렌더링한 뒤 그 결과를 브라우저로 스트리밍합니다.

이때 브라우저로 전송되는 건 완성된 HTML이 아니라, **RSC Payload(Flight Data)** 라는 React 고유의 데이터 포맷입니다. React DOM은 서버에서 전달된 RSC Payload를 해석해, 클라이언트에서 이미 로드된 컴포넌트 트리와 병합합니다.

즉, RSC는 전통적인 SSR(Server-Side Rendering)과는 다릅니다.  

전통적인 SSR은 서버에서 HTML을 완성해 보내지만, RSC는 서버에서 React 트리를 렌더링하고, 그 결과를 Flight 포맷으로 직렬화해 브라우저로 전송합니다. 브라우저에서는 이 데이터를 React DOM이 해석해 클라이언트 트리와 병합(hydration과 유사하지만 다른)합니다.

## RSC는 SSR을 대체하는 것인가요?

그렇다면 RSC를 사용하면 이제 SSR이 필요 없을까요? 그렇지 않습니다.

실제로는 **RSC와 SSR은 서로 다른 층(layer)에 존재하는 개념**입니다.

SSR은 **“어디서 HTML을 생성하느냐”** 에 관한 이야기이고, RSC는 **“어디서 어떤 컴포넌트를 실행하느냐”** 에 관한 이야기입니다.

즉, SSR은 렌더링 결과물(HTML)의 생성 위치를 다루고, RSC는 렌더링 과정에서의 **컴포넌트 실행 위치(서버 vs 클라이언트)** 를 다룹니다.

그래서 RSC를 사용한다고 해서 SSR이 사라지는 것은 아닙니다.  

대신 두 기술은 **서로를 보완하며 함께 동작**합니다.  

예를 들어, SSR은 첫 화면의 HTML을 빠르게 전달하고, RSC는 그 안의 React 트리를 서버에서 효율적으로 렌더링해 스트리밍합니다.

## React 19가 “RSC를 지원한다”는 말의 의미

React 19가 RSC를 안정적으로 지원한다는 건 이제 React 자체가 서버에서 날아오는 RSC 데이터를 **이해하고 조립할 수 있는 런타임**을 내장하게 되었다는 뜻입니다.

React 19에는 이런 기능들이 새롭게 들어왔습니다.

- **RSC Payload(Flight protocol) 디코딩 기능**
- **`react-server` export condition** (서버 전용 모듈 인식)
- **`use` 훅** (Promise를 `Suspense`와 함께 다루기)
- **Server Actions** (클라이언트에서 서버 함수를 호출)
- **`<form action>` 통합** (서버 액션과 폼 제출 연결)
- **스타일 및 메타데이터 호이스팅** (SSR과 CSR 간 일관성 보장)

이 모든 것은 프레임워크가 구현하기 위한 **표준 인터페이스**로 제공됩니다. 즉, React 19는 이제 “RSC를 해석하고 관리할 수 있는 공통 엔진”을 갖게 된 것입니다.

## 프레임워크는 여전히 필요합니다

React가 RSC의 표준을 제시했다고 해서, React 혼자서 모든 걸 처리하는 것은 아닙니다.  

다음과 같은 부분들은 여전히 프레임워크나 번들러가 담당합니다.

| 역할                                 | 담당                       |
| ---------------------------------- | ------------------------ |
| 라우팅 및 페이지 구성                       | Next.js, Remix           |
| 서버 실행 및 스트리밍 응답                    | Next.js                  |
| 번들 분리 (`use client`, `use server`) | Webpack, Vite, Turbopack |
| 캐싱, 재검증, 데이터 패칭                    | 프레임워크                    |
| 빌드 및 배포                            | 인프라 도구들                  |

React는 **“표준 언어”를 제공**하고, 그 언어로 “앱”을 구성하는 것은 프레임워크의 일입니다.  

이 점에서 React는 여전히 **“UI 라이브러리”** 의 철학을 유지하고 있습니다.

## Next.js App Router: RSC의 첫 번째 실험실

Next.js가 **App Router**를 발표했을 때, 그건 사실 React Server Component를 세상에서 가장 먼저, 그리고 가장 깊이 실험한 사례였습니다.

App Router는 React 18을 기반으로 만들어졌지만, RSC는 당시 React 18의 정식 API가 아니었습니다.  
그래서 Next.js는 React의 **canary(실험)** 버전을 직접 가져다 썼습니다.

```perl
next@13
└── react@canary
    ├─ RSC 런타임(Flight 디코더)
    ├─ use() 훅
    ├─ Server Actions
    └─ use server / use client
```

즉, App Router는 React의 공식 API를 쓰지 않고, React 내부 코드를 직접 활용했던 일종의 **실험적 구현체**였습니다.  

그래서 “안정 버전”이 아닌 “실험적 기능”으로 분류될 수밖에 없었습니다.

## React 19에서 App Router가 완전히 자리를 잡았습니다

React 19에서는 Next.js가 실험적으로 의존하던 기능들이 모두 React의 정식 API로 편입되었습니다.

|기능|React 18 시절|React 19 이후|
|---|---|---|
|RSC payload 디코딩|Next.js 내부 구현|React DOM 내장|
|`use` 훅|실험적|정식|
|Server Actions|실험적|정식|
|`react-server` 조건|없음|정식|
|`<form action>` 통합|Next.js 전용|React DOM 지원|
|메타데이터/스타일 호이스팅|Next.js 내부 처리|React DOM 내장|

이제 App Router는 React의 정식 버전만으로도 안정적으로 작동합니다.  
React와 Next.js가 각자 독립적으로 발전하면서도, **RSC라는 표준 언어로 완전히 호환**되는 구조가 된 것입니다.

## React와 Next.js의 역할이 다시 명확해졌습니다

React 19 이후 두 프로젝트의 관계는 다음과 같이 정리됩니다.

|계층|역할|담당|
|---|---|---|
|React Core|RSC 런타임, Flight 프로토콜, Suspense, Server Actions 등|React|
|Integration Layer|RSC 렌더링, 스트리밍, 번들 매핑|Next.js|
|Routing & Data Layer|파일 라우팅, 캐싱, 데이터 패칭|Next.js|
|Build & Infra|번들링, 배포, 캐시 관리|Next.js / Vercel|

React는 이제 RSC의 실행 모델을 공식적으로 제공하고, Next.js는 그 위에 “앱을 어떻게 구성하고, 사용자에게 어떻게 보여줄지”를 책임집니다.  

두 프로젝트가 자연스럽게 분업 구조를 완성한 셈입니다.

## React는 프레임워크가 아니라 “표준”을 만듭니다

Meta(페이스북) 팀이 React를 만들 때부터 지켜온 원칙이 있습니다.

> “React는 View Layer만 담당한다.”

그 말은 지금도 그대로 이어지고 있습니다.
React는 **직접 앱을 만들지 않습니다.**  
대신 **앱을 만드는 사람들이 모두 같은 방식으로 React를 사용할 수 있도록** 기반을 다집니다.

RSC 역시 그런 시도의 연장선에 있습니다.  
서버와 클라이언트의 경계를 React의 언어로 표현하고, 그 위에서 여러 프레임워크가 자유롭게 풀스택을 구현할 수 있도록 한 것이죠.

## 정리하며

React Server Component는 “React가 풀스택이 된 기술”이 아닙니다.  
그보다는, “풀스택 프레임워크들이 React스럽게 동작할 수 있도록 만든 표준화된 모델”에 가깝습니다.

React 19는 Next.js App Router가 보여준 실험을 정식화했습니다.  
Next.js는 이제 React의 정식 런타임 위에서 작동하며, 다른 프레임워크(예: Remix, React Router)도 같은 방식으로 RSC를 구현할 수 있게 되었습니다.

결국 RSC의 진짜 의미는 아래와 같이 요약할 수 있습니다.

> React는 모든 걸 직접 만들지 않습니다.  
> 대신, 모두가 React 위에서 같은 방식으로 만들 수 있도록 돕습니다.


## 출처 및 참조

- https://ko.react.dev/blog/2024/12/05/react-19
- https://react.dev/reference/rsc/server-components
- https://react.dev/reference/rsc/server-functions
- https://www.joshwcomeau.com/react/server-components