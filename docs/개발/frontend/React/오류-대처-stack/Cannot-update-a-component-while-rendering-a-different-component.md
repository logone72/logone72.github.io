```
Warning: Cannot update a component (`ModalProvider`) while rendering a different component (`HomeContent`). To locate the bad setState() call inside `HomeContent`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
``` 

## 요약

> 컴포넌트가 랜더링되는 중에는 상태(state) 또는 속성(props)을 업데이트하면 안된다.


## 배경

내가 겪은 상황은 `HomeContent` 라는 component를 렌더링 하는 시점에서 Context API 로 `ModalProvider` 가 보유하고 있는 상태를 변경하려고 시도했다.

상황을 코드로 요약하자면 아래와 같다.

```ts
const Component = (props: Props) => {  
  const { setModalState } = useContext(ModalContext)  
  
  setModalState('something')  
```

## 해결

위 오류를 해결하는 방법은 오류 메세지가 설명하는 내용 그대로이다.

> __컴포넌트가 랜더링 중인 경우에는 다른 컴포넌트를 업데이트(상태 변경)하면 안됩니다.

Context API가 아니라 부모에게 props로 넘겨 받은 `setState`를 랜더링 시점에서 작동시켜도 동일한 오류가 발생한다.

컴포넌트가 랜더링되는 시점에서는 상태 혹은 props를 변경하면 안된다. 

`useEffect` 등으로 컴포넌트가 랜더링을 마친 시점에서 변경을 하도록하자.

#### Dont
```ts
const Component = (props: Props) => {  
  const { setContextState } = useContext(SomeContext)  
  const { setParentState } = props;  
  
  setContextState('something')  
  setParentState('something');
```

#### Do
```ts
const Component = (props: Props) => {  
  const { setContextState } = useContext('SomeContext');  
  const { setParentState } = props;  
  
  useEffect(() => {  
    setContextState('something');  
    setParentState('something');  
  })
```


## 회고

돌이켜보면 매우 기초적인 실수였던것 같다. 하지만 이번 기회에 다시금 React 환경에서 하면 안되는 것 하나를 명확하게 알 수 있었다.

비슷한 상황에서 다른 컴포넌트의 상태가 아닌 본인의 상태를 변경하는 경우에는 아래의 오류를 마주하게 된다.

```
Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
```

