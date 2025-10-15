
---
description: CSS 캐스케이딩과 명시도 개념을 통해 스타일 적용 우선순위를 완벽하게 이해하고, 복잡한 CSS 규칙 충돌을 해결하는 방법을 배워보세요.
titleTemplate: logone72
---

# CSS 적용 우선순위 완벽 정리: Cascading과 Specificity

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/726px-CSS3_logo_and_wordmark.svg.png" style="width: 148px;margin: 48px auto;" alt="CSS 로고">

CSS(Cascading Style Sheet)는 웹 페이지의 스타일을 결정하는 필수적인 언어입니다. 그러나 복잡한 스타일 규칙 사이에서 어떤 스타일이 최종적으로 적용될지 혼란스러울 때가 많습니다. 

이 아티클에서는 **CSS 적용 우선순위**를 결정짓는 **캐스케이드(Cascading)** 와 **명시도(Specificity)** 개념을 단계별로 정확하게 이해하고 적용할 수 있도록 정리해보았습니다.

## 1. CSS의 캐스케이딩(Cascading)이란?

![](https://cdn.britannica.com/66/123766-050-9C662576/Dark-Hollow-Falls-Shenandoah-National-Park-Virginia.jpg)

**Cascading(캐스케이딩)** 이란 위에서 아래로 흐르는 폭포수를 의미합니다. CSS 스타일이 적용될 때 규칙이 위에서 아래로 흐르듯, 우선순위를 정해 최종 스타일을 결정하는 알고리즘입니다.

캐스케이딩은 다음 요소를 기반으로 우선순위를 정합니다:

- **출처(Origin)** (브라우저, 사용자, 작성자)
- **중요도(Importance)** (`!important`)
- **명시도(Specificity)** (선택자의 구체성)
- **범위(Scoping)** (DOM 요소 간 거리)
- **선언 순서(Order)** (코드 내 선언 순서)

> *OISSO*, 오이소~

## 2. CSS 적용 우선순위 단계별 정리

CSS 규칙이 충돌하면 다음과 같은 우선순위를 따라 스타일이 적용됩니다.

---

### 📍 단계 1: 출처(Origin)와 중요도(!important)

CSS 우선순위는 기본적으로 **스타일의 출처(Origin)** 와 **중요도(`!important`)** 여부로 결정됩니다.  

일반적으로는 **개발자(작성자)** 가 설정한 스타일이 사용자 또는 브라우저의 기본 스타일보다 높은 우선순위를 가지지만, `!important`가 사용된 경우 이 순서가 역전됩니다.

| **우선순위** | **출처(Origin)**          | **중요도(Importance)** |
| -------- | ----------------------- | ------------------- |
| 1        | CSS Transitions         | -                   |
| 2        | user-agent(브라우저 기본 스타일) | `!important`        |
| 3        | 사용자(User)               | `!important`        |
| 3        | 작성자(개발자)                | `!important`        |
| 5        | CSS `@keyframe` 애니메이션   | -                   |
| 6        | 작성자(개발자)                | 일반(normal)          |
| 7        | 사용자(User)               | 일반(normal)          |
| 8        | user-agent(브라우저 기본 스타일) | 일반(normal)          |

> 🔍 **참고**  
> 실제로 브라우저 기본 스타일시트(사용자 에이전트 스타일시트)에 `!important`가 적용된 사례는 확인되지 않았습니다. 따라서 작성자(개발자)의 스타일이 일반적으로 최우선으로 적용됩니다.

#### 예시 1 - `!important`가 사용된 경우

```css
/* 브라우저 기본 스타일 */
button { color: blue; }

/* 사용자 스타일 */
button { color: orange !important; }

/* 개발자 스타일 */
button { color: green !important; }
```

- **적용 결과**:  
    사용자의 `!important`가 개발자의 `!important`보다 우선됨으로, 최종적으로는 사용자의 스타일인 `orange`가 적용됩니다.

#### 예시 2

```css
/* 브라우저 기본 스타일 */
button { color: black; }

/* 사용자 스타일 */
button { color: orange; }

/* 개발자 스타일 */
button { color: green; }
```

- **적용 결과**:  
    모든 규칙이 일반적(normal)이기 때문에 개발자 스타일이 최우선으로 적용되어, 최종적으로 `color: green;`이 선택됩니다.

> ⚠️ **주의**:  
> `!important` 사용은 유지보수를 어렵게 만들 수 있으므로 꼭 필요한 경우에만 신중히 사용하는 것이 좋습니다.

---

### 📍 단계 2: 명시도(Specificity)

같은 출처와 중요도를 가진 규칙은 **명시도**로 우선순위가 결정됩니다. **명시도란, 선택자의 구체성 정도**를 나타냅니다.

| 우선순위 | 선택자 유형                           | 예시                                |
| ---- | -------------------------------- | --------------------------------- |
| 1    | 인라인 스타일(Inline Style)            | `<div style="">`                  |
| 2    | 아이디 선택자                          | `#main`                           |
| 3    | 클래스, 속성, 의사 클래스 선택자              | `.nav`, `[type="text"]`, `:hover` |
| 4    | 태그 선택자, 의사 요소 선택자                | `div`, `span`, `p`, `::before`    |
| 5    | 상속된 스타일 (Inherited style)        | 부모 요소로부터 상속받은 스타일                 |
| -    | 전역 선택자(`*`) 및 조합자(`+`, `>`, `~`) | 명시도에 영향 없음                        |

#### 명시도 계산 예시

```css
#header { color: red; }
.button { color: blue; }
div { color: green; }
```

```html
<div id="header" class="button">Example</div>
```

- **결과**: 아이디 선택자(`#header`)가 가장 높은 명시도를 가져, `color: red`가 적용됩니다.

#### Deep Dive: 명시도 가중치 및 비교법 

명시도는 각 선택자마다 가중치가 있고, 이를 [Three-column comparsion](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity#three-column_comparison)를 통해 비교를 합니다.

| 선택자 유형              | 가중치   |
| ------------------- | ----- |
| 아이디 선택자             | 1-0-0 |
| 클래스, 속성, 의사 클래스 선택자 | 0-1-0 |
| 태그 선택자, 의사 요소 선택자   | 0-0-1 |

아래 적용 예시를 보면 이해가 쉽습니다!

아이디 선택자가 부여받는 명시도 가중치는 클래스 선택자등이 부여받는 명시도 가중치보다 상위 열에 있기에 항상 이깁니다.

```css
#myElement {
  color: green; /* 1-0-0  - 승리!! */
}
.bodyClass .sectionClass .parentClass [id="myElement"] {
  color: yellow; /* 0-4-0 */
}
```

이러한 명시도 비교법을 정확히 이해하고 있으면 아래와 같이 케이스가 복잡해지는 경우도에 어떤 스타일이 적용될지 알 수 있습니다.

```html
<body id="myApp">
	<div id="myElement"></div>
</body>
```

```css
#myElement {
  color: yellow; /* 1-0-0 */
}
#myApp [id="myElement"] {
  color: green; /* 1-1-0  - 승리!! */
}
```

---

### 📍 단계 3: 범위(Scope)

만약 명시도가 동일하다면, 선택자가 요소와 얼마나 가까운 범위에서 정의됐는지(DOM의 거리가 더 짧은 것)로 우선순위를 결정합니다. 일반적으로 스코프가 더 구체적일수록 우선합니다.

```css
/* @scope 내부 */
@scope (.wrapper) {
  .item { color: green; } /* 우선 적용 */
}

/* 전역 범위 */
.item { color: blue; }
```

- `.wrapper` 내부 요소에 `.item`이 있다면, 범위가 더 가까운 `.item { color: green }`이 적용됩니다.

> **⚠️ 주의**  
> 범위(scope)는 최신 CSS 문법이며, 아직 모든 브라우저에서 지원되지 않을 수 있습니다.

---

### 📍 단계 4: 선언 순서(Order)

모든 조건이 동일하다면 **나중에 선언된 규칙**이 최종 적용됩니다.

**예시**

```css
.button { color: red; }
.button { color: blue; } /* 최종 적용 */
```

## 📌 **한눈에 보는 CSS 우선순위**

최종적으로 CSS 스타일 적용 순서를 정리하면 아래와 같습니다:

```
출처 및 중요도 → 명시도 → 범위 → 선언 순서
```

이 순서를 명확히 이해하면 복잡한 CSS 스타일 규칙 사이에서 혼동 없이 원하는 스타일을 정확하게 적용할 수 있습니다.

CSS의 캐스케이드와 명시도를 잘 활용하여, 유지보수가 쉽고 확장 가능한 웹사이트를 개발해 보세요!

## 📚 추가 팁: CSS 디버깅 팁

브라우저 개발자 도구의 스타일 패널을 활용하면, 각 스타일의 명시도 및 적용 순서를 실시간으로 확인할 수 있어 빠르게 문제를 해결할 수 있습니다.

- Chrome DevTools: **Styles** 탭의 우측 패널에서 적용된 규칙과 명시도 확인 가능합니다.
- Firefox, Safari, Edge 등 모든 주요 브라우저는 유사한 도구 제공합니다.

이 중에서도 Chrome DevTools **Styles** 탭에서 놓치기 쉬운 기능들 몇 가지를 보여드리겠습니다.

### 팁 1 - Styles 탭 내용의 순서

![](https://developer.chrome.com/static/docs/devtools/css/reference/image/an-example-a-selected-el-73f5c083a4f5_1920.png?hl=ko)
우측의 스타일들이 나열된 순서는 이 글에서 다뤘던 CSS의 Cascading 규칙에 따라 우선순위가 높은 것 부터 낮은 순서대로 나열되어있습니다. 


### 팁 2 - 명시도 값, 직접 확인하기
![](https://developer.chrome.com/static/docs/devtools/css/reference/image/the-tooltip-specificity-e28a5e9a4b32_1920.png?hl=ko)
선택자 위로 마우스를 가져가면 명시도 가중치가 포함된 도움말이 표시됩니다. 이를 통해, 어떤 스타일이 왜 적용되었는지 더욱 정확하게 파악할 수 있습니다.

이외에도 여러가지 CSS 관련 기능들이 있습니다. 자세한 내용은 [링크](https://developer.chrome.com/docs/devtools/css/reference?hl=ko)를 참고해주세요.

## 출처 및 참조

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade
- https://developer.mozilla.org/ko/docs/Web/CSS/CSS_cascade/Specificity
- https://developer.chrome.com/docs/devtools/css/reference?hl=ko