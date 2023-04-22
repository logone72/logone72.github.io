## 링크
uses:


참고한 원본 코드:
https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

## 내용

#### 설명

react 코드 내에서 view height와 view width의 변경을 감지하여 작동해야하는 로직이 있기에 이를 react에서 구독하여 window 의 innerHeight/Width가 변경될때마다 리렌더링이 될 수 있게하는 코드입니다.

#### 문제점

**I’m getting an error: “The result of `getSnapshot` should be cached**

참고한 원본 코드에 [문제점](https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs)이 있었습니다. 

> 바로 getSnapShot이 return 될 때마다 항상 새로운 object 생성해서 return한다는 것입니다.

`useSyncExternalStore`은 두번째 인자인 `getSnapshot`의 함수가 리턴한 값을 사용해 데이터를 비교합니다.

하지만 object는 reference 참조이기에 동일한 값을 가진 object를 return한다 하여도, 매번 다른 참조값을 return 하게 되서 무한 루프가 생긴 것입니다.

**해결**
따라서 목적한 width와 height를 각각 subscribe하여 값을 온전히 비교할 수 있도록 하였습니다.

## 코드

```ts
import { useEffect, useState, useSyncExternalStore } from 'react';  
  
// 인자로 넘긴 callback이 실행 될 때 이전의 Snapshot과 비교하여 재랜더링을 유발함  
const subscribe = (callback: () => void) => {  
  window.addEventListener('resize', callback);  
  return () => window.removeEventListener('resize', callback);  
};  
  
// 직전 랜더링 시점과 비교할 값  
const getWidthSnapshot = () => {  
  return window.innerWidth;  
};  
const getHeightSnapshot = () => {  
  return window.innerHeight;  
};  
  
interface State {  
  width: number;  
  height: number;  
}  
  
/**  
 * window inner width, height 를 상태로 받는 훅  
 */  
const useWindowDimensions = (): State => {  
  const width = useSyncExternalStore(subscribe, getWidthSnapshot);  
  const height = useSyncExternalStore(subscribe, getHeightSnapshot);  
  return {  
    width,  
    height,  
  };  
};  
  
export default useWindowDimensions;
```