
https://blog.logrocket.com/using-react-usestate-object/

## 올바르게 Object 상태를 변경하는 방법

__예시:

```js
const [shopCart, setShopCart] = useState({});

let updatedValue = {};
updatedValue = {"item1":"juice"};
setShopCart(shopCart => ({
      ...shopCart,
      ...updatedValue
    }));
```

React에서 state는 불변으로 간주되므로 일단 생성되면 변경할 수 없습니다. 대신 상태를 업데이트하려면 업데이트된 상태를 나타내는 새로운 객체를 만들어야 합니다.  
  
상태의 개체를 업데이트할 때는 항상 기존 개체를 수정하지 말고 새 개체를 만들어야 합니다. 그 이유는 다음과 같습니다:  

## 상태의 개체를 업데이트할 때 항상 새 개체를 만들어야하는 이유

### 돌연변이 방지

기존 상태 객체를 수정하면 애플리케이션에서 예기치 않은 동작이 발생할 수 있습니다. 예를 들어, 새 상태를 계산하기 위해 이전 상태에 의존하는 컴포넌트가 있는 경우 기존 상태 객체를 수정하면 계산이 잘못될 수 있습니다. 새 객체를 생성하면 이 문제를 방지하고 상태가 항상 일관성을 유지할 수 있습니다.  
  
### 얕은 비교

__React는 얕은 비교 알고리즘을 사용해 컴포넌트를 다시 렌더링할지 여부를 결정합니다.__ 즉, state 객체의 참조만 비교하고 그 내용은 비교하지 않습니다. 기존 state 객체를 수정하면 참조는 동일하게 유지되고 React가 변경 사항을 감지하지 못해 잘못된 렌더링이 발생할 수 있습니다. 새 객체를 생성하면 React가 변경 사항을 감지하고 다시 렌더링을 트리거하도록 할 수 있습니다.  
  
### 성능

__새 객체를 생성하는 것은 비용이 많이 드는 작업처럼 보일 수 있지만 실제로는 매우 효율적입니다.__ 최신 자바스크립트 엔진은 새 객체를 생성하는 데 최적화되어 있으며 매우 빠르게 생성할 수 있습니다. 실제로 새 객체를 생성하면 전체 객체를 복사하는 오버헤드를 피할 수 있기 때문에 기존 객체를 수정하는 것보다 더 빠른 경우가 많습니다.  
  
요약하자면, React에서 state를 업데이트할 때 새 객체를 생성하는 것은 애플리케이션이 올바르게 작동하고 효율적으로 작동하도록 하는 데 중요합니다. 또한 추적하기 어려운 미묘한 버그를 피하는 데 도움이 됩니다.  


-- created by ChatGpt (wow)

