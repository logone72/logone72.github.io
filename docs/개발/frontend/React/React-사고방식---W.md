
[원문 링크 / Thinking in React](https://react.dev/learn/thinking-in-react#start-with-the-mockup)

오랜만에 주 업무로 리액트 개발을 들어가게 됐다. 1년간 vanilla js 프로젝트 개발을 진행해오면서 깊이 느낀 부분은 역할과 관심사 분리의 중요성이다. 초기 단계의 단순 개발에는 크게 문제되지 않는 요소이지만, 어떤 프로젝트에도 따라오는 필연적인 유지보수 과정을 마주하게 되었을때의 지난함이란 분명 어떤 개발자라도 피하고 싶을 것이다.

따라서 이번 프로젝트를 진행하면서는 React라는 컴포넌트 및 상태 기반의 라이브러리의 목적에 충실해 관심사와 역할 그리고 확장성까지 고려된 코드를 처음부터 작성해 이후의 일을 줄이려고 한다. 

이를 React 공식 문서에서는 `React 사고방식 (Thinking in React` 이라고 표현하는 것 같은데 정확한 표현이라고 생각한다. 애시당초 React 등의 컴포넌트 기반 라이브러리의 등장들이 기존의 프론트엔드 아키텍쳐에 단점들을 깊이 통감했기 때문이였으니, React 스럽게 사고하면서 개발 할수록 가장 React의 장점을 크게 누릴 수 있지 않을까 싶다. 


## 컴포넌트란 무엇인가


## Thinking in React

리액트는 표시해야하는 데이터가 되었든, 디자이너가 제공한 시안이 되었든 아래의 5단계를 거쳐가며 생각을 해보라고 한다.

1. Break the UI into a component hierarchy
2. Build a static version in React
3. Find the minimal but complete representation of UI state
4. Identify where your state should live
5. Add inverse data flow

