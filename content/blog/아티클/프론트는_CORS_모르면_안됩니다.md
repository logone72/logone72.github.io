---
description: CORS 에러가 발생했을 때, 정확히 알아야 쉽게 해결할 수 있습니다. SOP, Preflight, 보안 개념등, CORS 에 대해서 정리합니다.
titleTemplate: logone72
---

# 프론트는 CORS 모르면 안됩니다

![fetching page CORS](https://mdn.github.io/shared-assets/images/diagrams/http/cors/fetching-page-cors.svg)

프론트엔드 개발을 하다 보면, API를 연결하는 순간 이런 문구를 한 번쯤은 보셨을 겁니다.

> **"Access to fetch at '<https://api.example.com>' from origin '<http://localhost:3000>' has been blocked by CORS policy..."**

이 에러는 프론트엔드 개발자에게 가장 흔하면서도, 가장 많은 오해를 받는 문제입니다.  

문제가 발생했을때 대부분의 경우, 서버 설정을 수정해야 해결이 가능합니다.

하지만 "이건 백엔드가 설정을 안 해줘서 그래요"라고 말하면 왠지 책임 회피처럼 들리고, "프록시 돌리면 되지 않나요?"라고 하면 임시방편 같아 보이기도 합니다.

하지만 CORS 에 대해서 정확히 알고 있다면 이런 고민을 줄일 수 있습니다.

CORS가 왜 생기고 어떻게 해결해야 하는지를 정리해보겠습니다.

## CORS란?

CORS(Cross-Origin Resource Sharing)는 이름 그대로 **서로 다른 출처(origin) 간 리소스 공유를 통제하는 규칙**입니다.  

그런데 이걸 이해하려면 먼저 같은 출처(Same-Origin)라는 개념을 알아야 합니다.

### **동일 출처 정책(Same-Origin Policy, SOP)**

브라우저는 아주 오래전부터 **Same-Origin Policy(SOP)** 라는 보안 정책을 가지고 있습니다.  
이 정책은 "한 웹사이트에서 로드된 스크립트가, 다른 **출처(origin)** 의 데이터에 마음대로 접근하지 못하도록" 막는 규칙입니다.

즉, 오늘날의 브라우저에서는 클라이언트가 **자신의 URL과 동일한 오리진의 리소스**로만 요청을 보낼 수 있습니다.  
클라이언트 URL의 **프로토콜**, **도메인**, **포트 번호**가 모두 일치해야 동일한 출처로 간주됩니다.

### **출처(origin)의 구성 요소**

출처는 다음 세 가지 요소로 정의됩니다.

```
프로토콜 + 도메인 + 포트
```

예를 들어,

- `http://localhost:3000`
- `http://localhost:8080`

이 둘은 **포트가 다르기 때문에 다른 출처**입니다.

### **출처 비교 예시**

아래는 클라이언트 URL `http://store.aws.com/dir/page.html`을 기준으로 한 예시입니다.

| URL                                         | 결과    | 이유                  |
| ------------------------------------------- | ----- | ------------------- |
| `http://store.aws.com/dir2/new.html`        | 동일 출처 | 경로만 다름              |
| `http://store.aws.com/dir/inner/other.html` | 동일 출처 | 경로만 다름              |
| `https://store.aws.com/page.html`           | 다른 출처 | 프로토콜 다름             |
| `http://store.aws.com:81/dir/page.html`     | 다른 출처 | 포트 다름 (기본 포트 80 아님) |
| `http://news.aws.com/dir/page.html`         | 다른 출처 | 호스트 다름              |

### **왜 이런 정책이 필요한가?**

브라우저는 왜 출처가 다른 요청을 차단하는 정책을 채택했을까요?

예를 들어,

- 브라우저에서 `https://bank.com`에 로그인한 상태에서  
- 동시에 다른 탭에서 `https://evil.com`이 실행 중이라면,  
  `evil.com`이 `bank.com`의 API에 몰래 요청을 보낼 수 있습니다.

SOP는 이런 공격(특히 CSRF, 세션 탈취 등)을 막기 위해 탄생했습니다.

### **CORS의 등장**

그런데 개발자 입장에서는 이 정책 때문에, 정작 내가 의도적으로 사용하는 **백엔드 API조차 호출이 막히는** 불편을 겪게 되는 겁니다.

그래서 등장한 게 바로 **CORS**입니다.  

즉, 예외적으로 믿을 수 있는 출처만 허용하자는 협약입니다.

## CORS의 동작 원리 (Simple Request vs Preflight)

CORS 요청에는 두 가지 타입이 있습니다.

**"안전한 요청"은 바로 보내고, "잠재적으로 위험할 수도 있는 요청"은 먼저 허락을 받는 구조**로 되어 있습니다.

### Simple Request

아래의 일부 조건을 만족하면, 브라우저는 바로 메인 요청을 보냅니다.

- GET, POST, HEAD 메서드 중 하나
- 아래 헤더만 수동으로 수정한 요청 (사용자 에이전트가 자동으로 설정한 헤더 제외)
  - [`Accept`](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Headers/Accept)
  - [`Accept-Language`](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Headers/Accept-Language)
  - [`Content-Language`](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Headers/Content-Language)
  - [`Range`](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Headers/Range) (오직 [단순 범위 헤더 값](https://fetch.spec.whatwg.org/#simple-range-header-value), 예를 들어 `bytes=256-` 혹은 `bytes=127-255`)
  - [`Content-Type`](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Headers/Content-Type)
- Content-Type이 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`일 때만 허용

예를 들어, 단순한 `fetch('https://api.example.com/posts')`는 바로 메인 요청이 호출되죠.

### Preflight Request (OPTIONS 요청)

- Authorization 헤더를 넣거나, JSON을 보낼 때 (`application/json`)
- 혹은 PUT, DELETE 등 비표준 메서드를 쓸 때

이런 경우 브라우저는 먼저 **OPTIONS 메서드로 사전 요청(preflight)** 을 보냅니다.  

이건 "이 요청을 보내도 괜찮을까요?"라고 묻는 확인용 요청입니다.

서버는 이 OPTIONS 요청에 대해 아래처럼 허용 헤더를 돌려줘야 합니다.

```
Access-Control-Allow-Origin: https://your-frontend.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

이 응답이 오면 브라우저는 "좋아, 이제 진짜 요청 보낼게!" 하며 본 요청을 실행합니다.

이 과정을 모르면, "내 fetch가 왜 두 번씩 나가?"라고 헷갈릴 수도 있습니다.

자주 발생하는 요청의 경우 `Access-Control-Max-Age` 헤더에 캐시될 시간을 명시해 주면, 이 Preflight 요청을 캐싱 시켜 최적화를 시켜줄 수 있습니다.

## CORS 오류가 발생하는 주요 케이스

### 어떤 요청이 CORS를 사용하나요?

- `fetch()` 또는 `XMLHttpRequest`등의 호출.
- 웹 폰트(CSS 내 `@font-face`에서 교차 도메인 폰트 사용 시)
- [WebGL 텍스쳐](https://developer.mozilla.org/ko/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL).
- [`drawImage()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage "drawImage()")를 사용해 캔버스에 그린 이미지/비디오 프레임.
- [이미지로부터 추출하는 CSS Shapes.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shapes/Shapes_from_images)

### 실무 케이스

프론트 실무에서 흔히 마주치는 CORS 이슈는 다음과 같습니다.

#### 1. API 요청 (특히 로컬 개발 환경)

로컬 개발 중 `http://localhost:3000`에서 `http://localhost:8080`으로 호출하는 경우, 둘은 **포트가 다르기 때문에** 서로 다른 Origin으로 인식됩니다.  

그래서 서버가 허용하지 않으면 `CORS policy` 에러가 납니다.

#### 2. 이미지, 폰트, 영상 파일 불러오기

`<img src="https://cdn.example.com/banner.png" />` 처럼 외부 CDN 이미지를 불러올 때는 보통 잘 보이지만, **Canvas에 그리거나 다운로드 시도**를 하면 갑자기 막힙니다.  

이때는 `crossorigin="anonymous"` 속성과 CDN의 `Access-Control-Allow-Origin` 설정이 맞아야 합니다.

#### 3. Authorization 헤더가 포함된 요청

토큰 기반 인증(`Bearer token`)을 사용하는 경우, 이는 “안전하지 않은 요청”으로 간주되어 **Preflight** 단계가 반드시 발생합니다.  

서버가 `Access-Control-Allow-Headers`에 `Authorization`을 명시하지 않으면 에러가 납니다.

## 해결 방법

### 1. 서버에서 CORS 허용

가장 근본적인 해결책입니다.  
백엔드에서 `Access-Control-Allow-Origin` 헤더를 추가해야 합니다.

개발 단계에서는 `*`로 허용해도 되지만, 운영에서는 **정확한 Origin**만 허용해야 안전합니다.

### 2. 프록시(proxy) 활용

로컬 개발 시, `create-react-app`, `Vite`, `Next.js` 등의 `devServer proxy` 옵션을 쓰면  
서버와 동일한 Origin처럼 요청을 우회할 수 있습니다.

하지만 이건 **임시 개발용 편의 기능**일 뿐, 배포 환경에서는 CORS 설정이 서버 쪽에 반드시 있어야 합니다.

## 커뮤니케이션

정확하게 CORS 오류에 대해서 이해했으니 백엔드와 구체적으로 커뮤니케이션 할 수 있습니다.

- “현재 서버에서 `Access-Control-Allow-Origin` 헤더가 누락되어 있어서 오류가 발생하고 있어요.”
- “Preflight OPTIONS 요청은 성공하지만, 본 요청이 실패하고 있습니다.”
- “로컬에서는 프록시로 우회 중인데, 운영 배포 시에는 서버 설정이 필요합니다.”

## 결론

CORS의 개념 자체는 단순하고 어렵지 않습니다.

하지만 프론트엔드 개발자 입장에서 문제를 해결하기 위해서는 반드시 커뮤니케이션이 필요한 영역입니다.

그렇기에 CORS에 대해서 정확하게 이해하고 있어야 불필요한 커뮤니케이션 비용을 늘리지 않고 깔끔하게 문제를 해결할 수 있습니다.

## 참고 및 출처

- <https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/CORS>
- <https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F>
- <https://aws.amazon.com/ko/what-is/cross-origin-resource-sharing/>
