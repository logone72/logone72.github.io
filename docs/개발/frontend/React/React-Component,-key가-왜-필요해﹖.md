
배열을 `map()` 해서 컴포넌트들을 생성하는 방식은 React 개발에서 빠지지 않는 요소이다.

그렇게 작업을 하다보면 어떤친구가 console 창에 찍힌다.

```
Warning: Each child in a list should have a unique "key" prop.

Check the render method of `Component`. 
See https://reactjs.org/link/warning-keys for more information.
```

https://reactjs.org/link/warning-keys

공식 문서에 위의 경고 메세지에 대해서 잘 적혀있다. 포인트만 잡자면 아래와 같다.

### key의 역할

1. `map()`으로 복사된 `JSX element`들에겐 `key`가 필요하다
2. `key`는 각 컴포넌트가 배열의 어떤 항목에 해당하는지 React에 알려준다. 
3. 이를 통해 배열에 변경이 일어나는 경우, React가 정확히 무슨 일이 일어났는지 추론하고 DOM 트리를 올바르게 업데이트하는 데 도움이 된다.

### key는 뭘로?

> `key`는 그냥 즉석에서 생성하기보다, 원본 데이터인 배열과 생성된 컴포넌트의 연결점으로서 중요하기에, 데이터 자체에 `id`등으로 포함해두는게 좋다. 